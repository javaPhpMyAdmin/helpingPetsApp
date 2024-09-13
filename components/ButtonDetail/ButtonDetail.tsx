import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

export const ButtonDetail = () => {
  const { width } = useWindowDimensions();
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  return (
    <AnimatedPressable
      entering={FadeInDown.delay(1000)}
      style={[styles.container, { width: width * 0.9 }]}
      onPress={() => {}}
    >
      <Text style={styles.text}>Ver en el mapa</Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c6cce',
    padding: 22,
    alignItems: 'center',
    borderRadius: 40,
    marginBottom: 20,
    top: 20,
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
