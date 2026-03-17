import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles, { colors } from './RegisterStyle'; // ← Importe as cores também
import useAuth from '../service/UserAuth';

export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registrar = async () => {
    try {
      await register(name, email, password);
      console.log("Sucesso ao cadastrar");
    } catch (err: any) {
      console.log("Erro register", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.scanline} />
      
      <View style={styles.formContainer}>
        <View style={styles.umbrellaIcon} />
        
        <Text style={styles.title}>Umbrella Corporation</Text>
        <Text style={[styles.title, { fontSize: 18, marginBottom: 30 }]}>
          Protocolo de Registro
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do Agente"
          placeholderTextColor={colors.placeholderGray} // ← Usando a constante
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Identificação"
          placeholderTextColor={colors.placeholderGray} // ← Usando a constante
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Código de Acesso"
          placeholderTextColor={colors.placeholderGray} // ← Usando a constante
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={registrar}>
          <Text style={styles.buttonText}>Iniciar Protocolo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}