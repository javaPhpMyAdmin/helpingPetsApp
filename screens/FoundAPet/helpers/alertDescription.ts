import { Alert } from 'react-native';

export default function alertDescription() {
  Alert.alert(
    'Descripción del reporte',
    'Puedes agregar por ejemplo en que condición has encontrado al animal asi como otros aspectos del entorno o que creas relevante para el reporte.'
  );
}
