import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';
import styles from './BioweaponsListStyle';

interface Bioweapon {
    id: string;
    name: string;
    category: 'VIRUS' | 'BOW' | 'PARASITE' | 'FUNGUS' | 'PROTOTYPE';
    firstAppearance: string;
    threatLevel: 'SS' | 'S' | 'A' | 'B' | 'C';
    imageColor: string;
    description: string;
    detailedLore: {
        origin: string;
        symptoms: string[];
        knownHosts: string[];
        containmentStatus: string;
        trivia: string[];
    };
}

const bioweaponsData: Bioweapon[] = [
    {
        id: '1',
        name: 'T-VIRUS',
        category: 'VIRUS',
        firstAppearance: 'Resident Evil (1996)',
        threatLevel: 'S',
        imageColor: '#2ecc71',
        description: 'The Tyrant Virus, built by Umbrella to mutate hosts into weapons.',
        detailedLore: {
            origin: 'Developed from Progenitor-based research inside Umbrella to force rapid mutation and selective adaptation.',
            symptoms: ['Cellular necrosis', 'Extreme aggression', 'Loss of higher cognition', 'Enhanced strength', 'Cannibalistic behavior'],
            knownHosts: ['Zombies', 'Crimson Heads', 'Tyrant T-002', 'Lisa Trevor'],
            containmentStatus: 'OUTBREAK ACTIVE - GLOBAL THREAT',
            trivia: ['The virus defines the earliest Resident Evil outbreaks.', 'The Tyrant line was one of Umbrella\'s main goals.', 'Many later projects are built from T-Virus lessons.']
        }
    },
    {
        id: '2',
        name: 'G-VIRUS',
        category: 'VIRUS',
        firstAppearance: 'Resident Evil 2 (1998)',
        threatLevel: 'SS',
        imageColor: '#e74c3c',
        description: 'William Birkin\'s unstable virus focused on forced evolution and regeneration.',
        detailedLore: {
            origin: 'Created by Dr. William Birkin as a more radical evolutionary agent than the T-Virus.',
            symptoms: ['Explosive mutation', 'Rapid regeneration', 'Eye growth', 'Body distortion', 'Embryo implantation'],
            knownHosts: ['William Birkin', 'G-Embryos', 'Curtis Miller'],
            containmentStatus: 'CONTAINED - BUT DORMANT SAMPLES EXIST',
            trivia: ['The G-Virus responds strongly to genetic compatibility.', 'Birkin injected himself to escape capture.', 'Its transformations get less human at each stage.']
        }
    },
    {
        id: '3',
        name: 'LAS PLAGAS',
        category: 'PARASITE',
        firstAppearance: 'Resident Evil 4 (2005)',
        threatLevel: 'A',
        imageColor: '#f39c12',
        description: 'An ancient parasite that grants command, obedience and violent mutation.',
        detailedLore: {
            origin: 'Recovered beneath a remote European village and weaponized by Los Iluminados.',
            symptoms: ['Mind control', 'Enhanced strength', 'Body reshaping', 'Collective obedience', 'Emergent parasite forms'],
            knownHosts: ['Los Ganados', 'Ramón Salazar', 'Bitores Méndez', 'Jack Krauser'],
            containmentStatus: 'NEUTRALIZED - VILLAGE DESTROYED',
            trivia: ['Dominant Plagas can command subordinate hosts.', 'Heat is one of its known weaknesses.', 'Plagas changed the franchise from zombies to controlled infection.']
        }
    },
    {
        id: '4',
        name: 'TYRANT',
        category: 'BOW',
        firstAppearance: 'Resident Evil (1996)',
        threatLevel: 'S',
        imageColor: '#9b59b6',
        description: 'Umbrella\'s signature humanoid B.O.W. line, built for combat and intimidation.',
        detailedLore: {
            origin: 'Created by infecting carefully selected human hosts with Tyrant-compatible strains.',
            symptoms: ['Gigantic frame', 'Clawed limbs', 'Regeneration', 'Programmed obedience', 'Extreme resilience'],
            knownHosts: ['T-002', 'Mr. X / T-00', 'T-078', 'Nemesis base body'],
            containmentStatus: 'MULTIPLE UNITS DEPLOYED - DANGEROUS',
            trivia: ['Mr. X is one of the most recognizable Tyrants.', 'Tyrants were made to follow tactical orders.', 'Nemesis is a Tyrant enhanced by parasitic control.']
        }
    },
    {
        id: '5',
        name: 'NEMESIS',
        category: 'BOW',
        firstAppearance: 'Resident Evil 3: Nemesis (1999)',
        threatLevel: 'SS',
        imageColor: '#b5170d',
        description: 'A Tyrant enhanced with the NE-Alpha parasite and designed to hunt S.T.A.R.S.',
        detailedLore: {
            origin: 'Engineered in a European Umbrella facility to produce a smarter, more directed pursuer.',
            symptoms: ['Weapon use', 'Tactical tracking', 'Rapid mutation', 'Advanced regeneration', 'Obsessive target fixation'],
            knownHosts: ['Nemesis T-Type'],
            containmentStatus: 'DESTROYED - RACCOON CITY INCIDENT',
            trivia: ['Nemesis can speak in broken human language.', 'Its mission was specifically anti-S.T.A.R.S.', 'It remains one of Umbrella\'s most feared B.O.W.s.']
        }
    },
    {
        id: '6',
        name: 'MOLD / MUTAMYCETE',
        category: 'FUNGUS',
        firstAppearance: 'Resident Evil 7: Biohazard (2017)',
        threatLevel: 'S',
        imageColor: '#6c757d',
        description: 'A fungal colony capable of memory transfer, control and body reconstruction.',
        detailedLore: {
            origin: 'A mutamycete colony exploited by Miranda and later weaponized through Eveline.',
            symptoms: ['Regeneration', 'Hive-mind link', 'Memory storage', 'Body hardening', 'Psychological influence'],
            knownHosts: ['Eveline', 'Jack Baker', 'Marguerite Baker', 'Miranda', 'Ethan Winters'],
            containmentStatus: 'CONTAINED - ROOT SYSTEM COMPROMISED',
            trivia: ['The Mold stores identity as biological data.', 'Village expands its origin through Miranda.', 'It gives the Winters saga its unique mythology.']
        }
    },
    {
        id: '7',
        name: 'HUNTER',
        category: 'BOW',
        firstAppearance: 'Resident Evil (1996)',
        threatLevel: 'A',
        imageColor: '#2d6a4f',
        description: 'A mass-producible reptilian hunter built for speed and lethal ambush.',
        detailedLore: {
            origin: 'Created from combined human and reptile traits through Umbrella bioengineering.',
            symptoms: ['Blade-like claws', 'Fast pouncing attacks', 'Pack behavior', 'High aggression', 'Variant adaptation'],
            knownHosts: ['Hunter alpha', 'Hunter beta', 'Hunter gamma', 'Hunter Elite'],
            containmentStatus: 'VARIANTS STILL ACTIVE',
            trivia: ['Hunters became standard field B.O.W.s.', 'They are often used to escalate combat zones.', 'Different variants appear throughout the series.']
        }
    },
    {
        id: '8',
        name: 'LICKER',
        category: 'BOW',
        firstAppearance: 'Resident Evil 2 (1998)',
        threatLevel: 'B',
        imageColor: '#7f8c8d',
        description: 'A further-mutated zombie that traded vision for lethal hearing and agility.',
        detailedLore: {
            origin: 'Created when certain T-Virus zombies continued mutating instead of stabilizing.',
            symptoms: ['No eyes', 'Wall climbing', 'Tongue strikes', 'Stealth movement', 'Acute sound tracking'],
            knownHosts: ['Licker', 'Licker beta', 'Licker R'],
            containmentStatus: 'COMMON IN OUTBREAK ZONES',
            trivia: ['Noise is the easiest way to attract them.', 'Their exposed brain is a major weakness.', 'They symbolize how unstable T-Virus mutation can become.']
        }
    }
];

