import React from 'react'
import { StyleSheet, View } from 'react-native'
import StyledText from '../StyledText'
import { Expense, Income } from '../../utils/types'
import { theme } from '../../theme'

type Props = {
    item: Expense | Income,
    index: number
}

function ItemList({ item, index }: Props) {
    return (
        <View key={index} style={[styles.listItem, styles.androidShadow]}>
            <StyledText fontSize="small">{item.concept}</StyledText>
            <StyledText semibold color="secondary" fontSize="small">
                {item.createdAt.toDate().toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                })}
            </StyledText>
            <StyledText fontSize="small" semibold>${item.amount.toLocaleString()}</StyledText>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        marginVertical: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.negative,
        paddingHorizontal: 24,
        paddingVertical: 25,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 6,
            height: 6
        },
        shadowOpacity: .8,
        shadowRadius: 4
    },
    androidShadow: {
        elevation: 2
      }
})

export default ItemList