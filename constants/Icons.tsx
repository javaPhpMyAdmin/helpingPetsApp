import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export const icon = (name: string, color: string) => {
  if (name === 'home') return <Feather name="home" size={24} color={color} />;
  if (name === 'mapView')
    return <Feather name="compass" size={24} color={color} />;
  if (name === 'adoptPet')
    return <Feather name="user" size={24} color={color} />;
  if (name === 'newMarker')
    return (
      <MaterialCommunityIcons
        name="map-marker-radius-outline"
        size={30}
        color={color}
      />
    );
};
