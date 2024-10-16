import { Stack } from 'expo-router';
import React from 'react';

const AdoptLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* <Stack.Screen name="detailAdoptPet" options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default AdoptLayout;
