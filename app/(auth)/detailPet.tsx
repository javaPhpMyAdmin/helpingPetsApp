/* eslint-disable import/order */
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { HeaderDetail } from '@/components/HeaderDetail';
import { ButtonDetail } from '@/components/ButtonDetail';

const MarkerDetailTest = () => {
  const { width } = useWindowDimensions();
  const { petId, image, title, userEmail } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <HeaderDetail />
        <Animated.Image
          resizeMode="cover"
          // sharedTransitionTag={String(petId)}
          style={{ width, height: width }}
          source={{
            uri: `${image}`,
          }}
        />
        <Animated.View
          entering={FadeInDown.delay(400)}
          style={styles.textContainer}
        >
          <Text style={styles.textName}>{title}</Text>
          <Text style={styles.textLocation}>{userEmail}</Text>
        </Animated.View>
      </View>
      <Animated.View entering={FadeInDown.delay(800)}>
        <Text style={styles.textTitle}>Descripción {petId}</Text>
        <Text style={styles.textDescription}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          laudantium, esse adipisci veniam veritatis sequi nostrum odit labore
          quibusdam ab rerum deleniti eveniet, quidem iusto provident dolores
          corrupti magnam fugit! {petId}
        </Text>
      </Animated.View>
      <ButtonDetail />
    </View>
  );
};

export default MarkerDetailTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    color: '#323232',
    fontSize: 28,
    fontWeight: 'bold',
    margin: 10,
  },
  textDescription: {
    fontSize: 16,
    marginHorizontal: 10,
    textAlign: 'justify',
  },
});
