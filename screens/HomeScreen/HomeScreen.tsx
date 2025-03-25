/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';
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
import { useAuth } from '../../context';
import {
  LostReportApi,
  PetsForAdoptionApi,
  ReportLostPetApi,
} from '../../types';

export const HomeScreen = () => {
  const { height } = useWindowDimensions();
  const [isVisible, setIsVisibleModal] = useState(false);
  const [isVisibleAddModal, setIsVisibleAddModal] = useState(false);
  const [category, setCategory] = useState('Todos');
  const { accessToken } = useAuth();
  const [pets, setPets] = useState<ReportLostPetApi[] | LostReportApi[]>([]);
  //TODO: CHANGE IT WHEN USE REACT QUERY
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenModal = () => {
    setIsVisibleModal(!isVisible);
  };

  const handleOpenAddModal = () => {
    setIsVisibleAddModal(!isVisibleAddModal);
  };

  const handleCategoryPress = (category: string) => {
    setCategory(category);
  };

  const getLostReports = async () => {
    try {
      console.log('Fetching LostReports in HomeScreen...');
      const response = await fetch(
        'http://localhost:8082/api/v1/reports/lost-pet?page=0&size=100',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log(
        'Response Lost reports Home screen',
        JSON.stringify(data.result.Result.content, null, 4)
      );
      // data.result.Result.content
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 1500); // Simula carga
    }
  };

  const getPets = async () => {
    try {
      console.log('Fetching pets in HomeScreen...');
      const response = await fetch(
        'http://localhost:8082/api/v1/reports?page=0&size=100',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log(
        'Response reports Home screen',
        JSON.stringify(data.result.Result.content, null, 4)
      );
      setPets(data.result.Result.content);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 1500); // Simula carga
    }
  };

  useEffect(() => {
    getPets();
    getLostReports();
  }, []);

  // Monitorear cambios en pets
  useEffect(() => {}, [pets]);

  setTimeout(() => {
    setIsLoading(false);
  }, 1500);

  return (
    <>
      <SafeAreaView style={styles(height).container}>
        <HeaderHome handleOpenModal={handleOpenModal} />
        <CategoryList
          handlecaseCategoryPress={handleCategoryPress}
          category={category}
        />
        <PetsList pets={pets} isLoading={isLoading} />
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
