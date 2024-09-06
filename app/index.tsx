import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Index = () => {
  return (
    <View className="flex flex-1 justify-items-center align-bottom">
      <Link asChild href="/login">
        <Pressable>
          <Text>Ir al login</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Index;
