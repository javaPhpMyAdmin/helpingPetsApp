/* eslint-disable import/order */
import { Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import React from 'react';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { UseFormHandleSubmit } from 'react-hook-form';

interface FormProps {
  userEmail: string;
  password: string;
}

interface SubmitButtonProps {
  handleSubmit: UseFormHandleSubmit<FormProps, undefined>;
  onSubmit: (data: FormProps) => void;
  isLoading: boolean;
  isValid: boolean;
}

const SubmitButton = ({
  handleSubmit,
  onSubmit,
  isLoading,
  isValid,
}: SubmitButtonProps) => {
  return (
    <Animated.View
      entering={FadeInUp.delay(500).duration(1000).springify()}
      className="w-[100%]  justify-center"
    >
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="bg-orange-500 p-3 rounded-2xl mb-3"
        disabled={!isValid}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="orange" />
        ) : (
          <Text className="text-xl font-bold text-white text-center">
            Ingresar
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SubmitButton;
