import {View, Button as TouchableOpacity} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../Screens/AppDrawer/HomeScreen';
import TripsScreen from '../Screens/AppDrawer/TripsScreen';
import PaymentsScreen from '../Screens/AppDrawer/PaymentsScreen';
import ManageVehiclesScreen from '../Screens/AppDrawer/ManageVehiclesScreen';
import ManageDriversScreen from '../Screens/AppDrawer/ManageDriversScreen';
import ManageClientsScreen from '../Screens/AppDrawer/ManageClientsScreen';
import ProfileScreen from '../Screens/AppDrawer/ProfileScreen';
import UserDetailSignUp from '../Screens/SignUpStack/UserDetailsSignUp';

const AppDrawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Trips" component={TripsScreen} />
      <Drawer.Screen name="Payments" component={PaymentsScreen} />
      <Drawer.Screen name="Manage Vehicles" component={ManageVehiclesScreen} />
      <Drawer.Screen name="Manage Drivers" component={ManageDriversScreen} />
      <Drawer.Screen name="Manage Clients" component={ManageClientsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;