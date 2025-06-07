import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

