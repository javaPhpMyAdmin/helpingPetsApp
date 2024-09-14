import AntDesign from '@expo/vector-icons/AntDesign';
import Foundation from '@expo/vector-icons/Foundation';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import { Marker } from '@/types/types';

enum Gender {
  Male = 'male',
  Female = 'female',
}
interface RenderItemProps {
  item: Marker;
  index: number;
}

export const RenderItem = ({ item, index }: RenderItemProps) => {
  // const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    // <Animated.View
    //   style={styles.container}
    //   entering={FadeInDown.delay(200 * index)}
    // >
    <Pressable
      style={styles.container}
      // entering={FadeInDown.delay(200 * index)}
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
      <Animated.Image
        sharedTransitionTag={item.id}
        source={{ uri: item.image }}
        style={styles.image}
      />

      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>{item.title}</Text>
        <Text style={styles.textUserEmail}>{item.userEmail}</Text>
        <Text style={styles.textCreatedAt}>{item.createdAt}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.moreInformation}>Ver más información</Text>
          <View style={styles.rightArrow}>
            <AntDesign name="arrowright" size={24} color="black" />
          </View>
        </View>
      </View>
      <View style={styles.gender}>
        {item.gender && item.gender === Gender.Male ? (
          <Foundation name="male-symbol" size={24} color="green" />
        ) : (
          <Foundation name="female-symbol" size={24} color="hotpink" />
        )}
      </View>
    </Pressable>
    // </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 30,
    marginHorizontal: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    height: 170,
    width: 380,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 1,
    shadowRadius: 10,

    elevation: 5,
    bottom: 4,
  },
  image: {
    width: 160,
    height: 185,
    borderRadius: 20,
    position: 'absolute',
    top: -15,
    objectFit: 'cover',
  },
  textContainer: {
    gap: 4,
    flexShrink: 1,
    justifyContent: 'flex-end',
    // backgroundColor: 'yellow',
    width: 210,
    position: 'absolute',
    right: 3,
  },
  textTitle: {
    color: '#323232',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textUserEmail: {
    color: 'gray',
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.9,
  },
  gender: {
    position: 'absolute',
    right: 25,
    top: 5,
  },
  textCreatedAt: {
    fontWeight: 'bold',
    color: 'gray',
    opacity: 0.9,
  },
  moreInformation: {
    textShadowColor: 'blue',
    fontSize: 18,
    top: 6,
    fontStyle: 'italic',
    fontWeight: '800',
    color: 'skyblue',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  rightArrow: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    top: 8,
  },
});
