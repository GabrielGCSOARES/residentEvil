import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import styles, { colors } from './RegisterStyle';
import useAuth from '../service/UserAuth';
import { Alert } from 'react-native';


export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const spinValue = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 4000, 
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const reverseSpin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg']
  });

  const registrar = async () =>{
    const sucesso = await register(name, email, password);

    if (sucesso){
      Alert.alert("Registro bem-sucedido", "Bem-vindo à Umbrella Corporation!");
    } else {
      Alert.alert("Erro no registro", "Verifique suas informações e tente novamente.");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.scanline} />
      
      <View style={styles.formContainer}>
        <Image 
          source={require('../../assets/UmbrellaCorporation.jpg')} 
          style={styles.umbrellaIcon} 
          resizeMode='contain'
        />
        
        <Text style={styles.title}>Umbrella Corporation</Text>
        <Text style={[styles.title, { fontSize: 18, marginBottom: 30 }]}>
          Protocolo de Registro
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do Agente"
          placeholderTextColor={colors.placeholderGray}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Identificação pessoal"
          placeholderTextColor={colors.placeholderGray}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Código de Acesso"
          placeholderTextColor={colors.placeholderGray}
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />

        {/* Container do botão com bordas animadas */}
        <View style={styles.buttonContainer}>
          {/* PRIMEIRA BORDA: Verde girando no sentido HORÁRIO */}
          <Animated.View 
            style={[
              styles.rotatingBorder,
              {
                transform: [{ rotate: spin }],
              }
            ]} 
          />
          
          {/* SEGUNDA BORDA: Vermelha girando no sentido ANTI-HORÁRIO */}
          <Animated.View 
            style={[
              styles.rotatingBorderReverse,
              {
                transform: [{ rotate: reverseSpin }],
              }
            ]} 
          />
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={registrar}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>INICIAR PROTOCOLO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}