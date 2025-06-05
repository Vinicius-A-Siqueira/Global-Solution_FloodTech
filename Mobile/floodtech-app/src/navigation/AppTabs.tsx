import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

import AcionarAlarmeScreen from '../screens/AcionarAlarmeScreen';
import EditarAlarmeScreen from '../screens/EditarAlarmeScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import OcorrenciasScreen from '../screens/OcorrenciasScreen';
import PerfilScreen from '../screens/PerfilScreen';
import SobreScreen from '../screens/SobreScreen';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
    const { isLoggedIn, userType } = useAuth();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName = 'person-outline';

                    switch (route.name) {
                        case 'Login':
                            iconName = 'log-in-outline';
                            break;
                        case 'Perfil':
                            iconName = 'person-circle-outline';
                            break;
                        case 'Ocorrencias':
                            iconName = 'list-outline';
                            break;
                        case 'AcionarAlarme':
                            iconName = 'alarm-outline';
                            break;
                        case 'EditarAlarme':
                            iconName = 'create-outline';
                            break;
                        case 'Home':
                            iconName = 'home-outline';
                            break;
                        case 'Sobre':
                            iconName = 'information-circle-outline';
                            break;
                    }

                    return <MaterialIcons name="admin-panel-settings" size={24} color="black" />;
                },
            })}
        >
            {!isLoggedIn ? (
                <Tab.Screen name="Login" component={LoginScreen} />
            ) : (
                <>
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
                </>
            )}
        </Tab.Navigator>
    );
}