import React, { useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native'
import StyledText from '../components/StyledText'
import StyledInput from '../components/StyledInput'
import StyledButton from '../components/StyledButton'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../firebaseCofing'


type Props = {
  navigation: any
}

function Login({ navigation }: Props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)


  const auth = FIREBASE_AUTH

  const signIn = async () => {
    setLoading(true)
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      console.log(error)
      alert('No se pudo iniciar sesión: ' + error.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <View style={styles.container}>
      <StyledText bold fontSize="bigger" style={{ textAlign: 'center' }}>Iniciar sesión</StyledText>
      <StyledInput value={email} placeholder='Correo electrónico' onChange={(text: string) => setEmail(text)} autoCapitalize="none" />
      <StyledInput value={password} placeholder='Contraseña' secureTextEntry={true} onChange={(text: string) => setPassword(text)} autoCapitalize="none" />
      <View style={{ gap: 10 }}>
        <StyledText semibold fontSize="small" color="accent">Olvidé mi contraseña</StyledText>

        <Pressable onPress={() => navigation.navigate('Register')}>
          <StyledText semibold fontSize="small" color="accent">No tienes una cuenta? Regístrate</StyledText>
        </Pressable>

      </View>


      {loading ? <ActivityIndicator size="large" color="#000ff" /> : (

        <StyledButton type="primary" onPress={() => signIn()}>Iniciar sesión</StyledButton>


      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
    width: "100%",
    paddingHorizontal: 36,
    justifyContent: 'center',
    height: '100%'
  }
})

export default Login