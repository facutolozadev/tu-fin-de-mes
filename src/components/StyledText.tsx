import React from 'react'
import { StyleSheet, Text, ViewStyle } from 'react-native'
import { theme } from '../theme';

type Props = {
    children?: React.ReactNode
    semibold?: boolean;
    bold?: boolean;
    fontSize?: number | string;
    style?: any
    color?: string
}

function StyledText({ children, color, fontSize, style, bold, semibold,  ...restOfProps }: Props) {
    const textStyles = [
        styles.text,
        color === "primary" && styles.colorPrimary,
        color === "secondary" && styles.colorSecondary,
        color === "negative" && styles.colorNegative,
        color === "accent" && styles.colorAccent,
        fontSize === "small" && styles.small,
        fontSize === "big" && styles.big,
        fontSize === "bigger" && styles.bigger,
        bold && styles.bold,
        semibold && styles.semibold,
        style
    ]

    return (
        <Text style={textStyles} {...restOfProps}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: theme.fontWeights.regular,
        fontSize: theme.fontSizes.normal
    },
    bold: {
        fontFamily: theme.fontWeights.bold
    },
    semibold: {
        fontFamily: theme.fontWeights.semibold
    },
    small: {
        fontSize: theme.fontSizes.small
    },
    big: {
        fontSize: theme.fontSizes.big
    },
    bigger: {
        fontSize: theme.fontSizes.bigger
    },
    colorPrimary: {
        color: theme.colors.primary
    },
    colorSecondary: {
        color: theme.colors.secondary
    },
    colorNegative: {
        color: theme.colors.negative
    },
    colorAccent: {
        color: theme.colors.accent
    }


})


export default StyledText