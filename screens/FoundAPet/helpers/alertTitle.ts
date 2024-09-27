import { Alert } from 'react-native';

export default function alertTitle() {
  Alert.alert(
    'Título del reporte',
    'Puedes usar como sugerencia de título que tipo de animal esta perdido, en que zona o barrio se ecuentra, oara una visualización de la ubicación mas rápida para el reporte.'
  );
}
