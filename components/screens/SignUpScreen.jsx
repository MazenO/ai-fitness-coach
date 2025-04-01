// app/(auth)/SignUpScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../lib/firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    let newErrors = {};
    
    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[0-9])/.test(password)) {
      newErrors.password = 'Password must contain at least one number';
    } else if (!/(?=.*[A-Z])/.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Create a user profile in Firestore
        await setDoc(doc(firestore, 'users', user.uid), {
          email: email,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          fitnessGoals: [],
          workoutHistory: [],
          profileComplete: false
        });

        // Navigate to main app
        router.replace('/(app)');
      } catch (error) {
        setLoading(false);
        if (error.code === 'auth/email-already-in-use') {
          setErrors({ email: 'Email is already registered' });
        } else if (error.code === 'auth/invalid-email') {
          setErrors({ email: 'Invalid email address' });
        } else if (error.code === 'auth/weak-password') {
          setErrors({ password: 'Password is too weak' });
        } else {
          setErrors({ general: error.message });
        }
      }
    }
  };

  return (
    <LinearGradient
      colors={['#4158D0', '#C850C0', '#FFCC70']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="arm-flex" size={60} color="#fff" />
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Start your fitness journey today</Text>
          </View>

          <BlurView intensity={20} style={styles.formContainer}>
            {errors.general && <Text style={styles.generalError}>{errors.general}</Text>}
            
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="email-outline" size={24} color="#fff" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Email"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrors(prev => ({ ...prev, email: null }));
                }}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
              />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="lock-outline" size={24} color="#fff" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors(prev => ({ ...prev, password: null }));
                }}
                secureTextEntry
                editable={!loading}
              />
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="lock-check-outline" size={24} color="#fff" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, errors.confirmPassword && styles.inputError]}
                placeholder="Confirm Password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setErrors(prev => ({ ...prev, confirmPassword: null }));
                }}
                secureTextEntry
                editable={!loading}
              />
            </View>
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

            <View style={styles.passwordRequirements}>
              <Text style={styles.requirementText}>Password must contain:</Text>
              <Text style={[
                styles.requirementItem,
                password.length >= 6 && styles.requirementMet
              ]}>• At least 6 characters</Text>
              <Text style={[
                styles.requirementItem,
                /(?=.*[0-9])/.test(password) && styles.requirementMet
              ]}>• At least one number</Text>
              <Text style={[
                styles.requirementItem,
                /(?=.*[A-Z])/.test(password) && styles.requirementMet
              ]}>• At least one uppercase letter</Text>
            </View>

            <TouchableOpacity 
              style={[styles.signupButton, loading && styles.signupButtonDisabled]} 
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#4158D0" size="small" />
              ) : (
                <Text style={styles.signupButtonText}>SIGN UP</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.loginLink} 
              onPress={() => router.push('/login')}
              disabled={loading}
            >
              <Text style={styles.loginLinkText}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </BlurView>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  formContainer: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: '#FFE66D', 
    fontSize: 14,
    marginTop: -15,
    marginBottom: 10,
    marginLeft: 35,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  generalError: {
    color: '#FFE66D',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  inputError: {
    borderBottomColor: '#FFE66D',
  },
  passwordRequirements: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  requirementText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
    opacity: 0.9,
  },
  requirementItem: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 3,
  },
  requirementMet: {
    color: '#A8E6CF', 
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  signupButtonDisabled: {
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  signupButtonText: {
    color: '#4158D0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default SignUpScreen;
