import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import StyledText from '../components/StyledText'
import StyledInput from '../components/StyledInput'
import StyledButton from '../components/StyledButton'

type Props = {}

function Register({ }: Props) {
  return (
    <View style={styles.container}>
      <StyledText bold fontSize="bigger" style={{ textAlign: 'center' }}>Registrarme</StyledText>
      <StyledInput placeholder='Correo electrónico' />
      <StyledInput placeholder='Contraseña' />
      <StyledInput placeholder='Repetir contraseña' />

      <StyledText semibold fontSize="small" color="accent">Ya tienes una cuenta? Inicia sesión</StyledText>

      <StyledButton type="primary">Registrarme</StyledButton>
      <StyledButton type="secondary">
        Registrarme con Google
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

export default Register