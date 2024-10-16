import { Feather, Ionicons } from '@expo/vector-icons';

export const icon = (name: string, color: string) => {
  if (name === 'favPets')
    return <Feather name="heart" size={30} color={color} />;
  if (name === 'adoptPet')
    return <Feather name="user" size={30} color={color} />;
  if (name === 'newMarker')
    return <Ionicons name="add-circle-outline" size={30} color="black" />;
  if (name === 'home') return <Feather name="home" size={30} color={color} />;
};
