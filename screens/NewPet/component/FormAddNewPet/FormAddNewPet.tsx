/* eslint-disable import/order */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SwitchButton } from '../../../ILostMyPet/components';
import { TitleLostMyPet } from '../../../ILostMyPet/components/TitleLostMyPet';
import { yupResolver } from '@hookform/resolvers/yup';
import { alertRace, alertAboutPet } from '../../../ILostMyPet/helpers';
import { infoTypes } from '../../helpers';
import { formSchema } from './schemaValidation';
import { CustomSubmitButton } from '@/components';
import { CustomSelect } from '../CustomSelect';

interface FormAddNewPetProps {
  petName: string;
  aboutPet: string;
  race: string;
  age: string;
  weight: string;
}

const FormAddNewPet = () => {
  const { width, height } = useWindowDimensions();
  const [selectedSex, setSelectedSex] = useState('');
  const [selectedReward, setSelectedReward] = useState('');
  const [selectedSpecie, setSelectedSpecie] = useState('');
  const [selectedTypeAge, setSelectedTypeAge] = useState('');
  const [selectedTypeWeight, setSelectedTypeWeight] = useState('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormAddNewPetProps>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const fontScale = useWindowDimensions().fontScale;

  const submit = (data: FormAddNewPetProps) => {
    console.log({ data });
    console.log({ selectedSex });
    console.log({ selectedReward });
    console.log({ selectedSpecie });
    console.log({ selectedTypeAge });
    console.log({ selectedTypeWeight });
    reset();
  };

  const handleInfo = (type: number) => {
    if (type === infoTypes.RACE) alertRace();
    if (type === infoTypes.ABOUT_PET) alertAboutPet();
  };

  return (
    <View style={styles({ width }).formContainer}>
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
      <View style={styles({}).ageWeightContainer}>
        <View style={styles({}).controllerAge}>
          <Text style={styles({ fontScale }).titleText}>Edad</Text>
          <View style={styles({}).ageContainer}>
            <Controller
              name="age"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  keyboardType="numeric"
                  style={styles({}).ageInput}
                  placeholder="Edad"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <CustomSelect
              data={[
                { title: 'Años', value: 'Years' },
                { title: 'Meses', value: 'Months' },
              ]}
              selectType={setSelectedTypeAge}
            />
          </View>
        </View>
        <View style={styles({}).controllerAge}>
          <Text style={styles({ fontScale }).titleText}>Peso</Text>
          <View style={styles({}).ageContainer}>
            <Controller
              name="weight"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles({}).ageInput}
                  placeholder="Peso"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <CustomSelect
              data={[
                { title: 'Kilos', value: 'Kilos' },
                { title: 'Gramos', value: 'gramos' },
              ]}
              selectType={setSelectedTypeWeight}
            />
          </View>
        </View>
      </View>
      {errors.weight && (
        <Text style={styles({ fontScale }).errorText}>
          {errors.weight.message}
        </Text>
      )}
      {errors.age && (
        <Text style={styles({ fontScale }).errorText}>
          {errors.age.message}
        </Text>
      )}
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
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.aboutPet && !isValid && (
          <Text style={styles({ fontScale }).errorText}>
            {errors.aboutPet.message}
          </Text>
        )}
      </View>
      <View style={styles({ width, height }).sumbitButtonContainer}>
        <CustomSubmitButton
          isValid={isValid}
          //TODO: CHANGE IT WHEN USE REACT QUERY
          // isLoading={isLoading}
          handleSubmit={handleSubmit}
          submit={submit}
        />
      </View>
    </View>
  );
};

export default FormAddNewPet;

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
      top: 5,
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
    ageContainer: {
      flexDirection: 'row',
      width: '100%',
      gap: 5,
      height: 50,
      alignItems: 'center',
      top: 10,
    },
    ageInput: {
      backgroundColor: 'white',
      width: '30%',
      height: '100%',
      borderRadius: 10,
      borderWidth: 0.3,
      borderColor: 'gray',
      paddingLeft: 10,
    },
    ageText: {
      fontSize: fontScale! < 1 ? 24 : fontScale! > 1 ? 17 : 21,
      fontWeight: '500',
    },
    ageWeightContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      left: 20,
      bottom: 5,
    },
    controllerAge: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '50%',
      left: 15,
    },
  });
