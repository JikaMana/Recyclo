import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Get Started', headerShown: false }}
      />
      <Stack.Screen
        name="register"
        options={{ title: 'Sign Up', headerShown: false }}
      />
      <Stack.Screen
        name="login"
        options={{ title: 'Welcome Back', headerShown: false }}
      />
    </Stack>
  );
}
