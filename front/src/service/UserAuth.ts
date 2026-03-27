import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './Api';

interface User {
  id?: string;
  name?: string;
  email?: string;
}

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const resp = await api.post('/register', {
        name,
        email,
        password
      });
      
      if (resp.data.token) {
        await AsyncStorage.setItem('token', resp.data.token);
        setUser(resp.data.user);
        console.log("Usuário cadastrado:", resp.data.user);
        return true;
      }
      return false;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Erro ao registrar";
      setError(errorMsg);
      console.log("Erro ao registrar:", errorMsg);
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

  return { user, loading, error, register, login, logout };
}