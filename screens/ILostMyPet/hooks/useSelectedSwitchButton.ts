import { View, Text } from 'react-native';
import React, { useEffect } from 'react';

const useSelectedSwitchButton = () => {
  const [selectedTab, setSelectedTab] = React.useState('Macho');
  useEffect(() => {}, []);
  return [selectedTab, setSelectedTab];
};

export default useSelectedSwitchButton;
