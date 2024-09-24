/* eslint-disable import/order */
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface SwitchButtonProps {
  tab1: string;
  tab2: string;
  tab3?: string;
}

const SwitchButton = ({ tab1, tab2, tab3 }: SwitchButtonProps) => {
  const [selectedTab, setSelectedTab] = React.useState('Macho');
  return (
    <View
      style={{
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        height: '20%',
      }}
    >
      <View
        style={{
          width: '100%',
          height: 55,
          borderWidth: 0.3,
          backgroundColor: 'white',
          borderRadius: 15,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 5,
        }}
      >
        <TouchableOpacity
          style={{
            width: '50%',
            height: 45,
            backgroundColor:
              selectedTab === 'Macho' ? '#f7991e' : 'transparent',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setSelectedTab('Macho')}
        >
          <Text
            style={{
              color: selectedTab === 'Macho' ? 'white' : 'gray',
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
            backgroundColor:
              selectedTab === 'Hembra' ? '#f7991e' : 'transparent',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setSelectedTab('Hembra')}
        >
          <Text
            style={{
              color: selectedTab === 'Hembra' ? 'white' : 'gray',
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
