/* eslint-disable import/order */
import { yupResolver } from '@hookform/resolvers/yup';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { FormTitle } from '../FormTitle';
import { SubmitButton } from '../SubmitButton';
import { ModalInformation } from '../ModalInformation';
import { useKeyboardVisible } from '../../../../hooks/useIsKeyboardVisible';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const formSchema = object().shape({
  reportTitle: string()
    .required('El título es requerido')
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

interface ReportFoundPetFormProps {
  setIsKeyboardVisible: (visible: boolean) => void;
}

const BEHAVIOR = Platform.OS === 'ios' ? 'padding' : 'height';

const ReportFoundPetForm = ({
  setIsKeyboardVisible,
}: ReportFoundPetFormProps) => {
  const [openTitleInformationModal, setOpenTitleInformationModal] =
    useState(false);
  const [type, setType] = useState(0);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'all',
    resolver: yupResolver(formSchema),
  });

  const { width, height } = useWindowDimensions();
  const isKeyboardVisible = useKeyboardVisible();
  const openModal = (type: number) => {
    setOpenTitleInformationModal(!openTitleInformationModal);
    setType(type);
  };

  const closeModal = () => {
    setOpenTitleInformationModal(!openTitleInformationModal);
  };

  const submit = (data: FormProps) => {
    console.log({ data });
    reset();
  };

  useEffect(() => {
    if (isKeyboardVisible) {
      setIsKeyboardVisible(true);
    } else {
      setIsKeyboardVisible(false);
    }
  }, [isKeyboardVisible, setIsKeyboardVisible]);

  return (
    <>
      <KeyboardAvoidingView
        behavior={BEHAVIOR}
        style={styles(errors.reportDescription, width, height).container}
      >
        <TouchableWithoutFeedback
          style={styles().touchableContainer}
          onPress={() => Keyboard.dismiss()}
        >
          <View
            style={styles(errors.reportTitle, width, height).titleContainer}
          >
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
              <Text style={styles().errorText}>
                {errors.reportTitle.message}
              </Text>
            )}
          </View>
          <View
            style={
              styles(errors.reportDescription, width, height)
                .descriptionContainer
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
        </TouchableWithoutFeedback>

        <ModalInformation
          openTitleInformationModal={openTitleInformationModal}
          closeModal={closeModal}
          type={type}
        />
      </KeyboardAvoidingView>
      {!isKeyboardVisible && (
        <SubmitButton handleSubmit={handleSubmit} submit={submit} />
      )}
    </>
  );
};

export default ReportFoundPetForm;

const styles = (error?: FieldError, width?: number, height?: number) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // top: width! * 0.05,
      // backgroundColor: 'red',
      height: height! * 0.6,
    },
    titleContainer: {
      position: 'relative',
      width: width! * 0.939,
      height: height! * 0.15,
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
      top: 10,
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
      top: 1,
      fontSize: 16,
      fontWeight: 'semibold',
      bottom: 5,
    },
    touchableContainer: {
      display: 'flex',
      justifyContent: 'center',
      height: '80%',
      alignItems: 'center',
    },
  });
