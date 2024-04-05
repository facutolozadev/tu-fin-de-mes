import React, { useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import StyledText from '../components/StyledText'
import StyledInput from '../components/StyledInput'
import StyledButton from '../components/StyledButton'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH, db } from '../../firebaseCofing'
import { addDoc, collection } from 'firebase/firestore'
import { createNewUser } from '../services/createUser'

type Props = {
  navigation: any
}

function Register({ navigation }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    setLoading(true)
    createNewUser(auth, email, password)
  }

  return (
    <View style={styles.container}>
      <StyledText bold fontSize="bigger" style={{ textAlign: 'center' }}>Registrarme</StyledText>
      <StyledInput value={email} onChange={(text) => setEmail(text)} placeholder='Correo electrónico' autoCapitalize="none" />
      <StyledInput secureTextEntry={true} value={password} onChange={(text) => setPassword(text)} placeholder='Contraseña' autoCapitalize="none" />
      <StyledInput secureTextEntry={true} value={confirmPassword} onChange={(text) => setConfirmPassword(text)} placeholder='Repetir contraseña' autoCapitalize="none" />


      <Pressable onPress={() => navigation.navigate('Login')}>

        <StyledText semibold fontSize="small" color="accent">Ya tienes una cuenta? Inicia sesión</StyledText>
      </Pressable>

      {loading ? <ActivityIndicator size="large" color="#000ff" /> : (

        <StyledButton type="primary" onPress={() => signUp()}>Registrarme</StyledButton>

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

export default Register