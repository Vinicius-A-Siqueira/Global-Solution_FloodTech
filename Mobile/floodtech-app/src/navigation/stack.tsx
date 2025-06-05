import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AcionarAlarmeScreen from '../screens/AcionarAlarmeScreen';
import CadastroScreen from '../screens/CadastroScreen';
import EditarAlarmeScreen from '../screens/EditarAlarmeScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import OcorrenciasScreen from '../screens/OcorrenciasScreen';
import PerfilScreen from '../screens/PerfilScreen';
import SobreScreen from '../screens/SobreScreen';
import { RootStackParamList } from '../types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Perfil" component={PerfilScreen} />
            <Stack.Screen name="Ocorrencias" component={OcorrenciasScreen} />
            <Stack.Screen name="Sobre" component={SobreScreen} />
            <Stack.Screen name="AcionarAlarme" component={AcionarAlarmeScreen} />
            <Stack.Screen name="EditarAlarme" component={EditarAlarmeScreen} />
        </Stack.Navigator>
    );
}
