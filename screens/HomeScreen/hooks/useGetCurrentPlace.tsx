/* eslint-disable import/order */
import { Alert, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const useGetCurrentPlace = () => {
  const [currentPlaceName, setCurrentPlaceName] = useState('');
  const [userLocation, setUserLocation] = useState<Location.LocationObject>();

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
        const currentPlace = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        let currentPlaceName = '';
        if (
          currentPlace[0].city! !==
          (Platform.OS === 'ios'
            ? currentPlace[0].region
            : currentPlace[0].region?.split(' ')[2]!)
        ) {
          currentPlaceName = currentPlace[0].city!.concat(
            ', ',
            Platform.OS === 'ios'
              ? currentPlace[0].region!
              : currentPlace[0].region?.split(' ')[2]!
          );
        } else {
          currentPlaceName = currentPlace[0].city!;
        }

        setCurrentPlaceName(currentPlaceName ?? '');
      } catch (error) {
        Alert.alert(
          'Activar tu ubicación',
          'Necesitas activar tu ubicación para brindar la descripción de la misma'
        );
      }
    })();
  }, [currentPlaceName]);

  return [currentPlaceName, userLocation];
};

export default useGetCurrentPlace;