export default function BioweaponsList({ navigation }: any) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

    const categories = [
        { id: 'ALL', name: 'ALL', color: '#8b0000' },
        { id: 'VIRUS', name: 'VIRUSES', color: '#2ecc71' },
        { id: 'PARASITE', name: 'PARASITES', color: '#f39c12' },
        { id: 'BOW', name: 'BIO-WEAPONS', color: '#e74c3c' },
        { id: 'FUNGUS', name: 'FUNGUS', color: '#6c757d' },
        { id: 'PROTOTYPE', name: 'PROTOTYPES', color: '#9b59b6' }
    ];

    const filteredWeapons = bioweaponsData.filter((weapon) => {
        const matchesSearch =
            weapon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            weapon.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'ALL' || weapon.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getThreatLevelColor = (level: string) => {
        switch (level) {
            case 'SS':
                return '#ff0000';
            case 'S':
                return '#e74c3c';
            case 'A':
                return '#f39c12';
            case 'B':
                return '#2ecc71';
            case 'C':
                return '#3498db';
            default:
                return '#95a5a6';
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.backgroundOverlay} />

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>← BACK TO HUB</Text>
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={styles.title}>UMBRELLA CORP</Text>
                    <Text style={styles.subtitle}>BIO-WEAPONS DATABASE</Text>
                    <Text style={styles.clearance}>EYES ONLY • LEVEL OMEGA</Text>
                </View>

                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search the database..."
                        placeholderTextColor="#7f8c8d"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category.id && { backgroundColor: category.color, borderColor: category.color }
                            ]}
                            onPress={() => setSelectedCategory(category.id)}
                        >
                            <Text style={[styles.categoryText, selectedCategory === category.id && styles.categoryTextActive]}>
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.listContainer}>
                    <Text style={styles.sectionTitle}>ACTIVE FILES ({filteredWeapons.length})</Text>

                    {filteredWeapons.map((weapon) => (
                        <TouchableOpacity
                            key={weapon.id}
                            style={styles.weaponCard}
                            activeOpacity={0.9}
                            onPress={() => navigation.navigate('BioweaponDetail', { weapon })}
                        >
                            <View style={[styles.weaponIcon, { backgroundColor: `${weapon.imageColor}22`, borderColor: weapon.imageColor }]}>
                                <Text style={styles.weaponIconText}>
                                    {weapon.category === 'VIRUS' ? 'V' :
                                        weapon.category === 'PARASITE' ? 'P' :
                                        weapon.category === 'FUNGUS' ? 'F' : 'B'}
                                </Text>
                            </View>

                            <View style={styles.weaponInfo}>
                                <View style={styles.weaponHeader}>
                                    <Text style={styles.weaponName}>{weapon.name}</Text>
                                    <View style={[styles.threatBadge, { backgroundColor: getThreatLevelColor(weapon.threatLevel) }]}>
                                        <Text style={styles.threatText}>{weapon.threatLevel}</Text>
                                    </View>
                                </View>
                                <Text style={styles.weaponDesc}>{weapon.description}</Text>
                                <View style={styles.weaponMeta}>
                                    <Text style={styles.weaponMetaText}>{weapon.category}</Text>
                                    <Text style={styles.weaponMetaText}>{weapon.firstAppearance}</Text>
                                </View>
                            </View>

                            <Text style={styles.arrow}>›</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
