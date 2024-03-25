import { NavigationProp } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FIREBASE_AUTH } from '../../firebaseCofing';
import StyledButton from '../components/StyledButton';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

function Home({ navigation }: RouterProps) {
  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <StyledButton onPress={() => FIREBASE_AUTH.signOut()}>Salir</StyledButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Home