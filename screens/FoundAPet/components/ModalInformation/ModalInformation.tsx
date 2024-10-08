/* eslint-disable import/order */
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import { Octicons } from '@expo/vector-icons';

interface ModalInformationProps {
  openTitleInformationModal: boolean;
  closeModal: () => void;
  type: number;
}

const ModalInformation = ({
  openTitleInformationModal,
  closeModal,
  type,
}: ModalInformationProps) => {
  const { width, height } = useWindowDimensions();
  return (
    <Modal visible={openTitleInformationModal} transparent animationType="fade">
      <View style={styles(width, height).modalContentContainer}>
        <View style={styles(width).buttonContainer}>
          <Pressable onPress={closeModal}>
            {({ pressed }) => (
              <>
                <Octicons name="issue-closed" size={37} color="green" />
              </>
            )}
          </Pressable>
        </View>

        {type === 0 ? (
          <View style={{ paddingTop: 15 }}>
            <Text style={styles().textModal}>
              Puedes usar como título que animal está perdido y en que zona o
              barrio se encuentra para una visualización mas rápida del reporte.
            </Text>
          </View>
        ) : (
          <View style={{ paddingTop: 15 }}>
            <Text style={styles().textModal}>
              Puedes agregar por ejemplo la condición del animal como otros
              aspectos del entorno o que creas reelevante para el reporte.
            </Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default ModalInformation;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    modalContentContainer: {
      width: width! * 0.6,
      height: width! * 0.48,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 10,
      position: 'absolute',
      top: height! * 0.3,
      right: width! * 0.2,
      gap: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconModal: {
      position: 'absolute',
      top: -5,
      right: 5,
    },
    textModal: {
      fontSize: 16.5,
      letterSpacing: 0.5,
      color: 'gray',
      fontWeight: 'bold',
      flexShrink: 1,
    },
    buttonContainer: {
      width: width! * 0.1,
      height: width! * 0.1,
      justifyContent: 'center',
      alignSelf: 'center',
      position: 'absolute',
      top: 2,
      right: 5,
    },
  });
