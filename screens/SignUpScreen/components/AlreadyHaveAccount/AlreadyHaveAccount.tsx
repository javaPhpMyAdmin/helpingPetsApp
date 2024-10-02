/* eslint-disable import/order */
import { Text, Pressable } from 'react-native';
import React from 'react';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { router } from 'expo-router';

const AlreadyHaveAccount = () => {
  return (
    <Animated.View
      entering={FadeInUp.delay(900).duration(1000).springify()}
      className="flex-row justify-center"
    >
      <Text>Ya tienes una cuenta? </Text>
      <Pressable onPress={() => router.push('/login')}>
        <Text className="text-sky-600">Login</Text>
      </Pressable>
    </Animated.View>
  );
};

export default AlreadyHaveAccount;
