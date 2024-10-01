/* eslint-disable import/order */
import { Link } from 'expo-router';
import React, { type ComponentProps } from 'react';
import { View, Image, StatusBar } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { FormLogin } from './components';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type href = ComponentProps<typeof Link>['href'];

const LoginScreen = () => {
  return (
    <View className="bg-white h-full w-full">
      <StatusBar barStyle="light-content" />
      <Image
        className="h-[80%] w-full absolute"
        source={require('@/assets/images/background.png')}
      />
      <View className="flex-row justify-around w-full absolute">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
          className="h-[225] w-[90]"
          source={require('@/assets/images/light.png')}
        />
        <Animated.Image
          entering={FadeInUp.delay(600).duration(1000).springify().damping(3)}
          className="h-[160] w-[65]"
          source={require('@/assets/images/light.png')}
        />
      </View>
      <FormLogin />
    </View>
  );
};

export default LoginScreen;
