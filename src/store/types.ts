export interface User {
  codigo_usuario: string;
  nome_usuario: string;
  nome_grupo: string;
}

export interface UserState {
  user: User | null;
  token: string | null;
  rememberMe: boolean;

  setUser: (user: User, token: string, remember: boolean) => void;
  getUser: () => void;
  logout: () => void;
}