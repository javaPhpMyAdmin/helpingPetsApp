/* eslint-disable import/order */
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import { usePets } from '@/context';
import { FavPetItem } from '../FavPetItem';

const FavPetsList = () => {
  const { width, height } = useWindowDimensions();
  const { getFavs } = usePets();
  const favsPets = getFavs!();
  const fontScale = useWindowDimensions().fontScale;

  return (
    <View style={styles({ width }).listContainer}>
      {favsPets.length === 0 && (
        <View style={styles({ width, height, fontScale }).noFavsContainer}>
          <Text style={styles({ width, fontScale }).noFavsText}>
            Aún no tienes favoritos 😢
          </Text>
          <Text style={styles({ width, fontScale }).noFavsSecondText}>
            Tus favoritos aparecerán aquí 😉
          </Text>
        </View>
      )}
      <FlatList
        contentContainerStyle={styles({ width, height }).contentContainer}
        showsVerticalScrollIndicator={false}
        data={favsPets}
        renderItem={({ item }) => <FavPetItem pet={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default FavPetsList;

interface CustomStyles {
  fontScale?: number;
  width?: number;
  height?: number;
}

const styles = ({ fontScale, width, height }: CustomStyles) =>
  StyleSheet.create({
    contentContainer: {
      position: 'static',
      padding: 5,

      // backgroundColor: 'blue',
    },
    listContainer: {
      flex: 1,
      top: width! * 0.01,
      height: width! * 1.2,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // margin: 10,
      //   right: width! * 0.0,
    },
    noFavsText: {
      fontSize: fontScale! < 1 ? 24 : fontScale! > 1 ? 17 : 21,
      fontWeight: 'bold',
      color: 'black',
    },
    noFavsSecondText: {
      fontSize: fontScale! < 1 ? 24 : fontScale! > 1 ? 17 : 21,
      fontWeight: 'bold',
      color: 'gray',
      left: width! * 0.01,
    },
    noFavsContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      top: height! * 0.35,
      // left: width! * 0.01,
    },
  });
