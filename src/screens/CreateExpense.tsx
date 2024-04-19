import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native'
import StyledText from '../components/StyledText'
import { NavigationProp, useRoute } from '@react-navigation/native';

import { theme } from '../theme';
import { Expense, Wallet } from '../utils/types';
import ModalPicker, { Option } from '../components/ModalPicker';
import StyledButton from '../components/StyledButton';
import { FIREBASE_AUTH, db } from '../../firebaseCofing';
import { Timestamp, collection, getDocs, query, updateDoc, where, arrayUnion, doc, getDoc } from 'firebase/firestore';
import { EXPENSE_CONCEPTS } from '../utils/consts/concepts';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

function CreateExpense({ navigation }: RouterProps) {
  const [amount, setAmount] = useState(0)
  const route = useRoute()
  const { wallets }: any = route.params;
  const [selectedWallet, setSelectedWallet] = useState<Option | null>(null)
  const [selectedConcept, setSelectedConcept] = useState<Option | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAmountChange = (text: string) => {
    const cleanedText = text.replace(/,/g, '');
    const numericAmount = Number(cleanedText);
    setAmount(numericAmount);
  };

  const handleCreateExpense = async () => {
    try {
      if (FIREBASE_AUTH.currentUser && selectedWallet?.value) {
        setIsLoading(true)
        const userId = FIREBASE_AUTH.currentUser.uid;
        const currentWallet: Wallet = wallets.find((wallet: Wallet) => wallet.name === selectedWallet.value);
        const userExpensesQuerySnapshot = await getDocs(
          query(collection(db, 'expenses'), where("userId", "==", userId))
        );

        userExpensesQuerySnapshot.forEach(async (doc) => {
          const userExpenses = doc.data().userExpenses
          const currentWalletUserExpensesIndex = userExpenses.findIndex((el: any) => el.walletId === currentWallet.walletId)

          const newExpense: Expense = {
            createdAt: Timestamp.now(),
            amount: amount,
            concept: selectedConcept?.value!,
          };

          if (currentWalletUserExpensesIndex !== -1) {
            userExpenses[currentWalletUserExpensesIndex].value.push(newExpense);

            await updateDoc(doc.ref, {
              userExpenses
            })
          }

          navigation.navigate('Home', { newExpense })
          setIsLoading(false)
        })

      }
    } catch (e) {
      alert('Error al agregar gasto' + e);
      setIsLoading(false)
    
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.amountSection}>
        <StyledText fontSize="bigger" semibold>$</StyledText>
        <TextInput onChangeText={(text) => handleAmountChange(text)} keyboardType="numeric" style={styles.amountInput}>{amount === 0 ? '' : amount.toLocaleString()}</TextInput>
      </View>

      <View style={styles.walletSection}>
        <StyledText semibold>Billetera</StyledText>
        <View style={styles.walletSelectContainer}>
          <ModalPicker options={wallets.map((wallet: Wallet) => ({
            value: wallet.name
          }))}
            selectedOption={selectedWallet}
            setSelectedOption={setSelectedWallet}
          />
        </View>
      </View>

      <View style={styles.conceptsSection}>
        <StyledText semibold>Concepto</StyledText>
        <View style={styles.walletSelectContainer}>
          <ModalPicker options={EXPENSE_CONCEPTS.map((el) => ({ value: el.name }))}
            selectedOption={selectedConcept}
            setSelectedOption={setSelectedConcept}
          />
        </View>
      </View>


      {
        !isLoading ? ( 
          <StyledButton onPress={() => handleCreateExpense()} style={{ marginTop: 60 }}>Añadir</StyledButton>
        ) : (
          <ActivityIndicator color={theme.colors.accent} style={{marginTop: 80}} size="large"/>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 45,
    paddingTop: 40
  },
  amountSection: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'flex-end'
  },
  amountInput: {
    width: 150,
    fontSize: theme.fontSizes.bigger,
    textAlign: 'center',
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 2
  },
  walletSection: {
    marginTop: 50,
    gap: 12
  },
  walletSelectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  conceptsSection: {
    marginTop: 50,
    gap: 12
  }
})

export default CreateExpense