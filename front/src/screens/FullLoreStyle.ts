import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#060606',
    },
    redVeil: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(100, 8, 8, 0.14)',
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
        color: '#d6c7c7',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
    },
    title: {
        color: '#fff1f1',
        fontSize: 30,
        fontWeight: '900',
        letterSpacing: 1.4,
        marginBottom: 10,
    },
    subtitle: {
        color: '#cabcbc',
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 18,
    },
    timelineCard: {
        backgroundColor: 'rgba(14, 14, 16, 0.96)',
        borderRadius: 24,
        padding: 18,
        marginBottom: 14,
        borderLeftWidth: 4,
        borderLeftColor: '#ba181b',
    },
    timelineTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 6,
    },
    timelinePeriod: {
        color: '#e5383b',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1.2,
        marginBottom: 10,
    },
    timelineText: {
        color: '#d9cdcd',
        fontSize: 14,
        lineHeight: 22,
    },
    factionCard: {
        backgroundColor: 'rgba(10, 10, 10, 0.96)',
        borderRadius: 22,
        padding: 18,
        borderWidth: 1,
        borderColor: '#311414',
        marginBottom: 14,
    },
    cardTitle: {
        color: '#ff8c8c',
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1.4,
        marginBottom: 12,
    },
    factionItem: {
        color: '#f0e4e4',
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 10,
    },
    summaryCard: {
        backgroundColor: 'rgba(42, 9, 9, 0.9)',
        borderRadius: 22,
        padding: 18,
        borderWidth: 1,
        borderColor: '#7f1d1d',
    },
    summaryText: {
        color: '#fff0f0',
        fontSize: 14,
        lineHeight: 23,
    },
});
