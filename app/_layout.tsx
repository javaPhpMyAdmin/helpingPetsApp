import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Stack>
      {/* <Stack.Screen name="index" /> */}
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen name="signupScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
