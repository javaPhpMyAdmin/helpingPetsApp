/* eslint-disable import/order */
import React from 'react';
import { Stack } from 'expo-router';

const LoginLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen name="login/signup" options={{ headerShown: false }} />
    </Stack>
  );
};

export default LoginLayout;
