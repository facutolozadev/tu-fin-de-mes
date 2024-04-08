import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import StyledText from '../../components/StyledText'
import { StyleSheet, View } from 'react-native'
import { theme } from '../../theme'
type Props = {
    title: string
    icon: any
}

function DrawerLink({ title, icon }: Props) {
    return (
        <View style={styles.drawerLink}>
            <Ionicons name={icon} size={20} color={theme.colors.negative} />
            <StyledText semibold color="negative">{title}</StyledText>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerLink: {
        width: '100%',
  
        flexDirection: 'row',
        gap: 8
    }
})

export default DrawerLink