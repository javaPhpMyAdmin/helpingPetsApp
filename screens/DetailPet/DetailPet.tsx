/* eslint-disable import/order */
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { HeaderDetail } from '@/components/HeaderDetail';
import { ButtonDetail } from '@/components/ButtonDetail';
import { CarouselDetailPet } from './components/CarouselDetailPet';
import { usePets } from '../../context';

const DetailPet = () => {
  const { height } = useWindowDimensions();
  const { petId } = useLocalSearchParams();

  const { pets } = usePets();

  const petFounded = pets?.find((pet) => pet.id === petId);

  return (
    <View style={styles({}).container}>
      <StatusBar translucent barStyle="dark-content" />
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <HeaderDetail routeBack="/(auth)/(tabs)/home" />
        {/* <Animated.Image
          resizeMode="cover"
          // sharedTransitionTag={String(petId)}
          style={{ width, height: width * 0.95 }}
          source={{
            uri: String(images),
          }}
        /> */}
        <CarouselDetailPet photosUrl={petFounded?.photos as []} />
        <Animated.View
          entering={FadeInDown.delay(400)}
          style={styles({ height }).textContainer}
        >
          <Text style={styles({}).textName}>{petFounded?.title}</Text>
          <Text style={styles({}).textLocation}>{petFounded?.userEmail}</Text>
        </Animated.View>
      </View>
      <View style={styles({ height }).cardContainer}>
        <Animated.View entering={FadeInDown.delay(800)}>
          <Text style={styles({}).textTitle}>Descripción del reporte </Text>
          <Text style={styles({}).textDescription}>
            {petFounded?.aboutPet}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et deserunt
            dolorem dicta ab id. Odit ut recusandae dolorum eum nihil, facilis
            aliquam aliquid eligendi ullam tempore minima perferendis? Eaque,
            blanditiis?
          </Text>
        </Animated.View>
        <ButtonDetail
          lat={Number(petFounded?.lat)}
          long={Number(petFounded?.long)}
        />
      </View>
    </View>
  );
};

export default DetailPet;

interface StylesProps {
  fontScale?: number;
  height?: number;
  width?: number;
}

const styles = ({ fontScale, height, width }: StylesProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    textContainer: {
      position: 'absolute',
      bottom: 30,
      backgroundColor: 'rgba(0,0,0,0.5)',
      left: 10,
      right: 10,
      padding: 16,
      borderRadius: 20,
    },
    textName: {
      color: 'white',
      fontSize: 28,
      fontWeight: 'bold',
    },
    textLocation: {
      color: 'white',
      fontSize: 16,
    },
    textTitle: {
      color: 'gray',
      fontSize: 28,
      fontWeight: 'bold',
      margin: 10,
    },
    textDescription: {
      fontSize: 16,
      marginHorizontal: 10,
      textAlign: 'justify',
    },
    cardContainer: {
      position: 'absolute',
      bottom: 10,
      width: '100%',
      height: height! * 0.59,
      backgroundColor: 'white',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
  });
