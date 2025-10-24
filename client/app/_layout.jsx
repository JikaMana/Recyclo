import { GestureHandlerRootView } from 'react-native-gesture-handler';

import 'react-native-reanimated';
import { PortalProvider } from '@gorhom/portal';

import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { PickupProvider } from '../contexts/PickupContext';
import { UserProvider } from '../contexts/UserContext';

function RootLayoutContent() {
  const { authState, updateAuthState } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');

        if (token) {
          const decodedToken = jwtDecode(token);
          updateAuthState({
            isAuthorized: true,
            role: decodedToken.role,
            token: token,
          });
        } else {
          updateAuthState({
            isAuthorized: false,
            role: null,
            token: null,
          });
        }
      } catch (err) {
        console.error('Auth check failed', err);

        updateAuthState({
          isAuthorized: false,
          role: null,
          token: null,
        });
      } finally {
        setIsReady(true);
      }
    };
    checkAuthStatus();
  }, [updateAuthState]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator
          size="56"
          color="#2e7d32"
        />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={authState.isAuthorized}>
            <Stack.Screen
              name="(tabs)"
              options={{ title: 'Tabs', headerShown: false }}
            />
          </Stack.Protected>
          <Stack.Protected guard={!authState.isAuthorized}>
            <Stack.Screen
              name="(auth)"
              options={{ title: 'Auth', headerShown: false }}
            />
          </Stack.Protected>
        </Stack>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <UserProvider>
        <PickupProvider>
          <RootLayoutContent />
        </PickupProvider>
      </UserProvider>
    </AuthProvider>
  );
}

// import React, { useCallback, useMemo, useRef } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

// const App = () => {
//   // ref
//   const bottomSheetRef = useRef(null);

//   // callbacks
//   const handleSheetChanges = useCallback((index) => {
//     console.log('handleSheetChanges', index);
//   }, []);

//   // renders
//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <BottomSheet
//         ref={bottomSheetRef}
//         onChange={handleSheetChanges}>
//         <BottomSheetView style={styles.contentContainer}>
//           <Text>Awesome 🎉</Text>
//         </BottomSheetView>
//       </BottomSheet>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'grey',
//   },
//   contentContainer: {
//     flex: 1,
//     padding: 36,
//     alignItems: 'center',
//   },
// });

// export default App;
