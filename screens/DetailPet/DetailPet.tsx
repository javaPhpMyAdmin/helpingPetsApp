/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
import { useAuth } from '@/context';
import AntDesign from '@expo/vector-icons/AntDesign';
import Toast from 'react-native-root-toast';
import { LostReportApi, ReportPetApp } from '../../types';

const LOSTPET = 'lost-pet/';
const FOUNDPET = 'found-pet/';
const LOST = 'LOST';

const DetailPet = () => {
  const [petFounded, setPetFounded] = useState<ReportPetApp>();
  const { width, height } = useWindowDimensions();
  const { petId, reportType } = useLocalSearchParams();
  console.log('PET ID', petId);
  console.log('REPORT TYPE', reportType);
  // const { pets, removePet } = usePets();
  const { accessToken, currentUser } = useAuth();

  const getReportById = async (id: number, reportType: string) => {
    const argument = reportType === 'LOST' ? 'lost-pet/' : 'found-pet/';
    const response = await fetch(
      `http://localhost:8082/api/v1/reports/${argument}${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    console.log('REPORT FOUND', JSON.stringify(data.result.Result, null, 4));

    if (reportType === LOST) {
      const petFormatted = reportPetAddapterFromLostReport(data.result.Result);
      setPetFounded(petFormatted);
      console.log('PET FORMATTED', JSON.stringify(petFormatted, null, 4));
    }
  };

  const deleteReportById = async (id: number, reportType: string) => {
    const argument = reportType === LOST ? LOSTPET : FOUNDPET;
    try {
      const response = await fetch(
        `http://localhost:8082/api/v1/reports/${argument}${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      console.log('REPORT DELETED', JSON.stringify(data, null, 4));
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const reportPetAddapterFromLostReport = (
    report: LostReportApi
  ): ReportPetApp => {
    return {
      breed: report.pet.breed,
      description: report.pet.description,
      reportId: report.reportId,
      title: report.title,
      imagesPet: report.images.map((image) => image.imageUrl),
      petName: report.pet.petName,
      reportType: report.reportType,
      reportedAt: report.metadata.reportedAt,
      reportedBy: report?.reporter?.contactEmail,
      status: report.metadata.status,
      gender: report?.gender,
    };
  };
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
          // removePet!(petFounded!);
          deleteReportById(Number(petId), String(reportType));
          Toast.show('REPORTE ELIMINADO CON ÉXITO.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: false,
            backgroundColor: 'green',
          });
          router.replace('/(auth)/(tabs)/home');
        },
      },
    ]);
  };

  useEffect(() => {
    getReportById(Number(petId), String(reportType));
  }, [petId]);

  return (
    <View style={styles({}).container}>
      <StatusBar translucent barStyle="dark-content" />
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <HeaderDetail routeBack="/(auth)/(tabs)/home" />
        <CarouselDetailPet photosUrl={petFounded?.imagesPet!} />
        <Animated.View
          entering={FadeInDown.delay(400)}
          style={styles({ height, width }).textContainer}
        >
          <Text style={styles({}).textName}>{petFounded?.title!}</Text>
          <Text style={styles({}).textLocation}>{petFounded?.title!}</Text>
        </Animated.View>
      </View>
      <View style={styles({ height }).cardContainer}>
        <Animated.View entering={FadeInDown.delay(800)}>
          {currentUser?.email === petFounded?.reportedBy! && (
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
            {petFounded?.description!}
          </Text>
        </Animated.View>
        <ButtonDetail
          lat={Number(petFounded?.latitude!)}
          long={Number(petFounded?.longitude!)}
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
