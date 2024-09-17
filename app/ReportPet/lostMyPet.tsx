/* eslint-disable import/order */
import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const LostMyPet = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>I lost my pet</Text>
      <Pressable onPress={() => router.back()}>
        <Text>REGRESAR</Text>
      </Pressable>
    </View>
  );
};

export default LostMyPet;
