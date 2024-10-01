/* eslint-disable import/order */
import { yupResolver } from '@hookform/resolvers/yup';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import React, { useEffect } from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';
import { FormTitle } from '../FormTitle';
import { SubmitButton } from '../SubmitButton';
import { useKeyboardVisible } from '@/hooks/useIsKeyboardVisible';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { alertDescription, alertTitle, infoTypes } from '../../helpers';
import { formSchema } from './schemaValidation';

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
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const { width, height } = useWindowDimensions();

  const isKeyboardVisible = useKeyboardVisible();

  const openModal = (type: number) => {
    if (type === infoTypes.TITLE) alertTitle();
    if (type === infoTypes.DESCRIPTION) alertDescription();
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
            <FormTitle
              title="Título"
              handleInfo={openModal}
              type={infoTypes.TITLE}
            />
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
            <FormTitle
              title="Descripción"
              handleInfo={openModal}
              type={infoTypes.DESCRIPTION}
            />
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
