import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    ScrollView,
    Alert,
    ActivityIndicator
} from 'react-native';
import styles from './HomeStyle';

interface Survivor {
    id: string;
    name: string;
    status: 'ALIVE' | 'MISSING' | 'INFECTED' | 'DECEASED';
    lastSeen: string;
    message: string;
    avatarColor: string;
}

interface Mission {
    id: string;
    title: string;
    description: string;
    reward: string;
    danger: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    location: string;
}

interface UmbrellaFile {
    id: string;
    codeName: string;
    subject: string;
    clearance: 'CLASSIFIED' | 'TOP SECRET' | 'EYES ONLY';
    date: string;
}

export default function HomeScreen({ navigation }: any) {
    const [selectedTab, setSelectedTab] = useState<'missions' | 'survivors' | 'files' | 'map'>('missions');
    const [terminalLines, setTerminalLines] = useState<string[]>([
        '> R.P.D. EMERGENCY TERMINAL v.1.3.7',
        '> SYSTEM BOOT SEQUENCE COMPLETE',
        '> WELCOME BACK, SURVIVOR',
        '> LAST KNOWN SAFE ZONE: MAIN HALL',
        '> LOADING DATABASES...',
    ]);
    const [scanlinePosition] = useState(new Animated.Value(0));
    const [glitchIntensity] = useState(new Animated.Value(0));
    const [activeThreat, setActiveThreat] = useState({
        message: "Multiple zombies detected near East Wing. Avoid if possible.",
        sender: "Officer Johnson",
        timestamp: "2 MINUTES AGO",
        severity: "HIGH"
    });

    const [survivors] = useState<Survivor[]>([
        {
            id: '1',
            name: 'Leon S. Kennedy',
            status: 'ALIVE',
            lastSeen: 'R.P.D. Main Hall - 45min ago',
            message: 'I\'m heading to the underground lab. Umbrella must pay for this.',
            avatarColor: '#3498db'
        },
        {
            id: '2',
            name: 'Claire Redfield',
            status: 'ALIVE',
            lastSeen: 'Orphanage - 2h ago',
            message: 'Found some survivors. Need extraction point ASAP!',
            avatarColor: '#e74c3c'
        },
        {
            id: '3',
            name: 'Jill Valentine',
            status: 'MISSING',
            lastSeen: 'Mansion - 6h ago',
            message: 'Last transmission: "I found something... oh god, it\'s Wesker!"',
            avatarColor: '#2ecc71'
        },
        {
            id: '4',
            name: 'Albert Wesker',
            status: 'INFECTED',
            lastSeen: 'Underground Lab - Unknown',
            message: '[TRANSMISSION CORRUPTED] - Betrayal detected',
            avatarColor: '#9b59b6'
        }
    ]);

    const [missions] = useState<Mission[]>([
        {
            id: '1',
            title: '🔍 GATHER INTEL',
            description: 'Search the Chief\'s office for Umbrella classified documents',
            reward: 'Weapon Upgrade + 500 EXP',
            danger: 'MEDIUM',
            location: 'R.P.D. 2nd Floor'
        },
        {
            id: '2',
            title: '💊 FIND ANTIDOTE',
            description: 'Locate the T-Virus vaccine in the hospital basement',
            reward: 'Immunity Boost + 1000 EXP',
            danger: 'CRITICAL',
            location: 'Raccoon Hospital'
        },
        {
            id: '3',
            title: '📻 ACTIVATE RADIO TOWER',
            description: 'Restore communications to call for military backup',
            reward: 'Unlock Fast Travel + 750 EXP',
            danger: 'HIGH',
            location: 'Clock Tower'
        },
        {
            id: '4',
            title: '🚪 ESCAPE ROUTE',
            description: 'Secure the sewer passage to the evacuation point',
            reward: 'Safe Passage + 300 EXP',
            danger: 'LOW',
            location: 'Sewer System'
        }
    ]);

    const [umbrellaFiles] = useState<UmbrellaFile[]>([
        {
            id: '1',
            codeName: 'NEMESIS',
            subject: 'Pursuer Project',
            clearance: 'EYES ONLY',
            date: '1998-09-28'
        },
        {
            id: '2',
            codeName: 'G-VIRUS',
            subject: 'William Birkin\'s Legacy',
            clearance: 'TOP SECRET',
            date: '1998-09-20'
        },
        {
            id: '3',
            codeName: 'RED QUEEN',
            subject: 'A.I. Containment System',
            clearance: 'CLASSIFIED',
            date: '1998-05-15'
        }
    ]);

    useEffect(() => {
        Animated.loop(
            Animated.timing(scanlinePosition, {
                toValue: 1,
                duration: 4000,
                useNativeDriver: true
            })
        ).start();

        const glitchInterval = setInterval(() => {
            Animated.sequence([
                Animated.timing(glitchIntensity, { toValue: 1, duration: 50, useNativeDriver: true }),
                Animated.timing(glitchIntensity, { toValue: 0, duration: 200, useNativeDriver: true })
            ]).start();
        }, 5000);

        const messageInterval = setInterval(() => {
            const emergencyMessages = [
                '> ⚠️ WARNING: Unknown creature detected in sewers ⚠️',
                '> 📡 Signal lost with Alpha Team... requesting backup',
                '> 🧪 Umbrella lab breach confirmed. G-Virus containment failed',
                '> 💀 Survivor count: 23 remaining in Raccoon City',
                '> 🔫 Ammo shortage reported in safe zone'
            ];
            const randomMsg = emergencyMessages[Math.floor(Math.random() * emergencyMessages.length)];
            setTerminalLines(prev => [...prev.slice(-4), randomMsg]);
        }, 8000);

        return () => {
            clearInterval(glitchInterval);
            clearInterval(messageInterval);
        };
    }, []);

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'ALIVE': return '#2ecc71';
            case 'MISSING': return '#f39c12';
            case 'INFECTED': return '#e74c3c';
            case 'DECEASED': return '#7f8c8d';
            default: return '#95a5a6';
        }
    };

    const getDangerColor = (danger: string) => {
        switch(danger) {
            case 'LOW': return '#2ecc71';
            case 'MEDIUM': return '#f39c12';
            case 'HIGH': return '#e67e22';
            case 'CRITICAL': return '#e74c3c';
            default: return '#95a5a6';
        }
    };

    const renderMissions = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>📋 ACTIVE MISSIONS</Text>
            <Text style={styles.sectionSubtitle}>Priority objectives for survival</Text>
            {missions.map((mission) => (
                <TouchableOpacity key={mission.id} style={styles.missionCard} onPress={() => {
                    Alert.alert(
                        `MISSION: ${mission.title}`,
                        `${mission.description}\n\n📍 Location: ${mission.location}\n🎁 Reward: ${mission.reward}\n⚠️ Danger Level: ${mission.danger}`,
                        [{ text: 'ACCEPT MISSION', style: 'default' }, { text: 'CANCEL', style: 'cancel' }]
                    );
                }}>
                    <View style={styles.missionHeader}>
                        <Text style={styles.missionTitle}>{mission.title}</Text>
                        <Text style={[styles.dangerBadge, { backgroundColor: getDangerColor(mission.danger) }]}>
                            {mission.danger}
                        </Text>
                    </View>
                    <Text style={styles.missionDescription}>{mission.description}</Text>
                    <View style={styles.missionFooter}>
                        <Text style={styles.missionLocation}>📍 {mission.location}</Text>
                        <Text style={styles.missionReward}>🎁 {mission.reward}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );

    const renderSurvivors = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>👥 SURVIVOR NETWORK</Text>
            <Text style={styles.sectionSubtitle}>Last known transmissions</Text>
            {survivors.map((survivor) => (
                <View key={survivor.id} style={styles.survivorCard}>
                    <View style={styles.survivorHeader}>
                        <View style={[styles.statusDot, { backgroundColor: getStatusColor(survivor.status) }]} />
                        <Text style={styles.survivorName}>{survivor.name}</Text>
                        <Text style={[styles.survivorStatus, { color: getStatusColor(survivor.status) }]}>
                            [{survivor.status}]
                        </Text>
                    </View>
                    <Text style={styles.survivorMessage}>"{survivor.message}"</Text>
                    <Text style={styles.survivorMeta}>🕒 Last seen: {survivor.lastSeen}</Text>
                    <TouchableOpacity style={styles.commButton}>
                        <Text style={styles.commButtonText}>📡 SEND TRANSMISSION</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );

    const renderUmbrellaFiles = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>🏢 UMBRELLA CORP. ARCHIVES</Text>
            <Text style={styles.sectionSubtitle}>Classified documents - Clearance Level: OMEGA</Text>
            {umbrellaFiles.map((file) => (
                <TouchableOpacity key={file.id} style={styles.fileCard} onPress={() => {
                    Alert.alert(
                        `🔒 FILE: ${file.codeName}`,
                        `Subject: ${file.subject}\nClearance: ${file.clearance}\nDate: ${file.date}\n\n[CONTENT REDACTED - HIGHER CLEARANCE REQUIRED]`,
                        [{ text: 'REQUEST ACCESS', style: 'default' }, { text: 'CLOSE', style: 'cancel' }]
                    );
                }}>
                    <View style={styles.fileHeader}>
                        <Text style={styles.fileCode}>#{file.codeName}</Text>
                        <Text style={[styles.clearanceBadge, 
                            file.clearance === 'EYES ONLY' ? styles.eyesOnly : 
                            file.clearance === 'TOP SECRET' ? styles.topSecret : styles.classified
                        ]}>
                            {file.clearance}
                        </Text>
                    </View>
                    <Text style={styles.fileSubject}>{file.subject}</Text>
                    <Text style={styles.fileDate}>📅 {file.date}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    const renderMap = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>🗺️ RACCOON CITY MAP</Text>
            <Text style={styles.sectionSubtitle}>Quarantine zone overlay - Real-time threats</Text>
            
            <View style={styles.mapContainer}>
                <View style={styles.mapGrid}>
                    {['R.P.D.', 'Hospital', 'Clock Tower', 'Sewers', 'Lab', 'Cemetery'].map((zone, index) => (
                        <TouchableOpacity key={index} style={styles.mapZone} onPress={() => {
                            Alert.alert(
                                `📍 ZONE: ${zone}`,
                                `Threat Level: ${['MEDIUM', 'HIGH', 'MEDIUM', 'LOW', 'CRITICAL', 'LOW'][index]}\nSurvivors: ${[3, 1, 2, 0, 0, 1][index]}\nSafe Zone: ${index === 0 ? 'YES' : 'NO'}`,
                                [{ text: 'ACKNOWLEDGED', style: 'default' }]
                            );
                        }}>
                            <Text style={styles.mapZoneName}>{zone}</Text>
                            <Text style={[styles.mapZoneThreat, 
                                { color: ['#f39c12', '#e74c3c', '#f39c12', '#2ecc71', '#e74c3c', '#2ecc71'][index] }
                            ]}>
                                {['⚠️', '🔴', '⚠️', '🟢', '🔴', '🟢'][index]}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={styles.mapLegend}>🟢 Safe | ⚠️ Caution | 🔴 Danger | 💀 Extreme</Text>
            </View>
        </View>
    );

    const scanlineTranslate = scanlinePosition.interpolate({
        inputRange: [0, 1],
        outputRange: [-1000, 1000]
    });

    return (
        <View style={styles.container}>
            <View style={styles.backgroundOverlay} />
            
            <Animated.View style={[styles.scanline, { transform: [{ translateY: scanlineTranslate }] }]} />
            
            <Animated.View style={[styles.glitchOverlay, { opacity: glitchIntensity }]} />

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.terminalHeader}>[R.P.D. EMERGENCY TERMINAL v.1.3.7]</Text>
                    <Text style={styles.quarantineWarning}>⚠️ QUARANTINE ZONE ACTIVE ⚠️</Text>
                </View>

                <View style={styles.systemStatus}>
                    <Text style={styles.systemText}>> SURVIVOR STATUS: CONNECTED</Text>
                    <Text style={styles.systemText}>> LAST LOGIN: 3 HOURS AGO</Text>
                    <Text style={styles.systemText}>> T-VIRUS DETECTION: NEGATIVE ✓</Text>
                </View>

                <View style={styles.comLink}>
                    <Text style={styles.comLinkTitle}>📡 COM LINK ACTIVE</Text>
                    <View style={styles.signalBar}>
                        <View style={[styles.signalFill, { width: '67%' }]} />
                    </View>
                    <Text style={styles.signalText}>SIGNAL STRENGTH: 67%</Text>
                </View>

                <View style={styles.terminalWindow}>
                    {terminalLines.map((line, index) => (
                        <Text key={index} style={styles.terminalLine}>{line}</Text>
                    ))}
                </View>

                <View style={styles.tabBar}>
                    {(['missions', 'survivors', 'files', 'map'] as const).map((tab) => (
                        <TouchableOpacity 
                            key={tab}
                            style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
                            onPress={() => setSelectedTab(tab)}
                        >
                            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
                                {tab === 'missions' && '📋 MISSIONS'}
                                {tab === 'survivors' && '👥 SURVIVORS'}
                                {tab === 'files' && '🏢 UMBRELLA FILES'}
                                {tab === 'map' && '🗺️ MAP'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {selectedTab === 'missions' && renderMissions()}
                {selectedTab === 'survivors' && renderSurvivors()}
                {selectedTab === 'files' && renderUmbrellaFiles()}
                {selectedTab === 'map' && renderMap()}

                <View style={styles.threatAlert}>
                    <Text style={styles.threatTitle}>🧟 ACTIVE THREAT ALERT 🧟</Text>
                    <Text style={styles.threatMessage}>"{activeThreat.message}"</Text>
                    <Text style={styles.threatMeta}>- {activeThreat.sender} • {activeThreat.timestamp}</Text>
                    <View style={[styles.severityBadge, 
                        activeThreat.severity === 'HIGH' && styles.highSeverity
                    ]}>
                        <Text style={styles.severityText}>SEVERITY: {activeThreat.severity}</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={styles.systemBar}>
                        <Text style={styles.footerText}> SYSTEM STATUS: [████████░░] 80%</Text>
                    </View>
                    <Text style={styles.footerText}> BATTERY: 2h 43m remaining</Text>
                    <Text style={styles.footerWarning}>⚠️ DO NOT LEAVE SAFE ZONE UNARMED ⚠️</Text>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={() => {
                    Alert.alert(
                        '⚠️ EMERGENCY LOGOUT ⚠️',
                        'Are you sure you want to disconnect from the R.P.D. network?',
                        [
                            { text: 'CANCEL', style: 'cancel' },
                            { text: 'DISCONNECT', style: 'destructive', onPress: () => navigation.replace('Login') }
                        ]
                    );
                }}>
                    <Text style={styles.logoutText}>🔌 DISCONNECT FROM NETWORK</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}