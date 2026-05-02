// src/screens/BioweaponDetail.tsx
import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Animated,
    Dimensions,
    Image
} from 'react-native';
import styles from './BioweaponDetailStyle';

const { width, height } = Dimensions.get('window');

export default function BioweaponDetail({ route, navigation }: any) {
    const { weapon } = route.params;
    
    // Animações específicas por tipo de bioarma
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const glitchAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animação de entrada
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 8,
                useNativeDriver: true
            })
        ]).start();

        // Animação de pulso para o ícone (específica para cada tipo)
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 1000,
                    useNativeDriver: true
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                })
            ])
        ).start();

        // Efeito de glitch para vírus (se for do tipo VIRUS)
        if (weapon.category === 'VIRUS') {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(glitchAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
                    Animated.timing(glitchAnim, { toValue: 0, duration: 2000, useNativeDriver: true })
                ])
            ).start();
        }
    }, []);

    const glitchTransform = glitchAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, -2, 0]
    });

    // Estilização dinâmica baseada no tipo de bioarma
    const getThemeColors = () => {
        switch(weapon.category) {
            case 'VIRUS':
                return {
                    primary: '#2ecc71',
                    secondary: '#27ae60',
                    background: 'rgba(46, 204, 113, 0.1)',
                    glow: '#2ecc71'
                };
            case 'PARASITE':
                return {
                    primary: '#f39c12',
                    secondary: '#e67e22',
                    background: 'rgba(243, 156, 18, 0.1)',
                    glow: '#f39c12'
                };
            case 'BOW':
                return {
                    primary: '#e74c3c',
                    secondary: '#c0392b',
                    background: 'rgba(231, 76, 60, 0.1)',
                    glow: '#e74c3c'
                };
            case 'FUNGUS':
                return {
                    primary: '#34495e',
                    secondary: '#2c3e50',
                    background: 'rgba(52, 73, 94, 0.1)',
                    glow: '#34495e'
                };
            default:
                return {
                    primary: '#8b0000',
                    secondary: '#5a0000',
                    background: 'rgba(139, 0, 0, 0.1)',
                    glow: '#ff0000'
                };
        }
    };

    const colors = getThemeColors();

    return (
        <View style={[styles.container, { backgroundColor: '#000000' }]}>
            {/* Fundo com gradiente dinâmico */}
            <View style={[styles.gradientBackground, { backgroundColor: colors.background }]} />
            
            {/* Efeito de estática */}
            <View style={styles.noiseOverlay} />

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header com animação de glitch (se for vírus) */}
                <Animated.View style={[
                    styles.header,
                    weapon.category === 'VIRUS' && { transform: [{ translateX: glitchTransform }] }
                ]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backText}>← BACK TO DATABASE</Text>
                    </TouchableOpacity>
                    
                    <Animated.View style={[styles.iconContainer, { 
                        borderColor: colors.primary,
                        shadowColor: colors.glow,
                        transform: [{ scale: pulseAnim }]
                    }]}>
                        <Text style={styles.iconText}>
                            {weapon.category === 'VIRUS' ? '🧬' :
                             weapon.category === 'PARASITE' ? '🦠' :
                             weapon.category === 'BOW' ? '🧟' : '🍄'}
                        </Text>
                    </Animated.View>

                    <Text style={[styles.name, { color: colors.primary, textShadowColor: colors.glow }]}>
                        {weapon.name}
                    </Text>
                    
                    <View style={styles.metaInfo}>
                        <View style={[styles.categoryBadge, { backgroundColor: colors.primary + '20', borderColor: colors.primary }]}>
                            <Text style={[styles.categoryText, { color: colors.primary }]}>{weapon.category}</Text>
                        </View>
                        <View style={[styles.threatBadge, { backgroundColor: colors.primary }]}>
                            <Text style={styles.threatText}>THREAT LEVEL {weapon.threatLevel}</Text>
                        </View>
                    </View>
                </Animated.View>

                {/* Descrição Principal */}
                <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.primary }]}>📋 CLASSIFICATION</Text>
                        <Text style={styles.sectionText}>{weapon.description}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.primary }]}>🔬 ORIGIN</Text>
                        <Text style={styles.sectionText}>{weapon.detailedLore.origin}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.primary }]}>⚠️ SYMPTOMS / EFFECTS</Text>
                        {weapon.detailedLore.symptoms.map((symptom: string, index: number) => (
                            <View key={index} style={styles.listItem}>
                                <Text style={[styles.bullet, { color: colors.primary }]}>►</Text>
                                <Text style={styles.listText}>{symptom}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.primary }]}>🧬 KNOWN HOSTS / VARIANTS</Text>
                        {weapon.detailedLore.knownHosts.map((host: string, index: number) => (
                            <View key={index} style={styles.listItem}>
                                <Text style={[styles.bullet, { color: colors.primary }]}>●</Text>
                                <Text style={styles.listText}>{host}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={[styles.section, styles.containmentSection]}>
                        <Text style={[styles.sectionTitle, { color: colors.primary }]}>🚨 CONTAINMENT STATUS</Text>
                        <Text style={[styles.containmentText, { 
                            color: weapon.detailedLore.containmentStatus.includes('ACTIVE') ? '#ff0000' : '#2ecc71',
                            borderColor: colors.primary
                        }]}>
                            {weapon.detailedLore.containmentStatus}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.primary }]}>💡 CLASSIFIED TRIVIA</Text>
                        {weapon.detailedLore.trivia.map((fact: string, index: number) => (
                            <View key={index} style={styles.triviaItem}>
                                <Text style={[styles.triviaNumber, { color: colors.primary }]}>#{index + 1}</Text>
                                <Text style={styles.triviaText}>{fact}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Primeiro Aparecimento */}
                    <View style={styles.firstAppearance}>
                        <Text style={styles.appearanceLabel}>FIRST APPEARANCE</Text>
                        <Text style={styles.appearanceText}>{weapon.firstAppearance}</Text>
                    </View>
                </Animated.View>
            </ScrollView>

            {/* Footer com aviso de segurança */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>🔒 DOCUMENT CLASSIFICATION: EYES ONLY</Text>
                <Text style={styles.footerSubtext}>UNAUTHORIZED ACCESS WILL BE PROSECUTED</Text>
            </View>
        </View>
    );
}
