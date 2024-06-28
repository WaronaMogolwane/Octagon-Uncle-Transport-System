import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../Screens/AppDrawer/HomeScreen';
import TripsScreen from '../Screens/AppDrawer/TripsScreen';
import PaymentsScreen from '../Screens/AppDrawer/PaymentsScreen';
import ManageVehiclesScreen from '../Screens/AppDrawer/ManageVehiclesScreen';
import ManageDriversScreen from '../Screens/AppDrawer/ManageDrivers/ManageDriversScreen';
import ManageClientsScreen from '../Screens/AppDrawer/ManageClients/ManageClientsScreen';
import ManageTripsScreen from '../Screens/AppDrawer/ManageTripsScreen';
import AssignPassengerScreen from '../Screens/AppDrawer/AssignPassengerScreen';
import ManagePassengerScreen from '../Screens/AppDrawer/ManagePassengerScreen';
import EditUserAccountScreen from '../Screens/AppDrawer/EditUserAccountScreen';
import BusinessDetailsScreen from '../Screens/AppDrawer/BusinessDetailsScreen';
import ProfileScreen from '../Screens/AppDrawer/ProfileScreen';
import EditBusinessDetailsScreen from '../Screens/AppDrawer/EditBusinessDetailsScreen';
import EditUserDetailsScreen from '../Screens/AppDrawer/EditUserDetailsScreen';
import EditPaymentDetailsScreen from '../Screens/AppDrawer/EditPaymentDetailsScreen';

const AppDrawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Trips" component={TripsScreen} />
      <Drawer.Screen name="Payments" component={PaymentsScreen} />
      <Drawer.Screen name="Manage Vehicles" component={ManageVehiclesScreen} />
      <Drawer.Screen name="Manage Trip" component={ManageTripsScreen} />
      <Drawer.Screen name="Manage Drivers" component={ManageDriversScreen} />
      <Drawer.Screen name="Manage Clients" component={ManageClientsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen
        name="Edit Business Details"
        component={EditBusinessDetailsScreen}
        options={{
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen
        name="Edit Payment Details"
        component={EditPaymentDetailsScreen}
        options={{
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen
        name="Edit User Account"
        component={EditUserAccountScreen}
        options={{
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen
        name="Edit User Details"
        component={EditUserDetailsScreen}
        options={{
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen name="Business Detail" component={BusinessDetailsScreen} />
      <Drawer.Screen
        name="Manage Passengers"
        component={ManagePassengerScreen}
      />
      <Drawer.Screen
        name="Assign Passenger"
        component={AssignPassengerScreen}
        options={{
          drawerItemStyle: {display: 'none'},
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
