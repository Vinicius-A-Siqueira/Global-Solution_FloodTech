import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { TipoUsuario } from '../types/types';

const LoginScreen = () => {
    const navigation = useNavigation();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [senhaError, setSenhaError] = useState('');

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError('E-mail é obrigatório');
            return false;
        } else if (!emailRegex.test(email)) {
            setEmailError('E-mail inválido');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validateSenha = (senha: string) => {
        if (!senha) {
            setSenhaError('Senha é obrigatória');
            return false;
        } else if (senha.length < 6) {
            setSenhaError('Senha deve ter pelo menos 6 caracteres');
            return false;
        }
        setSenhaError('');
        return true;
    };

    const handleLogin = async () => {
        const isEmailValid = validateEmail(email);
        const isSenhaValid = validateSenha(senha);

        if (!isEmailValid || !isSenhaValid) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('http://10.100.0.102:8080/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha }),
            });

            if (response.ok) {
                const data = await response.json();

                if (!Array.isArray(data) || data.length === 0) {
                    Alert.alert('Erro inesperado', 'Nenhum dado de usuário retornado pela API');
                    console.error('Resposta da API:', data);
                    return;
                }

                const user = data[0];

                const userId = user.id;
                let userType = user.tipoUsuario.toLowerCase() as TipoUsuario;

                if (!['cidadão', 'operador', 'admin'].includes(userType)) {
                    userType = 'cidadao';
                    console.warn('Tipo de usuário inválido recebido da API:', user.tipoUsuario);
                }


                console.log("Login bem-sucedido. Tipo de usuário:", userType);
                await login(userId, userType);
                Alert.alert('Login realizado com sucesso!');
                navigation.navigate('Home' as never);
            } else {
                Alert.alert('Erro ao logar', 'Credenciais inválidas');
            }

        } catch (error) {
            console.error('Erro de login:', error);
            Alert.alert('Erro de rede', 'Não foi possível conectar ao servidor');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.select({ ios: 'padding', android: undefined })}
        >
            <Text style={styles.title}>Bem-vindo de volta</Text>

            <TextInput
                style={[styles.input, emailError ? styles.inputError : null]}
                placeholder="E-mail"
                value={email}
                autoCapitalize="none"
                onChangeText={(text) => {
                    setEmail(text);
                    validateEmail(text);
                }}
                keyboardType="email-address"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <TextInput
                style={[styles.input, senhaError ? styles.inputError : null]}
                placeholder="Senha"
                secureTextEntry
                value={senha}
                onChangeText={(text) => {
                    setSenha(text);
                    validateSenha(text);
                }}
            />
            {senhaError ? <Text style={styles.errorText}>{senhaError}</Text> : null}

            <TouchableOpacity 
                style={[styles.button, isLoading ? styles.buttonDisabled : null]} 
                onPress={handleLogin}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Entrar</Text>
                )}
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
    input: { backgroundColor: '#f1f1f1', padding: 12, borderRadius: 8, marginBottom: 4 },
    inputError: { borderColor: 'red', borderWidth: 1 },
    errorText: { color: 'red', marginBottom: 12, fontSize: 12 },
    button: {
        backgroundColor: '#1e90ff',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 12,
    },
    buttonDisabled: {
        backgroundColor: '#cccccc',
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    link: { color: '#1e90ff', textAlign: 'center' },
});

