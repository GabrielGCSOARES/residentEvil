import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './Api';

export default function useAuth() {
    const [user, setUser] = useState(null);

    // função de registro
    const register = async(name:string, email:string, password:string)=>{
        try{
            const resp = await api.post('/register',{name,email,password}) //envia post
            await AsyncStorage.setItem('token',resp.data.token) //guardou o token]
            setUser(resp.data.user) //recupera os dados do usuário
        }catch(err){
            console.log("AINNNN SEXO ERRO", err, "User ", user)
        }
    }
    

    const login = async () => {};

    const logout = async () => {};

    return { user, register, login, logout };
}