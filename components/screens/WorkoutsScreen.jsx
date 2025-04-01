import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WorkoutsScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const workoutPlans = [
    {
      title: 'Beginner Full Body',
      duration: '45 min',
      level: 'Beginner',
      exercises: '8 exercises',
      image: 'https://example.com/workout1.jpg',
    },
    {
      title: 'HIIT Cardio',
      duration: '30 min',
      level: 'Intermediate',
      exercises: '12 exercises',
      image: 'https://example.com/workout2.jpg',
    },
    {
      title: 'Strength Training',
      duration: '60 min',
      level: 'Advanced',
      exercises: '10 exercises',
      image: 'https://example.com/workout3.jpg',
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
            <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#fff' }]}>Your Workouts</Text>
            <Text style={[styles.headerSubtitle, { color: isDark ? '#CCCCCC' : 'rgba(255,255,255,0.8)' }]}>
              Personalized training plans for your goals
            </Text>
          </View>

          <View style={styles.quickStats}>
            <BlurView intensity={20} style={styles.statsCard}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#fff' }]}>12</Text>
                <Text style={[styles.statLabel, { color: isDark ? '#CCCCCC' : 'rgba(255,255,255,0.8)' }]}>Workouts</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#fff' }]}>324</Text>
                <Text style={[styles.statLabel, { color: isDark ? '#CCCCCC' : 'rgba(255,255,255,0.8)' }]}>Minutes</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#fff' }]}>2.8k</Text>
                <Text style={[styles.statLabel, { color: isDark ? '#CCCCCC' : 'rgba(255,255,255,0.8)' }]}>Calories</Text>
              </View>
            </BlurView>
          </View>

          <View style={styles.workoutsList}>
            {workoutPlans.map((workout, index) => (
              <TouchableOpacity key={index} style={styles.workoutCard}>
                <BlurView intensity={20} style={styles.workoutCardContent}>
                  <View style={styles.workoutInfo}>
                    <Text style={[styles.workoutTitle, { color: isDark ? '#FFFFFF' : '#fff' }]}>{workout.title}</Text>
                    <View style={styles.workoutDetails}>
                      <View style={styles.detailItem}>
                        <MaterialCommunityIcons
                          name="clock-outline"
                          size={16}
                          color={isDark ? '#FFFFFF' : '#fff'}
                        />
                        <Text style={[styles.detailText, { color: isDark ? '#CCCCCC' : 'rgba(255,255,255,0.8)' }]}>{workout.duration}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <MaterialCommunityIcons
                          name="signal-cellular-2"
                          size={16}
                          color={isDark ? '#FFFFFF' : '#fff'}
                        />
                        <Text style={[styles.detailText, { color: isDark ? '#CCCCCC' : 'rgba(255,255,255,0.8)' }]}>{workout.level}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <MaterialCommunityIcons
                          name="dumbbell"
                          size={16}
                          color={isDark ? '#FFFFFF' : '#fff'}
                        />
                        <Text style={[styles.detailText, { color: isDark ? '#CCCCCC' : 'rgba(255,255,255,0.8)' }]}>{workout.exercises}</Text>
                      </View>
                    </View>
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

          <TouchableOpacity style={[styles.startButton, { backgroundColor: isDark ? '#333333' : '#fff' }]}>
            <Text style={[styles.startButtonText, { color: isDark ? '#FFFFFF' : '#4158D0' }]}>Start New Workout</Text>
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    marginTop: 5,
  },
  quickStats: {
    marginBottom: 30,
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 5,
  },
  workoutsList: {
    marginBottom: 20,
  },
  workoutCard: {
    marginBottom: 15,
  },
  workoutCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  workoutInfo: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  workoutDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  detailText: {
    marginLeft: 5,
    fontSize: 14,
  },
  startButton: {
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WorkoutsScreen;
