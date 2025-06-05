// Tipo dos usuários do sistema
export type TipoUsuario = 'cidadão' | 'operador' | 'admin';

// Dados do usuário (tbl_usuario)
export interface Usuario {
    id_usuario: number;
    email: string;
    tipo_usuario: TipoUsuario;
}

// Dados do perfil (tbl_perfil)
export interface Perfil {
    id_perfil: number;
    tbl_usuario_id_usuario: number;
    nome_completo: string;
    endereco: string;
    telefone_pessoal: string;
    telefone_emergencia: string;
}

// Dados de localização (tbl_localizacao)
export interface Localizacao {
    id_localizacao: number;
    latitude: number;
    longitude: number;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
}

// Dados de alerta (tbl_alerta)
export interface Alerta {
    id_alerta: number;
    mensagem: string;
    data_emissao: string; // ISO date string
    nivel_alerta: 'BAIXO' | 'MÉDIO' | 'ALTO';
    tbl_usuario_id_usuario: number;
    tbl_localizacao_id_localizacao: number;
}

// Dados de ocorrência (tbl_ocorrencia)
export interface Ocorrencia {
    id_ocorrencia: number;
    descricao: string;
    data_hora: string; // ISO date string
    status: 'ABERTA' | 'EM ATENDIMENTO' | 'RESOLVIDA';
    tbl_usuario_id_usuario: number;
    tbl_localizacao_id_localizacao: number;
}

// Resposta da API no login (exemplo)
export interface LoginResponse {
    token: string;
    tipo_usuario: TipoUsuario;
}

// Props para navegação entre telas (exemplo com React Navigation)
export type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
    Home: undefined;
    Perfil: undefined;
    Ocorrencias: undefined;
    Sobre: undefined;
    AcionarAlarme: undefined;  // Para operador
    EditarAlarme: undefined;   // Para admin
};

