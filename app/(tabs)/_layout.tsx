import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import { TabBar } from '../../components/TabBar/TabBar';

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
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
