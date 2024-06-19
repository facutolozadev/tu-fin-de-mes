import React, { useEffect, useState } from 'react';
import { theme } from '../../theme';
import { Animated, StyleSheet, View } from 'react-native';

type Props = {}

function ItemSkeletonList({ }: Props) {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, []);

    return (
        <Animated.View style={[
            styles.listItem,
            {
                opacity: fadeAnim,
            },
        ]} />
    );
}

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        height: 70,
        marginVertical: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.mutedNegative,
        paddingHorizontal: 24,
        paddingVertical: 25,
        borderRadius: 20,
    }
});

export default ItemSkeletonList;