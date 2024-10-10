/* eslint-disable import/order */
import { Platform } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const useGetCurrentPlace = () => {
  const [currentPlaceName, setCurrentPlaceName] = useState('');
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
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
    })();
  }, []);
  return currentPlaceName;
};

export default useGetCurrentPlace;
