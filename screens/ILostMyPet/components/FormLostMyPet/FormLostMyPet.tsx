/* eslint-disable import/order */
import {
  View,
  Text,
  Platform,
  TextInput,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import { SwitchButton } from '../SwitchButton';
import { CustomDropDown } from '../CustomDropDown';
import { CustomSubmitButton } from '../CustomSubmitButton';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

const BEHAVIOR = Platform.OS === 'ios' ? 'padding' : 'height';

type OptionItem = {
  value: string;
  label: string;
};
const data = [
  { value: '🐈', label: '🐈 un Gato' },
  { value: '🦮', label: '🦮 un Perro' },
  { value: '🐍', label: '🐍 una serpiente' },
  { value: '🐈', label: '🐈 un Gato' },
  { value: '🦮', label: '🦮 un Perro' },
  { value: '🐍', label: '🐍 una serpiente' },
  { value: '🐈', label: '🐈 un Gato' },
  { value: '🦮', label: '🦮 un Perro' },
  { value: '🐍', label: '🐍 una serpiente' },
  { value: '🐈', label: '🐈 un Gato' },
  { value: '🦮', label: '🦮 un Perro' },
  { value: '🐍', label: '🐍 una serpiente' },
  { value: '🐈', label: '🐈 un Gato' },
  { value: '🦮', label: '🦮 un Perro' },
  { value: '🐍', label: '🐍 una serpiente' },
  { value: '🐈', label: '🐈 un Gato' },
  { value: '🦮', label: '🦮 un Perro' },
  { value: '🐍', label: '🐍 una serpiente' },
];

const formSchema = object().shape({
  petName: string().required('El nombre es requerido'),
  aboutPet: string()
    .required('Acerca del animal es requerida')
    .min(5, 'Debe tener al menos 10 caracteres')
    .max(70, 'Maximo 70 caracteres'),
});
interface FormProps {
  petName: string;
  aboutPet: string;
}
const FormLostMyPet = () => {
  const { width, height } = useWindowDimensions();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'all',
    resolver: yupResolver(formSchema),
  });

  const submit = (data: FormProps) => {
    console.log({ data });
    reset();
  };

  const onChange = (item: OptionItem) => {
    console.log(item);
  };

  return (
    <View style={styles(width).formContainer}>
      <View style={styles(width, height).titleContainer}>
        <Text>Nombre</Text>
        <Controller
          name="petName"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles().titleInput}
              placeholder="Nombre de la mascota"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.petName && (
          <Text style={styles().errorText}>{errors.petName.message}</Text>
        )}
      </View>
      <View style={styles(width, height).titleContainer}>
        <Text>Sexo</Text>
        <SwitchButton tab1="Macho" tab2="Hembra" />
      </View>
      <View style={styles(width, height).titleContainer}>
        <Text>Raza</Text>
        <CustomDropDown
          data={data}
          onChange={onChange}
          placeholder="Seleciona una raza"
        />
      </View>
      <View style={styles(width, height).titleContainer}>
        <Text>Recompensa</Text>
        <SwitchButton tab1="SI" tab2="NO" />
      </View>
      <View style={styles(width, height).aboutPetContainer}>
        <Text>Acerca del animal</Text>
        <Controller
          name="aboutPet"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              numberOfLines={5}
              multiline
              style={styles().aboutPet}
              placeholder="Breve descripcion acerca del animal"
              textAlignVertical="top"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.aboutPet && (
          <Text style={styles().errorText}>{errors.aboutPet.message}</Text>
        )}
      </View>
      <CustomSubmitButton handleSubmit={handleSubmit} submit={submit} />
    </View>
  );
};

export default FormLostMyPet;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    formContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      padding: 10,
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
      fontSize: 16,
      fontWeight: 'semibold',
      bottom: 5,
    },
  });
