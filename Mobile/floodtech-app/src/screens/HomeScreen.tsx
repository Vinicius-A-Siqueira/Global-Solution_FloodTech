import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Bem-vindo à FloodTech</Text>
            <Text style={styles.subtitle}>Escolha uma opção:</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Perfil' as never)}
            >
                <Text style={styles.buttonText}>Meu Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Ocorrencias' as never)}
            >
                <Text style={styles.buttonText}>Ocorrências</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Alertas' as never)}
            >
                <Text style={styles.buttonText}>Alertas</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.logout]}
                onPress={() => navigation.navigate('Login' as never)}
            >
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eef6f9',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 30
    },
    button: {
        backgroundColor: '#007acc',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center'
    },
    logout: {
        backgroundColor: '#cc0000',
        marginTop: 30
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    }
});
