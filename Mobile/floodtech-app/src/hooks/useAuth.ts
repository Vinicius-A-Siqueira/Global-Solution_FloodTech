import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import * as api from '../services/apiService';

interface AuthContextData {
    token: string | null;
    tipoUsuario: 'cidadão' | 'operador' | 'admin' | null;
    loading: boolean;
    login: (email: string, senha: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [tipoUsuario, setTipoUsuario] = useState<'cidadão' | 'operador' | 'admin' | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Carregar token e tipoUsuario do AsyncStorage ao iniciar
        async function loadStorageData() {
            const storagedToken = await AsyncStorage.getItem('@FloodTech:token');
            const storagedTipo = await AsyncStorage.getItem('@FloodTech:tipoUsuario');

            if (storagedToken && storagedTipo) {
                setToken(storagedToken);
                setTipoUsuario(storagedTipo as any);
            }
            setLoading(false);
        }
        loadStorageData();
    }, []);

    async function login(email: string, senha: string) {
        setLoading(true);
        try {
            const data = await api.login(email, senha);
            setToken(data.token);
            setTipoUsuario(data.tipo_usuario as any);

            await AsyncStorage.setItem('@FloodTech:token', data.token);
            await AsyncStorage.setItem('@FloodTech:tipoUsuario', data.tipo_usuario);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    function logout() {
        setToken(null);
        setTipoUsuario(null);
        AsyncStorage.removeItem('@FloodTech:token');
        AsyncStorage.removeItem('@FloodTech:tipoUsuario');
    }

    return (
        <AuthContext.Provider value= {{ token, tipoUsuario, loading, login, logout }
}>
    { children }
    < /AuthContext.Provider>
  );
};

// Hook para usar o contexto em componentes
export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}
