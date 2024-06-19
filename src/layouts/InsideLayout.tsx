import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '../screens/Home';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../theme';
import CreateExpense from '../screens/CreateExpense';
import Navbar from '../navigation/Navbar';
import CreateIncome from '../screens/CreateIncome';
import WalletsView from '../screens/WalletsView';
import { WalletProvider } from '../context/WalletContext';

type Props = {}

const InsideStack = createNativeStackNavigator();

function InsideLayout({ }: Props) {
  return (
    <WalletProvider>
      <StatusBar translucent={false} backgroundColor={theme.colors.accent} />

      <InsideStack.Navigator screenOptions={{header: () => <Navbar />}}>

        <InsideStack.Screen name="Home" component={Home}/>
        <InsideStack.Screen name="CreateExpense" component={CreateExpense} options={{header: () => <Navbar backOption currentTitle='Añadir Gasto'/>}}/>
        <InsideStack.Screen name="CreateIncome" component={CreateIncome} options={{header: () => <Navbar backOption currentTitle='Añadir Ingreso'/>}}/>
        <InsideStack.Screen name="Wallets" component={WalletsView} />
      </InsideStack.Navigator>
    </WalletProvider>

  )
}


export default InsideLayout