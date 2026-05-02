import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

// Largura do painel esquerdo (colorido com o personagem)
export const DIAGONAL_WIDTH = width * 0.56;

export default StyleSheet.create({

    // ─── Layout raiz ─────────────────────────────────────────────────────────
    root: {
        flex: 1,
        backgroundColor: '#f0ece6',
        overflow: 'hidden',
    },

    // ─── Painel Esquerdo (cor dinâmica + personagem) ──────────────────────────
    leftPanel: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: DIAGONAL_WIDTH + 32,
        height: height,
        overflow: 'hidden',
    },

    // Marca d'água do jogo no fundo
     watermarkGame: {
        position: 'absolute',
        bottom: 200, // Aumentei o espaço conforme sua solicitação anterior
        left: 12,
        fontSize: 34,
        fontWeight: 'bold',
        letterSpacing: 2,
        lineHeight: 38,
        textShadowColor: 'rgba(0,0,0,0.3)', // Sombra profissional
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },

    // Badge "RE 1" no canto superior esquerdo
    gameBadge: {
        position: 'absolute',
        top: 54,
        left: 16,
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 4,
        zIndex: 10,
    },
    gameBadgeText: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 2,
    },

    // Container da imagem do personagem
    charWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    charImage: {
        width: DIAGONAL_WIDTH + 24,
        height: height * 0.86,
        resizeMode: 'contain',
    },

    // ─── Setas de navegação lateral (sobre o painel esquerdo) ────────────────
    arrowLeft: {
        position: 'absolute',
        left: 10,
        top: '50%',
        marginTop: -22,
        zIndex: 20,
        width: 36,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)', 
        borderRadius: 22,
    },
    arrowRight: {
        position: 'absolute',
        left: DIAGONAL_WIDTH - 10,
        top: '50%',
        marginTop: -22,
        zIndex: 20,
        width: 36,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)', 
        borderRadius: 22,
    },
    arrowText: {
        fontSize: 28,
        fontWeight: 'bold',
        // A cor será definida dinamicamente no componente
    },

    // ─── Overlay diagonal que divide os dois painéis ──────────────────────────
    diagonalOverlay: {
        position: 'absolute',
        top: 0,
        left: DIAGONAL_WIDTH - 4,
        width: 46,
        height: height,
        backgroundColor: '#f0ece6',
        transform: [{ skewX: '-8deg' }],
    },

    // ─── Painel Direito (claro, informações) ─────────────────────────────────
    rightPanel: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: width - DIAGONAL_WIDTH + 32,
        height: height,
        backgroundColor: '#f0ece6',
        paddingTop: 50,
        paddingHorizontal: 18,
        paddingBottom: 28,
    },

    // ─── Nav superior (3 abas) ────────────────────────────────────────────────
    topNav: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    navItem: {
        fontSize: 10,
        color: '#aaa',
        fontWeight: '600',
        letterSpacing: 0.4,
        marginRight: 14,
        paddingBottom: 3,
    },
    navItemActive: {
        color: '#111',
        borderBottomWidth: 1.5,
        borderBottomColor: '#111',
    },

    // ─── Conteúdo do personagem ───────────────────────────────────────────────
    charContent: {
        flex: 1,
        justifyContent: 'center',
    },

    // Nome
    firstName: {
        fontSize: 20,
        fontWeight: '900',
        color: '#111',
        letterSpacing: 1,
        lineHeight: 22,
    },
    lastName: {
        fontSize: 26,
        fontWeight: '900',
        letterSpacing: 1,
        lineHeight: 29,
        marginBottom: 12,
    },

    // Divisória colorida dinâmica
    divider: {
        width: 34,
        height: 2.5,
        borderRadius: 2,
        marginBottom: 10,
    },

    // Role e Status
    roleText: {
        fontSize: 8,
        fontWeight: '800',
        letterSpacing: 1.8,
        color: '#888',
        marginBottom: 8,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    statusDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 1.5,
    },

    // About
    aboutLabel: {
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 2,
        color: '#333',
        marginBottom: 8,
    },
    aboutText: {
        fontSize: 12,
        lineHeight: 17,
        color: '#555',
        marginBottom: 20,
    },

    // ─── Botão EXPLORE LORE ───────────────────────────────────────────────────
    startBtn: {
        borderRadius: 6,
        paddingVertical: 12,
        paddingHorizontal: 18,
        alignSelf: 'flex-start',
        marginBottom: 22,
    },
    startBtnText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1.5,
    },

    // ─── Navegação inferior: setas + dots ────────────────────────────────────
    bottomNav: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // Seta ‹ e › nos dots
    dotArrow: {
        paddingHorizontal: 6,
        paddingVertical: 4,
    },
    dotArrowText: {
        fontSize: 18,
        color: '#aaa',
        fontWeight: '300',
    },

    // Dots
    dotsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 4,
    },
    dotWrapper: {
        marginRight: 5,
        padding: 4,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#ccc',
    },
    dotActive: {
        width: 18,
        height: 6,
        borderRadius: 3,
    },

    // ─── Rodapé da franquia (sobre painel esquerdo) ───────────────────────────
    franchiseFooter: {
        position: 'absolute',
        bottom: 18,
        left: 16,
    },
    franchiseText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 3,
        color: 'rgba(255,255,255,0.32)',
    },
    franchiseSubText: {
        fontSize: 7,
        letterSpacing: 1.4,
        color: 'rgba(255, 10, 10, 0.18)',
        marginTop: 2,
    },
});