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
import { Marker, Photo } from '@/types';
import { useAuth, usePets } from '@/context';
import useUserLocation from '../../../../hooks/useUserLocation';
import Toast from 'react-native-root-toast';

interface FormProps {
  reportTitle: string;
  reportDescription: string;
}

interface ReportFoundPetFormProps {
  setIsKeyboardVisible: (visible: boolean) => void;
  images: string[];
  resetImage?: (image: string[] | null | undefined) => void;
}

const BEHAVIOR = Platform.OS === 'ios' ? 'padding' : 'height';

const ReportFoundPetForm = ({
  setIsKeyboardVisible,
  images,
  resetImage,
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

  const { addPet } = usePets();
  const { authState } = useAuth();
  const { latitude, longitude } = useUserLocation();

  const openModal = (type: number) => {
    if (type === infoTypes.TITLE) alertTitle();
    if (type === infoTypes.DESCRIPTION) alertDescription();
  };

  const formatCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `0${day}-${month}-${year}-${hour}-${minute}-${second}`;
  };

  const formatImageToPhotoType = (images: string[]) => {
    const photosAdapted: Photo[] = [];

    return images.map((image) => {
      const photo = {
        uri: image,
      };
      photosAdapted.push(photo);
      return photo;
    });
  };

  const submit = (data: FormProps) => {
    const petToAadd: Marker = {
      id: Math.random().toString(),
      photos: formatImageToPhotoType(images),
      title: data.reportTitle,
      aboutPet: data.reportDescription,
      lat: latitude,
      long: longitude,
      userEmail: authState?.user.email!,
      createdAt: formatCurrentDate(),
    };

    addPet!(petToAadd);
    Toast.show('REPORTE AGREGADO CON ÉXITO.', {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: false,
      backgroundColor: 'green',
    });
    // console.log({ data });
    reset();
    resetImage!(null);
  };

  useEffect(() => {
    if (isKeyboardVisible) {
      setIsKeyboardVisible(true);
    } else {
      setIsKeyboardVisible(false);
    }
  }, [isKeyboardVisible, setIsKeyboardVisible]);

  const fontScale = useWindowDimensions().fontScale;

  return (
    <>
      <KeyboardAvoidingView
        behavior={BEHAVIOR}
        style={
          styles({ error: errors.reportDescription, width, height }).container
        }
      >
        <TouchableWithoutFeedback
          style={styles({}).touchableContainer}
          onPress={() => Keyboard.dismiss()}
        >
          <View
            style={
              styles({ error: errors.reportTitle, width, height })
                .titleContainer
            }
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
                  style={styles({ error: errors.reportTitle }).titleInput}
                  placeholder="Ingrese un título"
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
          <View
            style={
              styles({ error: errors.reportDescription, width, height })
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
                  value={value || ''}
                  style={
                    styles({ fontScale, error: errors.reportDescription })
                      .descriptionInput
                  }
                  multiline
                  numberOfLines={5}
                  placeholder="Ingrese una descripción"
                  textAlignVertical="top"
                />
              )}
            />
            {errors.reportDescription && (
              <Text style={styles({ fontScale }).errorText}>
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
interface StylesProps {
  fontScale?: number;
  error?: FieldError;
  width?: number;
  height?: number;
}
const styles = ({ fontScale, error, width, height }: StylesProps) =>
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
      height: '50%',
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
      fontSize: fontScale! < 1 ? 20 : fontScale! > 1 ? 14 : 17,
      fontWeight: 'semibold',
      bottom: 1,
    },
    touchableContainer: {
      display: 'flex',
      justifyContent: 'center',
      height: '80%',
      alignItems: 'center',
    },
  });
