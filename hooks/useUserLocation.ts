/* eslint-disable import/order */
import { Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        Alert.alert(
          'Activar tu ubicación',
          'Necesitas activar tu ubicación para brindar la descripción de la misma'
        );
      }
    })();
  }, [userLocation]);

  return userLocation;
};

export default useUserLocation;
