/* eslint-disable import/order */
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React, { useState } from 'react';
import { SwitchButton } from '../SwitchButton';
import { CustomSubmitButton } from '../CustomSubmitButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { TitleLostMyPet } from '../TitleLostMyPet';
import { alertAboutPet, alertRace, infoTypes } from '../../helpers';
import { formSchema } from './schemaValidation';
import { useAuth, usePets } from '@/context';
import useUserLocation from '@/hooks/useUserLocation';
import Toast from 'react-native-root-toast';

interface FormProps {
  reportTitle: string;
  petName: string;
  aboutPet: string;
  race: string;
}

interface FormLostMyPetProps {
  images: string[];
}

const FormLostMyPet = ({ images }: FormLostMyPetProps) => {
  const { width, height } = useWindowDimensions();
  const [selectedSex, setSelectedSex] = useState('');
  const [selectedReward, setSelectedReward] = useState('');
  const [selectedSpecie, setSelectedSpecie] = useState('');
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormProps>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });
  const { addPet } = usePets();
  const { authState } = useAuth();
  const userLocation = useUserLocation();

  const fontScale = useWindowDimensions().fontScale;

  const formatCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}-${month}-${year}`;
  };

  const submit = (data: FormProps) => {
    console.log('SUBMITTING.....');
    //TODO: CREATE A METHOD TO CREATE PET
    const petToAdd = {
      id: Math.random().toString(),
      title: data.reportTitle,
      name: data.petName,
      image: images,
      long: userLocation.longitude,
      lat: userLocation.latitude,
      userEmail: authState?.user?.email || '',
      createdAt: formatCurrentDate(),
      gender: selectedSex,
      aboutPet: data.aboutPet,
      reward: selectedReward,
      race: data.race,
      specie: selectedSpecie,
      lost: true,
    };
    console.log({ petToAdd });
    Toast.show('REPORTE AGREGADO CON ÉXITO.', {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: false,
      backgroundColor: 'green',
    });
    addPet!(petToAdd);
    reset();
  };

  const handleInfo = (type: number) => {
    if (type === infoTypes.RACE) alertRace();
    if (type === infoTypes.ABOUT_PET) alertAboutPet();
  };

  return (
    <View style={styles({ width }).formContainer}>
      <View style={styles({ width, height }).titleContainer}>
        <Text style={styles({ fontScale }).titleText}>Título del reporte</Text>
        <Controller
          name="reportTitle"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles({ fontScale }).titleInput}
              placeholder="Ingrese un título para el reporte"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.reportTitle && (
          <Text style={styles({ fontScale }).errorText}>
            {errors.reportTitle.message}
          </Text>
        )}
      </View>
      <View style={styles({ width, height }).titleContainer}>
        <Text style={styles({ fontScale }).titleText}>Nombre</Text>
        <Controller
          name="petName"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles({ fontScale }).titleInput}
              placeholder="Nombre de la mascota"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.petName && (
          <Text style={styles({ fontScale }).errorText}>
            {errors.petName.message}
          </Text>
        )}
      </View>
      <View style={styles({ width, height }).titleContainer}>
        <Text style={styles({ fontScale }).titleText}>Sexo</Text>
        <SwitchButton
          setSelectedSex={setSelectedSex}
          tab1="Macho"
          tab2="Hembra"
        />
      </View>
      <View style={styles({ width, height }).titleContainer}>
        <Text style={styles({ fontScale }).titleText}>Especie</Text>
        <SwitchButton
          setSelectedSpecie={setSelectedSpecie}
          tab1="Perro"
          tab2="Gato"
          tab3="Otro"
        />
      </View>
      <View style={styles({ width, height }).titleContainer}>
        <TitleLostMyPet
          title="Raza"
          handleInfo={handleInfo}
          type={infoTypes.RACE}
        />
        <Controller
          name="race"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles({ fontScale }).titleInput}
              placeholder="Raza de la mascota"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.race && (
          <Text style={styles({ fontScale }).errorText}>
            {errors.race.message}
          </Text>
        )}
      </View>
      <View style={styles({ width, height }).titleContainer}>
        <Text style={styles({ fontScale }).titleText}>Recompensa</Text>
        <SwitchButton
          setSelectedReward={setSelectedReward}
          tab1="SI"
          tab2="NO"
        />
      </View>
      <View style={styles({ width, height }).aboutPetContainer}>
        <TitleLostMyPet
          title="Acerca del animal"
          handleInfo={handleInfo}
          type={infoTypes.ABOUT_PET}
        />
        <Controller
          name="aboutPet"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              numberOfLines={5}
              multiline
              style={styles({ fontScale }).aboutPet}
              placeholder="Breve descripción acerca del animal"
              textAlignVertical="top"
              onChangeText={onChange}
              value={value || ' '}
            />
          )}
        />
        {errors.aboutPet && (
          <Text style={styles({ fontScale }).errorText}>
            {errors.aboutPet.message}
          </Text>
        )}
      </View>
      <View style={styles({ width, height }).sumbitButtonContainer}>
        <CustomSubmitButton
          //TODO: CHANGE IT WHEN USE REACT QUERY
          // isLoading={isLoading}
          handleSubmit={handleSubmit}
          submit={submit}
          isValid={isValid && images.length > 0}
        />
      </View>
    </View>
  );
};

export default FormLostMyPet;

interface CustomStyles {
  fontScale?: number;
  width?: number;
  height?: number;
}

const styles = ({ fontScale, width, height }: CustomStyles) =>
  StyleSheet.create({
    formContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      padding: 10,
      paddingTop: 30,
      //   backgroundColor: 'red',
    },
    titleContainer: {
      width: width! * 0.939,
      height: height! * 0.15,
      // backgroundColor: 'orange',
      justifyContent: 'space-evenly',
    },
    titleInput: {
      backgroundColor: 'white',
      width: '100%',
      height: '45%',
      borderRadius: 10,
      borderWidth: 0.3,
      borderColor: 'gray',
      paddingLeft: 10,
    },
    aboutPetContainer: {
      width: width! * 0.939,
      height: height! * 0.27,
      justifyContent: 'space-evenly',
      gap: 5,
      top: 10,
    },
    aboutPet: {
      backgroundColor: 'white',
      width: '100%',
      height: '80%',
      borderRadius: 10,
      paddingLeft: 10,
      paddingTop: 10,
      borderWidth: 0.3,
      borderColor: 'gray',
    },
    errorText: {
      color: 'red',
      top: 1,
      fontSize: fontScale! < 1 ? 24 : fontScale! > 1 ? 17 : 21,
      fontWeight: 'semibold',
      bottom: 5,
    },
    sumbitButtonContainer: {
      width: width! * 0.939,
      height: height! * 0.27,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      top: 40,
    },
    titleText: {
      fontSize: fontScale! < 1 ? 24 : fontScale! > 1 ? 17 : 21,
      fontWeight: 'bold',
      top: 3,
    },
    iconInfo: {
      width: 25,
      height: 25,
      borderRadius: 40,
      backgroundColor: '#e3e1e1',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
