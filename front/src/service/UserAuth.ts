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

  // CORREÇÃO: Tipagem correta do Promise<void>
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const resp = await api.post('/register', {
        name,
        email,
        password
      });
      
      if (resp.data.token) {
        await AsyncStorage.setItem('token', resp.data.token);
        setUser(resp.data.user || { name, email });
      }
    } catch (err) {
      console.log("Erro ao registrar:", err);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const resp = await api.post('/login', {
        email,
        password
      });
      
      if (resp.data.token) {
        await AsyncStorage.setItem('token', resp.data.token);
        setUser(resp.data.user || { email });
      }
    } catch (err) {
      console.log("Erro ao fazer login:", err);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('token');
      setUser(null);
    } catch (err) {
      console.log("Erro ao fazer logout:", err);
    }
  };

  return { user, register, login, logout };
}