import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';

import AcionarAlarmeScreen from '../screens/AcionarAlarmeScreen';
import AlertasScreen from '../screens/AlertasScreen';
import EditarAlarmeScreen from '../screens/EditarAlarmeScreen';
import HomeScreen from '../screens/HomeScreen';
import OcorrenciasScreen from '../screens/OcorrenciasScreen';
import PerfilScreen from '../screens/PerfilScreen';
import SobreScreen from '../screens/SobreScreen';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
    const { isLoggedIn, userType, loading } = useAuth();

    if (loading || !isLoggedIn || !userType) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#1e90ff" />
            </View>
        );
    }

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof MaterialIcons.glyphMap = "home";
                    
                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Perfil') {
                        iconName = 'person';
                    } else if (route.name === 'Ocorrencias') {
                        iconName = 'report-problem';
                    } else if (route.name === 'AcionarAlarme') {
                        iconName = 'notifications-active';
                    } else if (route.name === 'EditarAlarme') {
                        iconName = 'edit';
                    } else if (route.name === 'Alertas') {
                        iconName = 'warning';
                    } else if (route.name === 'Sobre') {
                        iconName = 'info';
                    }

                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#1e90ff',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Perfil" component={PerfilScreen} />
            {userType === 'cidadao' && (
                <Tab.Screen name="Ocorrencias" component={OcorrenciasScreen} />
            )}
            {userType === 'operador' && (
                <Tab.Screen name="AcionarAlarme" component={AcionarAlarmeScreen} />
            )}
            {userType === 'admin' && (
                <Tab.Screen name="EditarAlarme" component={EditarAlarmeScreen} />
            )}
            <Tab.Screen name="Alertas" component={AlertasScreen} />
            <Tab.Screen name="Sobre" component={SobreScreen} />
        </Tab.Navigator>
    );
}

