import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../../firebaseCofing";
import Navbar from "./Navbar";
import InsideLayout from "../layouts/InsideLayout";
import Login from "../screens/Login";
import Register from "../screens/Register";
import * as SplashScreen from 'expo-splash-screen'

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
  
    const [user, setUser] = useState<User | null>(null)
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
  
    return (
      <Stack.Navigator
        screenOptions={{
        header: () => <Navbar/>
        }}
        initialRouteName='Login'>
        {
          user ?
            (
              <Stack.Screen name='insideLayout' component={InsideLayout} options={{ headerTitle: () => null }} />
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
    )
  }

  export default StackNavigator