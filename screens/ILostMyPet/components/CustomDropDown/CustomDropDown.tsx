/* eslint-disable import/order */
import {
  View,
  Text,
  FlatList,
  Modal,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

type OptionItem = {
  value: string;
  label: string;
};

interface DropDownProps {
  data: OptionItem[];
  onChange: (item: OptionItem) => void;
  placeholder: string;
}

const CustomDropDown = ({ data, onChange, placeholder }: DropDownProps) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);
  const [value, setValue] = useState('');
  const buttonRef = useRef<View>(null);
  const [top, setTop] = useState(0);

  const { width, height } = useWindowDimensions();

  const onSelect = useCallback(
    (item: OptionItem) => {
      onChange(item);
      setValue(item.label);
      setExpanded(false);
    },
    [onChange]
  );

  return (
    <View
      //   style={{ backgroundColor: 'red', position: 'relative' }}
      ref={buttonRef}
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        const topOffset = layout.y;
        const heightOfComponent = layout.height;

        const finalValue =
          topOffset + heightOfComponent + (Platform.OS === 'android' ? -42 : 3);

        setTop(finalValue);
      }}
    >
      <TouchableOpacity
        style={styles().button}
        activeOpacity={0.8}
        onPress={toggleExpanded}
      >
        <Text style={styles().text}>{value || placeholder}</Text>
        <AntDesign name={expanded ? 'caretup' : 'caretdown'} />
      </TouchableOpacity>
      {expanded ? (
        <Modal visible={expanded} transparent>
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View style={styles(width, height).backdrop}>
              <View
                style={[
                  styles().options,
                  {
                    top,
                  },
                ]}
              >
                <FlatList
                  keyExtractor={(item) => item.value}
                  data={data}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles().optionItem}
                      onPress={() => onSelect(item)}
                    >
                      <Text>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={styles().separator} />
                  )}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : null}
    </View>
  );
};

export default CustomDropDown;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    backdrop: {
      // position: 'absolute',
      top: height! * 0.5,
      width: width! * 1.04,
      right: width! * 0.02,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    optionItem: {
      height: 40,
      justifyContent: 'center',
    },
    separator: {
      height: 4,
    },
    options: {
      position: 'absolute',
      top: 0,
      backgroundColor: 'white',
      width: '100%',
      padding: 10,
      borderRadius: 6,
      maxHeight: 250,
    },
    text: {
      fontSize: 15,
      opacity: 0.8,
    },
    button: {
      height: 50,
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      paddingHorizontal: 15,
      borderRadius: 8,
    },
  });
