// components/screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SplashScreen = () => {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.push('/Login');
    }, 2500);
    return () => clearTimeout(timer);
  }, [router, fadeAnim, scaleAnim]);

  return (
    <LinearGradient
      colors={['#4158D0', '#C850C0', '#FFCC70']}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <MaterialCommunityIcons name="arm-flex" size={80} color="#fff" />
        <Text style={styles.logo}>AI Fitness Coach</Text>
        <Text style={styles.tagline}>Your Personal Training Partner</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
    opacity: 0.9,
  },
});

export default SplashScreen;
