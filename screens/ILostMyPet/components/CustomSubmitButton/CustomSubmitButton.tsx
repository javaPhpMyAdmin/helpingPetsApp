/* eslint-disable import/order */
import {
  Text,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { UseFormHandleSubmit } from 'react-hook-form';

interface SubmitButtonProps {
  handleSubmit: UseFormHandleSubmit<FormProps, undefined>;
  submit: (data: FormProps) => void;
  isLoading?: boolean;
}

interface FormProps {
  petName: string;
  aboutPet: string;
  race: string;
}

const CustomSubmitButton = ({
  handleSubmit,
  submit,
  isLoading = false,
}: SubmitButtonProps) => {
  const { width, height } = useWindowDimensions();

  return (
    <>
      <TouchableOpacity
        style={styles(width, height).buttonContainer}
        onPress={handleSubmit(submit)}
        disabled={isLoading}
      >
        {!isLoading ? (
          <>
            <Entypo name="check" size={60} color="white" />
            <Text style={styles().buttonText}>Reportar</Text>
          </>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </TouchableOpacity>
    </>
  );
};

export default CustomSubmitButton;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    buttonContainer: {
      width: width! * 0.8,
      height: width! * 0.2,
      backgroundColor: 'orange',
      borderRadius: 30,
      flexDirection: 'row',
      gap: 1,
      justifyContent: 'center',
      alignItems: 'center',
      bottom: height! * 0.1,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 29,
    },
  });
