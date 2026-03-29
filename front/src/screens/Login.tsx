import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, Alert, ActivityIndicator } from 'react-native';
import useAuth from '../service/UserAuth';
import styles from '../screens/LoginStyles';
import LoadingScreen from '../screens/LoadingScreen';

const residentEvilCharacters = [
    { name: 'Leon S. Kennedy', quote: 'Claire is my love', color: '#3498db' },
    { name: 'Claire Redfield', quote: "I'm not going to let you die!", color: '#e74c3c' },
    { name: 'Wesker', quote: 'Seven minutes, seven minutes is all can spare to play with you', color: '#9b59b6' },
    { name: 'ADA WONG', quote: 'Sorry, but I work alone', color: '#e74c3c' },
];

export default function LoginScreen({ navigation }: any) {
    const { login } = useAuth();

    const [email, setEmail] = useState(''), [password, setPassword] = useState(''), [loading, setLoading] = useState(false), [currentCharacter, setCurrentCharacter] = useState(0), [displayTitle, setDisplayTitle] = useState('');

    const fadeAnim = useRef(new Animated.Value(0)).current, slideAnim = useRef(new Animated.Value(50)).current, titleScale = useRef(new Animated.Value(0.9)).current;
    const emailBorder = useRef(new Animated.Value(0)).current, passwordBorder = useRef(new Animated.Value(0)).current;

    const fullTitle = 'Resident Evil Login';

    useEffect(() => {
        const interval = setInterval(() => setCurrentCharacter(prev => (prev + 1) % residentEvilCharacters.length), 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: false }),
            Animated.spring(slideAnim, { toValue: 0, friction: 8, useNativeDriver: false }),
            Animated.spring(titleScale, { toValue: 1, friction: 6, useNativeDriver: false })
        ]).start();

        let i = 0;
        const typingInterval = setInterval(() => {
            if (i <= fullTitle.length) { setDisplayTitle(fullTitle.substring(0, i)); i++; }
            else clearInterval(typingInterval);
        }, 100);

        return () => clearInterval(typingInterval);
    }, []);

    const handleFocus = (animValue: any) => Animated.timing(animValue, { toValue: 1, duration: 300, useNativeDriver: false }).start();
    const handleBlur = (animValue: any) => Animated.timing(animValue, { toValue: 0, duration: 200, useNativeDriver: false }).start();

const handleLogin = async () => {
    if (!email || !password) {
        return Alert.alert('Acesso negado', 'Preencha todos os campos corretamente!');
    }

    setLoading(true);

    try {
        await login(email, password);

        navigation.replace('Home');

    } catch (err: any) {
        Alert.alert(
            'Falha no login',
            err.response?.data?.message || err.message || 'Credenciais inválidas. Tente novamente!',
            [{ text: 'OK', style: 'destructive' }]
        );
    } finally {
        setLoading(false);
    }
};
    const currentChar = residentEvilCharacters[currentCharacter];

    return (
        <>
            <Animated.View style={[styles.container, { opacity: fadeAnim, backgroundColor: '#0a0a0a' }]}>
                <View style={styles.backgroundOverlay} />
                <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
                    <View style={styles.header}>
                        <Animated.Text style={[styles.title, { transform: [{ scale: titleScale }], color: currentChar.color, textShadowColor: '#000' }]}>{displayTitle}</Animated.Text>
                        <Text style={styles.subtitle}>SURVIVAL IS NOT A CHOICE</Text>
                        <View style={styles.divider} />
                    </View>

                    <View style={styles.formContainer}>
                        <Animated.View style={{ borderColor: emailBorder.interpolate({ inputRange: [0, 1], outputRange: ['rgba(231, 76, 60, 0.3)', currentChar.color] }), borderWidth: emailBorder.interpolate({ inputRange: [0, 1], outputRange: [1, 2] }) }}>
                            <TextInput placeholder="AGENT IDENTIFICATION" placeholderTextColor="#7f8c8d" value={email} onChangeText={setEmail} onFocus={() => handleFocus(emailBorder)} onBlur={() => handleBlur(emailBorder)} style={styles.input} autoCapitalize="none" keyboardType="email-address" editable={!loading} />
                        </Animated.View>

                        <Animated.View style={{ borderColor: passwordBorder.interpolate({ inputRange: [0, 1], outputRange: ['rgba(231, 76, 60, 0.3)', currentChar.color] }), borderWidth: passwordBorder.interpolate({ inputRange: [0, 1], outputRange: [1, 2] }) }}>
                            <TextInput placeholder="ACCESS CODE" placeholderTextColor="#7f8c8d" secureTextEntry value={password} onChangeText={setPassword} onFocus={() => handleFocus(passwordBorder)} onBlur={() => handleBlur(passwordBorder)} style={styles.input} editable={!loading} />
                        </Animated.View>

                        <TouchableOpacity onPress={handleLogin} disabled={loading} style={styles.buttonContainer}>
                            <View style={styles.button}>{loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>INICIAR MISSÃO</Text>}</View>
                        </TouchableOpacity>

                        <View style={styles.characterBar}>
                            <Animated.View style={[styles.characterFill, { width: `${(currentCharacter + 1) * 20}%`, backgroundColor: currentChar.color }]} />
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.secondaryButton} disabled={loading}>
                        <Text style={styles.secondaryButtonText}>NOVO AGENTE • REGISTRAR</Text>
                    </TouchableOpacity>

                    <Text style={styles.warningText}>"{currentChar.quote}" — {currentChar.name}</Text>
                </Animated.View>
            </Animated.View>

            {loading && <LoadingScreen />}
        </>
    );
}