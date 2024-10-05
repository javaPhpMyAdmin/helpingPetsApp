/* eslint-disable import/order */
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StyleSheet,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AlreadyHaveAccount } from '../AlreadyHaveAccount';
import { SubmitButton } from '../SubmitButton';
import { Controller, FieldError, useForm } from 'react-hook-form';
import { GoogleButton } from '../GoogleButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema } from './schemaValidation';
import { useAuth } from '@/context/AuthContext/AuthContext';
import { useKeyboardVisible } from '@/hooks/useIsKeyboardVisible';
import Ionicons from '@expo/vector-icons/Ionicons';

interface FormProps {
  userEmail: string;
  password: string;
  confirmPassword: string;
}

const FormSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { onSignIn } = useAuth();
  const { width, height } = useWindowDimensions();
  const isKeyboardVisible = useKeyboardVisible();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormProps>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const handleSeePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSeeConfirmPassword = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const onSubmit = (data: FormProps) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log('DATA', data);
      onSignIn!(data.userEmail!, data.password!, data.confirmPassword!);
      reset();
      setIsLoading(false);
    }, 2000);
  };

  return (
    <View className="h-full w-full flex justify-center pt-60 ">
      <TouchableWithoutFeedback
        style={styles(errors.userEmail, width, height).touchableContainer}
        onPress={() => Keyboard.dismiss()}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <>
            <View className="flex items-center bottom-2">
              <Animated.Text
                entering={FadeInUp.duration(1000).springify()}
                className={
                  isKeyboardVisible
                    ? 'text-orange-400 font-bold tracking-wider text-2xl'
                    : 'text-orange-400 font-bold tracking-wider text-5xl'
                }
              >
                Crear Cuenta
              </Animated.Text>
            </View>
            <View className="flex items-center mx-4 space-y-4">
              <Animated.View
                entering={FadeInDown.delay(300).duration(1000).springify()}
                className="bg-black/5 p-5 rounded-2xl w-full"
                style={styles(errors.userEmail).emailInput}
              >
                <Controller
                  name="userEmail"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor="gray"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </Animated.View>
              {errors.userEmail && (
                <Text style={styles().errorText}>
                  {errors.userEmail.message}
                </Text>
              )}
              <Animated.View
                entering={FadeInUp.delay(300).duration(1000).springify()}
                className="bg-black/5 p-5 rounded-2xl w-full"
                style={styles(errors.password).passwordInput}
              >
                <Controller
                  name="password"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      secureTextEntry={!isPasswordVisible}
                      placeholder="Contraseña"
                      placeholderTextColor="gray"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                <TouchableOpacity onPress={handleSeePassword}>
                  {isPasswordVisible ? (
                    <Ionicons name="eye-outline" size={34} color="black" />
                  ) : (
                    <Ionicons name="eye-off-outline" size={34} color="gray" />
                  )}
                </TouchableOpacity>
              </Animated.View>
              {errors.password && (
                <Text style={styles().errorText}>
                  {errors.password.message}
                </Text>
              )}
              <Animated.View
                entering={FadeInUp.delay(500).duration(1000).springify()}
                className="bg-black/5 p-5 rounded-2xl w-full"
                style={styles(errors.confirmPassword).confirmPasswordInput}
              >
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      secureTextEntry={!isConfirmPasswordVisible}
                      placeholder="Confirmar contraseña"
                      placeholderTextColor="gray"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                <TouchableOpacity onPress={handleSeeConfirmPassword}>
                  {isConfirmPasswordVisible ? (
                    <Ionicons name="eye-outline" size={34} color="black" />
                  ) : (
                    <Ionicons name="eye-off-outline" size={34} color="gray" />
                  )}
                </TouchableOpacity>
              </Animated.View>
              {errors.confirmPassword && (
                <Text style={styles().errorText}>
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>
          </>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <View style={styles(errors.userEmail, width).buttonsContainer}>
        <SubmitButton
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isLoading={isLoading}
          isValid={isValid}
        />
        <GoogleButton />
        <AlreadyHaveAccount />
      </View>
    </View>
  );
};

export default FormSignUp;

const styles = (error?: FieldError, width?: number, height?: number) =>
  StyleSheet.create({
    touchableContainer: {
      top: height! * 0.2,
    },
    buttonsContainer: {
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 15,
      left: width! * 0.05,
    },
    errorText: {
      color: 'red',
      fontSize: 15,
      fontWeight: 'semibold',
      bottom: 3,
    },
    emailInput: {
      borderWidth: error ? 1.5 : 0,
      borderColor: error ? 'red' : 'gray',
    },
    passwordInput: {
      borderWidth: error ? 1.5 : 0,
      borderColor: error ? 'red' : 'gray',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    confirmPasswordInput: {
      borderWidth: error ? 1.5 : 0,
      borderColor: error ? 'red' : 'gray',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
