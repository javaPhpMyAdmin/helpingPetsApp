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
  image: string | string[];
  long: string;
  lat: string;
  userEmail: string;
  createdAt: string;
  gender?: string;
  aboutPet?: string;
  reward?: string;
  race?: string;
  specie?: string;
}

export interface Category {
  id: string;
  category: string;
}

export interface Pet {
  id: string;
  title: string;
  image: string;
  long: string;
  lat: string;
  userEmail: string;
  createdAt: string;
  gender?: string;
}
export interface PetForAdoption {
  id: string;
  photos: Photo[];
  petName: string;
  breed: string;
  gender: string;
  age: string;
  weight: number;
  aboutPet: string;
}

export interface Photo {
  uri: string;
}
export interface FormAddNewPetProps {
  petName: string;
  aboutPet: string;
  race: string;
  age: string;
  weight: string;
}
