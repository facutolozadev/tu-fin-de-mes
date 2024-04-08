import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '../screens/Home';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../theme';

type Props = {}

const InsideStack = createNativeStackNavigator();

function InsideLayout({ }: Props) {
  return (
    <>
      <StatusBar translucent={false} backgroundColor={theme.colors.accent} />

      <InsideStack.Navigator
        screenOptions={{ headerShown: false }}>

        <InsideStack.Screen name="Home" component={Home} />
      </InsideStack.Navigator>
    </>

  )
}


export default InsideLayout