import { router } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

const NewMarker = () => {
  useEffect(() => {
    router.push('/(auth)/ReportPet');
  }, []);
  return <View />;
};

export default NewMarker;
