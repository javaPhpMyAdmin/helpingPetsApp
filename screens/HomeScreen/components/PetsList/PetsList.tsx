/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */
import { ActivityIndicator, FlatList, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RenderItem } from '../RenderItem';
import { useAuth } from '@/context';

const PetsList = () => {
  const { accessToken } = useAuth();
  const [pets, setPets] = useState<any>([]);
  //TODO: CHANGE IT WHEN USE REACT QUERY
  const [isLoading, setIsLoading] = useState(true);

  const getPets = async () => {
    try {
      console.log('Fetching pets in PetsList-HomeScreen...');
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
      setPets(data.result.Result.content);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 1500); // Simula carga
    }
  };

  useEffect(() => {
    getPets();
  }, []);

  // Monitorear cambios en pets
  useEffect(() => {}, [pets]);

  setTimeout(() => {
    setIsLoading(false);
  }, 1500);
  return (
    <>
      {!isLoading ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={pets}
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
