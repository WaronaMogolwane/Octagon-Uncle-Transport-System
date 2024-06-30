import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppDrawer from './AppDrawer';
import BarcodeScanner from '../Screens/Camera/BarcodeScannerScreen';
import CameraScreen from '../Screens/Camera/CameraScreen';

const AppNavigationStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AppDrawer" component={AppDrawer} />
      <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigationStack;
