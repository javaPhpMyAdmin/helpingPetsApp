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
        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            marginHorizontal: 20,
            marginTop: 20,
            position: 'relative',
          }}
        >
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
              <FontAwesome name="birthday-cake" size={30} color="gray" />
              <View>
                <Text style={styles().infoPet}>Edad</Text>
                <Text style={styles().textDescriptive}>{params.age}</Text>
              </View>
            </View>
            <View style={styles().dataContainer}>
              <MaterialCommunityIcons
                name="weight-kilogram"
                size={42}
                color="gray"
              />
              <View>
                <Text style={styles().infoPet}>Peso</Text>
                <Text style={styles().textDescriptive}>10 Kg</Text>
              </View>
            </View>
            <View style={styles().dataContainer}>
              <MaterialIcons name="pets" size={42} color="gray" />
              <View>
                <Text style={styles().infoPet}>Raza</Text>
                <Text style={styles().textDescriptive}>{params.breed}</Text>
              </View>
            </View>
          </View>

          <Text style={styles().aboutText}>Acerca de {params.petName}</Text>
          <Text>
            loremp ipsum dolor sit amet consectetur adipisicing elit. Ratione
            laudantium, esse adipisci veniam veritatis sequi nostrum odit labore
            quibusdam ab rerum deleniti eveniet, quidem iusto provident dolores
            corrupti magnam fugit! lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ratione laudantium, esse adipisci veniam veritatis
            sequi nostrum odit labore quibusdam ab rerum deleniti eveniet,
            quidem iusto provident dolores corrupti magnam fugit!
          </Text>
          <TouchableOpacity
            style={{
              width: '70%',
              height: 60,
              backgroundColor: 'skyblue',
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
              Se mi nuevo amigo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailAdoptPet;

const styles = (height?: number, width?: number) =>
  StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center' },
    imagePet: { width: '100%', height: height! * 0.5 },
    textDescriptive: { fontWeight: 'bold', fontSize: 18, color: 'blue' },
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
      gap: 10,
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
    },
    favouriteIcon: { position: 'absolute', left: width! * 0.8, top: -5 },
  });
