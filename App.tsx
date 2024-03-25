import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen'
import Register from './src/screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseCofing';
import InsideLayout from './src/layouts/InsideLayout';

const Stack = createNativeStackNavigator();

export default function App() {

  const [user, setUser] = useState<User | null>(null)

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

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user)
    })
  }, [])

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync()
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {
          user ?
            (
              <Stack.Screen name='insideLayout' component={InsideLayout} options={{ headerShown: false }} />
            )
            :
            (
              <>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
              </>
            )
        }

      </Stack.Navigator>
    </NavigationContainer>
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
