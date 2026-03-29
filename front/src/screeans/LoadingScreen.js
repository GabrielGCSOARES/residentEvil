import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

export default function LoadingScreen() {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(Animated.timing(spinValue, { toValue: 1, duration: 1000, useNativeDriver: false })).start();
  }, []);

  const spin = spinValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.loadingText, { transform: [{ rotate: spin }] }]}>☣</Animated.Text>
      <Text style={styles.text}>INICIANDO PROTOCOLO...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 60, color: '#e74c3c', marginBottom: 20 },
  text: { color: '#ecf0f1', fontSize: 12, letterSpacing: 2, fontFamily: 'monospace' },
});