/* eslint-disable import/order */
import {
  View,
  Text,
  useWindowDimensions,
  Image,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CustomButton } from './components';
import {
  getRandomCardInfo,
  PetsForCardInfo,
} from '../../utils/generateRandomCardInfo';

export const ReportScreen = () => {
  const { width, height } = useWindowDimensions();
  const [loaded] = useFonts({
    PlaypenSans: require('@/assets/fonts/PlaypenSans-SemiBold.ttf'),
  });
  const [currentPet, setCurrentPet] = useState<PetsForCardInfo>();

  useEffect(() => {
    const currentPetInfoCard = getRandomCardInfo();
    setCurrentPet(currentPetInfoCard);
  }, []);

  return (
    <View style={styles().container}>
      <View style={styles(loaded, width, height).greetingContainer}>
        <View style={{ left: width * 0.03, top: height * 0.03 }}>
          <Text style={styles(loaded).meetYou}>Encantado de conocerte!</Text>
          <View>
            <Text style={styles(loaded).welcome}>Bienvenido</Text>
            <Text style={styles(loaded).welcome}>a</Text>
            <Text style={styles(loaded).welcome}>Helping pets</Text>
          </View>
        </View>
        <View>
          <Animated.Image
            entering={FadeInDown.delay(200)
              .duration(2000)
              .damping(4)
              .springify()}
            style={styles(loaded, width, height).imageContainer}
            source={require('@/assets/images/paws.webp')}
          />
        </View>
      </View>
      <View style={styles(loaded, width, height).cardContainer}>
        <View style={styles(loaded, width, height).cardInfo}>
          <Image
            style={styles(loaded, width, height).imageCard}
            source={require('@/assets/images/golden-pet.jpg')}
          />
          <View
            style={{
              width: width * 0.5,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: 10,
              right: 5,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontFamily: loaded ? 'PlaypenSans' : '',
                bottom: height * 0.05,
              }}
            >
              {currentPet?.title}
            </Text>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                bottom: height * 0.04,
                gap: 7,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <Text
                  style={{ color: 'orange', fontWeight: 'bold', fontSize: 18 }}
                >
                  Género
                </Text>
                <Text
                  style={{
                    color: 'gray',
                    fontWeight: 'bold',
                    fontSize: 16,
                    opacity: 0.65,
                  }}
                >
                  {currentPet?.gender}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <Text
                  style={{ color: 'orange', fontWeight: 'bold', fontSize: 18 }}
                >
                  Raza
                </Text>
                <Text
                  style={{
                    color: 'gray',
                    fontWeight: 'bold',
                    fontSize: 16,
                    opacity: 0.65,
                  }}
                >
                  {currentPet?.breed}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignContent: 'center',
                }}
              >
                <Text
                  style={{ color: 'orange', fontWeight: 'bold', fontSize: 18 }}
                >
                  Edad
                </Text>
                <Text
                  style={{
                    color: 'gray',
                    fontWeight: 'bold',
                    fontSize: 16,
                    opacity: 0.65,
                  }}
                >
                  {currentPet?.age}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles(loaded, width, height).helpmeContainer}>
          <Text style={styles(loaded).helpmeText}>
            Ayúdame a encontrar a otros amigos perdidos o abandonados!
          </Text>
        </View>
        <View style={styles(loaded, width, height).containerReport}>
          <View>
            <Text style={styles(loaded).reportTittle}>
              Reportar una mascota perdida
            </Text>
          </View>
          <View style={styles(loaded, width, height).buttonReportContainer}>
            <CustomButton
              loaded={loaded}
              width={width}
              height={height}
              title="He encontrado una mascota"
              type={1}
            />
          </View>
          <View style={styles(loaded, width, height).buttonReportContainer}>
            <CustomButton
              loaded={loaded}
              width={width}
              height={height}
              title="He perdido a mi mascota"
              type={2}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

// export default ReportScreen;

const styles = (loaded?: boolean, width?: number, height?: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    greetingContainer: {
      backgroundColor: 'orange',
      width: '100%',
      height: height! * 0.4,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      padding: 15,
      borderBottomEndRadius: 30,
      borderBottomStartRadius: 30,
      shadowColor: 'blue',
      shadowOffset: {
        width: 1.5,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 15,
    },
    welcome: {
      fontSize: 30,
      color: 'white',
      fontFamily: loaded ? 'PlaypenSans' : '',
    },
    meetYou: {
      color: 'white',
      fontSize: 14,
      fontFamily: loaded ? 'PlaypenSans' : '',
    },
    imageContainer: {
      width: width! * 0.56,
      height: height! * 0.25,
      left: width! * 0.04,
      bottom: height! * 0.01,
    },
    buttonReportContainer: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      height: height! * 0.065,
      width: width! * 0.9,
      backgroundColor: 'white',
      borderRadius: 12,
      borderColor: 'gray',
      borderWidth: 0.3,
      shadowColor: 'black',
      shadowOffset: {
        width: 1.5,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 2.5,
    },
    reportTittle: {
      color: 'black',
      fontSize: 22,
      fontFamily: loaded ? 'PlaypenSans' : '',
    },
    containerReport: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      gap: 15,
      bottom: height! * 0.03,
    },
    cardContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flex: 2,
    },
    cardInfo: {
      width: width! * 0.9,
      height: height! * 0.27,
      backgroundColor: 'white',
      borderRadius: 20,
      borderColor: 'orange',
      borderWidth: 0.4,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginHorizontal: 1,
      shadowColor: '#424040',
      shadowOffset: {
        width: 1.5,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 12,
      top: height! * 0.02,
    },
    helpmeText: {
      color: 'black',
      flexShrink: 1,
      fontSize: 16,
      fontFamily: loaded ? 'PlaypenSans' : '',
      bottom: 80,
      right: 16,
    },
    imageCard: {
      width: width! * 0.33,
      height: width! * 0.33,
      borderRadius: 70,
      bottom: height! * 0.035,
    },
    helpmeContainer: {
      width: width! * 0.8,
      justifyContent: 'center',
      alignItems: 'center',
      left: 10,
    },
  });
