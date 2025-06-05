import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const PerfilScreen = () => {
    const { userType, logout } = useAuth();
    const navigation = useNavigation();

    const handleLogout = async () => {
        await AsyncStorage.removeItem('@floodtech:userType');
        logout();
        Alert.alert('Você saiu da conta.');
        navigation.navigate('Login' as never);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Tipo de usuário: {userType}</Text>
            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PerfilScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 18, marginBottom: 20 },
    button: {
        backgroundColor: '#dc143c',
        padding: 12,
        borderRadius: 8,
    },
    buttonText: { color: 'white', fontWeight: 'bold' },
});
