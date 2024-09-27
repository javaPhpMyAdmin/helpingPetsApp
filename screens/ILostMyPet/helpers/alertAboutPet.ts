import { Alert } from 'react-native';

export default function alertAboutPet() {
  Alert.alert(
    'Acerca de tu mascota',
    'Puedes ingresar algún dato relevante para la mascota, como si posee alguna mancha, es de edad avanzada, su visión o escucha no es buena o algo que la distinga de otras mascotas.'
  );
}
