import { Picker } from '@react-native-picker/picker';
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
    const [tipoUsuario, setTipoUsuario] = useState('cidadao');

    const handleCadastro = async () => {
        try {
            // 1. Cadastrar usuário
            const usuarioRes = await fetch('http://10.100.0.102:8080/api/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    senha,
                    tipoUsuario
                })
            });

            if (!usuarioRes.ok) {
                const err = await usuarioRes.text();
                if (err.includes("E-mail já cadastrado")) {
                    Alert.alert("Erro", "Esse e-mail já está em uso. Tente outro.");
                } else {
                    throw new Error(`Erro ao criar usuário: ${err}`);
                }
                return;
}

            const usuario = await usuarioRes.json();
            const id_usuario = usuario.id;

            const perfilRes = await fetch('http://10.3.73.30:8080/api/perfis', {
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
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error);
                Alert.alert('Erro ao cadastrar', error.message);
            } else {
                Alert.alert('Erro inesperado');
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
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

            <Text style={styles.label}>Tipo de Usuário</Text>
            <Picker
                selectedValue={tipoUsuario}
                onValueChange={(itemValue) => setTipoUsuario(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Cidadão" value="cidadao" />
                <Picker.Item label="Operador" value="operador" />
                <Picker.Item label="Admin" value="admin" />
            </Picker>

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
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        marginTop: 12
    },
    picker: {
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        marginBottom: 12
    },
    button: {
    backgroundColor: '#32CD32',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 12,
    cursor: 'pointer' 
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

