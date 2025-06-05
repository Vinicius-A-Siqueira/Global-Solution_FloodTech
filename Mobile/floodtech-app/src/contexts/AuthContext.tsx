import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type UserType = 'cidadao' | 'operador' | 'admin' | null;

type AuthContextData = {
    isLoggedIn: boolean;
    userType: UserType;
    login: (tipo: UserType) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextData>({
    isLoggedIn: false,
    userType: null,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState<UserType>(null);

    useEffect(() => {
        const loadUserData = async () => {
            const storedType = await AsyncStorage.getItem('@floodtech:userType');
            if (storedType) {
                setIsLoggedIn(true);
                setUserType(storedType as UserType);
            }
        };
        loadUserData();
    }, []);

    const login = async (tipo: UserType) => {
        setIsLoggedIn(true);
        setUserType(tipo);
        await AsyncStorage.setItem('@floodtech:userType', tipo ?? '');
    };

    const logout = async () => {
        setIsLoggedIn(false);
        setUserType(null);
        await AsyncStorage.removeItem('@floodtech:userType');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userType, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);