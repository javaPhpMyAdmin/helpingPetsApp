/* eslint-disable import/order */
import { View, StyleSheet } from 'react-native';
import { CardInfo, GreetingContainer, ReportContainer } from './components';
import { Stack } from 'expo-router';

export const ReportScreen = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <GreetingContainer />
      <View style={styles.cardContainer}>
        <CardInfo />
        <ReportContainer />
      </View>
    </View>
  );
};

// export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 2,
  },
});
