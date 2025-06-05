import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ReactNode } from 'react';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextData {
    isLoggedIn: boolean;
    userType: 'admin' | 'user' | null;
    userId: number | null;
    loading: boolean;
    login: (userId: number, userType: 'admin' | 'user') => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState<'admin' | 'user' | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const storedUserType = await AsyncStorage.getItem('userType');
            const storedUserId = await AsyncStorage.getItem('userId');
            if (storedUserType && storedUserId) {
                setUserType(storedUserType as 'admin' | 'user');
                setUserId(Number(storedUserId));
                setIsLoggedIn(true);
            }
            setLoading(false);
        }
        loadStorageData();
    }, []);

    const login = async (id: number, type: 'admin' | 'user') => {
        setUserId(id);
        setUserType(type);
        setIsLoggedIn(true);
        await AsyncStorage.setItem('userId', id.toString());
        await AsyncStorage.setItem('userType', type);
    };

    const logout = async () => {
        setUserId(null);
        setUserType(null);
        setIsLoggedIn(false);
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('userType');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userType, userId, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};