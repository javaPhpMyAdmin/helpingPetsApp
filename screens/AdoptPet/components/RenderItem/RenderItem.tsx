/* eslint-disable import/order */
import { View, Text, Image, useWindowDimensions } from 'react-native';
import React from 'react';
import { Pet } from '@/types';
import Foundation from '@expo/vector-icons/Foundation';
import AntDesign from '@expo/vector-icons/AntDesign';

interface RenderItemProps {
  pet: Pet;
}

const RenderItem = ({ pet }: RenderItemProps) => {
  const { width } = useWindowDimensions();
  return (
    <View style={{ flex: 1, paddingHorizontal: 8, position: 'relative' }}>
      <Image
        style={{ width: width * 0.78, height: width * 0.99, borderRadius: 50 }}
        source={{ uri: pet.image }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: width * 0.17,
          left: width * 0.02,
          backgroundColor: 'white',
          opacity: 0.58,
          height: width * 0.355,
          width: '100%',
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
        <View style={{ left: width * 0.07, top: width * 0.007 }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Nombre</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'gray' }}>
            Raza: Labrador
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 24,
              alignItems: 'center',
            }}
          >
            <View
              style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
            >
              <Foundation name="female-symbol" size={35} color="hotpink" />
              <Text style={{ fontSize: 21, fontWeight: 'bold' }}>
                {pet.gender}
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
            >
              <AntDesign name="clockcircleo" size={30} color="hotpink" />
              <Text style={{ fontSize: 21, fontWeight: 'bold' }}>29 meses</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RenderItem;
