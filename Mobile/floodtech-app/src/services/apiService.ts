export const API_BASE = 'http://10.100.0.102:8080/api';

interface LoginResponse {
    token: string;
    tipo_usuario: string;
}

export async function login(email: string, senha: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
        throw new Error('Falha no login');
    }

    return response.json();
}

interface CadastroUsuarioData {
    email: string;
    senha: string;
    tipo_usuario: 'cidadão' | 'operador' | 'admin';
}

export async function cadastroUsuario(data: CadastroUsuarioData) {
    const response = await fetch(`${API_BASE}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro no cadastro');
    }

    return response.json();
}

export async function getPerfil(token: string) {
    const response = await fetch(`${API_BASE}/perfil`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar perfil');
    }

    return response.json();
}

export interface Alerta {
    id_alerta: number;
    mensagem: string;
    data_emissao: string;
    nivel_alerta: 'BAIXO' | 'MÉDIO' | 'ALTO';
}

export async function getAlertas(token: string): Promise<Alerta[]> {
    const response = await fetch(`${API_BASE}/alertas`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar alertas');
    }

    return response.json();
}

export interface Ocorrencia {
    id_ocorrencia: number;
    descricao: string;
    data_hora: string;
    status: 'ABERTA' | 'EM ATENDIMENTO' | 'RESOLVIDA';
}

export async function getOcorrencias(token: string): Promise<Ocorrencia[]> {
    const response = await fetch(`${API_BASE}/ocorrencias`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error('Erro ao buscar ocorrências');
    }

    return response.json();
}
