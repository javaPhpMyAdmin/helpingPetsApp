import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  ImageBackground,
  Animated as Anima,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from 'react-native-reanimated';

const Index = () => {
  const opacityAnimation = useRef(new Anima.Value(0.5)).current;

  const opacityStyle = { opacity: opacityAnimation };

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
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  }, []);
  return (
    <View className="flex flex-1 flex-col">
      <ImageBackground
        source={require('@/assets/images/splashImage.jpg')}
        className="flex flex-1 object-cover justify-center items-center relative"
      >
        <Animated.Text
          entering={FadeInRight.delay(1200)
            .duration(1000)
            .springify()
            .damping(3)}
          className="text-2xl font-extrabold mb-5 text-center top-16 absolute"
        >
          HELP PAW PETS
        </Animated.Text>
        <Anima.View style={opacityStyle}>
          <Image
            source={require('@/assets/images/songam.png')}
            className="w-[190] h-[190] justify-center items-center"
          />
        </Anima.View>
        <Animated.Text
          entering={FadeInDown.delay(1000)
            .duration(1000)
            .springify()
            .damping(3)}
          className="mt-3 font-extrabold text-black text-2xl text-center"
        >
          CARGANDO...
        </Animated.Text>
      </ImageBackground>
    </View>
  );
};

export default Index;
