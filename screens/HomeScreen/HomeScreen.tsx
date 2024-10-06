/* eslint-disable import/order */
import React, { useState } from 'react';
import { StyleSheet, useWindowDimensions, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryList, HeaderHome, PetsList, UserProfile } from './components';

export const HomeScreen = () => {
  const { height } = useWindowDimensions();
  const [isVisible, setIsVisibleModal] = useState(false);

  const handleOpenModal = () => {
    setIsVisibleModal(!isVisible);
  };

  return (
    <>
      <SafeAreaView style={styles(height).container}>
        <HeaderHome handleOpenModal={handleOpenModal} />
        <CategoryList />
        <PetsList />
      </SafeAreaView>
      <Modal transparent animationType="slide" visible={isVisible}>
        <UserProfile setIsVisibleModal={setIsVisibleModal} />
      </Modal>
    </>
  );
};

const styles = (height?: number) =>
  StyleSheet.create({
    container: {
      backgroundColor: '#fafafb',
      height: height! * 0.949,
      top: 2,
    },
  });
