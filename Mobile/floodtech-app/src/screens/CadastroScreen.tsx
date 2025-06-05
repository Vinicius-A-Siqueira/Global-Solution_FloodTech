import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

const CadastroScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefonePessoal, setTelefonePessoal] = useState('');
    const [telefoneEmergencia, setTelefoneEmergencia] = useState('');

    const handleCadastro = async () => {
        try {
            // 1. Cadastrar usuário
            const usuarioRes = await fetch('http://SEU_BACKEND/api/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    senha,
                    tipo_usuario: 'cidadão'
                })
            });

            if (!usuarioRes.ok) {
                const err = await usuarioRes.text();
                throw new Error(`Erro ao criar usuário: ${err}`);
            }

            const usuario = await usuarioRes.json();
            const id_usuario = usuario.id_usuario;

            // 2. Cadastrar perfil vinculado ao usuário
            const perfilRes = await fetch('http://SEU_BACKEND/api/perfis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tbl_usuario_id_usuario: id_usuario,
                    nome_completo: nome,
                    endereco,
                    telefone_pessoal: telefonePessoal,
                    telefone_emergencia: telefoneEmergencia
                })
            });

            if (!perfilRes.ok) {
                const err = await perfilRes.text();
                throw new Error(`Erro ao criar perfil: ${err}`);
            }

            Alert.alert('Cadastro realizado com sucesso!');
            navigation.navigate('Login' as never);
        } catch (error: any) {
            console.error(error);
            Alert.alert('Erro ao cadastrar', error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Cadastro</Text>

            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Nome completo"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Endereço"
                value={endereco}
                onChangeText={setEndereco}
            />
            <TextInput
                style={styles.input}
                placeholder="Telefone pessoal"
                value={telefonePessoal}
                onChangeText={setTelefonePessoal}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Telefone de emergência"
                value={telefoneEmergencia}
                onChangeText={setTelefoneEmergencia}
                keyboardType="phone-pad"
            />

            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
                <Text style={styles.link}>Já tem conta? Faça login</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default CadastroScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center'
    },
    input: {
        backgroundColor: '#f1f1f1',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12
    },
    button: {
        backgroundColor: '#32CD32',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 12
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    link: {
        color: '#1e90ff',
        textAlign: 'center'
    }
});
