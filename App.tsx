import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen'
import Register from './src/screens/Register';

export default function App() {

  const [fontsLoaded] = useFonts({
    "inter-bold": require('./assets/fonts/Inter-Bold.ttf'),
    "inter-regular": require('./assets/fonts/Inter-Regular.ttf'),
    "inter-semibold": require('./assets/fonts/Inter-SemiBold.ttf'),
  })

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync()
    }
    prepare()
  }, [])

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync()
  }

  return (
    <View style={[styles.container]}>
      <Register />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
