import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';

const PerfilScreen = () => {
    const { userType, logout, userId } = useAuth(); // userId para buscar perfil
    const navigation = useNavigation();

    // Estados para os campos do perfil
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefonePessoal, setTelefonePessoal] = useState('');
    const [telefoneEmergencia, setTelefoneEmergencia] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        // Função para buscar perfil pelo id do usuário
        const fetchPerfil = async () => {
            try {
                const res = await fetch(`http://10.3.73.30:8080/api/perfis/usuario/${userId}`);
                if (!res.ok) {
                    throw new Error('Erro ao buscar perfil');
                }
                const perfil = await res.json();
                setNome(perfil.nome_completo);
                setEmail(perfil.email); // se retornar email no perfil, ou use o do Auth
                setEndereco(perfil.endereco);
                setTelefonePessoal(perfil.telefone_pessoal);
                setTelefoneEmergencia(perfil.telefone_emergencia);
            } catch (error: any) {
                Alert.alert('Erro', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPerfil();
    }, [userId]);

    const handleLogout = async () => {
        await logout();
        Alert.alert('Você saiu da conta.');
        navigation.navigate('Login' as never);
    };

    const handleSalvar = async () => {
        setSaving(true);
        try {
            const res = await fetch('http://10.3.73.30:8080/api/perfis', {
                method: 'PUT', // supondo que atualizar é PUT, ajuste se necessário
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tbl_usuario_id_usuario: userId,
                    nome_completo: nome, // geralmente nome não muda, mas pode enviar
                    endereco,
                    telefone_pessoal: telefonePessoal,
                    telefone_emergencia: telefoneEmergencia,
                }),
            });

            if (!res.ok) {
                const err = await res.text();
                throw new Error(`Erro ao atualizar perfil: ${err}`);
            }

            Alert.alert('Sucesso', 'Perfil atualizado!');
        } catch (error: any) {
            Alert.alert('Erro', error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#32CD32" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Tipo de usuário: {userType}</Text>

            <Text style={styles.label}>Nome completo:</Text>
            <Text style={styles.text}>{nome}</Text>

            <Text style={styles.label}>E-mail:</Text>
            <Text style={styles.text}>{email}</Text>

            <Text style={styles.label}>Endereço:</Text>
            <TextInput
                style={styles.input}
                value={endereco}
                onChangeText={setEndereco}
                placeholder="Endereço"
            />

            <Text style={styles.label}>Telefone pessoal:</Text>
            <TextInput
                style={styles.input}
                value={telefonePessoal}
                onChangeText={setTelefonePessoal}
                keyboardType="phone-pad"
                placeholder="Telefone pessoal"
            />

            <Text style={styles.label}>Telefone de emergência:</Text>
            <TextInput
                style={styles.input}
                value={telefoneEmergencia}
                onChangeText={setTelefoneEmergencia}
                keyboardType="phone-pad"
                placeholder="Telefone de emergência"
            />

            <TouchableOpacity
                style={[styles.button, saving && { backgroundColor: '#a0a0a0' }]}
                onPress={handleSalvar}
                disabled={saving}
            >
                <Text style={styles.buttonText}>{saving ? 'Salvando...' : 'Salvar'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PerfilScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    label: { fontWeight: 'bold', marginTop: 12 },
    text: { fontSize: 16, marginBottom: 8 },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 10,
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#32CD32',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 12,
    },
    logoutButton: {
        backgroundColor: '#dc143c',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});
