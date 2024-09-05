import { Link, Stack } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

function TestNav() {
  return (
    <View>
      <Stack.Screen
        options={{
          headerTitle: 'A VER SI ANDA',
          headerStyle: { backgroundColor: 'red' },
          headerTintColor: 'yellow',
        }}
      />
      <Text>PRUEBA NAVEGACION</Text>
      <Link href="/">volver</Link>
    </View>
  );
}

export default TestNav;
