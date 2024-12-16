/* eslint-disable import/order */
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { HeaderDetail } from '@/components/HeaderDetail';
import { ButtonDetail } from '@/components/ButtonDetail';
import { CarouselDetailPet } from './components/CarouselDetailPet';
import { useAuth, usePets } from '@/context';
import AntDesign from '@expo/vector-icons/AntDesign';
import Toast from 'react-native-root-toast';

const DetailPet = () => {
  const { width, height } = useWindowDimensions();
  const { petId } = useLocalSearchParams();

  const { pets, removePet } = usePets();
  const { authState } = useAuth();

  const petFounded = pets?.find((pet) => pet.id === petId);

  const handleDelete = () => {
    Alert.alert('Eliminar Reporte', '¿Estás seguro de eliminar este reporte?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          removePet!(petFounded!);
          Toast.show('REPORTE ELIMINADO CON ÉXITO.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: false,
            backgroundColor: 'green',
          });
          router.back();
        },
      },
    ]);
  };

  return (
    <View style={styles({}).container}>
      <StatusBar translucent barStyle="dark-content" />
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <HeaderDetail routeBack="/(auth)/(tabs)/home" />
        <CarouselDetailPet photosUrl={petFounded?.photos!} />
        <Animated.View
          entering={FadeInDown.delay(400)}
          style={styles({ height, width }).textContainer}
        >
          <Text style={styles({}).textName}>{petFounded?.title}</Text>
          <Text style={styles({}).textLocation}>{petFounded?.userEmail}</Text>
        </Animated.View>
      </View>
      <View style={styles({ height }).cardContainer}>
        <Animated.View entering={FadeInDown.delay(800)}>
          {authState?.user.email === petFounded?.userEmail && (
            <View style={styles({ width }).buttonsContainer}>
              <TouchableOpacity style={styles({ width }).editButton}>
                <View style={styles({}).iconContainer}>
                  <AntDesign name="edit" size={27} color="white" />
                  <Text style={styles({}).buttonText}>EDITAR</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                style={styles({ width }).deleteButton}
              >
                <View style={styles({}).iconContainer}>
                  <AntDesign name="delete" size={27} color="white" />
                  <Text style={styles({}).buttonText}>ELIMINAR</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

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
      bottom: width! * 0.12,
      backgroundColor: 'rgba(0,0,0,0.5)',
      // opacity: 0.6,
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
    buttonsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      gap: 10,
      bottom: width! * 0.11,
    },
    editButton: {
      backgroundColor: '#a80ffad9',
      width: width! * 0.32,
      height: width! * 0.09,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 2,
      shadowRadius: 4,

      elevation: 9,
    },
    deleteButton: {
      backgroundColor: 'red',
      width: width! * 0.32,
      height: width! * 0.09,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 2,
      shadowRadius: 4,

      elevation: 9,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
  });
