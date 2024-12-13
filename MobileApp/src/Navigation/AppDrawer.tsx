import React, {useContext, useEffect, useState} from 'react';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import HomeScreen from '../Screens/AppDrawer/HomeScreen/HomeScreen';
import TripsScreen from '../Screens/AppDrawer/Trips/TripsScreen';
import PaymentsScreen from '../Screens/AppDrawer/PaymentsScreen';
import ManageVehiclesScreen from '../Screens/AppDrawer/Vehicles/ManageVehiclesScreen';
import ManageDriversScreen from '../Screens/AppDrawer/ManageDrivers/ManageDriversScreen';
import ManageClientsScreen from '../Screens/AppDrawer/ManageClients/ManageClientsScreen';
import ManageTripsScreen from '../Screens/AppDrawer/Trips/ManageTripsScreen';
import AssignPassengerScreen from '../Screens/AppDrawer/Trips/AssignPassengerScreen';
import ManagePassengerScreen from '../Screens/AppDrawer/Passengers/ManagePassengerScreen';
import EditUserAccountScreen from '../Screens/AppDrawer/Profile/EditUserAccountScreen';
import BusinessDetailsScreen from '../Screens/AuthenticationStack/BusinessDetailsScreen';
import ProfileScreen from '../Screens/AppDrawer/Profile/ProfileScreen';
import EditBusinessDetailsScreen from '../Screens/AppDrawer/Profile/EditBusinessDetailsScreen';
import EditUserDetailsScreen from '../Screens/AppDrawer/Profile/EditUserDetailsScreen';
import EditPaymentDetailsScreen from '../Screens/AppDrawer/Profile/EditPaymentDetailsScreen';

import {Auth} from '../Classes/Auth';
import {AuthContext} from '../Services/AuthenticationService';
import {
  AlignLeft,
  Aperture,
  Baby,
  Bell,
  Bolt,
  BookUser,
  Bus,
  CarFront,
  GraduationCap,
  HandCoins,
  KeySquare,
  Route,
  ShipWheel,
  University,
  UsersRound,
} from 'lucide-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {GetUser} from '../Controllers/UserController';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RestoreImageViaAsyncStorage} from '../Services/ImageStorageService';
import TripVehiclePickerScreen from '../Screens/AppDrawer/Trips/TripVehiclePickerScreen';
import {getHeaderTitle} from '@react-navigation/elements';
import TripTransporterScreen from '../Screens/AppDrawer/Trips/TripTransporterScreen';

