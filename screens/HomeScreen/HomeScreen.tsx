/* eslint-disable import/first */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const CategoryType = {
  ALL: 'Todos',
  LOST: 'Perdidos',
  FOUND: 'Abandonados',
};

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
  FoundReportApi,
  LostReportApi,
  ReportPetApi,
  ReportPetApp,
} from '../../types';

export const HomeScreen = () => {
  const { height } = useWindowDimensions();
  const [isVisible, setIsVisibleModal] = useState(false);
  const [isVisibleAddModal, setIsVisibleAddModal] = useState(false);
  const [category, setCategory] = useState(CategoryType.ALL);
  const { accessToken } = useAuth();
  const [pets, setPets] = useState<ReportPetApp[]>([]);

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
      const lostReportsAddated = reportPetAddapterFromLostReport(
        data.result.Result.content
      );
      setPets(lostReportsAddated);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 1500); // Simula carga
    }
  };

  const getFoundReports = async () => {
    try {
      console.log('Fetching LostReports in HomeScreen...');
      const response = await fetch(
        'http://localhost:8082/api/v1/reports/found-pet?page=0&size=100',
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
      const foundReportsAddated = reportPetAddapterFromFoundReport(
        data.result.Result.content
      );
      setPets(foundReportsAddated);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 1500); // Simula carga
    }
  };

  const reportPetAddapterFromLostReport = (
    lostReport: LostReportApi[]
  ): ReportPetApp[] => {
    return lostReport.map((report) => ({
      breed: report.pet.breed,
      description: report.pet.description,
      reportId: report.reportId,
      title: report.title,
      imagesPet: report.images.map((image) => image.imageUrl),
      petName: report.pet.petName,
      reportType: report.reportType,
      reportedAt: report.metadata.reportedAt,
      reportedBy: report?.reporter?.contactEmail,
      status: report.metadata.status,
      gender: report?.gender,
    }));
  };

  const reportPetAddapterFromFoundReport = (
    foundReport: FoundReportApi[]
  ): ReportPetApp[] => {
    return foundReport.map((report) => ({
      description: report.image.description,
      reportId: report.reportId,
      title: report.title,
      imagesPet: report.image.imageUrl,
      latitude: report?.location?.coordinates?.latitude,
      longitude: report?.location?.coordinates?.longitude,
      reportType: report.reportType,
      reportedAt: report.metadata.reportedAt,
      reportedBy: report?.reporter?.contactEmail,
      status: report.metadata.status,
      gender: report?.gender,
    }));
  };

  const reportPetAddapter = (reportPetApi: ReportPetApi[]): ReportPetApp[] => {
    return reportPetApi.map((report) => ({
      breed: report.breed,
      description: report.description,
      reportId: report.id,
      title: report.title,
      imagesPet:
        report.reportType === 'LOST'
          ? report.imagesLostPet
          : report.imageFoundPet,
      latitude: report.latitude,
      longitude: report.longitude,
      petName: report.petName,
      reportType: report.reportType,
      reportedAt: report.reportedAt,
      reportedBy:
        report.reportType === 'LOST' ? report?.reportedBy : report.contactEmail,
      status: report.status,
      gender: report.gender,
    }));
  };

  const getAllReports = async () => {
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
      const petsFormated = reportPetAddapter(data.result.Result.content);
      setPets(petsFormated);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 1500); // Simula carga
    }
  };

  useEffect(() => {
    if (category === CategoryType.ALL) {
      getAllReports();
    } else if (category === CategoryType.LOST) {
      getLostReports();
    } else if (category === CategoryType.FOUND) {
      getFoundReports();
    }
  }, [category]);

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
