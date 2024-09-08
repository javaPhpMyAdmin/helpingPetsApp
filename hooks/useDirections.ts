import React, { useEffect, useState } from 'react';
import { decode } from '@googlemaps/polyline-codec';
import { LatLng } from 'react-native-maps';
const gmd = process.env.EXPO_PUBLIC_GOOGLE_MAPS_DIRECTIONS;
const mapDirectionsURL =
  'https://maps.googleapis.com/maps/api/directions/json?';

interface Destination {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  initialZoom?: number;
}

interface Origin {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  initialZoom?: number;
}

interface UseDirectionsProps {
  origin: Origin;
  destination: Destination;
}

export const useDirections = (
  origin: Origin,
  destination: Destination
): [LatLng[], unknown] => {
  const [coords, setCoords] = useState<LatLng[]>([]);
  const [error, setError] = useState<unknown>(null);
  const getDirections = async (origin: Origin, destination: Destination) => {
    try {
      let resp = await fetch(
        `${mapDirectionsURL}origin=${origin.latitude},${origin.longitude}&destination=${destination?.latitude},${destination?.longitude}&key=${gmd}`
      );

      let respJson = await resp.json();
      let points = decode(respJson.routes[0].overview_polyline.points);
      let coordsArray = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      setCoords(coordsArray);
    } catch (error: unknown) {
      setError(error);
    }
  };

  useEffect(() => {
    if (origin && destination) getDirections(origin, destination);
  }, [origin, destination]);

  return [coords, error];
};
