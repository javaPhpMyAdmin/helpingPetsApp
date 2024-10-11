/* eslint-disable import/order */
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useFonts } from 'expo-font';

const GreetingContainer = () => {
  const { width, height } = useWindowDimensions();
  const [loaded] = useFonts({
    PlaypenSans: require('@/assets/fonts/PlaypenSans-SemiBold.ttf'),
  });
  const fontScale = useWindowDimensions().fontScale;

  return (
    <View style={styles(fontScale, loaded, width, height).greetingContainer}>
      <View style={{ left: width * 0.03, top: height * 0.03 }}>
        <Text style={styles(fontScale, loaded, width).meetYou}>
          Encantado de conocerte!
        </Text>
        <View>
          <Text style={styles(fontScale, loaded, width).welcome}>
            Bienvenido
          </Text>
          <Text style={styles(fontScale, loaded, width).welcome}>a</Text>
          <Text style={styles(fontScale, loaded, width).welcome}>
            Helping pets
          </Text>
        </View>
      </View>
      <View>
        <Animated.Image
          entering={FadeInDown.delay(200).duration(2000).damping(4).springify()}
          style={styles(fontScale, loaded, width, height).imageContainer}
          source={require('@/assets/images/paws.webp')}
        />
      </View>
    </View>
  );
};

export default GreetingContainer;

const styles = (
  fontScale?: number,
  loaded?: boolean,
  width?: number,
  height?: number
) =>
  StyleSheet.create({
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
      fontSize: fontScale! < 1 ? 30 : fontScale! > 1 ? 24 : 27,
      color: 'white',
      fontFamily: loaded ? 'PlaypenSans' : '',
      left: width! * 0.02,
    },
    meetYou: {
      left: width! * 0.02,
      color: 'white',
      fontSize: fontScale! < 1 ? 20 : fontScale! > 1 ? 14 : 17,
      fontFamily: loaded ? 'PlaypenSans' : '',
    },
    imageContainer: {
      width: width! * 0.56,
      height: height! * 0.25,
      left:
        fontScale! < 1
          ? width! * 0.01
          : fontScale! > 1
            ? width! * 0.003
            : width! * 0.03,
      bottom: height! * 0.01,
    },
  });
