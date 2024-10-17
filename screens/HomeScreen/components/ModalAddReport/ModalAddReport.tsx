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

interface ModalAddReportProps {
  isVisibleAddModal: boolean;
  setIsVisibleAddModal: (isVisible: boolean) => void;
}

const ModalAddReport = ({
  isVisibleAddModal,
  setIsVisibleAddModal,
}: ModalAddReportProps) => {
  const { height } = useWindowDimensions();
  return (
    <Modal transparent animationType="slide" visible={isVisibleAddModal}>
      <View style={styles({ height }).container}>
        <TouchableOpacity onPress={() => setIsVisibleAddModal(false)}>
          <Text>Cerrar</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity>
            <Text>He encontrado unas mascota</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>He perdido a mi mascota</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAddReport;

interface StylesProps {
  isKeyboardVisible?: boolean;
  fontScale?: number;
  width?: number;
  height?: number;
}

const styles = ({ height }: StylesProps) =>
  StyleSheet.create({
    container: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flex: 1,
      top: height! * 0.6,
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginVertical: 20,
      backgroundColor: 'white',
    },
  });
