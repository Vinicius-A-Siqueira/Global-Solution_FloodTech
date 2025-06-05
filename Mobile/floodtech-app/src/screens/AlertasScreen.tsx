import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const AlertasScreen = () => {
    // Exemplo de dados estáticos para teste, depois você conecta à API
    const alertas = [
        { id: '1', mensagem: 'Alerta de enchente - nível ALTO', nivel_alerta: 'ALTO' },
        { id: '2', mensagem: 'Alerta de risco de deslizamento - nível MÉDIO', nivel_alerta: 'MÉDIO' },
        { id: '3', mensagem: 'Alerta de inundação local - nível BAIXO', nivel_alerta: 'BAIXO' },
    ];

    const renderItem = ({ item }: { item: typeof alertas[0] }) => (
        <View style={styles.alertaItem}>
            <Text style={styles.mensagem}>{item.mensagem}</Text>
            <Text>Nível: {item.nivel_alerta}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alertas</Text>
            <FlatList
                data={alertas}
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
        backgroundColor: '#fff5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#b00020',
    },
    alertaItem: {
        padding: 15,
        backgroundColor: '#ffe6e6',
        marginBottom: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#b00020',
    },
    mensagem: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AlertasScreen;
