import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: 'Agregar nuevo Registro',
        }}
      />
      <Tabs.Screen
        name="mapView"
        options={{
          headerTitle: 'Mapa',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'Perfil',
        }}
      />
    </Tabs>
  );
}
