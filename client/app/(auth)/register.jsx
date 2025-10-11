import { Link, useRouter } from 'expo-router';
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

export default function Register() {
  const router = useRouter();
  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();

  const handleRegister = async () => {
    console.log(BASE_URL);
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, number, password, role: 'user' }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log('Registered Successful!');
        Alert.alert('Registered Successful!');

        router.replace('/login');
      } else {
        console.log('Registeration failed:', data.message);
        Alert.alert('Registeration Failed', data.message);
      }
      console.log('passed here 4');
    } catch (error) {
      console.error('Network or server error:', error);
      Alert.alert('Error', 'Could not connect to the server.');
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
        <Text style={styles.header}>Create an Account</Text>
        <ThemedTextInput
          placeholder="Full Name"
          label="Name"
          mode="outlined"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <ThemedTextInput
          placeholder="Enter your email"
          autoCapitalize="none"
          label="Email"
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <ThemedTextInput
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          label="Phone"
          mode="outlined"
          style={styles.input}
          value={number}
          onChangeText={setNumber}
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
        <ThemedTextInput
          placeholder="Referral Code (Optional)"
          style={styles.input}
          // value={}
          // onChangeText={set}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
      <Link
        href="login"
        style={styles.login}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <Text style={styles.loginLink}>Sign In</Text>
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
  login: {
    textAlign: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#ddd',
  },
  loginLink: {
    color: '#0f7f0f',
    fontWeight: 'bold',
  },
});
