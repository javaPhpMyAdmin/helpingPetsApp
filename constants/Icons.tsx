import { Feather } from '@expo/vector-icons';

export const icon = (name: string, color: string) => {
  if (name === 'index') return <Feather name="home" size={24} color={color} />;
  if (name === 'mapView')
    return <Feather name="compass" size={24} color={color} />;
  if (name === 'profile')
    return <Feather name="user" size={24} color={color} />;
};
