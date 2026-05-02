import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    Animated,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import styles, { DIAGONAL_WIDTH } from './HomeStyle';


type StatusType = 'ALIVE' | 'DEATH' | 'UNKNOWN' | 'INFECTED';

interface Character {
    id: string;
    firstName: string;
    lastName: string;
    game: string;
    accent: string;        
    accentLight: string;   
    about: string;
    role: string;
    status: StatusType;
    image: ReturnType<typeof require>;
}

type NavTab = {
    label: string;
    route:'GameSummaries' | 'FullLore' | null;
};

const PH = { uri: 'https://placehold.co/300x600/transparent/transparent/png' };

const CHARACTERS: Character[] = [
    {
        id: 'leon',
        firstName: 'LEON S.',
        lastName: 'KENNEDY',
        game: 'RE 2 / RE 4',
        accent: '#1a3a5c',
        accentLight: '#2a6496',
        about: 'Agente federal e sobrevivente de Raccoon City. Escapou do colapso em 1998 e resgatou a filha do presidente na Espanha contra Las Plagas.',
        role: 'U.S. GOVERNMENT AGENT / D.S.O',
        status: 'ALIVE',
        image: require('../assets/characters/LeonSKeneddy.png'),
    },
    {
        id: 'jill',
        firstName: 'JILL',
        lastName: 'VALENTINE',
        game: 'RE 1 / RE 3 / RE 5',
        accent: '#2c1654',
        accentLight: '#6a3fa0',
        about: 'Membro fundadora dos S.T.A.R.S. Sobreviveu à mansão Spencer, foi caçada pelo Nemesis e quase perdeu a si mesma para Wesker.',
        role: 'S.T.A.R.S. ALPHA / BSAA / D.S.O',
        status: 'ALIVE',
        image: require('../assets/characters/JillValentine.png'),
    },
    {
        id: 'wesker',
        firstName: 'ALBERT',
        lastName: 'WESKER',
        game: 'RE 1 / RE 5',
        accent: '#0d0d0d',
        accentLight: '#4a4a4a',
        about: 'Ex-capitão dos S.T.A.R.S. e agente duplo da Umbrella. Infectado com Progenitor, planejou reescrever a evolução humana antes de ser destruído por Chris.',
        role: 'UMBRELLA AGENT',
        status: 'DEATH',
        image: require('../assets/characters/wesker.png'),
    },
    {
        id: 'claire',
        firstName: 'CLAIRE',
        lastName: 'REDFIELD',
        game: 'RE 2 / RE CV',
        accent: '#7c1414',
        accentLight: '#c0392b',
        about: 'Irmã de Chris Redfield. Sobreviveu ao colapso de Raccoon City, protegeu Sherry Birkin e enfrentou as criações de William Birkin.',
        role: 'TERRA SAVE / CIVILIAN / D.S.O',
        status: 'ALIVE',
        image: require('../assets/characters/Claire.png'),
    },
    {
        id: 'chris',
        firstName: 'CHRIS',
        lastName: 'REDFIELD',
        game: 'RE 1 / RE CV /  RE 5 / RE 7/ RE 8',
        accent: '#1e3a14',
        accentLight: '#3d7a28',
        about: 'Veterano dos S.T.A.R.S. e agente da BSAA. Destruiu Wesker, investigou a Fazenda Baker e enfrentou Mãe Miranda para salvar Rose Winters.',
        role: 'S.T.A.R.S. ALPHA / BSAA / D.S.O / WOLFES',
        status: 'ALIVE',
        image: require('../assets/characters/ChrisRedfield.png'),
    },
];

const STATUS_COLORS: Record<StatusType, string> = {
    ALIVE: '#27ae60',
    DEATH: '#e74c3c',
    UNKNOWN: '#f39c12',
    INFECTED: '#8e44ad',
};


const NAV_TABS: NavTab[] = [
    { label: 'Infos Games', route: 'GameSummaries' as const },
    { label: 'Character', route: null },
    { label: 'Full history', route: 'FullLore' as const },
];

