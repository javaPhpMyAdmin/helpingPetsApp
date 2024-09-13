import { Stack } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default HomeLayout;
