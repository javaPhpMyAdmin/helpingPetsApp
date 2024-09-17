import { Stack } from 'expo-router';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="login/signupScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="testIdtest" options={{ headerShown: false }} />
      <Stack.Screen name="mapPets" options={{ headerShown: false }} />
      <Stack.Screen name="reportPet" options={{ headerShown: false }} />
      <Stack.Screen name="ReportPet" options={{ headerShown: false }} />
    </Stack>
  );
}
