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
        const fetchPerfil = async () => {
            try {
                const response = await fetch(`http://10.100.0.102:8080/api/perfis/usuario/${userId}`);
                if (!response.ok) throw new Error('Erro ao buscar perfil');

                const perfil = await response.json();
                setNome(perfil.nome_completo);
                setEndereco(perfil.endereco);
                setTelefonePessoal(perfil.telefone_pessoal);
                setTelefoneEmergencia(perfil.telefone_emergencia);
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar o perfil.');
            } finally {
                setLoading(false);
            }
        };

        fetchPerfil();
    }, []);


    const handleLogout = async () => {
        await logout();
        Alert.alert('Você saiu da conta.');
        navigation.navigate('Login' as never);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const response = await fetch(`http://10.100.0.102:8080/api/perfis/usuario/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome_completo: nome,
                    endereco,
                    telefone_pessoal: telefonePessoal,
                    telefone_emergencia: telefoneEmergencia,
                }),
            });

            if (!response.ok) throw new Error('Erro ao salvar perfil');
            Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        } catch (err) {
            Alert.alert('Erro', 'Falha ao salvar perfil');
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
                onPress={handleSave}
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
