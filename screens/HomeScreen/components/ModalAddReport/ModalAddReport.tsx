/* eslint-disable import/order */
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { CustomButton } from '../../../ReportScreen/components';
import AntDesign from '@expo/vector-icons/AntDesign';

interface ModalAddReportProps {
  isVisibleAddModal: boolean;
  setIsVisibleAddModal: (isVisible: boolean) => void;
}

const ModalAddReport = ({
  isVisibleAddModal,
  setIsVisibleAddModal,
}: ModalAddReportProps) => {
  const { width, height } = useWindowDimensions();
  const fontScale = useWindowDimensions().fontScale;

  return (
    <View>
      <Modal
        transparent
        statusBarTranslucent
        style={{ height: '40%' }}
        animationType="slide"
        visible={isVisibleAddModal}
      >
        <View style={styles({ height }).container}>
          <View style={styles({ width, height }).headerContainer}>
            <Text style={styles({ fontScale, width, height }).createText}>
              Crear Reporte
            </Text>
            <View>
              <TouchableOpacity
                style={styles({}).closeButton}
                onPress={() => setIsVisibleAddModal(false)}
              >
                <AntDesign name="close" size={34} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles({ width, height }).buttonsContainer}>
            <View style={styles({ width, height }).buttonReportContainer}>
              <CustomButton title="He encontrado una mascota" type={1} />
            </View>
            <View style={styles({ width, height }).buttonReportContainer}>
              <CustomButton title="He perdido a mi mascota" type={2} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalAddReport;

interface StylesProps {
  isKeyboardVisible?: boolean;
  fontScale?: number;
  width?: number;
  height?: number;
}

interface StylesProps {
  width?: number;
  height?: number;
  fontScale?: number;
}

const styles = ({ fontScale, width, height }: StylesProps) =>
  StyleSheet.create({
    container: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flex: 1,
      top: height! * 0.7,
      width: '100%',
      height: '50%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginVertical: 20,
      backgroundColor: '#f1f1f1',
      borderTopColor: 'black',
      borderTopWidth: 0.8,
      borderLeftColor: 'black',
      borderLeftWidth: 0.8,
      borderRightColor: 'black',
      borderRightWidth: 0.8,
    },
    buttonsContainer: {
      top: width! * 0.1,
      flexDirection: 'column',
      gap: 20,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'blue',
    },
    buttonReportContainer: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      height: height! * 0.065,
      width: width! * 0.9,
      backgroundColor: '#f8f7f7',
      borderRadius: 12,
      shadowColor: 'black',
      shadowOffset: {
        width: 1.5,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 2.5,
      top: height! * 0.001,
    },
    closeButton: {
      // position: 'absolute',
      // top: 20,
      // right: 20,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      top: 20,
      width: '100%',
      paddingHorizontal: 20,
    },
    createText: {
      color: 'gray',
      fontSize: fontScale! < 1 ? 25 : fontScale! > 1 ? 18 : 22,
      fontWeight: 'bold',
      fontFamily: 'PlaypenSans',
    },
  });
