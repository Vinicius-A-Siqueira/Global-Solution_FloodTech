// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import AppTabs from './src/navigation/AppTabs';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppTabs />
      </NavigationContainer>
    </AuthProvider>
  );
}
