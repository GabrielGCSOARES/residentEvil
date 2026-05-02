import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    backgroundOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#0a0505',
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    backButton: {
        marginTop: 52,
        marginBottom: 12,
    },
    backText: {
        color: '#d4c4c4',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
    },
    header: {
        marginBottom: 25,
        borderBottomWidth: 2,
        borderBottomColor: '#8b0000',
        paddingBottom: 15,
    },
    title: {
        fontSize: 26,
        color: '#8b0000',
        fontWeight: '900',
        textAlign: 'center',
        letterSpacing: 4,
    },
    subtitle: {
        fontSize: 12,
        color: '#c0b0b0',
        textAlign: 'center',
        marginTop: 5,
        letterSpacing: 1.6,
    },
    clearance: {
        fontSize: 10,
        color: '#ff4d4d',
        textAlign: 'center',
        marginTop: 8,
        fontWeight: '700',
        letterSpacing: 1.2,
    },
    searchContainer: {
        marginBottom: 20,
    },
    searchInput: {
        backgroundColor: '#120909',
        borderWidth: 1,
        borderColor: '#8b0000',
        borderRadius: 14,
        padding: 14,
        fontSize: 13,
        color: '#f2ebeb',
    },
    categoriesContainer: {
        marginBottom: 20,
    },
    categoryButton: {
        backgroundColor: '#1a0000',
        borderWidth: 1,
        borderColor: '#8b0000',
        borderRadius: 16,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
    },
    categoryText: {
        fontSize: 11,
        color: '#d4bdbd',
        fontWeight: '800',
        letterSpacing: 1,
    },
    categoryTextActive: {
        color: '#ffffff',
    },
    listContainer: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 13,
        color: '#f4d5d5',
        marginBottom: 15,
        fontWeight: '800',
        letterSpacing: 1.2,
    },
    weaponCard: {
        flexDirection: 'row',
        backgroundColor: '#130a0a',
        borderRadius: 20,
        padding: 15,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#8b0000',
        alignItems: 'center',
    },
    weaponIcon: {
        width: 58,
        height: 58,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderWidth: 1,
    },
    weaponIconText: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: '900',
    },
    weaponInfo: {
        flex: 1,
    },
    weaponHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    weaponName: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '800',
        flex: 1,
        marginRight: 8,
    },
    threatBadge: {
        paddingHorizontal: 9,
        paddingVertical: 4,
        borderRadius: 10,
    },
    threatText: {
        fontSize: 10,
        color: '#ffffff',
        fontWeight: '900',
    },
    weaponDesc: {
        fontSize: 12,
        color: '#d4c6c6',
        marginBottom: 7,
        lineHeight: 18,
    },
    weaponMeta: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    weaponMetaText: {
        fontSize: 10,
        color: '#a58f8f',
        marginRight: 12,
        marginBottom: 3,
    },
    arrow: {
        fontSize: 24,
        color: '#8b0000',
        marginLeft: 10,
        fontWeight: '700',
    },
});
