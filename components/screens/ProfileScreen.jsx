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
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as firebase from '../lib/firebaseConfig';

const ProfileScreen = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleSignOut = async () => {
    try {
      await firebase.fbauth.signOut();
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    {
      icon: 'account-details',
      title: 'Personal Information',
      description: 'Update your profile details',
    },
    {
      icon: 'target',
      title: 'Goals',
      description: 'Set and track your fitness goals',
    },
    {
      icon: 'bell-outline',
      title: 'Notifications',
      description: 'Manage your notifications',
    },
    {
      icon: 'cog-outline',
      title: 'Settings',
      description: 'App preferences and settings',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#FFFFFF' }]}>
      <LinearGradient
        colors={['#4158D0', '#C850C0', '#FFCC70']}
        style={styles.linearGradient}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <View style={styles.profileInfo}>
              <View style={styles.avatarContainer}>
                <MaterialCommunityIcons
                  name="account-circle"
                  size={80}
                  color={isDark ? '#FFFFFF' : '#fff'}
                />
              </View>
              <Text style={[styles.name, { color: isDark ? '#FFFFFF' : '#fff' }]}>John Doe</Text>
              <Text style={[styles.email, { color: isDark ? '#CCCCCC' : 'rgba(255,255,255,0.8)' }]}>
                john.doe@example.com
              </Text>
            </View>
          </View>

          <View style={styles.menuSection}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <BlurView intensity={20} style={styles.menuItemContent}>
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={24}
                    color={isDark ? '#FFFFFF' : '#fff'}
                    style={styles.menuIcon}
                  />
                  <View style={styles.menuText}>
                    <Text style={[styles.menuTitle, { color: isDark ? '#FFFFFF' : '#fff' }]}>
                      {item.title}
                    </Text>
                    <Text style={[styles.menuDescription, { color: isDark ? '#CCCCCC' : 'rgba(255,255,255,0.8)' }]}>
                      {item.description}
                    </Text>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={24}
                    color={isDark ? '#FFFFFF' : '#fff'}
                  />
                </BlurView>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.signOutButton, { backgroundColor: isDark ? '#333333' : '#fff' }]}
            onPress={handleSignOut}
          >
            <Text style={[styles.signOutText, { color: isDark ? '#FF4444' : '#FF0000' }]}>Sign Out</Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
  },
  menuSection: {
    padding: 20,
    gap: 15,
  },
  menuItem: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
  },
  signOutButton: {
    margin: 20,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
