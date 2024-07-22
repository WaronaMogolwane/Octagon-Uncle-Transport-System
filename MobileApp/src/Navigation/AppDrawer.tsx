import React, {useContext, useEffect, useState} from 'react';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import HomeScreen from '../Screens/AppDrawer/HomeScreen';
import TripsScreen from '../Screens/AppDrawer/TripsScreen';
import PaymentsScreen from '../Screens/AppDrawer/PaymentsScreen';
import ManageVehiclesScreen from '../Screens/AppDrawer/Vehicles/ManageVehiclesScreen';
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
import {Auth} from '../Classes/Auth';
import {AuthContext} from '../Services/AuthenticationService';
import {
  Aperture,
  Baby,
  Bolt,
  BookUser,
  Bus,
  HandCoins,
  KeySquare,
  ShipWheel,
  University,
  UsersRound,
} from 'lucide-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, StyleSheet, Text, View} from 'react-native';
import {GetUser} from '../Controllers/UserController';
import {TouchableOpacity} from 'react-native-gesture-handler';

const AppDrawer = ({navigation}: any) => {
  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const [fullname, setFullname] = useState('');

  const role: number = Number(auth.GetUserRole());
  const userId = auth.GetUserId();

  const Drawer = createDrawerNavigator();

  const iconSize = 20;
  const iconStrokeWidth = 1;
  const iconColor = '#000000';

  const user = {
    avatar: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
    coverPhoto:
      'https://www.tarkett-asia.com/media/img/M/THH_25094221_25187221_001.jpg',
    name: 'John Smith',
  };

  const RoleLabel = (role: number) => {
    if (role == 1) {
      return <Text>Transporter</Text>;
    } else if (role == 2) {
      return <Text>Client</Text>;
    } else if (role == 3) {
      return <Text>Driver</Text>;
    }
  };
  const GetUserName = async () => {
    GetUser(userId)
      .then((result: any) => {
        setFullname(result.firstName + ' ' + result.lastName);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetUserName();
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={(props: any) => {
        return (
          <SafeAreaView>
            <View>
              <View style={styles.coverPhoto}></View>
              <View style={styles.avatarContainer}>
                <Image
                  alt="profile photo"
                  source={{uri: user.avatar}}
                  style={styles.avatar}
                />
                <Text style={styles.name}>{fullname}</Text>
              </View>
            </View>
            {/* <View
              style={{
                height: 200,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: '#f4f4f4',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Profile');
                }}>
                <Image source={{uri: user.avatar}} style={styles.avatar} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 22,
                  marginVertical: 6,
                  fontWeight: 'bold',
                  color: '#111',
                }}>
                {fullname}
              </Text>
              <Text style={{fontSize: 16, color: '#111'}}>
                {RoleLabel(role)}
              </Text>
            </View> */}
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {backgroundColor: '#fff', width: 250},
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000000',
        headerTitleStyle: {fontWeight: 'bold'},
        drawerActiveTintColor: 'blue',
        drawerLabelStyle: {color: '#111'},
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: () => (
            <University
              size={iconSize}
              strokeWidth={iconStrokeWidth}
              color={iconColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Trips"
        component={TripsScreen}
        options={{
          drawerIcon: () => (
            <Bus
              size={iconSize}
              strokeWidth={iconStrokeWidth}
              color={iconColor}
            />
          ),
        }}
      />
      {role == 1 ? (
        <Drawer.Screen
          name="Payments"
          component={PaymentsScreen}
          options={{
            drawerIcon: () => (
              <HandCoins
                size={iconSize}
                strokeWidth={iconStrokeWidth}
                color={iconColor}
              />
            ),
          }}
        />
      ) : null}
      {role == 1 ? (
        <Drawer.Screen
          name="Vehicles"
          component={ManageVehiclesScreen}
          options={{
            drawerIcon: () => (
              <KeySquare
                size={iconSize}
                strokeWidth={iconStrokeWidth}
                color={iconColor}
              />
            ),
          }}
        />
      ) : null}
      {role == 1 ? (
        <Drawer.Screen
          name="Manage Trip"
          component={ManageTripsScreen}
          options={{
            drawerIcon: () => (
              <BookUser
                size={iconSize}
                strokeWidth={iconStrokeWidth}
                color={iconColor}
              />
            ),
          }}
        />
      ) : null}
      {role == 1 ? (
        <Drawer.Screen
          name="Drivers"
          component={ManageDriversScreen}
          options={{
            drawerIcon: () => (
              <ShipWheel
                size={iconSize}
                strokeWidth={iconStrokeWidth}
                color={iconColor}
              />
            ),
          }}
        />
      ) : null}
      {role == 1 ? (
        <Drawer.Screen
          name="Clients"
          component={ManageClientsScreen}
          options={{
            drawerIcon: () => (
              <UsersRound
                size={iconSize}
                strokeWidth={iconStrokeWidth}
                color={iconColor}
              />
            ),
          }}
        />
      ) : null}
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: () => (
            <Bolt
              size={iconSize}
              strokeWidth={iconStrokeWidth}
              color={iconColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Edit Business Details"
        component={EditBusinessDetailsScreen}
        options={{
          drawerItemStyle: {display: 'none'},
          drawerIcon: () => (
            <Aperture
              size={iconSize}
              strokeWidth={iconStrokeWidth}
              color={iconColor}
            />
          ),
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
      <Drawer.Screen
        name="Business Detail"
        component={BusinessDetailsScreen}
        options={{
          drawerIcon: () => (
            <Aperture
              size={iconSize}
              strokeWidth={iconStrokeWidth}
              color={iconColor}
            />
          ),
        }}
      />
      {role != 3 ? (
        <Drawer.Screen
          name="Passengers"
          component={ManagePassengerScreen}
          options={{
            drawerIcon: () => (
              <Baby
                size={iconSize}
                strokeWidth={iconStrokeWidth}
                color={iconColor}
              />
            ),
          }}
        />
      ) : null}
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

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#20B2AA',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },

  image: {
    width: 40,
    height: 40,
  },

  body: {
    padding: 30,
  },
  box: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  username: {
    color: '#20B2AA',
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 10,
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  coverPhoto: {
    width: '100%',
    height: 130,
    resizeMode: 'cover',
    backgroundColor: '#808080',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: -75,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: 'white',
  },
  name: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default AppDrawer;
