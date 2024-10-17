/* eslint-disable import/order */
import React, { useState } from 'react';
import { StyleSheet, useWindowDimensions, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ButtonAddReport,
  CategoryList,
  HeaderHome,
  ModalAddReport,
  PetsList,
  UserProfile,
} from './components';

export const HomeScreen = () => {
  const { height } = useWindowDimensions();
  const [isVisible, setIsVisibleModal] = useState(false);
  const [isVisibleAddModal, setIsVisibleAddModal] = useState(false);

  const handleOpenModal = () => {
    setIsVisibleModal(!isVisible);
  };

  const handleOpenAddModal = () => {
    setIsVisibleAddModal(!isVisibleAddModal);
  };

  return (
    <>
      <SafeAreaView style={styles(height).container}>
        <HeaderHome handleOpenModal={handleOpenModal} />
        <CategoryList />
        <PetsList />
        <ButtonAddReport handleOpenAddModal={handleOpenAddModal} />
      </SafeAreaView>
      <Modal transparent animationType="slide" visible={isVisible}>
        <UserProfile setIsVisibleModal={setIsVisibleModal} />
      </Modal>
      <ModalAddReport
        isVisibleAddModal={isVisibleAddModal}
        setIsVisibleAddModal={setIsVisibleAddModal}
      />
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
    modalContent: {
      flex: 1,
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: '#fafafb',
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      // position: 'absolute',
      bottom: 0,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
  });
