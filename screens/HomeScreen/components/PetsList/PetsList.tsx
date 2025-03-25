/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */
import { ActivityIndicator, FlatList, View } from 'react-native';
import React from 'react';
import { RenderItem } from '../RenderItem';
import { LostReportApi, ReportLostPetApi } from '@/types';

interface PetsListProps {
  pets: ReportLostPetApi[] | LostReportApi[];
  isLoading: boolean;
}

const PetsList = ({ pets, isLoading }: PetsListProps) => {
  return (
    <>
      {!isLoading ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={pets as ReportLostPetApi[]}
          keyExtractor={(item) => `${item.id} - ${item.reportType}`}
          renderItem={({ item, index }) => {
            return <RenderItem item={item} index={index} />;
          }}
        />
      ) : (
        <View style={{ top: 100 }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
    </>
  );
};

export default PetsList;
