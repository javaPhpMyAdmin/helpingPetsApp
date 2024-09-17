import { Stack } from 'expo-router';
import React from 'react';

const ReportPetLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="lostMyPet" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ReportPetLayout;
