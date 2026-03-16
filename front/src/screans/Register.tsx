import React from 'react';
import { styles } from './RegisterStyle';
import { useState } from 'react'
import useAuth from '../service/UserAuth';
import { View, Text, TextInput, Button } from 'react-native';

export default function Register() {
  const {register} = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registrar = async () => {
    try {
      await register(name, email, password)
      console.log("Sucesso ao cadastrar")
    } catch (err) {
      console.log("Erro register",err);
      //alert(err.response?.data?.message || 'Erro ao registrar');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Criar conta</Text>

      <TextInput
        placeholder="name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Register" onPress={registrar} />
    </View>
  );
}