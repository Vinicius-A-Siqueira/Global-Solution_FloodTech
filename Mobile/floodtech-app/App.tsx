import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { useAuth } from './src/hooks/useAuth';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

function RootNavigator() {
  const { isLoggedIn } = useAuth();

  // Usa StackNavigator que já lida com Login, Cadastro e Tabs
  return <StackNavigator />;
}
