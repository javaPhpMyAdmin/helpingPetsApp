/* eslint-disable import/order */
import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const PetFounded = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>PetFounded</Text>
      <Pressable onPress={() => router.back()}>
        <Text>REGRESAR</Text>
      </Pressable>
    </View>
  );
};

export default PetFounded;
