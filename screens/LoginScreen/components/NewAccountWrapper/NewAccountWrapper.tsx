/* eslint-disable import/order */
import { Text, Pressable } from 'react-native';
import React from 'react';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Link } from 'expo-router';

const NewAccountWrapper = () => {
  return (
    <Animated.View
      entering={FadeInUp.delay(700).duration(1000).springify()}
      className="flex-row justify-center"
    >
      <Text>No tienes una cuenta? </Text>
      <Link asChild href="/login/signupScreen">
        <Pressable>
          <Text className="text-sky-600">Crear una</Text>
        </Pressable>
      </Link>
    </Animated.View>
  );
};

export default NewAccountWrapper;
