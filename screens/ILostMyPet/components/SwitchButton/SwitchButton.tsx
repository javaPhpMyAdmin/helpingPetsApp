/* eslint-disable import/order */
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect } from 'react';

interface SwitchButtonProps {
  tab1: string;
  tab2: string;
  tab3?: string;
  setSelectedSex?: (value: string) => void;
  setSelectedSpecie?: (value: string) => void;
  setSelectedReward?: (value: string) => void;
}

const SwitchButton = ({
  tab1,
  tab2,
  tab3,
  setSelectedReward,
  setSelectedSpecie,
  setSelectedSex,
}: SwitchButtonProps) => {
  const [selectedTab, setSelectedTab] = React.useState<string>(tab1);

  const fontScale = useWindowDimensions().fontScale;

  useEffect(() => {
    if (setSelectedSex) {
      setSelectedSex(selectedTab);
    }
    if (setSelectedReward) {
      setSelectedReward(selectedTab);
    }
    if (setSelectedSpecie) {
      setSelectedSpecie(selectedTab);
    }
  }, [selectedTab, setSelectedReward, setSelectedSex, setSelectedSpecie]);
  return (
    <View
      style={{
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // height: '20%',
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
              fontSize: fontScale! < 1 ? 23 : fontScale! > 1 ? 16 : 19,
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
              fontSize: fontScale! < 1 ? 23 : fontScale! > 1 ? 16 : 19,
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