const AppDrawer = ({navigation}: any) => {
  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const [fullname, setFullname] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isReloading, setIsReloading] = useState(false);
  const [tracker, setTracker] = useState(false);

  const role: number = Number(auth.GetUserRole());
  // const role: number = 1;

  const userId = auth.GetUserId();

  const Drawer = createDrawerNavigator();

  const iconSize = 20;
  const iconStrokeWidth = 1;
  const iconColor = '#000000';

  const storageUrl: string =
    'https://f005.backblazeb2.com/file/Dev-Octagon-Uncle-Transport/';

  const date = new Date();

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

  useEffect(() => {
    RestoreImageViaAsyncStorage().then((result: any) => {
      if (result == '' || result == null) {
        setProfileImage(result);
      } else {
        setProfileImage(result);
      }
    });
  }, [fullname, isReloading]);

  return (
    <Drawer.Navigator
      drawerContent={(props: any) => {
        return (
          <SafeAreaView>
            <ScrollView>
              <View>
                <View>
                  <Image
                    style={styles.coverPhoto}
                    alt="profile photo"
                    source={require('../Images/background_image.jpg')}
                  />
                </View>
                <View style={styles.avatarContainer}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('Profile');
                    }}>
                    <Image
                      alt="profile photo"
                      source={
                        profileImage == ''
                          ? require('../Images/default_avatar_image.jpg')
                          : {
                              uri:
                                storageUrl +
                                profileImage +
                                '?xc=' +
                                date.getTime() +
                                date.getDate(),
                            }
                      }
                      style={styles.avatar}
                    />
                  </Pressable>
                  <Text style={styles.name}>{fullname}</Text>
                  <Text
                    style={{fontSize: 16, color: '#111', paddingBottom: 10}}>
                    {RoleLabel(role)}
                  </Text>
                </View>
              </View>
              <DrawerItemList {...props} />
            </ScrollView>
          </SafeAreaView>
        );
      }}
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {backgroundColor: '#e8f0f3', width: 250},
        headerTintColor: '#e8f0f3',
        headerTitleStyle: {fontWeight: 'bold'},
        drawerActiveTintColor: 'blue',
        drawerLabelStyle: {color: '#111'},
        header: ({navigation, route, options}) => {
          const title = getHeaderTitle(options, route.name);

          return (
            <View style={{flexDirection: 'row', backgroundColor: '#e8f0f3'}}>
              <View style={{width: '20%'}}>
                <Pressable
                  style={{marginVertical: 15, marginStart: 15}}
                  onPress={() => {
                    navigation.toggleDrawer();
                    setIsReloading(!isReloading);
                  }}>
                  <AlignLeft size={25} strokeWidth={2} color={'black'} />
                </Pressable>
              </View>
              <View style={{width: '60%', justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'black',
                  }}>
                  {title != 'Home' ? title : ''}
                </Text>
              </View>
              <View
                style={{
                  width: '20%',
                  alignItems: 'flex-end',
                }}>
                <Pressable
                  style={{marginVertical: 15, marginEnd: 15}}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}>
                  <Bell size={25} strokeWidth={2} color={'black'} />
                </Pressable>
              </View>
            </View>
          );
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // headerShown: false,
          title: 'Home',
          drawerIcon: () => (
            <University
              size={iconSize}
              strokeWidth={iconStrokeWidth}
              color={iconColor}
            />
          ),
        }}
      />

      {role != 1 ? (
        <Drawer.Screen
          name="Trip"
          component={TripsScreen}
          options={{
            // drawerItemStyle: {display: 'none'},
            title: 'Trips',
            drawerIcon: () => (
              <Route
                size={iconSize}
                strokeWidth={iconStrokeWidth}
                color={iconColor}
              />
            ),
          }}
        />
      ) : (
        <Drawer.Screen
          name="Trip Vehicle Picker"
          component={TripVehiclePickerScreen}
          options={{
            title: 'Trips',
            drawerIcon: () => (
              <Route
                size={iconSize}
                strokeWidth={iconStrokeWidth}
                color={iconColor}
              />
            ),
          }}
        />
      )}

      {role == 1 ? (
        <Drawer.Screen
          name="Payments"
          component={PaymentsScreen}
          options={{
            title: 'Payments',
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
          name="Manage Vehicles"
          component={ManageVehiclesScreen}
          options={{
            title: 'Vehicles',
            drawerIcon: () => (
              <CarFront
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
            title: 'Manage Trips',
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
          name="Manage Drivers"
          component={ManageDriversScreen}
          options={{
            title: 'Drivers',
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
          name="Manage Clients"
          component={ManageClientsScreen}
          options={{
            title: 'Clients',
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
        name="Edit Business Details"
        component={EditBusinessDetailsScreen}
        options={{
          title: 'Business',
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
          title: 'Payments',
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen
        name="Edit User Account"
        component={EditUserAccountScreen}
        options={{
          title: 'User Account',
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen
        name="Edit User Details"
        component={EditUserDetailsScreen}
        options={{
          title: 'Personal Details',
          drawerItemStyle: {display: 'none'},
        }}
      />

      <Drawer.Screen
        name="Business Detail"
        component={BusinessDetailsScreen}
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
      {role != 3 ? (
        <Drawer.Screen
          name="Manage Passengers"
          component={ManagePassengerScreen}
          options={{
            title: 'Passengers',
            drawerIcon: () => (
              <GraduationCap
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
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
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
        name="Transport Trip"
        component={TripTransporterScreen}
        options={{
          title: 'Trips',
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
    height: 120,
    resizeMode: 'cover',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: -75,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 75,
  },
  name: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default AppDrawer;
