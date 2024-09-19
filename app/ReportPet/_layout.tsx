import { Stack } from 'expo-router';
import React from 'react';

const ReportPetLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: '        Reportar una mascota perdida',
          headerStyle: { backgroundColor: 'orange' },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // headerTintColor: 'green',
        }}
      />
      <Stack.Screen name="lostMyPet" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ReportPetLayout;
