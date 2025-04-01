import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProgressScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const achievements = [
    {
      title: 'First Workout',
      description: 'Complete your first workout',
      icon: 'trophy',
      completed: true,
    },
    {
      title: 'Week Warrior',
      description: 'Complete 5 workouts in a week',
      icon: 'sword',
      completed: true,
    },
    {
      title: 'Nutrition Master',
      description: 'Track meals for 7 days straight',
      icon: 'food-apple',
      completed: false,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#FFFFFF' }]}>
      <LinearGradient
        colors={['#4158D0', '#C850C0', '#FFCC70']}
        style={styles.linearGradient}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#fff' }]}>Your Progress</Text>
            <Text style={[styles.headerSubtitle, { color: isDark ? '#CCCCCC' : 'rgba(255,255,255,0.8)' }]}>
              Track your fitness journey
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <BlurView intensity={20} style={styles.statsCard}>
              <Text style={[styles.statsTitle, { color: isDark ? '#FFFFFF' : '#fff' }]}>Monthly Overview</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#fff' }]}>15</Text>
                  <Text style={[styles.statLabel, { color: isDark ? '#CCCCCC' : 'rgba(255,255,255,0.8)' }]}>
                    Workouts
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#fff' }]}>4.2k</Text>
                  <Text style={[styles.statLabel, { color: isDark ? '#CCCCCC' : 'rgba(255,255,255,0.8)' }]}>
                    Calories
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#fff' }]}>8.5</Text>
                  <Text style={[styles.statLabel, { color: isDark ? '#CCCCCC' : 'rgba(255,255,255,0.8)' }]}>
                    Hours
                  </Text>
                </View>
              </View>
            </BlurView>
          </View>

          <View style={styles.progressSection}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#fff' }]}>Body Metrics</Text>
            <BlurView intensity={20} style={styles.metricsCard}>
              <View style={styles.metricItem}>
                <Text style={[styles.metricLabel, { color: isDark ? '#CCCCCC' : 'rgba(255,255,255,0.8)' }]}>
                  Weight
                </Text>
                <Text style={[styles.metricValue, { color: isDark ? '#FFFFFF' : '#fff' }]}>75 kg</Text>
                <Text style={[styles.metricChange, { color: isDark ? '#A8E6CF' : '#A8E6CF' }]}>-2.5 kg</Text>
              </View>
              <View style={styles.metricDivider} />
              <View style={styles.metricItem}>
                <Text style={[styles.metricLabel, { color: isDark ? '#CCCCCC' : 'rgba(255,255,255,0.8)' }]}>
                  Body Fat
                </Text>
                <Text style={[styles.metricValue, { color: isDark ? '#FFFFFF' : '#fff' }]}>18%</Text>
                <Text style={[styles.metricChange, { color: isDark ? '#A8E6CF' : '#A8E6CF' }]}>-1.5%</Text>
              </View>
            </BlurView>
          </View>

          <View style={styles.achievementsSection}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#fff' }]}>Achievements</Text>
            {achievements.map((achievement, index) => (
              <TouchableOpacity key={index} style={styles.achievementCard}>
                <BlurView intensity={20} style={styles.achievementContent}>
                  <MaterialCommunityIcons
                    name={achievement.icon}
                    size={24}
                    color={achievement.completed ? '#A8E6CF' : isDark ? '#FFFFFF' : '#fff'}
                    style={styles.achievementIcon}
                  />
                  <View style={styles.achievementInfo}>
                    <Text style={[styles.achievementTitle, { color: isDark ? '#FFFFFF' : '#fff' }]}>
                      {achievement.title}
                    </Text>
                    <Text style={[styles.achievementDescription, { color: isDark ? '#CCCCCC' : 'rgba(255,255,255,0.8)' }]}>
                      {achievement.description}
                    </Text>
                  </View>
                  {achievement.completed && (
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={24}
                      color="#A8E6CF"
                    />
                  )}
                </BlurView>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={[styles.updateButton, { backgroundColor: isDark ? '#333333' : '#fff' }]}>
            <Text style={[styles.updateButtonText, { color: isDark ? '#FFFFFF' : '#4158D0' }]}>Update Measurements</Text>
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
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  statsContainer: {
    marginBottom: 25,
  },
  statsCard: {
    borderRadius: 15,
    padding: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
  },
  progressSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  metricsCard: {
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  metricChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  metricDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 15,
  },
  achievementsSection: {
    marginBottom: 25,
  },
  achievementCard: {
    marginBottom: 12,
    borderRadius: 15,
    overflow: 'hidden',
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  achievementIcon: {
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
  },
  updateButton: {
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 5,
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProgressScreen;
