import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DietCard({ meal, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{meal.name}</Text>
        <Text style={styles.time}>{meal.time}</Text>
      </View>
      <View style={styles.macros}>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{meal.calories}</Text>
          <Text style={styles.macroLabel}>Calories</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{meal.protein}g</Text>
          <Text style={styles.macroLabel}>Protein</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{meal.carbs}g</Text>
          <Text style={styles.macroLabel}>Carbs</Text>
        </View>
        <View style={styles.macroItem}>
          <Text style={styles.macroValue}>{meal.fats}g</Text>
          <Text style={styles.macroLabel}>Fats</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  time: {
    color: '#666',
  },
  macros: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  macroLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});