/* eslint-disable import/order */
import AntDesign from '@expo/vector-icons/AntDesign';
import Foundation from '@expo/vector-icons/Foundation';
import { router } from 'expo-router';
import React from 'react';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { Marker, MarkerLostPet, Photo } from '@/types/types';
import { generateColor } from '@/utils/generateRandomColor';

enum Gender {
  Male = 'male',
  Female = 'female',
}
interface RenderItemProps {
  item: Marker & MarkerLostPet;
  index: number;
}

const RenderItem = ({ item, index }: RenderItemProps) => {
  const { width } = useWindowDimensions();
  const randomColor = generateColor();
  const fontScale = useWindowDimensions().fontScale;
  console.log(item.photos[0].uri);

  return (
    <Pressable
      style={styles({ width }).container}
      onPress={() =>
        router.push<Marker>({
          pathname: '/(auth)/detailPet',
          params: {
            petId: item.id,
          },
        })
      }
    >
      <View style={styles({ width, randomColor }).squareImage}>
        <Animated.Image
          // sharedTransitionTag={item.id}
          source={{ uri: item.photos[0].uri }}
          style={styles({ width }).image}
        />
      </View>

      <View style={styles({ width }).textContainer}>
        {item.lost && (
          <Text style={styles({ fontScale }).textTitle}>PERDIDO</Text>
        )}
        <Text style={styles({ fontScale }).textTitle}>{item.title}</Text>
        <Text style={styles({ fontScale }).textUserEmail}>
          {item.userEmail.split('').length > 19
            ? item.userEmail.slice(0, 19) + '...'
            : item.userEmail}
        </Text>
        <Text style={styles({ fontScale }).textCreatedAt}>
          {item.createdAt}
        </Text>
        <View style={styles({ width }).infoContainer}>
          <Text style={styles({ fontScale, width }).moreInformation}>
            Ver más información
          </Text>
          <View style={styles({ width }).rightArrow}>
            <AntDesign name="arrowright" size={24} color="black" />
          </View>
        </View>
      </View>
      <View style={styles({ width }).gender}>
        {item.gender && item.gender === Gender.Male ? (
          <Foundation name="male-symbol" size={29} color="green" />
        ) : (
          <Foundation name="female-symbol" size={29} color="hotpink" />
        )}
      </View>
    </Pressable>
  );
};
export default RenderItem;
interface StylesProps {
  fontScale?: number;
  width?: number;
  randomColor?: string;
}
const styles = ({ fontScale, width, randomColor }: StylesProps) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginTop: 30,
      marginHorizontal: 10,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      height: width! * 0.43,
      width: width! * 0.95,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 2,
      shadowRadius: 4,

      elevation: 8,
      bottom: width! * 0.02,
    },
    image: {
      width: width! * 0.4,
      height: width! * 0.46,
      borderRadius: 20,
      objectFit: 'cover',
    },
    squareImage: {
      width: width! * 0.41,
      height: width! * 0.47,
      borderRadius: 20,
      position: 'absolute',
      top: -(width! * 0.04),
      backgroundColor: '#f88f26',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'orange',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 2,
      shadowRadius: 4,

      elevation: 8,
    },
    textContainer: {
      gap: 4,
      flexShrink: 1,
      justifyContent: 'flex-end',
      // backgroundColor: 'yellow',
      width: width! * 0.48,
      height: width! * 0.31,
      position: 'absolute',
      right: width! * 0.02,
      top: width! * 0.08,
    },
    textTitle: {
      color: '#323232',
      fontSize: fontScale! < 1 ? 20 : fontScale! > 1 ? 14 : 16,
      fontWeight: 'bold',
    },
    textUserEmail: {
      color: 'gray',
      fontSize: fontScale! < 1 ? 17 : fontScale! > 1 ? 12 : 16,
      fontWeight: '600',
      opacity: 0.92,
    },
    gender: {
      position: 'absolute',
      right: 20,
      top: 6,
    },
    textCreatedAt: {
      fontSize: fontScale! < 1 ? 17 : fontScale! > 1 ? 12 : 15,
      fontWeight: 'bold',
      color: 'gray',
      opacity: 0.9,
    },
    moreInformation: {
      textShadowColor: 'blue',
      fontSize: fontScale! < 1 ? 20 : fontScale! > 1 ? 13 : 17,
      top: 4,
      fontStyle: 'italic',
      fontWeight: '800',
      color: 'skyblue',
    },
    infoContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rightArrow: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      top: width! * 0.015,
      right: 2,
    },
  });
