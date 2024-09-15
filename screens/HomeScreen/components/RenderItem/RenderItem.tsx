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

import { Marker } from '@/types/types';
import { generateColor } from '@/utils/generateRandomColor';

enum Gender {
  Male = 'male',
  Female = 'female',
}
interface RenderItemProps {
  item: Marker;
  index: number;
}

const RenderItem = ({ item, index }: RenderItemProps) => {
  const { width } = useWindowDimensions();
  const randomColor = generateColor();

  return (
    <Pressable
      style={styles(width).container}
      onPress={() =>
        router.push<Marker>({
          pathname: `/testIdtest`,
          params: {
            petId: item.id,
            image: item.image as string,
            title: item.title,
            userEmail: item.userEmail,
          },
        })
      }
    >
      <View style={styles(width, randomColor).squareImage}>
        <Animated.Image
          sharedTransitionTag={item.id}
          source={{ uri: item.image }}
          style={styles(width).image}
        />
      </View>

      <View style={styles(width).textContainer}>
        <Text style={styles(width).textTitle}>{item.title}</Text>
        <Text style={styles(width).textUserEmail}>{item.userEmail}</Text>
        <Text style={styles(width).textCreatedAt}>{item.createdAt}</Text>
        <View style={styles(width).infoContainer}>
          <Text style={styles(width).moreInformation}>Ver más información</Text>
          <View style={styles(width).rightArrow}>
            <AntDesign name="arrowright" size={24} color="black" />
          </View>
        </View>
      </View>
      <View style={styles(width).gender}>
        {item.gender && item.gender === Gender.Male ? (
          <Foundation name="male-symbol" size={24} color="green" />
        ) : (
          <Foundation name="female-symbol" size={24} color="hotpink" />
        )}
      </View>
    </Pressable>
  );
};
export default RenderItem;
const styles = (width: number, randomColor?: string) =>
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
      bottom: 4,
    },
    image: {
      width: width * 0.4,
      height: width * 0.44,
      borderRadius: 20,
      objectFit: 'cover',
    },
    squareImage: {
      width: width * 0.44,
      height: width * 0.472,
      borderRadius: 20,
      position: 'absolute',
      top: -(width * 0.042),
      backgroundColor: randomColor ?? 'orange',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer: {
      gap: 4,
      flexShrink: 1,
      justifyContent: 'flex-end',
      // backgroundColor: 'yellow',
      width: width * 0.48,
      height: width * 0.31,
      position: 'absolute',
      right: 2,
      top: width * 0.08,
    },
    textTitle: {
      color: '#323232',
      fontSize: 19,
      fontWeight: 'bold',
    },
    textUserEmail: {
      color: 'gray',
      fontSize: 16,
      fontWeight: '600',
      opacity: 0.92,
    },
    gender: {
      position: 'absolute',
      right: 25,
      top: 3,
    },
    textCreatedAt: {
      fontWeight: 'bold',
      color: 'gray',
      opacity: 0.9,
    },
    moreInformation: {
      textShadowColor: 'blue',
      fontSize: 16.6,
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
      top: width * 0.015,
      right: 3,
    },
  });
