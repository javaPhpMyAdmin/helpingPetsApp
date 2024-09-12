import { Tabs } from 'expo-router';
import React from 'react';

import { TabBar } from '@/components/TabBar';

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="mapView"
        options={{
          headerTitle: 'Mapa',
          headerShown: false,
          tabBarLabel: 'Mapa',
        }}
      />
      <Tabs.Screen
        name="newMarker"
        options={{
          headerTitle: 'Nuevo Registro',
          // headerShown: false,
          tabBarLabel: 'Nuevo',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'Perfil',
          tabBarLabel: 'Perfil',
        }}
      />
    </Tabs>
  );
}
