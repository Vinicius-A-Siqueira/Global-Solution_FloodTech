import React from 'react';
import { Image, ScrollView, StyleSheet, Text } from 'react-native';

const SobreScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Sobre o Problema das Enchentes Urbanas</Text>
            <Image
                source={require('../assets/enchente.jpg')}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.text}>
                As enchentes urbanas são um problema crescente em muitas cidades brasileiras, causadas por chuvas intensas,
                má drenagem, ocupação irregular do solo e falta de infraestrutura adequada. Elas provocam danos materiais,
                transtornos à população, riscos à saúde e à vida, além de impactos econômicos significativos.
            </Text>
            <Text style={styles.text}>
                Este aplicativo tem como objetivo fornecer uma plataforma para monitoramento, notificação e gestão de ocorrências
                relacionadas a eventos extremos, especialmente enchentes, para auxiliar cidadãos, operadores e administradores
                na prevenção e resposta rápida.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f0f8ff',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#007acc',
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 15,
        color: '#333',
        textAlign: 'justify',
    },
});

export default SobreScreen;
