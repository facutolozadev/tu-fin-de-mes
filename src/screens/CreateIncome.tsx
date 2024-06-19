import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import StyledText from '../components/StyledText'
import { NavigationProp, useRoute } from '@react-navigation/native';

import { theme } from '../theme';
import { Income, Wallet } from '../utils/types';
import ModalPicker, { Option } from '../components/ModalPicker';
import StyledButton from '../components/StyledButton';
import { FIREBASE_AUTH, db } from '../../firebaseCofing';
import { Timestamp, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { INCOME_CONCEPTS } from '../utils/consts/concepts';
import { ActivityIndicator } from 'react-native-paper';
import { useWallets } from '../context/WalletContext';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

function CreateIncome({ navigation }: RouterProps) {
  const [amount, setAmount] = useState(0)
  const route = useRoute()
  const { wallets }: any = route.params;
  const [selectedWallet, setSelectedWallet] = useState<Option | null>(null)
  const [selectedConcept, setSelectedConcept] = useState<Option | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { increaseAmount } = useWallets()

  const handleAmountChange = (text: string) => {
    const cleanedText = text.replace(/,/g, '');
    const numericAmount = Number(cleanedText);
    setAmount(numericAmount);
  };

  const handleCreateIncome = async () => {
    setIsLoading(true)
    try {
      if (FIREBASE_AUTH.currentUser && selectedWallet?.value) {

        const userId = FIREBASE_AUTH.currentUser.uid;

        const currentWallet: Wallet = wallets.find((wallet: Wallet) => wallet.name === selectedWallet.value);

        const userIncomesQuerySnapshot = await getDocs(
          query(collection(db, 'incomes'), where("userId", "==", userId))
        );

        userIncomesQuerySnapshot.forEach(async (doc) => {
          const userIncomes = doc.data().userIncomes
          const currentWalletUserIncomesIndex = userIncomes.findIndex((el: any) => el.walletId === currentWallet.walletId)

          const newIncome: Income = {
            createdAt: Timestamp.now(),
            amount: amount,
            concept: selectedConcept?.value!,
          };

          if (currentWalletUserIncomesIndex !== -1) {
            userIncomes[currentWalletUserIncomesIndex].value.push(newIncome);

            await updateDoc(doc.ref, {
              userIncomes
            })

            increaseAmount(currentWallet, amount)
            
          }
          setIsLoading(false)
          navigation.navigate('Home', { newIncome })
          
        })
        
      }
    } catch (e) {
      setIsLoading(false)
      console.log('Error al agregar gasto', e);
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
        <StyledText semibold>Billetera</StyledText>
        <View style={styles.walletSelectContainer}>
          <ModalPicker
            options={INCOME_CONCEPTS.map((el) => ({ value: el.name }))}
            selectedOption={selectedConcept}
            setSelectedOption={setSelectedConcept}
          />
        </View>
      </View>
      {
        !isLoading ? ( 
          <StyledButton onPress={() => handleCreateIncome()} style={{ marginTop: 60 }}>Añadir</StyledButton>
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

export default CreateIncome