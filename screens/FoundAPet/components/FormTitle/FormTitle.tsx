/* eslint-disable import/order */
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Tooltip from 'react-native-walkthrough-tooltip';
import { alertTitle, infoTypes } from '../../helpers';

interface FormTitleProps {
  title: string;
  handleInfo: (type: number) => void;
  type: number;
}

const FormTitle = ({ title, handleInfo, type }: FormTitleProps) => {
  const { width, height } = useWindowDimensions();
  const [toolTipVisible, setToolTipVisible] = React.useState(false);
  return (
    <View style={styles.descriptionAndTitleContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <Tooltip
        isVisible={toolTipVisible}
        content={
          infoTypes.TITLE === type ? (
            <Text style={styles.tooltipText}>
              Puedes usar como sugerencia de título que tipo de animal esta
              perdido, en que zona o barrio se ecuentra, oara una visualización
              de la ubicación mas rápida para el reporte.
            </Text>
          ) : (
            <Text style={styles.tooltipText}>
              Puedes agregar por ejemplo en que condición has encontrado al
              animal así como otros aspectos del entorno o que creas relevante
              para el reporte.
            </Text>
          )
        }
        placement="bottom"
        onClose={() => setToolTipVisible(false)}
        topAdjustment={-height! * 0.045}
        horizontalAdjustment={-width! * 0.003}
        contentStyle={{
          height:
            type === infoTypes.DESCRIPTION ? height! * 0.15 : height! * 0.17,
        }}
      >
        <TouchableWithoutFeedback onPress={() => setToolTipVisible(true)}>
          <View style={styles.iconInfo}>
            <FontAwesome6 name="info" size={15} color="orange" />
          </View>
        </TouchableWithoutFeedback>
      </Tooltip>
    </View>
  );
};

export default FormTitle;

const styles = StyleSheet.create({
  descriptionAndTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    bottom: 2,
  },
  titleText: {
    fontSize: 20,
  },
  iconInfo: {
    width: 25,
    height: 25,
    borderRadius: 40,
    backgroundColor: '#e3e1e1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'gray',
    fontStyle: 'italic',
  },
});
