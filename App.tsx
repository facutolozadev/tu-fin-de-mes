
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler'
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {

  const [fontsLoaded] = useFonts({
    "inter-bold": require('./assets/fonts/Inter-Bold.ttf'),
    "inter-regular": require('./assets/fonts/Inter-Regular.ttf'),
    "inter-semibold": require('./assets/fonts/Inter-SemiBold.ttf'),
  })

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync()
  }

  return (

    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>

  );
}


