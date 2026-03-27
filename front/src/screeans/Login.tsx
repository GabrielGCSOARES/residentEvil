import React, { useState } from 'react';
import { View, Text, TextInput, Button} from 'react-native';
import useAuth from '../service/UserAuth';
import styles from '../screeans/LoginStyles';

export default function LoginScreen({ navigation}:any) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await login(email, password);
            navigation.replace('Home');
        } catch (err) {
            //alert(err.response?.data?.message || "Erro ao fazer login");
        }
    };

    return (
        <View style={styles.container}>
            <Text style = {styles.title}>Login</Text>
            <TextInput placeholder = "Email" value = {email} onChangeText={setEmail} style={styles.input} />
            <TextInput placeholder = "Senha" secureTextEntry value = {password} onChangeText={setPassword} style={styles.input} />
            <Button title="Entrar" onPress={handleLogin} />
            <View style={{ marginTop: 10 }}/>
            <Button title='Registrar novo usuário' onPress={() => navigation.navigate('Register')} />
         </View>
    )
}