/* eslint-disable import/order */
import { yupResolver } from '@hookform/resolvers/yup';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  Modal,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { Controller, FieldError, set, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { FormTitle } from '../FormTitle';
import { SubmitButton } from '../SubmitButton';
import Octicons from '@expo/vector-icons/Octicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ModalInformation } from '../ModalInformation';

const formSchema = object().shape({
  reportTitle: string()
    .required('El título es requerio')
    .min(10, 'El título debe tener al menos 3 caracteres'),
  reportDescription: string()
    .required('La descripción es requerida')
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(70, 'La descripción debe tener menos de 100 caracteres'),
});

interface FormProps {
  reportTitle: string;
  reportDescription: string;
}

const ReportFoundPetForm = () => {
  const [openTitleInformationModal, setOpenTitleInformationModal] =
    useState(false);
  const [type, setType] = useState(0);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'all',
    resolver: yupResolver(formSchema),
  });
  const { width, height } = useWindowDimensions();

  const openModal = (type: number) => {
    setOpenTitleInformationModal(!openTitleInformationModal);
    setType(type);
  };

  const closeModal = () => {
    setOpenTitleInformationModal(!openTitleInformationModal);
  };

  const handleDescriptionInfo = () => {};

  const submit = (data: FormProps) => {
    console.log('data');
    console.log({ data });
  };

  return (
    <>
      <View style={styles().titleContainer}>
        <FormTitle title="Título" handleInfo={openModal} type={0} />
        <Controller
          name="reportTitle"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles(errors.reportTitle).titleInput}
              placeholder="Ingrese un título"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.reportTitle && (
          <Text style={styles().errorText}>{errors.reportTitle.message}</Text>
        )}
      </View>
      <View
        style={
          styles(errors.reportDescription, width, height).descriptionContainer
        }
      >
        <FormTitle title="Descripción" handleInfo={openModal} type={1} />
        <Controller
          name="reportDescription"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={styles(errors.reportDescription).descriptionInput}
              multiline
              numberOfLines={5}
              placeholder="Ingrese una descripción"
              textAlignVertical="top"
            />
          )}
        />
        {errors.reportDescription && (
          <Text style={styles().errorText}>
            {errors.reportDescription.message}
          </Text>
        )}
      </View>
      <ModalInformation
        openTitleInformationModal={openTitleInformationModal}
        closeModal={closeModal}
        type={type}
      />
      <SubmitButton handleSubmit={handleSubmit} submit={submit} />
    </>
  );
};

export default ReportFoundPetForm;

const styles = (error?: FieldError, width?: number, height?: number) =>
  StyleSheet.create({
    titleContainer: {
      position: 'relative',
      width: 370,
      height: 100,
      // backgroundColor: 'orange',
      justifyContent: 'space-evenly',
      gap: 10,
    },
    titleInput: {
      backgroundColor: 'white',
      width: '100%',
      height: '60%',
      borderRadius: 10,
      borderWidth: error ? 1 : 0.3,
      borderColor: error ? 'red' : 'gray',
      paddingLeft: 10,
    },
    descriptionContainer: {
      width: width! * 0.939,
      height: height! * 0.27,
      // backgroundColor: 'pink',
      justifyContent: 'space-evenly',
      gap: 5,
    },
    descriptionText: {
      fontSize: 20,
    },
    descriptionInput: {
      backgroundColor: 'white',
      width: '100%',
      height: '80%',
      borderRadius: 10,
      paddingLeft: 10,
      paddingTop: 10,
      borderWidth: error ? 1 : 0.3,
      borderColor: error ? 'red' : 'gray',
    },
    errorText: {
      color: 'red',
      top: 2,
      fontSize: 16,
      fontWeight: 'semibold',
      bottom: 3,
    },
  });
