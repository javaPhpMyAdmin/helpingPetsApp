/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */
import { Link, Slot, Stack, useRouter, useSegments } from 'expo-router';
import 'react-native-reanimated';
import { SessionProvider } from '../context/AuthProvider/AuthProvider';
import { useAuth } from '../context/AuthContext/AuthContext';
import { ComponentProps, useEffect } from 'react';
import { PetsProvider } from '../context';
import { RootSiblingParent } from 'react-native-root-siblings';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { authState } = useAuth();
  const isAuthenticated = authState?.authenticated;
  const segments = useSegments();
  const router = useRouter();

  // useEffect(() => {
  //   const inTabsGroup = segments[0] === '(auth)';

  //   if (isAuthenticated && !inTabsGroup) {
  //     router.replace('/(auth)/ReportPet');
  //   } else if (!isAuthenticated) {
  //     router.replace('/(public)');
  //   }
  //   console.log({ authState });
  // }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  // <Stack>
  //   <Stack.Screen name="index" options={{ headerShown: false }} />
  //   <Stack.Screen name="login/index" options={{ headerShown: false }} />
  //   <Stack.Screen
  //     name="login/signupScreen"
  //     options={{ headerShown: false }}
  //   />
  //   <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  //   <Stack.Screen name="testIdtest" options={{ headerShown: false }} />
  //   <Stack.Screen name="mapPets" options={{ headerShown: false }} />
  //   <Stack.Screen name="reportPet" options={{ headerShown: false }} />
  //   <Stack.Screen name="ReportPet" options={{ headerShown: false }} />
  // </Stack>

  return (
    <SessionProvider>
      <PetsProvider>
        <RootSiblingParent>
          <InitialLayout />
        </RootSiblingParent>
      </PetsProvider>
    </SessionProvider>
  );
}
