/* eslint-disable import/order */
import {
  View,
  Text,
  useWindowDimensions,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';

const InfoCard = () => {
  const { width, height } = useWindowDimensions();
  const [loaded] = useFonts({
    PlaypenSans: require('@/assets/fonts/PlaypenSans-SemiBold.ttf'),
  });

  const fontScale = useWindowDimensions().fontScale;

  return (
    <View style={styles(fontScale, width).cardContainer}>
      <View style={styles(fontScale, width).cardInfo}>
        <View style={styles(fontScale, width).cardImageContainer}>
          <Image
            style={styles(fontScale, width).cardImage}
            source={require('@/assets/images/golden-pet.jpg')}
          />
        </View>
        <Text style={styles(fontScale, width, height, loaded).cardText}>
          Adopta a un amigo hoy mismo!
        </Text>
      </View>
      <View style={styles(fontScale, width).thumbnailContainer}>
        <Image
          source={require('@/assets/images/doberman.webp')}
          style={styles(fontScale, width, height, loaded).thumbnailImage}
        />
        <Image
          source={require('@/assets/images/buldog.webp')}
          style={styles(fontScale, width, height, loaded).thumbnailImage}
        />
        <Image
          source={require('@/assets/images/cool-cat.jpg')}
          style={styles(fontScale, width, height, loaded).thumbnailImage}
        />
        <Image
          source={require('@/assets/images/michi.webp')}
          style={styles(fontScale, width, height, loaded).thumbnailImage}
        />
      </View>
    </View>
  );
};

export default InfoCard;

const styles = (
  fontScale?: number,
  width?: number,
  height?: number,
  loaded?: boolean
) =>
  StyleSheet.create({
    cardContainer: {
      width: '90%',
      height: width! * 0.6,
      borderRadius: 25,
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 12,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#bc8dab',
      top: 10,
    },
    cardInfo: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      gap: 10,
    },
    cardImageContainer: {
      width: width! * 0.35,
      height: width! * 0.35,
      margin: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      borderWidth: 0.2,
      borderColor: 'orange',
      padding: 7,
      shadowColor: 'orange',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 16,
      backgroundColor: 'transparent',
    },
    cardImage: {
      width: width! * 0.3,
      height: width! * 0.3,
      borderRadius: 100,
    },
    cardText: {
      padding: 7,
      flexShrink: 1,
      color: 'black',
      fontSize: fontScale! < 1 ? 30 : fontScale! > 1 ? 23 : 27,
      fontFamily: loaded ? 'PlaypenSans' : '',
      bottom: 2,
    },
    thumbnailContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      gap: 10,
      bottom: 4,
    },
    thumbnailImage: {
      width: width! * 0.16,
      height: width! * 0.16,
      borderRadius: 100,
    },
  });
