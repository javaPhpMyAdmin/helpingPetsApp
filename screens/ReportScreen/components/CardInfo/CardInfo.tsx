/* eslint-disable import/order */
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import useRandomPet from '@/hooks/useRandomPet';

const CardInfo = () => {
  const { width, height } = useWindowDimensions();
  const [loaded] = useFonts({
    PlaypenSans: require('@/assets/fonts/PlaypenSans-SemiBold.ttf'),
  });

  const fontScale = useWindowDimensions().fontScale;

  const currentPet = useRandomPet();

  return (
    <>
      <View style={styles(fontScale, loaded, width, height).cardInfo}>
        {currentPet.image && (
          <Image
            style={styles(fontScale, loaded, width, height).imageCard}
            source={currentPet.image as ImageSourcePropType}
          />
        )}
        <View style={styles(fontScale, loaded, width, height).infoContainer}>
          <Text style={styles(fontScale, loaded, width, height).infoTitle}>
            {currentPet.title}
          </Text>
          <View
            style={
              styles(fontScale, loaded, width, height).descriptionContainer
            }
          >
            <View style={styles().descriptionWrap}>
              <Text style={styles().textDescription}>Género</Text>
              <Text style={styles().textOpacity}>{currentPet.gender}</Text>
            </View>
            <View style={styles().descriptionWrap}>
              <Text style={styles().textDescription}>Raza</Text>
              <Text style={styles().textOpacity}>{currentPet.breed}</Text>
            </View>
            <View style={styles().descriptionWrap}>
              <Text style={styles().textDescription}>Edad</Text>
              <Text style={styles().textOpacity}>{currentPet.age}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles(fontScale, loaded, width, height).helpmeContainer}>
        <Text style={styles(fontScale, loaded, width, height).helpmeText}>
          Ayúdame a encontrar a otros amigos perdidos o abandonados!
        </Text>
      </View>
    </>
  );
};

export default CardInfo;

const styles = (
  fontScale?: number,
  loaded?: boolean,
  width?: number,
  height?: number
) =>
  StyleSheet.create({
    cardInfo: {
      width: width! * 0.96,
      height: height! * 0.29,
      backgroundColor: 'white',
      borderRadius: 20,
      borderColor: 'pink',
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
      fontSize: fontScale! < 1 ? 20 : fontScale! > 1 ? 14 : 17,
      fontFamily: loaded ? 'PlaypenSans' : '',
      bottom: height! * 0.069,
      textAlign: 'center',
      textShadowColor: 'orange',
      textShadowRadius: 5,
      textShadowOffset: { width: 2, height: 4 },
    },
    helpmeContainer: {
      width: width! * 0.8,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      top: 6,
    },
    imageCard: {
      width: width! * 0.33,
      height: width! * 0.33,
      borderRadius: 70,
      bottom: height! * 0.035,
      borderColor: 'red',
      // borderWidth: 0.5,
      shadowColor: 'red',
      shadowOffset: {
        width: 1.5,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 12,
    },
    infoContainer: {
      minWidth: width! * 0.57,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: 1,
      right: 5,
    },
    descriptionWrap: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    textDescription: {
      color: 'orange',
      fontWeight: 'bold',
      fontSize: fontScale! < 1 ? 21 : fontScale! > 1 ? 13 : 18,
    },
    textOpacity: {
      color: 'gray',
      fontWeight: 'bold',
      fontSize: fontScale! < 1 ? 21 : fontScale! > 1 ? 13 : 18,
      opacity: 0.65,
    },
    infoTitle: {
      fontSize: fontScale! < 1 ? 28 : fontScale! > 1 ? 22 : 25,
      fontFamily: loaded ? 'PlaypenSans' : '',
      bottom: height! * 0.05,
    },
    descriptionContainer: {
      width: '100%',
      justifyContent: 'center',
      bottom: height! * 0.04,
      gap: 7,
    },
  });
