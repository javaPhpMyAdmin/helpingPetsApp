export interface Origin {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  initialZoom?: number;
}

export interface DestinationProps {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface Marker {
  id: string;
  title: string;
  image: string;
  long: string;
  lat: string;
  userEmail: string;
  createdAt: string;
  gender?: string;
}

export interface Category {
  id: string;
  category: string;
}
