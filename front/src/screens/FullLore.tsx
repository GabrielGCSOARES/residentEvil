import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './FullLoreStyle';

const timeline = [
    {
        title: 'THE FOUNDATIONS',
        period: '1960s to early 1990s',
        text: 'Umbrella is created by Oswell E. Spencer, Edward Ashford and James Marcus after research into the Progenitor virus. Their ambition is not medicine, but engineered evolution, immortality and control through bioweapons.'
    },
    {
        title: 'THE MANSION INCIDENT',
        period: '1998',
        text: 'The Spencer Mansion disaster reveals Umbrella\'s illegal experiments to S.T.A.R.S. Wesker betrays his team, Tyrants emerge as living weapons and the company\'s internal power struggle becomes impossible to hide.'
    },
    {
        title: 'THE FALL OF RACCOON CITY',
        period: 'September 1998',
        text: 'The T-Virus spreads through Raccoon City, while William Birkin unleashes the G-Virus. Leon, Claire and Jill survive, but the city is destroyed to erase evidence, leaving Umbrella morally and politically exposed.'
    },
    {
        title: 'THE AGE OF GLOBAL BIO-TERROR',
        period: '2004 to 2013',
        text: 'After Umbrella collapses, its research survives on the black market. Las Plagas, Uroboros and the C-Virus show that the threat has become international, with governments, private groups and extremists all seeking bio-organic power.'
    },
    {
        title: 'THE WINTERS SAGA',
        period: '2017 to 2021',
        text: 'Resident Evil 7 and Village narrow the scope again through Ethan Winters. The Mold, Eveline and Mother Miranda reveal a different biological system, one tied to memory, identity and twisted attempts at resurrection.'
    }
];

const factions = [
    'Umbrella Corporation: The original engine of the franchise\'s disasters.',
    'S.T.A.R.S. and the R.P.D.: Early witnesses to Umbrella\'s crimes.',
    'BSAA: Formed to fight bioterror, later shadowed by corruption and secrecy.',
    'The Connections: A criminal group tied to Eveline and Mold research.',
    'Neo-Umbrella and other successors: Proof that Umbrella\'s ideas outlived the company.'
];

export default function FullLore({ navigation }: any) {
    return (
        <View style={styles.container}>
            <View style={styles.redVeil} />

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>← BACK TO HUB</Text>
                </TouchableOpacity>

                <Text style={styles.title}>FULL LORE</Text>
                <Text style={styles.subtitle}>
                    A compact overview of the franchise from Umbrella\'s birth to the modern biohazard era.
                </Text>

                {timeline.map((entry) => (
                    <View key={entry.title} style={styles.timelineCard}>
                        <Text style={styles.timelineTitle}>{entry.title}</Text>
                        <Text style={styles.timelinePeriod}>{entry.period}</Text>
                        <Text style={styles.timelineText}>{entry.text}</Text>
                    </View>
                ))}

                <View style={styles.factionCard}>
                    <Text style={styles.cardTitle}>KEY POWERS IN THE SHADOW WAR</Text>
                    {factions.map((item) => (
                        <Text key={item} style={styles.factionItem}>
                            {'>'} {item}
                        </Text>
                    ))}
                </View>

                <View style={styles.summaryCard}>
                    <Text style={styles.cardTitle}>CORE THEME</Text>
                    <Text style={styles.summaryText}>
                        Resident Evil is ultimately about institutions trying to master life itself, then losing control of what they created. Every outbreak, mutation and cover-up grows from that same hunger for power.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}
