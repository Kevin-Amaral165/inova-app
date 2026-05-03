export interface User {
  codigo_usuario: string;
   nome_grupo: string;
  nome_usuario: string;
}

export interface UserState {
  rememberMe: boolean;
  token: string | null;
  user: User | null;

  getUser: () => void;
  logout: () => void;
  setUser: (user: User, token: string, remember: boolean) => void;
}