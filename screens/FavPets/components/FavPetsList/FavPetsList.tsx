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

  return (
    <View style={styles(width).listContainer}>
      {favsPets.length === 0 && <Text>No tienes favoritos</Text>}
      <FlatList
        contentContainerStyle={styles(height, width).contentContainer}
        showsVerticalScrollIndicator={false}
        data={favsPets}
        renderItem={({ item }) => <FavPetItem pet={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default FavPetsList;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    contentContainer: {
      position: 'static',
    },
    listContainer: {
      flex: 1,
      top: width! * 0.01,
      height: width! * 1.2,
      display: 'flex',
      justifyContent: 'center',
      //   right: width! * 0.0,
      paddingTop: 16,
    },
  });
