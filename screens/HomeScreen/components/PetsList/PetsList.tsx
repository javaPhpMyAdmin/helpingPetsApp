/* eslint-disable import/order */
import { FlatList } from 'react-native';
import React from 'react';
import { MockedPets } from '@/MockedPets';
import { RenderItem } from '../RenderItem';

const PetsList = () => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={MockedPets}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => {
        return <RenderItem item={item} index={index} />;
      }}
    />
  );
};

export default PetsList;
