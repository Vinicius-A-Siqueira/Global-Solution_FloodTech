import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useAuth } from '../hooks/useAuth';

import AcionarAlarmeScreen from '../screens/AcionarAlarmeScreen';
import EditarAlarmeScreen from '../screens/EditarAlarmeScreen';
import HomeScreen from '../screens/HomeScreen';
import OcorrenciasScreen from '../screens/OcorrenciasScreen';
import PerfilScreen from '../screens/PerfilScreen';
import SobreScreen from '../screens/SobreScreen';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
    const { isLoggedIn, userType, loading } = useAuth();

    if (loading || !isLoggedIn || !userType) {
        return null; // ou um <ActivityIndicator />
    }

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    return <MaterialIcons name="admin-panel-settings" size={24} color="black" />;
                },
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
            <Tab.Screen name="Sobre" component={SobreScreen} />
        </Tab.Navigator>
    );
}