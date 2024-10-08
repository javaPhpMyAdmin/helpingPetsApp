/* eslint-disable import/order */
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { HeaderDetail } from '../../components';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const DetailAdoptPet = () => {
  const { width, height } = useWindowDimensions();
  const params = useLocalSearchParams();
  return (
    <View
      style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}
    >
      <Image
        source={{ uri: params.photoUrl as string }}
        style={{ width: '100%', height: height * 0.5 }}
      />
      <HeaderDetail />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: height * 0.6,
          backgroundColor: 'hotpink',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
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
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <View
              style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
            >
              <Text>{params.petName}</Text>
              <Text>{params.gender}</Text>
            </View>
            <MaterialIcons
              style={{ position: 'absolute', left: width * 0.8, top: -5 }}
              name="favorite-outline"
              size={34}
              color="black"
            />
          </View>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <FontAwesome5 name="map-marker-alt" size={20} color="red" />
            <Text>Sauce, Canelones</Text>
          </View>
          <Text>Edad</Text>
          <Text>{params.age}</Text>
          <Text>Peso</Text>
          <Text>10 Kg</Text>
          <Text>Raza</Text>
          <Text>{params.breed}</Text>
          <Text>Acerca de {params.petName}</Text>
          <Text>
            loremp ipsum dolor sit amet consectetur adipisicing elit. Ratione
            laudantium, esse adipisci veniam veritatis sequi nostrum odit labore
            quibusdam ab rerum deleniti eveniet, quidem iusto provident dolores
            corrupti magnam fugit! lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ratione laudantium, esse adipisci veniam veritatis
            sequi nostrum odit labore quibusdam ab rerum deleniti eveniet,
            quidem iusto provident dolores corrupti magnam fugit!
          </Text>
          <TouchableOpacity>
            <Text>Se mi nuevo amigo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailAdoptPet;
