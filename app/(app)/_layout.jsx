// app/(app)/_layout.jsx
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as firebase from '../../components/lib/firebaseConfig';

export default function AppLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  // Check authentication state
  useEffect(() => {
    const unsubscribe = firebase.fbauth.onAuthStateChanged((user) => {
      if (!user) {
        // If no user is signed in, redirect to login
        router.replace('/(auth)/login');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colorScheme === 'dark' ? '#000000' : '#FFFFFF',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Home'
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            title: 'Profile'
          }}
        />
        <Stack.Screen
          name="workouts"
          options={{
            title: 'Workouts'
          }}
        />
        <Stack.Screen
          name="nutrition"
          options={{
            title: 'Nutrition'
          }}
        />
        <Stack.Screen
          name="progress"
          options={{
            title: 'Progress'
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
