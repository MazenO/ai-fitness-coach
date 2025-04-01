import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const HomeScreen = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const menuItems = [
    {
      title: 'Workouts',
      icon: 'weight-lifter',
      route: '/workouts',
      color: '#4158D0',
    },
    {
      title: 'Nutrition',
      icon: 'food-apple',
      route: '/nutrition',
      color: '#C850C0',
    },
    {
      title: 'Progress',
      icon: 'chart-line',
      route: '/progress',
      color: '#FFCC70',
    },
    {
      title: 'Profile',
      icon: 'account',
      route: '/profile',
      color: '#4158D0',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#FFFFFF' }]}>
      <LinearGradient
        colors={['#4158D0', '#C850C0', '#FFCC70']}
        style={styles.linearGradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <MaterialCommunityIcons name="arm-flex" size={60} color={isDark ? '#FFFFFF' : '#fff'} />
            <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#fff' }]}>AI Fitness Coach</Text>
            <Text style={[styles.subtitle, { color: isDark ? '#CCCCCC' : 'rgba(255,255,255,0.8)' }]}>Your Personal Fitness Journey</Text>
          </View>

          <View style={styles.menuGrid}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => router.push(item.route)}
              >
                <BlurView intensity={20} style={styles.menuItemContent}>
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={40}
                    color={item.color}
                  />
                  <Text style={[styles.menuItemText, { color: isDark ? '#FFFFFF' : '#fff' }]}>{item.title}</Text>
                </BlurView>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  menuItem: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 15,
  },
  menuItemContent: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
});

export default HomeScreen;
