import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import ThemedTextInput from '../../components/ThemedTextInput';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const { updateAuthState } = useAuth();
  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response Status:', response.status);

      // const text = await response.text();
      // console.log(text); // checks what I'm getting
      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('userToken', data.token);
        console.log('Login Successful! Token saved');

        const decodedToken = jwtDecode(data.token);

        updateAuthState({
          isAuthorized: true,
          role: decodedToken.role,
          token: data.token,
        });
      } else {
        return response.status === 404
          ? Alert.alert('Invalid credentials')
          : Alert.alert('Login Failed', data.message);
      }
    } catch (error) {
      console.log('Login error', error.message);
      Alert.alert('Login error', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : -64}
      style={{ flex: 1, backgroundColor: '#04432c' }}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.header}>Welcome Back</Text>

        <ThemedTextInput
          placeholder="Email"
          keyboardType="email-address"
          label="Email"
          mode="outlined"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <ThemedTextInput
          placeholder="Password"
          label="Password"
          mode="outlined"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </ScrollView>
      <Link
        href="register"
        style={styles.register}>
        <Text style={styles.registerText}>Don&#39;t have an account? </Text>
        <Text style={styles.registerLink}>Sign Up</Text>
      </Link>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#04432c',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    marginBottom: 18,
    backgroundColor: '#fff',
    borderColor: '#E0E0E0',
    borderWidth: 0.5,
    borderRadius: 100,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 14,
    color: '#0f7f0f',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#0f7f0f',
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  register: {
    textAlign: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: '#ddd',
  },
  registerLink: {
    color: '#0f7f0f',
    fontWeight: 'bold',
  },
});