export default function HomeScreen({ navigation }: any) {
    const [charIndex, setCharIndex] = useState(0);
    const [activeTab, setActiveTab] = useState(1); 

    const fadeAnim   = useRef(new Animated.Value(1)).current;
    const slideAnim  = useRef(new Animated.Value(0)).current;
    const charXAnim  = useRef(new Animated.Value(0)).current;
    const floatAnim  = useRef(new Animated.Value(0)).current;

    const character = CHARACTERS[charIndex];
    const total = CHARACTERS.length;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, { toValue: -9,  duration: 2800, useNativeDriver: true }),
                Animated.timing(floatAnim, { toValue: 0,   duration: 2800, useNativeDriver: true }),
            ])
        ).start();
    },[floatAnim]);

   useEffect

    useEffect(() => {
        const t = setInterval(() => goTo((charIndex + 1) % total), 4500);
        return () => clearInterval(t);
    }, [charIndex, total]);

    const goTo = useCallback((index: number) => {
        // Saída
        Animated.parallel([
            Animated.timing(fadeAnim,  { toValue: 0,  duration: 160, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 12, duration: 160, useNativeDriver: true }),
            Animated.timing(charXAnim, { toValue: 48, duration: 180, useNativeDriver: true }),
        ]).start(() => {
            setCharIndex(index);
            slideAnim.setValue(-12);
            charXAnim.setValue(-48);
            // Entrada
            Animated.parallel([
                Animated.timing(fadeAnim,  { toValue: 1, duration: 300, useNativeDriver: true }),
                Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
                Animated.timing(charXAnim, { toValue: 0, duration: 320, useNativeDriver: true }),
            ]).start();
        });
    }, [fadeAnim, slideAnim, charXAnim]);

    // seta para a esquerda
    const goPrev = () => goTo((charIndex - 1 + total) % total);

    //seta para a direita
    const goNext = () => goTo((charIndex + 1) % total);

   function handleTab(tab: NavTab, index: number) {
        setActiveTab(index);
        if (tab.route) {
            navigation.navigate(tab.route);
        }
    }

    const getSemiTransparent = (color: string, opacity: number = 0.75) => {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    return (
        <View style={styles.root}>

            <Animated.View style={[styles.leftPanel, { backgroundColor: character.accent }]}>

                <Text style={[styles.watermarkGame, { color: getSemiTransparent(character.accentLight, 0.6) }]}>{character.game}</Text>

                <View style={[styles.gameBadge, { borderColor: character.accentLight }]}>
                    <Text style={[styles.gameBadgeText, { color: character.accentLight }]}>
                        {character.game.split('/')[0].trim()}
                    </Text>
                </View>

                <Animated.View
                    style={[
                        styles.charWrapper,
                        {
                            transform: [
                                { translateX: charXAnim },
                                { translateY: floatAnim },
                            ],
                        },
                    ]}
                >
                    <Image source={character.image} style={styles.charImage} /> 
                </Animated.View>

                 <TouchableOpacity
                    style={styles.arrowLeft}
                    onPress={goPrev}
                    activeOpacity={0.6}
                    hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
                >
                    <Text style={[styles.arrowText, { color: character.accentLight }]}>‹</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.arrowRight}
                    onPress={goNext}
                    activeOpacity={0.6}
                    hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
                >
                    <Text style={[styles.arrowText, { color: character.accentLight }]}>›</Text>
                </TouchableOpacity>
            </Animated.View>

            <View style={styles.diagonalOverlay} pointerEvents="none" />

            <View style={styles.rightPanel}>
                <View style={styles.topNav}>
                    {NAV_TABS.map((tab, i) => (
                        <TouchableOpacity
                            key={tab.label}
                            onPress={() => handleTab(tab, i)}
                            activeOpacity={0.7}
                        >
                            <Text
                                style={[
                                    styles.navItem,
                                    activeTab === i && styles.navItemActive,
                                ]}
                            >
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                        flex: 1,
                        justifyContent: 'center',
                    }}
                >
                    <Text style={styles.firstName}>{character.firstName}</Text>
                    <Text style={[styles.lastName, { color: character.accent }]}>
                        {character.lastName}
                    </Text>

                    <View style={[styles.divider, { backgroundColor: character.accentLight }]} />

                    <Text style={styles.roleText}>{character.role}</Text>

                    <View style={styles.statusRow}>
                        <View style={[styles.statusDot, { backgroundColor: STATUS_COLORS[character.status] }]} />
                        <Text style={[styles.statusText, { color: STATUS_COLORS[character.status] }]}>
                            {character.status}
                        </Text>
                    </View>

                    <Text style={styles.aboutLabel}>ABOUT</Text>
                    <Text style={styles.aboutText}>{character.about}</Text>

                    <TouchableOpacity
                        style={[styles.startBtn, { backgroundColor: character.accent }]}
                        activeOpacity={0.85}
                        onPress={() => navigation.navigate('GameSummaries')}
                    >
                        <Text style={styles.startBtnText}>▶  EXPLORE LORE</Text>
                    </TouchableOpacity>

                    <View style={styles.dotsRow}>
                        {CHARACTERS.map((_, i) => (
                            <TouchableOpacity
                                key={i}
                                style={styles.dotWrapper}
                                onPress={() => goTo(i)}
                                activeOpacity={0.7}
                            >
                                <View
                                    style={[
                                        styles.dot,
                                        i === charIndex && [
                                            styles.dotActive,
                                            { backgroundColor: character.accent },
                                        ],
                                    ]}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </Animated.View>
            </View>

            <View style={styles.franchiseFooter} pointerEvents="none">
                <Text style={styles.franchiseText}>RESIDENT EVIL</Text>
                <Text style={styles.franchiseSubText}>ARCHIVE HUB • SECURITY LEVEL OMEGA</Text>
            </View>
        </View>
    );
}