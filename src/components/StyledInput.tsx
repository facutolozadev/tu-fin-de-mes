import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { theme } from '../theme'

type Props = {
    placeholder?: string
    onChange?: () => void
    value?: string | number
    style?: any
}

function StyledInput({ placeholder, onChange, value, style, ...restOfProps }: Props) {

    const inputStyles = [
        styles.input,
        style,
    ]

    return (
        <TextInput onChange={onChange} placeholder={placeholder} style={inputStyles} {...restOfProps}></TextInput>
    )
}

const styles = StyleSheet.create({
    input: {
        borderColor: theme.colors.secondary,
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        fontSize: theme.fontSizes.small,
        fontFamily: theme.fontWeights.semibold
    }
})



export default StyledInput