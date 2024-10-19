/* eslint-disable import/order */
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Chats = () => {
  return (
    <View style={styles().container}>
      <Text style={styles().textInformation}>
        Aún no tienes conversaciones 😿{' '}
      </Text>
    </View>
  );
};

export default Chats;

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textInformation: {
      color: 'gray',
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
