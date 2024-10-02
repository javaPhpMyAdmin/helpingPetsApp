/* eslint-disable import/order */
import { View, StatusBar, Image } from 'react-native';
import React from 'react';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { FormSignUp } from './components';
import { useKeyboardVisible } from '../../hooks/useIsKeyboardVisible';

const SignUpScreen = () => {
  const isKeyboardVisible = useKeyboardVisible();
  return (
    <View className="bg-white h-full w-full">
      <StatusBar barStyle="light-content" />
      <Image
        className={
          isKeyboardVisible
            ? 'h-[60%] transition-all duration-75 ease-in w-full absolute'
            : 'h-[70%] w-full absolute'
        }
        source={require('@/assets/images/background.png')}
      />
      <View className="flex-row justify-around w-full absolute">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
          className={isKeyboardVisible ? 'h-[125] w-[50]' : 'h-[225] w-[90]'}
          source={require('@/assets/images/light.png')}
        />
        <Animated.Image
          entering={FadeInUp.delay(600).duration(1000).springify().damping(3)}
          className={isKeyboardVisible ? 'h-[75] w-[25]' : 'h-[160] w-[65]'}
          source={require('@/assets/images/light.png')}
        />
      </View>
      <FormSignUp />
    </View>
  );
};

export default SignUpScreen;
