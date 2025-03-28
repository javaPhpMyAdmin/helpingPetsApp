/* eslint-disable import/order */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, router } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { type ComponentProps } from 'react';
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInLeft,
  Easing,
  LightSpeedInLeft,
} from 'react-native-reanimated';
import { useAuth } from '@/context';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Href = ComponentProps<typeof Link>['href'];

const Index = () => {
  const { authState } = useAuth();
  const isAuthenticated = authState;
  const { width, height } = useWindowDimensions();

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    setTimeout(
      () =>
        isAuthenticated
          ? // ? router.replace('/(auth)/addNewPet')
            // router.replace('/(auth)/ReportPet')
            // router.replace('/(public)/login')
            router.replace('/(auth)/(tabs)/home')
          : // router.replace('/(auth)/(tabs)/favPets')
            router.replace('/(auth)/(tabs)/home')
      // router.replace('/(auth)/(tabs)/adopt')
      // router.replace('/(public)/login')
      //router.replace('/(public)/login/signup') //router.replace('/(public)/login'),
    );
  }, []);
  return (
    <View style={styles().container}>
      <Animated.Image
        entering={FadeInDown.delay(600).duration(1200).damping(2).springify()}
        style={styles(width, height).pawsImage}
        source={require('@/assets/images/paws.webp')}
      />

      <Animated.View
        entering={FadeInLeft.delay(1500).duration(1000).springify()}
        style={styles(width, height).walkingAnimation}
      >
        <LottieView
          style={{ flex: 1, backgroundColor: 'orange' }}
          source={require('@/assets/animations/walking_dog.json')}
          autoPlay
          loop
        />
      </Animated.View>

      <Animated.View
        entering={LightSpeedInLeft.delay(1500)
          .duration(1200)
          .easing(Easing.ease)}
        style={styles(width, height).loadingText}
      >
        <Text className="font-semibold text-black text-2xl">CARGANDO</Text>
        <LottieView
          style={styles(width, height).loadingAnimation}
          source={require('@/assets/animations/loading_animation.json')}
          autoPlay
          loop
        />
      </Animated.View>
    </View>
  );
};

export default Index;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'orange',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pawsImage: {
      width: width! * 0.7,
      height: height! * 0.35,
      top: height! * 0.045,
    },
    walkingAnimation: {
      aspectRatio: 2,
      height: height! * 0.46,
      padding: 0,
      top: 50,
    },
    loadingText: {
      flexDirection: 'row',
      height: 50,
      width: 200,
      alignItems: 'center',
      justifyContent: 'center',
      bottom: 50,
    },
    loadingAnimation: {
      top: 3.5,
      width: 70,
      height: 70,
      right: 7,
    },
  });
