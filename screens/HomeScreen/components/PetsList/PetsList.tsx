/* eslint-disable import/order */
import { ActivityIndicator, FlatList, View } from 'react-native';
import React, { useState } from 'react';
import { RenderItem } from '../RenderItem';
import { usePets } from '@/context';

const PetsList = () => {
  const { pets } = usePets();
  //TODO: CHANGE IT WHEN USE REACT QUERY
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1500);
  return (
    <>
      {!isLoading ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={pets}
          keyExtractor={(item) => item.id}
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
