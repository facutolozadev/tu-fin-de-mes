import { NavigationProp, RouteProp } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator,Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'

import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
 
import { getUserWallets } from '../services/getUserWallets';
import { Expense, Income, Wallet } from '../utils/types';
import ModalPicker, { Option } from '../components/ModalPicker';
import { resolveIcon } from '../utils/iconResolver';
import StyledButton from '../components/StyledButton';
import StyledText from '../components/StyledText';
import AddButton from '../components/AddButton';
import { sortByDate } from '../utils/sortByDate';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ItemList from '../components/ui/ItemList';
import { getUserExpenses } from '../services/getUserExpenses';
import { getUserIncomes } from '../services/getUserIncomes';
interface RouterProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any>
}

function Home({ route, navigation }: RouterProps) {

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [isLoading, setIsLoading] = useState(true); //then, set this to true againm
  const [total, setTotal] = useState(0);

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [viewExpensesOrIncomes, setViewExpensesOrIncomes] = useState('expenses');
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [incomes, setIncomes] = useState<Income[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const { top } = useSafeAreaInsets()

  const fetchWallets = async () => {
    const userWallets: Wallet[] = await getUserWallets();

    setWallets(userWallets);

    const totalAmount = userWallets.reduce((total, wallet) => total + wallet.amount, 0);
    setTotal(totalAmount);
    setSelectedOption({ value: 'Total', icon: require('../assets/icons/wallet.png') });
    setIsLoading(false);
  };

  const handleChangeExpensesAndIncomes = async () => {
    const currWallet = wallets.find((wallet) => wallet.name === selectedOption?.value)
    const userExpenses: Expense[] = await getUserExpenses(currWallet?.walletId);
    const userIncomes: Income[] = await getUserIncomes(currWallet?.walletId);
    const sortedExpenses = sortByDate(userExpenses)
    const sortedIncomes = sortByDate(userIncomes)

    if (currWallet) {
      setCurrentWallet(currWallet)
      setExpenses(sortedExpenses)
      setIncomes(sortedIncomes)
    }
  }

  const combineAllExpensesAndIncomes = async () => {
    // Obtener todos los gastos de todas las carteras
    const allExpenses = await Promise.all(wallets.map(async (wallet) => {
      const userExpenses = await getUserExpenses(wallet.walletId);
      return userExpenses;
    }));
    const allIncomes = await Promise.all(wallets.map(async (wallet) => {
      const userIncomes = await getUserIncomes(wallet.walletId);
      return userIncomes;
    }));

    // Combinar todos los gastos en un solo array
    const combinedExpenses = allExpenses.reduce((acc, expenses) => {
      return acc.concat(expenses);
    }, []);

    const combinedIncomes = allIncomes.reduce((acc, expenses) => {
      return acc.concat(expenses);
    }, []);


    return { combinedExpenses, combinedIncomes };
  };


  const onRefresh = async () => {
    setIsRefreshing(true)
    await fetchWallets()
    setIsRefreshing(false)
  }

  useEffect(() => {
    if (route.params?.newExpense) {
      const newExpense = route.params.newExpense;
      setExpenses(sortByDate([...expenses, newExpense]))
    }
    if (route.params?.newIncome) {
      const newIncome = route.params.newExpense;
      setIncomes(sortByDate([...incomes, newIncome]))
    }
  }, [route.params?.newExpense, route.params?.newIncome])


  useEffect(() => {
    fetchWallets();
  }, []);

  /**SET CURRENT WALLET AND IT'S EXPENSES/INCOMES WHEN CHANGE */
  useEffect(() => {
    /* IF THE WALLET IS EVERYTHING BUT TOTAL, SET AS CURRENT WALLET THE SELECTED OPTION */
    const fetchData = async () => {
      if (selectedOption && selectedOption.value !== 'Total') {
        handleChangeExpensesAndIncomes()
        /* IF THE WALLET IS EQUAL TO TOTAL, COMBINE EXPENSES & INCOMES */
      }
      else {
        const { combinedExpenses, combinedIncomes } = await combineAllExpensesAndIncomes();
        setExpenses(sortByDate(combinedExpenses));
        setIncomes(sortByDate(combinedIncomes));
        setCurrentWallet({ name: 'Total', amount: total, main: false });
      }
    }

    fetchData()
  }, [selectedOption]);

  if (isLoading) {
    return (
      <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.accent} />
      </View>
    )
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          progressViewOffset={top}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.container}>
        <ModalPicker
          selectedOption={{ value: selectedOption?.value!, icon: selectedOption?.icon! }}
          setSelectedOption={setSelectedOption}
          options={[{ value: 'Total', icon: require('../assets/icons/wallet.png') }, ...wallets.map(wallet => ({
            value: wallet.name,
            icon: resolveIcon(wallet.icon!)
          }))]}
        />

        <StyledText fontSize="bigger" semibold>
          {
            selectedOption?.value !== 'Total' ? (
              `$${wallets.find((wallet) => wallet.name === selectedOption!.value)?.amount.toLocaleString()}`

            ) : (
              `$${total.toLocaleString()}`
            )
          }
        </StyledText>

        <StyledButton type="secondary" style={{ width: '80%', paddingVertical: 20 }}>
          <StyledText semibold>Gestionar mes</StyledText>
        </StyledButton>


        <View style={styles.choose}>
          <Pressable style={{ borderBottomWidth: viewExpensesOrIncomes === 'expenses' ? 2 : 0 }} onPress={() => setViewExpensesOrIncomes('expenses')}>
            <StyledText semibold fontSize="big" color={`${viewExpensesOrIncomes === 'expenses' ? 'primary' : 'secondary'}`}>GASTOS</StyledText>
          </Pressable>
          <Pressable style={{ borderBottomWidth: viewExpensesOrIncomes === 'incomes' ? 2 : 0 }} onPress={() => setViewExpensesOrIncomes('incomes')}>
            <StyledText semibold fontSize="big" color={`${viewExpensesOrIncomes === 'incomes' ? 'primary' : 'secondary'}`}>INGRESOS</StyledText>
          </Pressable>
        </View>


        <View style={styles.monthIndicator}>
          <Ionicons name="chevron-back" style={{ fontSize: 18, color: theme.colors.secondary }} />
          <View style={{ gap: 4 }}>
            <StyledText semibold color="secondary">Marzo 2024</StyledText>
            <StyledText semibold style={{ textAlign: 'center' }}>$0</StyledText>
          </View>
          <Ionicons name="chevron-forward" style={{ fontSize: 18, color: theme.colors.secondary }} />
          <AddButton onPress={() => {
            viewExpensesOrIncomes === 'expenses' ? navigation.navigate('CreateExpense', { wallets }) : navigation.navigate('CreateIncome', { wallets })
          }} style={{ position: 'absolute', bottom: -40, right: '50%' }} />
        </View>

        {viewExpensesOrIncomes === 'expenses' && expenses.length === 0 && <StyledText style={{marginTop: 68}} fontSize="small" semibold color="secondary">Aún no hay gastos</StyledText>}
        {viewExpensesOrIncomes === 'incomes' && incomes.length === 0 && <StyledText style={{marginTop: 68}} fontSize="small" semibold color="secondary">Aún no hay ingresos </StyledText>}
        <View style={styles.expensesOrIncomesList}>
          {
            viewExpensesOrIncomes === 'expenses'
              ? expenses?.map((item, index) => (
                <ItemList key={index} item={item} />
              ))
              : incomes?.map((item, index) => (
                <ItemList key={index} item={item} />
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