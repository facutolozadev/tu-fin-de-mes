import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '../screens/Home';
import { StyleSheet } from 'react-native';

type Props = {}

const InsideStack = createNativeStackNavigator();

function InsideLayout({}: Props) {
  return (
    <InsideStack.Navigator>
        <InsideStack.Screen name="Home" component={Home} options={{headerShown: false}}/>
    </InsideStack.Navigator>
  )
}


export default InsideLayout