import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppDrawer from './AppDrawer';
import BarcodeScanner from '../Screens/Camera/BarcodeScanner';

const AppNavigationStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="AppDrawer" component={AppDrawer} />
      <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
    </Stack.Navigator>
  );
};

export default AppNavigationStack;
