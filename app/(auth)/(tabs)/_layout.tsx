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
      {/* <Tabs.Screen
        name="newMarker"
        options={{
          headerShown: false,
          tabBarLabel: 'Reportar',
        }}
      /> */}
      <Tabs.Screen
        name="favPets"
        options={{
          headerShown: false,
          tabBarLabel: 'Favoritos',
        }}
      />
      <Tabs.Screen
        name="adoptPet"
        options={{
          headerShown: false,
          tabBarLabel: 'Adoptar',
        }}
      />
    </Tabs>
  );
}
