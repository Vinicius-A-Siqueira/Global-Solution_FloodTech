import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface OccurrenceCardProps {
    descricao: string;
    status: 'ABERTA' | 'EM ATENDIMENTO' | 'RESOLVIDA';
    data_hora?: string;
}

const OccurrenceCard: React.FC<OccurrenceCardProps> = ({ descricao, status, data_hora }) => {
    return (
        <View style={[styles.card, statusStyles[status]]}>
            <Text style={styles.descricao}>{descricao}</Text>
            {data_hora && <Text>Data: {data_hora}</Text>}
            <Text>Status: {status}</Text>
        </View>
    );
};

const statusStyles = {
    ABERTA: {
        borderLeftColor: '#FF4C4C',
        borderLeftWidth: 6,
    },
    'EM ATENDIMENTO': {
        borderLeftColor: '#FFA500',
        borderLeftWidth: 6,
    },
    RESOLVIDA: {
        borderLeftColor: '#32CD32',
        borderLeftWidth: 6,
    },
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    descricao: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
    },
});

export default OccurrenceCard;
