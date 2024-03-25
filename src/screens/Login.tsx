import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import StyledText from '../components/StyledText'
import StyledInput from '../components/StyledInput'
import StyledButton from '../components/StyledButton'

type Props = {}

function Login({ }: Props) {
  return (
    <View style={styles.container}>
      <StyledText bold fontSize="bigger" style={{ textAlign: 'center' }}>Iniciar sesión</StyledText>
      <StyledInput placeholder='Correo electrónico' />
      <StyledInput placeholder='Contraseña' />
      <View style={{gap: 10}}>
        <StyledText semibold fontSize="small" color="accent">Olvidé mi contraseña</StyledText>
        <StyledText semibold fontSize="small" color="accent">No tienes una cuenta? Regístrate</StyledText>
      </View>
     <StyledButton type="primary">Iniciar sesión</StyledButton>
     <StyledButton type="secondary">
      Iniciar sesión con Google
      </StyledButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
    width: "100%",
    paddingHorizontal: 36
  }
})

export default Login