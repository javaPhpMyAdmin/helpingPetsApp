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
import { PetForAdoption, Photo } from '@/types';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

interface RenderItemProps {
  pet: PetForAdoption;
}

const RenderItem = ({ pet }: RenderItemProps) => {
  const { width, height } = useWindowDimensions();
  const fontScale = useWindowDimensions().fontScale;

  // console.log('PET render item adopt pet', pet.photos);

  return (
    <TouchableOpacity
      onPress={() =>
        router.push<PetForAdoption>({
          pathname: '/(auth)/detailAdoptPet',
          params: {
            id: pet.id,
          },
        })
      }
      style={styles(fontScale, width).buttonContainer}
    >
      <Image
        style={styles(fontScale, width, height).image}
        source={{ uri: pet.photos[0].uri }}
      />
      <View style={styles(fontScale, width).detailContainer}>
        <View style={styles(fontScale, width, height).descriptionContainer}>
          <Text style={styles(fontScale).petName}>{pet.petName}</Text>
          <Text style={styles(fontScale).petBreed}>Raza: {pet.breed}</Text>
          <View style={styles(fontScale).footerContainer}>
            <View style={styles(fontScale).genderContainer}>
              {pet.gender === 'Hembra' ? (
                <Foundation name="female-symbol" size={35} color="hotpink" />
              ) : (
                <Foundation name="male-symbol" size={38} color="green" />
              )}
              <Text style={styles(fontScale).genderText}>{pet.gender}</Text>
            </View>
            <View style={styles(fontScale).ageContainer}>
              <FontAwesome
                name="birthday-cake"
                size={27}
                color={pet.gender === 'Hembra' ? 'hotpink' : 'green'}
              />
              <Text style={styles(fontScale).ageText}>{pet.age}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RenderItem;

const styles = (fontScale?: number, width?: number, height?: number) =>
  StyleSheet.create({
    buttonContainer: { flex: 1, paddingHorizontal: 8, position: 'relative' },
    image: {
      width: width! * 0.78,
      height: width! * 0.99,
      borderRadius: 40,
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
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    },
    descriptionContainer: {
      left: width! * 0.07,
      top: width! * 0.007,
      gap: 7,
    },
    petName: {
      fontSize: fontScale! < 1 ? 33 : fontScale! > 1 ? 27 : 31,
      fontWeight: 'bold',
      color: 'black',
    },
    petBreed: {
      fontSize: fontScale! < 1 ? 26 : fontScale! > 1 ? 19 : 23,
      fontWeight: 'bold',
      color: '#5f4646',
    },
    genderContainer: { flexDirection: 'row', gap: 10, alignItems: 'center' },
    genderText: {
      fontSize: fontScale! < 1 ? 24 : fontScale! > 1 ? 17 : 21,
      fontWeight: 'bold',
    },
    ageContainer: { flexDirection: 'row', gap: 9, alignItems: 'center' },
    ageText: {
      fontSize: fontScale! < 1 ? 24 : fontScale! > 1 ? 17 : 21,
      fontWeight: 'bold',
    },
    footerContainer: {
      flexDirection: 'row',
      gap: 24,
      alignItems: 'center',
    },
  });
