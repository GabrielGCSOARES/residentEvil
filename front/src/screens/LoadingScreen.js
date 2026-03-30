import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Easing, Dimensions, ActivityIndicator} from 'react-native';


const { width, height } = Dimensions.get('window');

const loadingMessages = [
   "INITIALIZING UMBRELLA PROTOCOL...",
    "ACCESSING S.T.A.R.S. DATABASE...",
    "DECRYPTING CLASSIFIED FILES...",
    "SCANNING FOR T-VIRUS...",
    "AVOID ZOMBIES... LOADING WEAPONS...",
    "WELCOME BACK, AGENT..."
  ];

export default function LoadingScreen() {
  const glitchAnim = useRef(new Animated.Value(0)).current;
  const textBlink = useRef(new Animated.Value(1)).current;
  const scanlineY = useRef(new Animated.Value(0)).current;
  const fadeMessage = useRef(new Animated.Value(1)).current;
  const messageIndex = useRef(0);
  const [currentMessage, setCurrentMessage] = React.useState(loadingMessages[0]);


  useEffect(() => {
    Animated.loop(Animated.sequence([Animated.timing(glitchAnim, { toValue: 1, duration: 100, easing: Easing.linear, useNativeDriver: true }), Animated.timing(glitchAnim, { toValue: 0, duration: 2000, useNativeDriver: true }), Animated.timing(glitchAnim, {toValue: 0.5, duration:50, useNativeDriver: true}, Animated.timing(glitchAnim, {toValue: 0, duration: 3000, useNativeDriver: true})),])).start();

    Animated.loop(Animated.sequence([Animated.timing(textBlink, { toValue: 0, duration: 800, useNativeDriver: true}), Animated.timing(textBlink, { toValue:1, duration: 800, useNativeDriver: true}),])).start();

    Animated.loop(Animated.timing(scanlineY, { toValue: height, duration:3000, easing: Easing.linear, useNativeDriver: true })).start();

    const messageInterval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeMessage, { toValue: 0, duration: 500, useNativeDriver: true}), 
        Animated.timing(fadeMessage, { toValue: 1, duration: 500, useNativeDriver: true})
      ]).start();

      messageIndex.current = (messageIndex.current + 1) % loadingMessages.lenght;
      setCurrentMessage(loadingMessages[messageIndex.current]);
    }, 2000);

    return () => clearInterval(messageInterval);
  }, []);

  const glitchTransform = glitchAnim.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: [0, -3, 2, -2, 1, 0],
  });

  //const spin = spinValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View style={styles.container}>
      <View style={styles.gradientBackground}/>

       <Animated.View style={[styles.scanline, { transform: [{ translateY: scanlineY }] }]} />

       <View style={styles.content}>
          <Animated.View style={{ transform: [{translateX: glitchTransform }] }}>
            <Text style={styles.title}>RESIDENT EVIL</Text>
            <View style={styles.redLine}/>
          </Animated.View>

          <View style={styles.loadingContainer}>
            <View style={styles.loadingBarBackgorund}>
              <Animated.View style={[styles.loadingBarFill ]}/>
            </View>
            <Animated.View style={{opacity: fadeMessage}}>
              <Text style={styles.loadingText}>{currentMessage}</Text>
            </Animated.View>
          </View>

          <Animated.Text style={[styles.cursor, { opacity: textBlink}]}>_</Animated.Text>

          <ActivityIndicator size="small" color="#8b0000" style={styles.spinner}/>

          <Text style={styles.warning}>
            ⚠️ SURVIVAL HORROR PROTOCOL ACTIVE ⚠️
          </Text>

          <View style={styles.noiseOverlay} pointerEvents="none" />

       </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    gradientBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#0a0a0a',
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    title: {
        fontFamily: 'System',
        fontSize: 36,
        fontWeight: 'bold',
        color: '#8b0000',
        textShadowColor: '#ff0000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 8,
        letterSpacing: 6,
        textAlign: 'center',
        marginBottom: 10,
    },
    redLine: {
        width: 80,
        height: 2,
        backgroundColor: '#8b0000',
        alignSelf: 'center',
        marginTop: 5,
        shadowColor: '#ff0000',
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    loadingContainer: {
        marginTop: 60,
        width: width - 80,
        alignItems: 'center',
    },
    loadingBarBackground: {
        width: '100%',
        height: 4,
        backgroundColor: 'rgba(139, 0, 0, 0.3)',
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: 20,
    },
    loadingBarFill: {
        width: '100%',
        height: '100%',
        backgroundColor: '#8b0000',
        borderRadius: 2,
        shadowColor: '#ff0000',
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    loadingText: {
        fontFamily: 'Courier New',
        fontSize: 12,
        color: '#8b0000',
        textAlign: 'center',
        letterSpacing: 1,
    },
    cursor: {
        fontFamily: 'Courier New',
        fontSize: 20,
        color: '#8b0000',
        marginTop: 20,
    },
    spinner: {
        marginTop: 30,
    },
    warning: {
        fontFamily: 'Courier New',
        fontSize: 9,
        color: '#5a0000',
        textAlign: 'center',
        position: 'absolute',
        bottom: -80,
        width: width - 80,
        letterSpacing: 1,
    },
    scanline: {
        position: 'absolute',
        width: width,
        height: 2,
        backgroundColor: 'rgba(139, 0, 0, 0.15)',
    },
    noiseOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        opacity: 0.3,
    },
});