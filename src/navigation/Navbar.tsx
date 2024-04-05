
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { theme } from '../theme';
import { StatusBar } from 'expo-status-bar';

type Props = {}


const Navbar = () => {
    return (
      
            <View style={styles.container}>
                <TouchableOpacity onPress={() => console.log('Botón hamburguesa presionado')}>
                    <Ionicons name="menu-outline" size={24} color="white" />
                </TouchableOpacity>

                <View style={styles.space} />

                <TouchableOpacity onPress={() => console.log('Icono de historial presionado')}>
                    <Ionicons name="time-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: theme.colors.accent,
        borderBottomEndRadius: 30,
        borderBottomLeftRadius: 30
    },
    space: {
        width: 24,
    },
});

export default Navbar;