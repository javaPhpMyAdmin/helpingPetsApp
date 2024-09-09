/* eslint-disable import/order */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  ActivityIndicator,
} from 'react-native';
import MapView, {
  Callout,
  Marker,
  MarkerPressEvent,
  Polyline,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { useDirections } from '../../hooks/useDirections';
import {
  fetchDataDriving,
  fetchDataWalking,
} from '../../utils/getTimeTravel.util';
import { MockedMarkers } from '../../MockedMarkers/MockedMarkers';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { WebView } from 'react-native-webview';
const gmapk = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const PROVIDER = Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT;

const INITIAL_REGION = {
  latitude: -34.6459093,
  longitude: -56.0576395,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
  initialZoom: 20,
};

const origin = {
  latitude: -34.6459093,
  longitude: -56.0576395,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};
interface DestinationProps {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const INITIAL_DESTINATION = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0,
  longitudeDelta: 0,
};
const Img = Platform.OS === 'android' ? WebView : Image;
export default function MapScreen() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mapRef = useRef<MapView>();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [isVisible, setIsVisibleModal] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [destinationCoords, setDestinationCoords] =
    useState<DestinationProps>(INITIAL_DESTINATION);

  const [coords] = useDirections(origin, destinationCoords);
  const [distance, setDistance] = useState('');
  const [timeDriving, setTimeDriving] = useState('');
  const [timeWalking, setTimeWalking] = useState('');
  const [loadingTimeAndDistance, setLoadingTimeAndDistance] = useState(false);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log({ location });
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (!origin || !destinationCoords) return;

    const getTimeTravel = async () => {
      setLoadingTimeAndDistance(true);
      try {
        const travelTime = await fetchDataDriving(origin, destinationCoords);
        const timeTravel = await travelTime.json();

        const travelTimeWalkin = await fetchDataWalking(
          origin,
          destinationCoords
        );
        const timeTravelWalking = await travelTimeWalkin.json();
        setDistance(timeTravel.rows[0].elements[0].distance.text.split(' ')[0]);
        setTimeDriving(
          timeTravel.rows[0].elements[0].duration.text.split(' ')[0]
        );
        setTimeWalking(
          timeTravelWalking.rows[0].elements[0].duration.text.split(' ')[0]
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingTimeAndDistance(false);
      }
    };
    getTimeTravel();
  }, [destinationCoords, distance, timeDriving, timeWalking]);

  const handleSelectedDestination = (
    event: MarkerPressEvent,
    identifier: string
  ) => {
    // console.log(event.nativeEvent.coordinate);
    const coordinate = event.nativeEvent.coordinate;
    const currentDestination = {
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };
    setDestinationCoords(currentDestination);
    mapRef.current?.fitToSuppliedMarkers(['origin', `${identifier}`], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
    setIsVisibleModal(!isVisible);
  };

  const focusTap = () => {
    mapRef.current?.animateToRegion(origin);
  };

  const handleCloseModal = () => {
    setIsVisibleModal(!isVisible);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        initialRegion={INITIAL_REGION}
        provider={PROVIDER}
        style={StyleSheet.absoluteFill}
        showsUserLocation
        ref={mapRef}
        zoomEnabled
        mapType="mutedStandard"
        showsMyLocationButton
        className="relative"
        // onPress={(event) => console.log(event.nativeEvent.coordinate)}
      >
        {origin && (
          <Polyline
            coordinates={coords}
            strokeWidth={7}
            key={gmapk}
            strokeColor="pink"
          />
        )}
        {origin && <Marker coordinate={origin} identifier="origin"></Marker>}
        {MockedMarkers &&
          MockedMarkers.map((marker) => (
            <Marker
              key={marker.identifier}
              coordinate={marker.coordinate}
              identifier={marker.identifier}
              onPress={(event) =>
                handleSelectedDestination(event, marker.identifier)
              }
            >
              <Callout
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}
              >
                {Platform.OS === 'android' ? (
                  <WebView
                    style={{
                      width: 120,
                      height: 120,
                    }}
                    source={require('@/assets/images/paws.webp')}
                  />
                ) : (
                  <Image
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: 'transparent',
                    }}
                    source={require('@/assets/images/paws.webp')}
                  />
                )}

                <Text>BREVE DESCRIPCION</Text>
              </Callout>
            </Marker>
          ))}
        {/* <Pressable
          style={{
            position: 'absolute',
            right: 40,
            top: 60,
            backgroundColor: 'white',
            padding: 5,
            borderRadius: 10,
            borderColor: 'black',
          }}
          onPress={focusTap}
        >
          <Text>MI UBICACION</Text>
        </Pressable> */}
      </MapView>
      <Modal animationType="slide" transparent visible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Como llegar:</Text>
            <Pressable onPress={handleCloseModal}>
              <Text>Cerrar</Text>
            </Pressable>
          </View>
          {loadingTimeAndDistance ? (
            <ActivityIndicator size={130} color="red" />
          ) : (
            <View className="flex items-center justify-center">
              <Text className="font-medium text-2xl">Datos del recorrido</Text>
              <View className="flex flex-row items-center justify-center ">
                <Text className="font-extrabold text-xl stroke-zinc-50 fon">
                  Distancia:
                </Text>
                <Text className="text-xl">
                  {' '}
                  {(Number(distance) * 1.609).toFixed(2)} Km.
                </Text>
              </View>
              <View className="flex flex-row items-center justify-center">
                <Text className="font-extrabold text-xl stroke-zinc-50">
                  Duración en Auto{' '}
                </Text>
                <Fontisto name="car" size={24} color="black" />
                <Text className="text-xl"> :</Text>
                <Text className="text-xl"> {timeDriving} mins.</Text>
              </View>
              <View className="fflex flex-row items-center justify-center">
                <Text className="font-extrabold text-xl stroke-zinc-50">
                  Duración a pie
                </Text>
                <MaterialIcons name="directions-walk" size={24} color="black" />
                <Text className="text-xl">:</Text>
                <Text className="text-xl"> {timeWalking} mins.</Text>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#ccdcf0',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#aac9f9',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#151414',
    fontSize: 16,
  },
});
