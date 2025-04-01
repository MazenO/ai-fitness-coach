import { StyleSheet, View} from 'react-native';

import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from '../components/screens/LoginScreen';

export default function HomeScreen() {
  
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleAuthMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <LoginScreen />
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});