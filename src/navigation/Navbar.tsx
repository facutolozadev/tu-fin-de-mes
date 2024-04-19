
import React from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import useStatusBarHeight from '../hooks/useStatusBarHeight';
import StyledText from '../components/StyledText';

type Props = {
    backOption?: true;
    currentTitle?: string;
}



const Navbar = ({ backOption, currentTitle }: Props) => {
    const statusBarHeight = useStatusBarHeight()
    const navigation = useNavigation()
    return (
        <>
            <View style={[styles.container, { paddingTop: statusBarHeight + 25 }]}>
                {
                    !backOption ? (
                        <>
                            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                                <Ionicons name="menu-outline" size={24} color="white" />
                            </TouchableOpacity>

                            <View style={styles.space} />

                            <TouchableOpacity onPress={() => console.log('Icono de historial presionado')}>
                                <Ionicons name="time-outline" size={24} color="white" />
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name="arrow-back" size={24} color="white" />
                            </TouchableOpacity>

                            <StyledText semibold fontSize="big" color="negative">{currentTitle}</StyledText>

                            <View />
                        </>
                    )
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 24,
        backgroundColor: theme.colors.accent,
        borderBottomEndRadius: 30,
        borderBottomLeftRadius: 30
    },
    space: {
        width: 24,
    },
});

export default Navbar;