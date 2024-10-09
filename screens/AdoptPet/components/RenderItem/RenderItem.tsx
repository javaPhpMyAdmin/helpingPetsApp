/* eslint-disable import/order */
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Foundation from '@expo/vector-icons/Foundation';
import AntDesign from '@expo/vector-icons/AntDesign';
import { PetForAdoption } from '@/types';
import { router } from 'expo-router';

interface RenderItemProps {
  pet: PetForAdoption;
}

const RenderItem = ({ pet }: RenderItemProps) => {
  const { width } = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/(auth)/detailAdoptPet',
          params: {
            petId: pet.id,
            petName: pet.petName,
            breed: pet.breed,
            age: pet.age,
            gender: pet.gender,
            photoUrl: pet.photoUrl,
          },
        })
      }
      style={{ flex: 1, paddingHorizontal: 8, position: 'relative' }}
    >
      <Image
        style={{
          width: width * 0.78,
          height: width * 0.99,
          borderRadius: 50,
          borderWidth: 0.3,
          borderColor: 'orange',
        }}
        source={{ uri: pet.photoUrl }}
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
        <View
          style={{
            left: width * 0.07,
            top: width * 0.007,
            gap: 7,
          }}
        >
          <Text style={{ fontSize: 33, fontWeight: 'bold', color: 'black' }}>
            {pet.petName}
          </Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'gray' }}>
            Raza: {pet.breed}
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
              {pet.gender === 'Hembra' ? (
                <Foundation name="female-symbol" size={35} color="hotpink" />
              ) : (
                <Foundation name="male-symbol" size={38} color="green" />
              )}
              <Text style={{ fontSize: 21, fontWeight: 'bold' }}>
                {pet.gender}
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
            >
              <AntDesign
                name="clockcircleo"
                size={27}
                color={pet.gender === 'Hembra' ? 'hotpink' : 'green'}
              />
              <Text style={{ fontSize: 21, fontWeight: 'bold' }}>
                {pet.age}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RenderItem;
