import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import StyledText from './StyledText';
import { theme } from '../theme';

type Props = {
    onPress?: () => void
    style?: any
}

function AddButton({ onPress, style }: Props) {
    return (
        <TouchableOpacity style={[styles.button, {...style}]} onPress={onPress}>
            <StyledText fontSize="big" semibold color="negative" style={{marginBottom: 4}}>+</StyledText>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: theme.colors.accent,
        alignItems: 'center',
        justifyContent: 'center'
    },

})

export default AddButton