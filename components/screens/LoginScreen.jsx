import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { signInWithEmailAndPassword } from 'firebase/auth';
import * as firebase from '../lib/firebaseConfig';
import { useColorScheme } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      setLoading(true);
      const auth = firebase.fbauth;
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setTimeout(() => {
          router.replace('/(app)');
        }, 100);
      } catch (error) {
        setLoading(false);
        if (error.code === 'auth/user-not-found') {
          setErrors({ email: 'No account found with this email' });
        } else if (error.code === 'auth/wrong-password') {
          setErrors({ password: 'Incorrect password' });
        } else if (error.code === 'auth/invalid-email') {
          setErrors({ email: 'Invalid email format' });
        } else {
          setErrors({ general: error.message });
        }
      }
    } else {
      console.log("Invalid form");
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000000' : '#FFFFFF' }]}>
      <LinearGradient
        colors={['#4158D0', '#C850C0', '#FFCC70']}
        style={styles.container}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="arm-flex" size={80} color={isDark ? '#FFFFFF' : '#fff'} />
            <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#fff' }]}>Welcome Back</Text>
            <Text style={[styles.subtitle, { color: isDark ? '#CCCCCC' : 'rgba(255,255,255,0.8)' }]}>
              Login to continue your fitness journey
            </Text>
          </View>

          <BlurView intensity={20} tint={isDark ? 'dark' : 'light'} style={styles.formContainer}>
            {errors.general && <Text style={styles.generalError}>{errors.general}</Text>}

            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="email-outline" size={24} color="#fff" style={styles.inputIcon} />
              <TextInput
                style={[
                  styles.input,
                  errors.email && styles.inputError
                ]}
                placeholder="Email"
                placeholderTextColor="rgba(255,255,255,0.6)"
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
                style={[
                  styles.input,
                  errors.password && styles.inputError
                ]}
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.6)"
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

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.loginButton,
                loading && styles.loginButtonDisabled
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#4158D0" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>LOGIN</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.signupButton}
              onPress={() => router.push('/signup')}
              disabled={loading}
            >
              <Text style={styles.signupButtonText}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </BlurView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
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
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  formContainer: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#FFFFFF',
    paddingVertical: 12,
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
    borderColor: '#FFE66D',
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 25,
  },
  forgotPasswordText: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#4158D0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LoginScreen;
