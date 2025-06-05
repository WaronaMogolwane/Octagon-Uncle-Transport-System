import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppDrawer from './AppDrawer';
import BarcodeScanner from '../Screens/Camera/BarcodeScannerScreen';
import CameraScreen from '../Screens/Camera/CameraScreen';
import TransporterPaymentHistoryScreen from '../Screens/AppDrawer/Payments/PaymentHistory/TransporterPaymentHistoryScreen';

const AppNavigationStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AppDrawer" component={AppDrawer} />
      <Stack.Screen
        name="BarcodeScanner"
        component={BarcodeScanner}
        options={{headerShown: true}}
      />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen
        name="TransporterPaymentHistory"
        component={TransporterPaymentHistoryScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigationStack;
