/* eslint-disable import/order */
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import { CustomButton } from '../CustomButton';
import { useFonts } from 'expo-font';

const ReportContainer = () => {
  const { width, height } = useWindowDimensions();
  const [loaded] = useFonts({
    PlaypenSans: require('@/assets/fonts/PlaypenSans-SemiBold.ttf'),
  });
  const fontScale = useWindowDimensions().fontScale;

  return (
    <View style={styles(fontScale, loaded, width, height).containerReport}>
      <Text style={styles(fontScale, loaded, width).reportTittle}>
        Reportar una mascota perdida
      </Text>
      <View
        style={styles(fontScale, loaded, width, height).buttonReportContainer}
      >
        <CustomButton
          loaded={loaded}
          width={width}
          height={height}
          title="He encontrado una mascota"
          type={1}
        />
      </View>
      <View
        style={styles(fontScale, loaded, width, height).buttonReportContainer}
      >
        <CustomButton
          loaded={loaded}
          width={width}
          height={height}
          title="He perdido a mi mascota"
          type={2}
        />
      </View>
      <View
        style={styles(fontScale, loaded, width, height).buttonReportContainer}
      >
        <CustomButton
          loaded={loaded}
          width={width}
          height={height}
          title="Ver todos los reportes"
          type={3}
        />
      </View>
    </View>
  );
};

export default ReportContainer;

const styles = (
  fontScale?: number,
  loaded?: boolean,
  width?: number,
  height?: number
) =>
  StyleSheet.create({
    containerReport: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      gap: 10,
      bottom: height! * 0.05,
      left: width! * 0.002,
    },
    buttonReportContainer: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      height: height! * 0.065,
      width: width! * 0.9,
      backgroundColor: 'white',
      borderRadius: 12,
      // borderColor: 'gray',
      // borderWidth: 0.3,
      shadowColor: 'black',
      shadowOffset: {
        width: 1.5,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 2.5,
    },
    reportTittle: {
      flexShrink: 1,
      color: 'black',
      fontSize: fontScale! < 1 ? 24 : fontScale! > 1 ? 17 : 21,
      fontFamily: loaded ? 'PlaypenSans' : '',
      top: 3,
      right: width! * 0.05,
      left: width! * 0.05,
    },
  });
