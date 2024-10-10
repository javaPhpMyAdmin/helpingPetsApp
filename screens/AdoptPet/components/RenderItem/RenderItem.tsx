/* eslint-disable import/order */
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Foundation from '@expo/vector-icons/Foundation';
import AntDesign from '@expo/vector-icons/AntDesign';
import { PetForAdoption } from '@/types';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

interface RenderItemProps {
  pet: PetForAdoption;
}

const RenderItem = ({ pet }: RenderItemProps) => {
  const { width, height } = useWindowDimensions();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push<PetForAdoption>({
          pathname: '/(auth)/detailAdoptPet',
          params: {
            ...pet,
          },
        })
      }
      style={styles().buttonContainer}
    >
      <Image
        style={styles(width, height).image}
        source={{ uri: pet.photoUrl }}
      />
      <View style={styles(width).detailContainer}>
        <View style={styles(width, height).descriptionContainer}>
          <Text style={styles().petName}>{pet.petName}</Text>
          <Text style={styles().petBreed}>Raza: {pet.breed}</Text>
          <View style={styles().footerContainer}>
            <View style={styles().genderContainer}>
              {pet.gender === 'Hembra' ? (
                <Foundation name="female-symbol" size={35} color="hotpink" />
              ) : (
                <Foundation name="male-symbol" size={38} color="green" />
              )}
              <Text style={styles().genderText}>{pet.gender}</Text>
            </View>
            <View style={styles().ageContainer}>
              <FontAwesome
                name="birthday-cake"
                size={27}
                color={pet.gender === 'Hembra' ? 'hotpink' : 'green'}
              />
              <Text style={styles().ageText}>{pet.age}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RenderItem;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    buttonContainer: { flex: 1, paddingHorizontal: 8, position: 'relative' },
    image: {
      width: width! * 0.78,
      height: width! * 0.99,
      borderRadius: 50,
      borderWidth: 0.3,
      borderColor: 'orange',
    },
    detailContainer: {
      position: 'absolute',
      bottom: width! * 0.17,
      left: width! * 0.02,
      backgroundColor: 'white',
      opacity: 0.58,
      height: width! * 0.355,
      width: '100%',
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    },
    descriptionContainer: {
      left: width! * 0.07,
      top: width! * 0.007,
      gap: 7,
    },
    petName: { fontSize: 33, fontWeight: 'bold', color: 'black' },
    petBreed: { fontSize: 24, fontWeight: 'bold', color: '#5f4646' },
    genderContainer: { flexDirection: 'row', gap: 10, alignItems: 'center' },
    genderText: { fontSize: 21, fontWeight: 'bold' },
    ageContainer: { flexDirection: 'row', gap: 10, alignItems: 'center' },
    ageText: { fontSize: 21, fontWeight: 'bold' },
    footerContainer: {
      flexDirection: 'row',
      gap: 24,
      alignItems: 'center',
    },
  });
