import { StyleSheet } from 'react-native';

// Cores do tema Resident Evil
export const colors = {
  bloodRed: '#8b0000',
  terminalGreen: '#4ade80',
  industrialBlack: '#1a1a1a',
  darkGray: '#2a2a2a',
  placeholderGray: '#666666',
  white: '#ffffff',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.industrialBlack,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.bloodRed,
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginBottom: 40,
    textShadowColor: 'rgba(139, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },

  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.darkGray,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: colors.terminalGreen,
    fontSize: 16,
    borderWidth: 2,
    borderColor: colors.bloodRed,
    shadowColor: colors.bloodRed,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },

  buttonContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
    height: 60,
  },

  // Borda animada giratória (primeira camada)
  rotatingBorder: {
    position: 'absolute',
    width: '100%',
    height: 52,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.terminalGreen,
    borderStyle: 'dashed',
    shadowColor: colors.terminalGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 15,
  },

  // Borda animada giratória reversa (segunda camada)
  rotatingBorderReverse: {
    position: 'absolute',
    width: '98%', 
    height: 50,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.bloodRed,
    borderStyle: 'solid',
    shadowColor: colors.bloodRed,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 12,
  },

  button: {
    backgroundColor: colors.bloodRed,
    padding: 15,
    borderRadius: 8,
    width: '96%', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: colors.terminalGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 3, 
    margin: 4
  },

  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: colors.terminalGreen,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },

  buttonText2: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'lowercase',
    letterSpacing: 2,
    textShadowColor: colors.terminalGreen,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },

  scanline: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.terminalGreen,
    opacity: 0.3,
  },

  formContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.terminalGreen,
    shadowColor: colors.bloodRed,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },

  umbrellaIcon: {
    width: 80,
    height: 80,
    backgroundColor: colors.bloodRed,
    borderRadius: 40,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.white,
    alignSelf: 'center',
  },
});

export default styles;