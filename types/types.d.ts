export interface Origin {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  initialZoom?: number;
}

export interface ReportLostPetApi {
  breed: string;
  contactEmail: string;
  description: string;
  id: number;
  title: string;
  imagesLostPet: string[];
  imageFoundPet: string;
  petName: string;
  reportType: string;
  reportedAt: string;
  reportedBy?: string;
  status: string;
  updatedAt: string;
}

export interface PetsForAdoptionApi {
  breed: string;
  createdAt: string;
  description: string;
  id: number;
  imageUrls: [string];
  name: string;
  ownerId: number;
  status: string;
  age: string;
  gender: string;
  weight: number;
}

// export enum Gender {
//   'MALE',
//   'FEMALE',
// }

export interface DestinationProps {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface Marker {
  id: string;
  title: string;
  photos: Photo[];
  long: number;
  lat: number;
  userEmail: string;
  createdAt: string;
  gender?: string;
  aboutPet?: string;
  reward?: string;
  race?: string;
  specie?: string;
}

export interface MarkerLostPet {
  id: string;
  title: string;
  name?: string;
  photos: Photo[];
  long: number;
  lat: number;
  userEmail: string;
  createdAt: string;
  gender?: string;
  aboutPet?: string;
  reward?: string;
  race?: string;
  specie?: string;
  lost?: boolean;
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
