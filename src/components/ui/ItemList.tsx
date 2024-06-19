import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import StyledText from '../StyledText'
import { Expense, Income } from '../../utils/types'
import { theme } from '../../theme'

type Props = {
    item: Expense | Income,
}

function ItemList({ item }: Props) {
    return (
        <View style={[styles.listItem, styles.androidShadow]}>
            <StyledText>{item.concept}</StyledText>
            <StyledText semibold color="secondary" >
                {item.createdAt.toDate().toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                })}
            </StyledText>
            <StyledText semibold>${item.amount.toLocaleString()}</StyledText>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        height: 70,
        marginVertical: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.negative,
        paddingHorizontal: 24,
        paddingVertical: 25,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: .3,
        shadowRadius: 4
    },
    androidShadow: {
        elevation: 2
    }
})

export default ItemList