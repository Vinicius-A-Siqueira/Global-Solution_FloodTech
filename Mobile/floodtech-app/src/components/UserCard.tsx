import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface UserCardProps {
    nome_completo: string;
    endereco: string;
    telefone_pessoal: string;
    telefone_emergencia: string;
}

const UserCard: React.FC<UserCardProps> = ({
    nome_completo,
    endereco,
    telefone_pessoal,
    telefone_emergencia,
}) => {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>{nome_completo}</Text>
            <Text>Endereço: {endereco}</Text>
            <Text>Telefone Pessoal: {telefone_pessoal}</Text>
            <Text>Telefone Emergência: {telefone_emergencia}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#e6f0ff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 6,
    },
});

export default UserCard;
