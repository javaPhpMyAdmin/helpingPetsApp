/* eslint-disable import/order */
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign } from '@expo/vector-icons';

type Data = {
  title: string;
  value: string;
};

interface CustomSelectProps {
  data: Data[];
  selectType: (value: string) => void;
}

const CustomSelect = ({ data, selectType }: CustomSelectProps) => {
  const fontScale = useWindowDimensions().fontScale;
  const { width } = useWindowDimensions();

  return (
    <SelectDropdown
      data={data}
      onSelect={(selectedItem, index) => {
        selectType(selectedItem.value);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles({ width }).dropdownButtonStyle}>
            <Text style={styles({ fontScale }).dropdownButtonTxtStyle}>
              {(selectedItem && selectedItem.title) || 'Elegir...'}
            </Text>
            {!selectedItem && (
              <AntDesign name="down" size={20} color="orange" />
            )}
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...styles({}).dropdownItemStyle,
              ...(isSelected && { backgroundColor: 'transparent' }),
            }}
          >
            <Text style={styles({ fontScale }).dropdownItemTxtStyle}>
              {item.title}
            </Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default CustomSelect;

interface CustomStyles {
  fontScale?: number;
  width?: number;
}

const styles = ({ fontScale, width }: CustomStyles) =>
  StyleSheet.create({
    dropdownButtonStyle: {
      width: width! * 0.22,
      height: 30,
      backgroundColor: '#E9ECEF',
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: fontScale! < 1 ? 22 : fontScale! > 1 ? 15 : 19,
      fontWeight: '500',
      color: 'black',
      width: '30%',
      borderRadius: 20,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
      left: 5,
      borderRadius: 20,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: fontScale! < 1 ? 18 : fontScale! > 1 ? 11 : 16,
      fontWeight: '500',
      color: 'black',
      borderRadius: 20,
    },
  });
