/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { HeaderDetail } from '@/components';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Foundation } from '@expo/vector-icons';
import { Carousel, MarkFav } from './components';
import { PetsForAdoptionApi } from '@/types';
import { useAuth } from '../../context';

const DetailAdoptPet = () => {
  const [currentPet, setCurrentPet] = useState<PetsForAdoptionApi>();
  const { accessToken } = useAuth();
  const { width, height } = useWindowDimensions();
  const params = useLocalSearchParams();

  const getPetById = async () => {
    try {
      console.log('Fetching pet in DetailAdoptPetScreen...');
      const response = await fetch(
        `http://localhost:8082/api/v1/pets/${params.id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      setCurrentPet(data.result.result);
      console.log('PET DATA', data.result.result);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } //} finally {
    //   setTimeout(() => setIsLoading(false), 1500); // Simula carga
    // }
  };

  useEffect(() => {
    getPetById();
  }, []);

  const fontScale = useWindowDimensions().fontScale;

  return (
    <View style={styles({}).container}>
      <Carousel photosUrl={currentPet?.imageUrls!} />
      <HeaderDetail routeBack="/(auth)/(tabs)/adoptPet" />
      <View style={styles({ height }).cardContainer}>
        <View
          style={
            styles({ height, width, gender: currentPet?.gender })
              .cardInfoContainer
          }
        >
          <View style={styles({}).headerContainer}>
            <View style={styles({}).nameContainer}>
              <Text style={styles({ fontScale }).petName}>
                {currentPet?.name}
              </Text>
              {currentPet?.gender === 'Hembra' ? (
                <Foundation name="female-symbol" size={35} color="gray" />
              ) : (
                <Foundation name="male-symbol" size={38} color="gray" />
              )}
            </View>
            <MarkFav pet={currentPet!} />
          </View>
          <View style={styles({}).locationContainer}>
            <FontAwesome5
              name="map-marker-alt"
              size={17}
              color="gray"
              style={{ bottom: 1 }}
            />
            <Text style={styles({ fontScale }).location}>Sauce, Canelones</Text>
          </View>
          <View style={styles({}).descriptiveContainer}>
            <View style={styles({}).dataContainer}>
              <View style={styles({}).iconContainer}>
                <FontAwesome
                  name="birthday-cake"
                  size={30}
                  color={
                    currentPet?.gender === 'Hembra' ? 'hotpink' : 'skyblue'
                  }
                />
              </View>
              <View>
                <Text style={styles({ fontScale }).infoPet}>Edad</Text>
                <Text
                  style={
                    styles({
                      fontScale,
                      width,
                      height,
                      gender: currentPet?.gender,
                    }).textDescriptive
                  }
                >
                  {currentPet?.age}
                </Text>
              </View>
            </View>
            <View style={styles({}).dataContainer}>
              <View style={styles({}).iconContainer}>
                <MaterialCommunityIcons
                  name="weight-kilogram"
                  size={42}
                  color={
                    currentPet?.gender === 'Hembra' ? 'hotpink' : 'skyblue'
                  }
                />
              </View>
              <View>
                <Text style={styles({ fontScale }).infoPet}>Peso</Text>
                <Text
                  style={
                    styles({
                      fontScale,
                      width,
                      height,
                      gender: currentPet?.gender,
                    }).textDescriptive
                  }
                >
                  {currentPet?.weight} Kg
                </Text>
              </View>
            </View>
            <View style={styles({}).dataContainer}>
              <View style={styles({}).iconContainer}>
                <MaterialIcons
                  name="pets"
                  size={42}
                  color={
                    currentPet?.gender === 'Hembra' ? 'hotpink' : 'skyblue'
                  }
                />
              </View>
              <View>
                <Text style={styles({ fontScale }).infoPet}>Raza</Text>
                <Text
                  style={
                    styles({
                      fontScale,
                      width,
                      height,
                      gender: currentPet?.gender,
                    }).textDescriptive
                  }
                >
                  {currentPet?.breed}
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles({ fontScale }).aboutText}>
            Acerca de {currentPet?.name}
          </Text>
          <Text
            style={
              styles({ fontScale, height, width, gender: currentPet?.gender })
                .textAbout
            }
          >
            {currentPet?.description}
          </Text>
          <TouchableOpacity
            style={styles({ height, width, gender: currentPet?.gender }).button}
          >
            <Text style={styles({ fontScale }).buttonText}>
              Se mi nuevo amigo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailAdoptPet;

interface StylesProps {
  fontScale?: number;
  height?: number;
  width?: number;
  gender?: string | string[];
}

const styles = ({ fontScale, height, width, gender }: StylesProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    imagePet: { width: '100%', height: height! * 0.5 },
    textDescriptive: {
      fontWeight: '900',
      fontSize: fontScale! < 1 ? 21 : fontScale! > 1 ? 14 : 17,
      color: gender === 'Hembra' ? 'hotpink' : '#022b59',
    },
    cardContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: height! * 0.6,
      backgroundColor: 'white',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
    },
    descriptiveContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 6,
      left: 3,
      top: 2,
    },
    dataContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    infoPet: {
      fontSize: fontScale! < 1 ? 20 : fontScale! > 1 ? 13 : 16,
      fontWeight: '900',
      color: 'gray',
    },
    aboutText: {
      fontWeight: 'bold',
      fontSize: fontScale! < 1 ? 24 : fontScale! > 1 ? 17 : 21,
    },
    location: {
      fontSize: fontScale! < 1 ? 20 : fontScale! > 1 ? 13 : 17,
      fontWeight: 'bold',
      color: 'gray',
    },
    locationContainer: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      bottom: 2,
    },
    nameContainer: { flexDirection: 'row', gap: 10, alignItems: 'center' },
    petName: {
      fontSize: fontScale! < 1 ? 30 : fontScale! > 1 ? 23 : 27,
      fontWeight: 'bold',
    },
    headerContainer: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      width: '100%',
    },
    iconContainer: {
      height: 45,
      width: 45,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: '#e3e2e2',
      opacity: 0.7,
    },
    button: {
      left: width! * 0.045,
      width: '90%',
      height: height! * 0.08,
      backgroundColor: gender === 'Hembra' ? 'hotpink' : 'skyblue',
      opacity: 0.7,
      borderRadius: 35,
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 2,
    },
    cardInfoContainer: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'flex-start',
      marginHorizontal: 20,
      marginTop: 20,
      position: 'relative',
    },
    textAbout: {
      fontWeight: 'bold',
      fontSize: fontScale! < 1 ? 20 : fontScale! > 1 ? 13 : 17,
      color: 'gray',
      opacity: 0.8,
      bottom: 3,
    },
    buttonText: {
      fontSize: fontScale! < 1 ? 24 : fontScale! > 1 ? 20 : 25,
      color: 'black',
      fontWeight: '900',
    },
  });
