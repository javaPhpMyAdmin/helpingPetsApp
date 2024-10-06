import { Tabs } from 'expo-router';
import React from 'react';

import { TabBar } from '@/components/TabBar';

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: 'Inicio',
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
        name="adopt"
        options={{
          headerTitle: 'Adoptar',
          tabBarLabel: 'Adoptar',
        }}
      />
    </Tabs>
  );
}
