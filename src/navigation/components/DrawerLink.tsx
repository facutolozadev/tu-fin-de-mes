import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import StyledText from '../../components/StyledText'
import { StyleSheet, View } from 'react-native'
import { theme } from '../../theme'
import { DrawerActions, Link, useNavigation } from '@react-navigation/native'

type Props = {
    title: string
    icon: any
    route?: string
}

function DrawerLink({ title, icon, route = 'Home' }: Props) {

    const navigation = useNavigation()
    return (

        <Link to={`/${route}`} onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
            <View style={styles.drawerLink}>
                <Ionicons name={icon} size={20} color={theme.colors.negative} />
                <StyledText semibold color="negative">{title}</StyledText>
            </View>
        </Link>

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