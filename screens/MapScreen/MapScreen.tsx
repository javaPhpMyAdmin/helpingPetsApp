/* eslint-disable import/order */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Image,
  Pressable,
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
import * as Location from 'expo-location';
import { useDirections } from '@/hooks/useDirections';
import { fetchDataDriving, fetchDataWalking } from '@/utils/getTimeTravel.util';
import { MockedMarkers } from '@/MockedMarkers/MockedMarkers';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';

import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router } from 'expo-router';

const gmapk = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const PROVIDER = Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT;

const INITIAL_REGION = {
  latitude: -34.6459093,
  longitude: -56.0576395,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
  initialZoom: 20,
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

interface Origin {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  initialZoom?: number;
}

export default function MapScreen() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mapRef = useRef<MapView | null>(null);
  const [origin, setOrigin] = useState<Origin>(INITIAL_DESTINATION);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [destinationCoords, setDestinationCoords] =
    useState<DestinationProps>(INITIAL_DESTINATION);

  const [coords] = useDirections(origin!, destinationCoords);
  const [distance, setDistance] = useState('');
  const [timeDriving, setTimeDriving] = useState('');
  const [timeWalking, setTimeWalking] = useState('');
  const [loadingTimeAndDistance, setLoadingTimeAndDistance] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['5%', '25%', '50%'], []);

  const renderBackDrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      console.log('CURRENT LOCATION', { location });
      const origenAux: Origin = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      setOrigin(origenAux);
    })();
  }, []);

  useEffect(() => {
    if (!origin) return;

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
    console.log('RENDER MAPVIEW');
  }, [destinationCoords, origin]);

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
    bottomSheetRef.current?.expand();
  };

  const focusTap = () => {
    mapRef.current?.animateToRegion(origin);
  };

  // const handleCloseModal = () => {
  //   setIsVisibleModal(!isVisible);
  // };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MapView
        initialRegion={INITIAL_REGION}
        provider={PROVIDER}
        style={[StyleSheet.absoluteFill]}
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
            strokeWidth={8}
            key={gmapk}
            strokeColor="skyblue"
          />
        )}
        {origin && (
          <Marker coordinate={origin} identifier="origin">
            <View
              style={{
                width: 60,
                height: 60,
                backgroundColor: 'gray',
                borderRadius: 50,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0.5,
              }}
            >
              <Image
                style={{ width: 40, height: 40 }}
                source={require('@/assets/images/user.png')}
              />
            </View>
          </Marker>
        )}
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
              <>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    // backgroundColor: 'transparent',
                    borderRadius: 50,
                    padding: 3,
                    borderColor: 'black',
                    borderWidth: 2,
                  }}
                  source={{ uri: marker.image }}
                />
                <Callout
                  style={{
                    width: 200,
                    height: 70,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flex: 1,
                  }}
                >
                  {/* {Platform.OS === 'android' ? (
                    <WebView
                      style={{
                        widht: 80,
                        height: 80,
                      }}
                      source={require('@/assets/images/paws.webp')}
                    />
                  ) : (
                    <Image
                      style={{
                        justifyContent: 'center',
                        width: 80,
                        height: 80,
                        backgroundColor: 'transparent',
                      }}
                      source={require('@/assets/images/paws.webp')}
                    />
                  )} */}

                  <Text className="font-medium">{marker.title}</Text>
                  <View
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      alignSelf: 'stretch',
                    }}
                  />
                  <Text>{marker.description}</Text>
                </Callout>
              </>
            </Marker>
          ))}
      </MapView>
      <Pressable
        style={{
          position: 'absolute',
          right: 40,
          top: 60,
          backgroundColor: 'skyblue',
          padding: 5,
          borderRadius: 10,
          borderColor: 'black',
        }}
        onPress={focusTap}
      >
        <Text>MI UBICACION</Text>
      </Pressable>
      <Pressable
        style={{
          position: 'absolute',
          left: 40,
          top: 60,
          backgroundColor: 'skyblue',
          padding: 5,
          borderRadius: 10,
          borderColor: 'black',
        }}
        onPress={() => router.back()}
      >
        <Text style={{ fontSize: 17 }}>Regresar</Text>
      </Pressable>
      <BottomSheet
        enablePanDownToClose
        index={-1}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackDrop}
      >
        <View style={styles.modalContent}>
          {loadingTimeAndDistance ? (
            <View
              style={{
                top: 50,
              }}
            >
              <ActivityIndicator size="large" color="red" />
            </View>
          ) : (
            <View style={styles.modalContent}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Datos del recorrido
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                  Distancia:
                </Text>
                <Text
                  style={{ fontSize: 17, fontWeight: 'bold', opacity: 0.7 }}
                >
                  {' '}
                  {(Number(distance) * 1.609).toFixed(2)} Km.
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                  Duración en Auto{' '}
                </Text>
                <Fontisto name="car" size={24} color="black" />
                <Text
                  style={{ fontSize: 17, fontWeight: 'bold', opacity: 0.7 }}
                >
                  {' '}
                  :
                </Text>
                <Text
                  style={{ fontSize: 17, fontWeight: 'bold', opacity: 0.7 }}
                >
                  {' '}
                  {timeDriving} mins.
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                  Duración a pie
                </Text>
                <MaterialIcons name="directions-walk" size={24} color="black" />
                <Text
                  style={{ fontSize: 17, fontWeight: 'bold', opacity: 0.7 }}
                >
                  :
                </Text>
                <Text
                  style={{ fontSize: 17, fontWeight: 'bold', opacity: 0.7 }}
                >
                  {' '}
                  {timeWalking} mins.
                </Text>
              </View>
            </View>
          )}
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  modalContent: {
    height: '100%',
    width: '100%',
    backgroundColor: '#ccdcf0',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    // position: 'absolute',
    bottom: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
