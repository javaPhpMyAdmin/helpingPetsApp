import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <Text>TEST LAYOUT</Text>
      <Link asChild href="/testNav">
        <Pressable style={styles.house}>
          <FontAwesome6 name="house" />
          <Text>IR A TEST NAV</Text>
        </Pressable>
      </Link>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  house: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
});
