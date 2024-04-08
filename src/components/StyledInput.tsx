import React from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'
import { theme } from '../theme'

type Props = {
    placeholder?: string
    onChange?: (text: string) => void
    value?: string 
    style?: any
}

type AdditionalProps = Omit<TextInputProps, keyof Props>;

function StyledInput({ placeholder, onChange, value, style, ...restOfProps}: Props & AdditionalProps) {

    const inputStyles = [
        styles.input,
        style,
    ]

    return (
        <TextInput value={value} onChangeText={onChange} placeholder={placeholder} style={inputStyles}  {...restOfProps}></TextInput>
    )
}

const styles = StyleSheet.create({
    input: {
        borderColor: theme.colors.secondary,
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        fontFamily: theme.fontWeights.semibold
    }
})



export default StyledInput