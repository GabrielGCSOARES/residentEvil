import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#070707',
    },
    backgroundOrb: {
        position: 'absolute',
        top: 40,
        right: -70,
        width: width * 0.85,
        height: 280,
        borderRadius: 180,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 52,
        paddingBottom: 40,
    },
    backButton: {
        marginBottom: 16,
    },
    backText: {
        color: '#d6c3c3',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
    },
    title: {
        color: '#fff5f5',
        fontSize: 30,
        fontWeight: '900',
        letterSpacing: 1.4,
        marginBottom: 10,
    },
    subtitle: {
        color: '#c0b0b0',
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 18,
    },
    selectorRow: {
        marginBottom: 20,
    },
    selectorButton: {
        width: 150,
        backgroundColor: 'rgba(17, 17, 17, 0.92)',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#3d3d3d',
        padding: 14,
        marginRight: 12,
    },
    selectorTitle: {
        color: '#f5eaea',
        fontSize: 13,
        fontWeight: '800',
        marginBottom: 8,
    },
    selectorYear: {
        color: '#aa9c9c',
        fontSize: 11,
    },
    selectorTitleActive: {
        color: '#ffffff',
    },
    featureCard: {
        backgroundColor: 'rgba(14, 14, 18, 0.94)',
        borderRadius: 24,
        borderWidth: 1,
        padding: 20,
        marginBottom: 16,
    },
    featureBadge: {
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1.4,
        marginBottom: 10,
    },
    featureTitle: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 6,
    },
    featureMeta: {
        color: '#b5a8a8',
        fontSize: 12,
        marginBottom: 14,
    },
    featureFocus: {
        color: '#f1e7e7',
        fontSize: 15,
        lineHeight: 24,
        fontWeight: '700',
    },
    textCard: {
        backgroundColor: 'rgba(11, 11, 11, 0.96)',
        borderRadius: 22,
        padding: 18,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#292929',
    },
    cardLabel: {
        color: '#e5383b',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1.5,
        marginBottom: 10,
    },
    cardText: {
        color: '#d7cccc',
        fontSize: 14,
        lineHeight: 23,
    },
});
