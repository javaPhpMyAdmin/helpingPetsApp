/* eslint-disable import/order */
import { FlatList } from 'react-native';
import React from 'react';
import { RenderItem } from '../RenderItem';
import { usePets } from '@/context';

const PetsList = () => {
  const { pets } = usePets();
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={pets}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => {
        return <RenderItem item={item} index={index} />;
      }}
    />
  );
};

export default PetsList;
