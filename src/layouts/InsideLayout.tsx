import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import Home from '../screens/Home';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import Navbar from '../navigation/Navbar';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../theme';

type Props = {}

const InsideStack = createNativeStackNavigator();

function InsideLayout({ }: Props) {
  return (
    <>
      <StatusBar translucent={false} backgroundColor={theme.colors.accent} />

      <InsideStack.Navigator
        screenOptions={{
          header: (props: any) => <Navbar {...props} />,
          headerShown: true,
        }}
      >

        <InsideStack.Screen name="Home" component={Home} />
      </InsideStack.Navigator>
    </>

  )
}


export default InsideLayout