const gmd = process.env.EXPO_PUBLIC_GOOGLE_MAPS_DIRECTIONS;

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
export const fetchDataDriving = async (
  origin: Origin,
  destination: Destination
) => {
  const data = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.latitude},${destination.longitude}&origins=${origin.latitude},${origin.longitude}&units=imperial&key=${gmd}&mode=driving`
  );
  return data;
};

export const fetchDataWalking = async (
  origin: Origin,
  destination: Destination
) => {
  const data = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.latitude},${destination.longitude}&origins=${origin.latitude},${origin.longitude}&units=imperial&key=${gmd}&mode=walking`
  );
  return data;
};
