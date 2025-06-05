import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const OcorrenciasScreen = () => {
    // Exemplo de dados estáticos para teste, depois você conecta à API
    const ocorrencias = [
        { id: '1', descricao: 'Enchente na rua A', status: 'ABERTA' },
        { id: '2', descricao: 'Queda de árvore', status: 'EM ATENDIMENTO' },
        { id: '3', descricao: 'Deslizamento de terra', status: 'RESOLVIDA' },
    ];

    const renderItem = ({ item }: { item: typeof ocorrencias[0] }) => (
        <View style={styles.ocorrenciaItem}>
            <Text style={styles.descricao}>{item.descricao}</Text>
            <Text>Status: {item.status}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Suas Ocorrências</Text>
            <FlatList
                data={ocorrencias}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#eef6fd',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    ocorrenciaItem: {
        padding: 15,
        backgroundColor: '#fff',
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
    },
});

export default OcorrenciasScreen;
