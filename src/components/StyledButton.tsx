import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

type Props = {
  children?: React.ReactNode;
  onPress?: () => void;
  type?: 'primary' | 'secondary';
};

const StyledButton = ({ children, onPress, type = 'primary' }: Props) => {
  const buttonStyle = type === 'primary' ? styles.primaryButton : styles.secondaryButton;
  const textStyle = type === 'primary' ? styles.primaryText : styles.secondaryText;

  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: theme.colors.accent,
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryText: {
    // Puedes personalizar el estilo del texto para el botón primario aquí
  },
  secondaryText: {
    // Puedes personalizar el estilo del texto para el botón secundario aquí
  },
});

export default StyledButton;
