import { Alert } from 'react-native';

export default function alertRace() {
  Alert.alert(
    'Raza',
    'Si la mascota no tiene ninguna raza específica, puedes ingresar "No tiene".'
  );
}
