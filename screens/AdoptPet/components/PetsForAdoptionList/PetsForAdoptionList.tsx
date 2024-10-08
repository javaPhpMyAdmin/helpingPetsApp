/* eslint-disable import/order */
import { View, FlatList, useWindowDimensions, StyleSheet } from 'react-native';
import React from 'react';
import { MockedPetsForAdoption } from '../../../../MockedPetsForAdoption';
import { RenderItem } from '../RenderItem';

const PetsForAdoptionList = () => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={styles(width).listContainer}>
      <FlatList
        style={{ paddingHorizontal: 10 }}
        contentContainerStyle={styles(height, width).contentContainer}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={MockedPetsForAdoption}
        renderItem={({ item }) => <RenderItem pet={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default PetsForAdoptionList;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    contentContainer: {
      position: 'static',
    },
    listContainer: {
      top: width! * 0.01,
      height: width! * 1.2,
      display: 'flex',
      justifyContent: 'center',
      //   right: width! * 0.0,
      paddingTop: 16,
    },
  });
