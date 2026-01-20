import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import api from '../services/api';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: any) => Promise<void>; // TODO: tipar melhor depois
  signOut: () => void;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // ao carregar a tela, verifica se já tem token salvo
  useEffect(() => {
    const storagedToken = localStorage.getItem('@DeckDex:token');
    const storagedUser = localStorage.getItem('@DeckDex:user');

    if (storagedToken && storagedUser) {
      api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
      setUser(JSON.parse(storagedUser));
    }
  }, []);

  async function signIn(credentials: { identifier: string; password: string }) {
    // chama a rota de login do backend
    const response = await api.post('/auth/login', credentials);
    
    const { token, user } = response.data;

    // salva no LocalStorage e no State
    localStorage.setItem('@DeckDex:token', token);
    localStorage.setItem('@DeckDex:user', JSON.stringify(user));
    
    // atualiza o axios para as próximas chamadas
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    setUser(user);
  }

  function signOut() {
    localStorage.removeItem('@DeckDex:token');
    localStorage.removeItem('@DeckDex:user');
    setUser(null);
  }

  async function deleteAccount() {
    try {
      await api.delete('/users/profile');
      signOut();
    } catch (error) {
      console.error("Erro ao deletar conta", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signOut, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}