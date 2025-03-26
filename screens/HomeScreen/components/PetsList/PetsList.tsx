/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */
import { ActivityIndicator, FlatList, View } from 'react-native';
import React from 'react';
import { RenderItem } from '../RenderItem';
import { ReportPetApp } from '@/types';

interface PetsListProps {
  pets: ReportPetApp[];
  isLoading: boolean;
}

const PetsList = ({ pets, isLoading }: PetsListProps) => {
  return (
    <>
      {!isLoading ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={pets}
          keyExtractor={(item) =>
            `${item.reportId} - ${item.reportType} - ${item.reportedBy}`
          }
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
