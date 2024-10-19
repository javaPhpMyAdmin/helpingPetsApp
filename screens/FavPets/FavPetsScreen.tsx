/* eslint-disable import/order */
import { View, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import React from 'react';
import { FavPetsList } from './components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

const FavPets = () => {
  const { width } = useWindowDimensions();
  return (
    <SafeAreaView style={styles().container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Mis Favoritos',
          headerTitleStyle: {
            fontSize: 25,
            color: 'orange',
          },
          headerTitleAlign: 'center',
        }}
      />
      <View style={styles(width).favContainer}>
        {/* <Text>FavPets</Text> */}
        <FavPetsList />
      </View>
    </SafeAreaView>
  );
};

export default FavPets;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      // backgroundColor: 'red',
    },
    favContainer: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: '100%',
      top: -width! * 0.14,
      paddingVertical: 5,
    },
  });
