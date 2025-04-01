import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NutritionScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const meals = [
    {
      type: 'Breakfast',
      calories: 450,
      protein: 25,
      carbs: 45,
      fat: 20,
      icon: 'food-apple',
    },
    {
      type: 'Lunch',
      calories: 650,
      protein: 35,
      carbs: 65,
      fat: 25,
      icon: 'food',
    },
    {
      type: 'Dinner',
      calories: 550,
      protein: 30,
      carbs: 55,
      fat: 22,
      icon: 'food-turkey',
    },
    {
      type: 'Snacks',
      calories: 200,
      protein: 10,
      carbs: 25,
      fat: 8,
      icon: 'food-croissant',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#FFFFFF' }]}>
      <LinearGradient
        colors={['#4158D0', '#C850C0', '#FFCC70']}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: '#FFFFFF' }]}>Nutrition</Text>
            <Text style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.8)' }]}>Track your daily nutrition</Text>
          </View>

          <View style={styles.calorieCard}>
            <BlurView intensity={20} style={styles.blurContainer}>
              <Text style={[styles.calorieTitle, { color: '#FFFFFF' }]}>Daily Calories</Text>
              <View style={styles.calorieContent}>
                <View style={styles.calorieStats}>
                  <Text style={[styles.calorieValue, { color: '#FFFFFF' }]}>1,850</Text>
                  <Text style={[styles.calorieLabel, { color: 'rgba(255,255,255,0.8)' }]}>consumed</Text>
                </View>
                <View style={styles.calorieDivider} />
                <View style={styles.calorieStats}>
                  <Text style={[styles.calorieValue, { color: '#FFFFFF' }]}>2,200</Text>
                  <Text style={[styles.calorieLabel, { color: 'rgba(255,255,255,0.8)' }]}>goal</Text>
                </View>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '84%' }]} />
              </View>
            </BlurView>
          </View>

          <View style={styles.macrosCard}>
            <BlurView intensity={20} style={styles.blurContainer}>
              <Text style={[styles.macrosTitle, { color: '#FFFFFF' }]}>Macronutrients</Text>
              <View style={styles.macrosGrid}>
                <View style={styles.macroItem}>
                  <Text style={[styles.macroValue, { color: '#FFFFFF' }]}>100g</Text>
                  <Text style={[styles.macroLabel, { color: 'rgba(255,255,255,0.8)' }]}>Protein</Text>
                </View>
                <View style={styles.macroItem}>
                  <Text style={[styles.macroValue, { color: '#FFFFFF' }]}>190g</Text>
                  <Text style={[styles.macroLabel, { color: 'rgba(255,255,255,0.8)' }]}>Carbs</Text>
                </View>
                <View style={styles.macroItem}>
                  <Text style={[styles.macroValue, { color: '#FFFFFF' }]}>75g</Text>
                  <Text style={[styles.macroLabel, { color: 'rgba(255,255,255,0.8)' }]}>Fat</Text>
                </View>
              </View>
            </BlurView>
          </View>

          <View style={styles.mealsList}>
            {meals.map((meal, index) => (
              <TouchableOpacity key={index} style={styles.mealCard}>
                <BlurView intensity={20} style={styles.mealCardContent}>
                  <MaterialCommunityIcons
                    name={meal.icon}
                    size={24}
                    color="#FFFFFF"
                    style={styles.mealIcon}
                  />
                  <View style={styles.mealInfo}>
                    <Text style={[styles.mealType, { color: '#FFFFFF' }]}>{meal.type}</Text>
                    <Text style={[styles.mealCalories, { color: 'rgba(255,255,255,0.8)' }]}>{meal.calories} calories</Text>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={24}
                    color="#FFFFFF"
                  />
                </BlurView>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.addButton}>
            <Text style={[styles.addButtonText, { color: '#FFFFFF' }]}>Add Meal</Text>
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
  calorieCard: {
    marginBottom: 20,
  },
  blurContainer: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  calorieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  calorieContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 15,
  },
  calorieStats: {
    alignItems: 'center',
  },
  calorieValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  calorieLabel: {
    fontSize: 14,
    marginTop: 5,
  },
  calorieDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#A8E6CF',
    borderRadius: 3,
  },
  macrosCard: {
    marginBottom: 20,
  },
  macrosTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  macrosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  macroLabel: {
    fontSize: 14,
    marginTop: 5,
  },
  mealsList: {
    marginBottom: 20,
  },
  mealCard: {
    marginBottom: 15,
  },
  mealCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  mealIcon: {
    marginRight: 15,
  },
  mealInfo: {
    flex: 1,
  },
  mealType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mealCalories: {
    fontSize: 14,
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NutritionScreen;
