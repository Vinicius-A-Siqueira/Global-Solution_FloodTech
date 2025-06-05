import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface AlertCardProps {
    mensagem: string;
    nivel_alerta: 'BAIXO' | 'MÉDIO' | 'ALTO';
    data_emissao?: string;
}

const AlertCard: React.FC<AlertCardProps> = ({ mensagem, nivel_alerta, data_emissao }) => {
    return (
        <View style={[styles.card, levelStyles[nivel_alerta]]}>
            <Text style={styles.mensagem}>{mensagem}</Text>
            {data_emissao && <Text>Emitido em: {data_emissao}</Text>}
            <Text style={styles.level}>Nível: {nivel_alerta}</Text>
        </View>
    );
};

const levelStyles = {
    BAIXO: {
        backgroundColor: '#d4edda',
        borderColor: '#28a745',
    },
    MÉDIO: {
        backgroundColor: '#fff3cd',
        borderColor: '#ffc107',
    },
    ALTO: {
        backgroundColor: '#f8d7da',
        borderColor: '#dc3545',
    },
};

const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 12,
    },
    mensagem: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
    },
    level: {
        fontWeight: 'bold',
    },
});

export default AlertCard;
