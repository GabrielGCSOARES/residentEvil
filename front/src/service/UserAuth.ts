import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './Api';

interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() =>{
    const loadStoredUser = async () => {
      const token = await AsyncStorage.getItem('token');
      if(token) {
        try{
          const response = await api.get('/me');
          setUser(response.data.user);
          setIsAuthenticated(true);
        } catch(err) {
          await AsyncStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      }
    };

    loadStoredUser();
  }, []);

  const extractError = (err: any) => {
    if (err.response?.data?.errors) {
        return Object.values(err.response.data.errors).flat().join('\n');
    }

    return err.response?.data?.message || 'Erro inesperado';
};

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
        const resp = await api.post('/register', { name, email, password });

        if (resp.data.token) {
            await AsyncStorage.setItem('token', resp.data.token);
            setUser(resp.data.user);
            return true;
        }

        return false;
    } catch (err: any) {
        const errorMsg = extractError(err);
        setError(errorMsg);
        console.log("Register erro:", err.response?.data);
        return false;
    } finally {
        setLoading(false);
    }
};
  
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const resp = await api.post('/login', {
        email,
        password
      });
      
      if (resp.data.token) {
        await AsyncStorage.setItem('token', resp.data.token);
        setUser(resp.data.user);
        console.log("Login realizado:", resp.data.user);
        return true;
      }
      return false;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Erro ao fazer login";
      setError(errorMsg);
      console.log("Erro ao fazer login:", errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        await api.post('/logout');
      }
      await AsyncStorage.removeItem('token');
      setUser(null);
      console.log("Logout realizado");
    } catch (err) {
      console.log("Erro ao fazer logout:", err);
    }
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await api.put('/profile', data);
      if (response.data.user){
        setUser(response.data.user);
        return true;
      }
      return false;
    } catch(err) {
      console.log("erro ao atualizar perfil", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, register, login, logout };
}