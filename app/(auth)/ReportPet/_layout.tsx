import { Stack } from 'expo-router';
// eslint-disable-next-line import/order
import React from 'react';
import { useAuth } from '../../../context/AuthContext/AuthContext';

const ReportPetLayout = () => {
  const { authState } = useAuth();
  const isAuthenticated = authState?.authenticated;

  return (
    <Stack>
      <Stack.Screen
        redirect={!isAuthenticated}
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="foundPet"
        options={{
          title: 'Reportar una mascota perdida',
          headerStyle: { backgroundColor: 'orange' },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // headerTintColor: 'green',
        }}
      />
      <Stack.Screen
        name="lostMyPet"
        options={{
          title: 'Mi mascota se ha perdido',
          headerStyle: { backgroundColor: 'orange' },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // headerTintColor: 'green',
        }}
      />
    </Stack>
  );
};

export default ReportPetLayout;
