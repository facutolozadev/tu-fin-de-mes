import { NavigationProp } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'

import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

import { getUserWallets } from '../services/getUserWallets';
import { Expense, Wallet } from '../utils/types';
import ModalPicker, { Option } from '../components/ModalPicker';
import { resolveIcon } from '../utils/iconResolver';
import StyledButton from '../components/StyledButton';
import { FIREBASE_AUTH } from '../../firebaseCofing';
import StyledText from '../components/StyledText';
import AddButton from '../components/AddButton';
import { sortByDate } from '../utils/sortByDate';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ItemList from '../components/ui/ItemList';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

function Home({ navigation }: RouterProps) {

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [viewExpensesOrIncomes, setViewExpensesOrIncomes] = useState('expenses');
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false)


  const onRefresh = () => {

  }

  /**FETCH WALLETS */
  useEffect(() => {
    const fetchWallets = async () => {
      const userWallets: Wallet[] = await getUserWallets();
      setWallets(userWallets);
      const totalAmount = userWallets.reduce((total, wallet) => total + wallet.amount, 0);
      setTotal(totalAmount);
      setSelectedOption({ value: 'Total', icon: require('../assets/icons/wallet.png') });
      setIsLoading(false);
    };
    fetchWallets();
  }, []);

  /**SET CURRENT WALLET AND IT'S EXPENSES/INCOMES WHEN CHANGE */
  useEffect(() => {

    /* IF THE WALLET IS EVERYTHING BUT TOTAL, SET AS CURRENT WALLET THE SELECTED OPTION */
    if (selectedOption && selectedOption.value !== 'Total') {
      const currWallet = wallets.find((wallet) => wallet.name === selectedOption.value)
      if (currWallet) {
        setCurrentWallet(currWallet)
      }
      /* IF THE WALLET IS EQUAL TO TOTAL, COMBINE EXPENSES & INCOMES */
    } else {
      const combinedExpenses = wallets.flatMap((wallet) => wallet.expenses ?? []);
      const combinedIncomes = wallets.flatMap((wallet) => wallet.incomes ?? []);

      sortByDate(combinedExpenses)
      sortByDate(combinedIncomes)

      setCurrentWallet({ name: 'Total', amount: total, main: false, expenses: combinedExpenses, incomes: combinedIncomes });
    }
  }, [selectedOption])

  if (isLoading) {
    return (
      <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.accent} />
      </View>
    )
  }



  return (
    <ScrollView>
      <View style={styles.container}>
        <ModalPicker
          selectedOption={{ value: selectedOption?.value!, icon: selectedOption?.icon! }}
          setSelectedOption={setSelectedOption}
          options={[{
            value: 'Total',
            icon: require('../assets/icons/wallet.png')
          }, ...wallets.map(wallet => ({
            value: wallet.name,
            icon: resolveIcon(wallet.icon!)
          }))]}
        />

        <StyledText fontSize="big" semibold>
          {
            selectedOption?.value !== 'Total' ? (
              `$${wallets.find((wallet) => wallet.name === selectedOption!.value)?.amount.toLocaleString()}`

            ) : (
              `$${total.toLocaleString()}`
            )
          }
        </StyledText>

        <StyledButton type="secondary" style={{ width: '80%', paddingVertical: 20 }}>
          <StyledText fontSize="small" semibold>Gestionar mes</StyledText>
        </StyledButton>


        <View style={styles.choose}>
          <Pressable style={{ borderBottomWidth: viewExpensesOrIncomes === 'expenses' ? 2 : 0 }} onPress={() => setViewExpensesOrIncomes('expenses')}>
            <StyledText semibold color={`${viewExpensesOrIncomes === 'expenses' ? 'primary' : 'secondary'}`}>GASTOS</StyledText>
          </Pressable>
          <Pressable style={{ borderBottomWidth: viewExpensesOrIncomes === 'incomes' ? 2 : 0 }} onPress={() => setViewExpensesOrIncomes('incomes')}>
            <StyledText semibold color={`${viewExpensesOrIncomes === 'incomes' ? 'primary' : 'secondary'}`}>INGRESOS</StyledText>
          </Pressable>
        </View>


        <View style={styles.monthIndicator}>
          <Ionicons name="chevron-back" style={{ fontSize: 18, color: theme.colors.secondary }} />
          <View style={{ gap: 4 }}>
            <StyledText semibold color="secondary" fontSize="small">Marzo 2024</StyledText>
            <StyledText semibold style={{ textAlign: 'center' }}>$0</StyledText>
          </View>
          <Ionicons name="chevron-forward" style={{ fontSize: 18, color: theme.colors.secondary }} />
          <AddButton style={{ position: 'absolute', bottom: -40, right: '50%' }} />
        </View>


        <View style={styles.expensesOrIncomesList}>
          {
            viewExpensesOrIncomes === 'expenses'
              ? currentWallet?.expenses?.map((item, index) => (
                <ItemList item={item} index={index} />
              ))
              : currentWallet?.incomes?.map((item, index) => (
                <ItemList item={item} index={index} />
              ))
          }
        </View>
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 42,
    alignItems: 'center',
    backgroundColor: theme.colors.bg,
    gap: 20,
    paddingHorizontal: 30
  },
  choose: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center'
  },
  monthIndicator: {
    width: '100%',
    height: 90,
    backgroundColor: theme.colors.negative,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: 'center',
    borderRadius: 20,
    gap: 4
  },
  expensesOrIncomesList: {
    marginTop: 50,
    width: '100%',
    gap: 6
  },




})

export default Home