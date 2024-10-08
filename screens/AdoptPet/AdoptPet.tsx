/* eslint-disable import/order */
import { View, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CategoryList } from '@/components';
import { PetsForAdoptionList } from './components/PetsForAdoptionList';
import { InfoCard } from './components/InfoCard';

const AdoptPet = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles().container}>
        <InfoCard />
        <CategoryList />
        <PetsForAdoptionList />
      </View>
    </SafeAreaView>
  );
};

export default AdoptPet;

const styles = (width?: number, height?: number, loaded?: boolean) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: '#fafafb',
      flex: 1,
      top: 2,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
  });
