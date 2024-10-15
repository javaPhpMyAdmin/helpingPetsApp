/* eslint-disable import/order */
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import { FavPetsList } from './components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

const FavPets = () => {
  const { width } = useWindowDimensions();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'flex-start',
      }}
    >
      <Stack.Screen options={{ headerShown: true, title: 'Mis favoritos' }} />
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: '100%',
          top: -width * 0.14,
        }}
      >
        {/* <Text>FavPets</Text> */}
        <FavPetsList />
      </View>
    </SafeAreaView>
  );
};

export default FavPets;

const styles = (width?: number, height?: number) => StyleSheet.create({});
