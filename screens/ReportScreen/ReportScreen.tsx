/* eslint-disable import/order */
import { View, StyleSheet } from 'react-native';
import { CardInfo, GreetingContainer, ReportContainer } from './components';

export const ReportScreen = () => {
  return (
    <View style={styles.container}>
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
