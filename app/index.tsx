import { Link, router } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { type ComponentProps } from 'react';
import {
  View,
  Animated as Anima,
  Text,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInLeft,
  Easing,
  LightSpeedInLeft,
} from 'react-native-reanimated';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Href = ComponentProps<typeof Link>['href'];

const Index = () => {
  const opacityAnimation = useRef(new Anima.Value(0.5)).current;
  const { width, height } = useWindowDimensions();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animateElement = () => {
    Anima.timing(opacityAnimation, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      Anima.timing(opacityAnimation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    });
  };
  useEffect(() => {
    animateElement();
    // setTimeout(() => router.replace('/(tabs)/home'), 500);
    setTimeout(() => router.replace('/reportRoute'), 500);
  }, [animateElement]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animated.Image
        entering={FadeInDown.delay(600).duration(1200).damping(2).springify()}
        style={{
          width: width * 0.7,
          height: height * 0.35,
          top: height * 0.045,
        }}
        source={require('@/assets/images/paws.webp')}
      />

      <Animated.View
        entering={FadeInLeft.delay(1500).duration(1000).springify()}
        style={{
          aspectRatio: 2,
          height: height * 0.46,
          padding: 0,
          top: 50,
        }}
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
        style={{
          flexDirection: 'row',
          height: 50,
          width: 200,
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 50,
        }}
      >
        <Text className="font-semibold text-black text-2xl">CARGANDO</Text>
        <LottieView
          style={{
            top: 3.5,
            width: 70,
            height: 70,
            right: 7,
          }}
          source={require('@/assets/animations/loading_animation.json')}
          autoPlay
          loop
        />
      </Animated.View>
    </View>
  );
};

export default Index;
