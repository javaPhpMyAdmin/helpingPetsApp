/* eslint-disable import/order */
import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';

interface SwitchButtonProps {
  tab1: string;
  tab2: string;
  type?: number;
  setSelectedMode?: (value: string) => void;
  setSelectedLanguage?: (value: string) => void;
}

const SwitchButton = ({
  tab1,
  tab2,
  type,
  setSelectedMode,
  setSelectedLanguage,
}: SwitchButtonProps) => {
  const [selectedTab, setSelectedTab] = React.useState<string>(tab1);

  useEffect(() => {
    if (type === 1) {
      setSelectedMode!(selectedTab);
    } else {
      setSelectedLanguage!(selectedTab);
    }
  }, [selectedTab, setSelectedMode, setSelectedLanguage, type]);
  return (
    <View
      style={{
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
        // backgroundColor: 'orange',
      }}
    >
      <View
        style={{
          width: '100%',
          height: 55,
          backgroundColor: 'white',
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 5,
        }}
      >
        <TouchableOpacity
          style={{
            width: '50%',
            height: 45,
            backgroundColor: selectedTab === tab1 ? '#f7991e' : 'transparent',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setSelectedTab(tab1)}
        >
          <Text
            style={{
              color: selectedTab === tab1 ? 'white' : 'gray',
              fontSize: 18,
              fontWeight: '700',
            }}
          >
            {tab1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '50%',
            height: 45,
            backgroundColor: selectedTab === tab2 ? '#f7991e' : 'transparent',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setSelectedTab(tab2)}
        >
          <Text
            style={{
              color: `{${selectedTab} === ${tab2} ? 'white' : 'gray'}`,
              fontSize: 18,
              fontWeight: '700',
            }}
          >
            {tab2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SwitchButton;
