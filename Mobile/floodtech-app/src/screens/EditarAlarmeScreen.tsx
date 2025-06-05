import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function EditarAlarmeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Alarme</Text>
            <Text>Aqui você pode implementar a funcionalidade para editar o alarme.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
});
