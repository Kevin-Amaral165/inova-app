export interface LoginPayload {
  email: string;
  senha: string;
  remember: boolean;
}

export interface LoginResponse {
  status: number;
  message?: string;
  dados_usuario: {
    codigo_usuario: string;
    nome_usuario: string;
    nome_grupo: string;
  };
  token_de_acesso: string;
}