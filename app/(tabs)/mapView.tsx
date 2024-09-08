/* eslint-disable import/order */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Platform, StyleSheet, Image } from 'react-native';
import MapView, {
  Callout,
  LatLng,
  MapPressEvent,
  Marker,
  Polyline,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { useDirections } from '../../hooks/useDirections';

const gmapk = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
const gmd = process.env.EXPO_PUBLIC_GOOGLE_MAPS_DIRECTIONS;

const PROVIDER = Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT;

const INITIAL_REGION = {
  latitude: -34.6459093,
  longitude: -56.0576395,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
  initialZoom: 20,
};

const currentLocation = {
  latitude: -34.6459093,
  longitude: -56.0576395,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const currentLocation2 = {
  latitude: -34.64790220489705,
  longitude: -56.05991081794775,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const currentLocation3 = {
  latitude: -34.64501327406604,
  longitude: -56.0604224458547,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};
const currentLocation4 = {
  latitude: -34.64579131841945,
  longitude: -56.066065856825766,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

export default function mapView() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mapRef = useRef<any>();
  const [coords] = useDirections(currentLocation, currentLocation4);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    mapRef.current.fitToSuppliedMarkers(
      ['currentLocation', 'currentLocation4'],
      {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      }
    );
  }, [currentLocation, currentLocation4]);

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
        // onPress={(event) => console.log(event.nativeEvent.coordinate)}
      >
        {currentLocation && (
          <Polyline
            coordinates={coords}
            strokeWidth={4}
            key={gmapk}
            strokeColor="#111111"
          />
        )}
        {currentLocation2 && (
          <Marker coordinate={currentLocation2} identifier="currentLocation2">
            <Callout>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  style={{ width: 80, height: 80 }}
                  source={require('@/assets/images/paws.webp')}
                />
                <Text>BREVE DESCRIPCION</Text>
              </View>
            </Callout>
          </Marker>
        )}
        {currentLocation && (
          <Marker coordinate={currentLocation} identifier="currentLocation">
            <Callout>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  style={{ width: 80, height: 80 }}
                  source={require('@/assets/images/paws.webp')}
                />
                <Text>BREVE DESCRIPCION</Text>
              </View>
            </Callout>
          </Marker>
        )}
        {currentLocation3 && (
          <Marker coordinate={currentLocation3} identifier="currentLocation3">
            <Callout>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  style={{ width: 80, height: 80 }}
                  source={require('@/assets/images/paws.webp')}
                />
                <Text>BREVE DESCRIPCION</Text>
              </View>
            </Callout>
          </Marker>
        )}
        {currentLocation4 && (
          <Marker coordinate={currentLocation4} identifier="currentLocation4">
            <Callout>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  style={{ width: 80, height: 80 }}
                  source={require('@/assets/images/paws.webp')}
                />
                <Text>BREVE DESCRIPCION</Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
    </SafeAreaView>
  );
}
