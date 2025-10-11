// app/(tabs)/_layout.jsx
import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(user)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(collector)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
