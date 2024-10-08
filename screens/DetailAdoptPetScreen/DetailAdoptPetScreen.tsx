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
import { useLocalSearchParams } from 'expo-router';
import { HeaderDetail } from '../../components';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Foundation } from '@expo/vector-icons';

const DetailAdoptPet = () => {
  const { width, height } = useWindowDimensions();
  const params = useLocalSearchParams();

  return (
    <View style={styles().container}>
      <Image
        source={{ uri: params.photoUrl as string }}
        style={styles(height).imagePet}
      />
      <HeaderDetail />
      <View style={styles(height).cardContainer}>
        <View style={styles(height, width, params.gender).cardInfoContainer}>
          <View style={styles().headerContainer}>
            <View style={styles().nameContainer}>
              <Text style={styles().petName}>{params.petName}</Text>
              {params.gender === 'Hembra' ? (
                <Foundation name="female-symbol" size={35} color="gray" />
              ) : (
                <Foundation name="male-symbol" size={38} color="gray" />
              )}
            </View>
            <MaterialIcons
              style={styles(height, width).favouriteIcon}
              name="favorite"
              size={34}
              color="red"
            />

            <MaterialIcons
              style={styles(height, width).favouriteIcon}
              name="favorite-outline"
              size={34}
              color="red"
            />
          </View>
          <View style={styles().locationContainer}>
            <FontAwesome5 name="map-marker-alt" size={20} color="red" />
            <Text style={styles().location}>Sauce, Canelones</Text>
          </View>
          <View style={styles().descriptiveContainer}>
            <View style={styles().dataContainer}>
              <View style={styles().iconContainer}>
                <FontAwesome
                  name="birthday-cake"
                  size={30}
                  color={params.gender === 'Hembra' ? 'hotpink' : 'skyblue'}
                />
              </View>
              <View>
                <Text style={styles().infoPet}>Edad</Text>
                <Text
                  style={styles(width, height, params.gender).textDescriptive}
                >
                  {params.age}
                </Text>
              </View>
            </View>
            <View style={styles().dataContainer}>
              <View style={styles().iconContainer}>
                <MaterialCommunityIcons
                  name="weight-kilogram"
                  size={42}
                  color={params.gender === 'Hembra' ? 'hotpink' : 'skyblue'}
                />
              </View>
              <View>
                <Text style={styles().infoPet}>Peso</Text>
                <Text
                  style={styles(width, height, params.gender).textDescriptive}
                >
                  {params.weight} Kg
                </Text>
              </View>
            </View>
            <View style={styles().dataContainer}>
              <View style={styles().iconContainer}>
                <MaterialIcons
                  name="pets"
                  size={42}
                  color={params.gender === 'Hembra' ? 'hotpink' : 'skyblue'}
                />
              </View>
              <View>
                <Text style={styles().infoPet}>Raza</Text>
                <Text
                  style={styles(width, height, params.gender).textDescriptive}
                >
                  {params.breed}
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles().aboutText}>Acerca de {params.petName}</Text>
          <Text style={styles(height, width, params.gender).textAbout}>
            {params.aboutPet}
          </Text>
          <TouchableOpacity style={styles(height, width, params.gender).button}>
            <Text style={styles().buttonText}>Se mi nuevo amigo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailAdoptPet;

const styles = (height?: number, width?: number, gender?: string | string[]) =>
  StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center' },
    imagePet: { width: '100%', height: height! * 0.5 },
    textDescriptive: {
      fontWeight: '900',
      fontSize: 17,
      color: gender === 'Hembra' ? 'hotpink' : '#022b59',
    },
    cardContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: height! * 0.6,
      backgroundColor: 'white',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
    },
    descriptiveContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 6,
      left: 5,
    },
    dataContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    infoPet: { fontSize: 14, fontWeight: 'bold', color: 'gray' },
    aboutText: { fontWeight: 'bold', fontSize: 20 },
    location: { fontSize: 18, fontWeight: 'bold', color: 'gray' },
    locationContainer: { flexDirection: 'row', gap: 10, alignItems: 'center' },
    nameContainer: { flexDirection: 'row', gap: 10, alignItems: 'center' },
    petName: { fontSize: 25, fontWeight: 'bold' },
    headerContainer: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      width: '100%',
    },
    favouriteIcon: { position: 'absolute', left: width! * 0.8, top: 0 },
    iconContainer: {
      height: 45,
      width: 45,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: '#e3e2e2',
      opacity: 0.7,
    },
    button: {
      left: width! * 0.045,
      width: '90%',
      height: height! * 0.08,
      backgroundColor: gender === 'Hembra' ? 'hotpink' : 'skyblue',
      opacity: 0.7,
      borderRadius: 35,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardInfoContainer: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'flex-start',
      marginHorizontal: 20,
      marginTop: 20,
      position: 'relative',
    },
    textAbout: {
      fontWeight: 'bold',
      fontSize: 15,
      color: 'gray',
      opacity: 0.8,
    },
    buttonText: { fontSize: 24, color: 'black', fontWeight: '900' },
  });
