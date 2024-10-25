/* eslint-disable import/order */
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const ChatsScreen = () => {
  return (
    <SafeAreaView style={styles().container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Mis Chats',
          headerTitleStyle: {
            fontSize: 25,
            color: 'orange',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Text style={styles().textInformation}>
        Aún no tienes conversaciones 😿{' '}
      </Text>
      <Text style={styles().conversationsInformation}>
        Tus conversaciones aparecerán aquí 😉
      </Text>
    </SafeAreaView>
  );
};

export default ChatsScreen;

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textInformation: {
      color: 'black',
      fontSize: 25,
      fontWeight: 'bold',
    },
    conversationsInformation: {
      color: 'gray',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
