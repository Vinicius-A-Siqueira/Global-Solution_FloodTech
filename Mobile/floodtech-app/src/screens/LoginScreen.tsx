import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';

const LoginScreen = () => {
    const navigation = useNavigation();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://10.3.73.30:8080/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha }),
            });

            if (response.ok) {
                const data = await response.json();
                const userId = data.id_usuario;
                const userType = data.tipo_usuario; // 'admin' ou 'user'

                console.log("Login bem-sucedido. Tipo de usuário:", userType);
                await login(userId, userType);
                Alert.alert('Login realizado com sucesso!');
                navigation.navigate('Home' as never);
            } else {
                Alert.alert('Erro ao logar', 'Credenciais inválidas');
            }
        } catch (error) {
            Alert.alert('Erro de rede', 'Não foi possível conectar ao servidor');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.select({ ios: 'padding', android: undefined })}
        >
            <Text style={styles.title}>Bem-vindo de volta</Text>

            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                autoCapitalize="none"
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Cadastro' as never)}>
                <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
    input: { backgroundColor: '#f1f1f1', padding: 12, borderRadius: 8, marginBottom: 12 },
    button: {
        backgroundColor: '#1e90ff',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 12,
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    link: { color: '#1e90ff', textAlign: 'center' },
});