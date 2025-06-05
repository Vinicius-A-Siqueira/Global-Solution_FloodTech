import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HeaderTopProps {
    title: string;
    onLoginPress: () => void;
    isLoggedIn: boolean;
    onAccountPress?: () => void;
}

const HeaderTop: React.FC<HeaderTopProps> = ({ title, onLoginPress, isLoggedIn, onAccountPress }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            {isLoggedIn ? (
                <TouchableOpacity onPress={onAccountPress} style={styles.iconButton}>
                    <Ionicons name="person-circle-outline" size={28} color="#fff" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={onLoginPress} style={styles.iconButton}>
                    <Ionicons name="log-in-outline" size={28} color="#fff" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 56,
        backgroundColor: '#1E90FF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    iconButton: {
        padding: 5,
    },
});

export default HeaderTop;
