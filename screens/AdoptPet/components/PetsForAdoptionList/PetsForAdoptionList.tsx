/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */
import { View, FlatList, useWindowDimensions, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RenderItem } from '../RenderItem';
import { PetsForAdoptionApi } from '../../../../types';
import { useAuth } from '../../../../context';

const PetsForAdoptionList = () => {
  const [petsForAdoption, setPetsForAdoption] =
    useState<PetsForAdoptionApi[]>();
  const { width, height } = useWindowDimensions();
  const { accessToken } = useAuth();

  const getPetsForAdoption = async () => {
    try {
      console.log('Fetching pets for adoption...');
      const response = await fetch('http://localhost:8082/api/v1/pets', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      setPetsForAdoption(data.result.result.content);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  useEffect(() => {
    getPetsForAdoption();
  }, []);

  return (
    <View style={styles(width).listContainer}>
      <FlatList
        contentContainerStyle={styles(height, width).contentContainer}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={petsForAdoption}
        renderItem={({ item }) => <RenderItem pet={item} />}
        keyExtractor={(item) => item.id.toString()}
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
