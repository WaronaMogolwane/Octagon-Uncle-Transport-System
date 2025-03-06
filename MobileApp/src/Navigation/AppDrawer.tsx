import React, {useContext, useEffect, useState} from 'react';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import HomeScreen from '../Screens/AppDrawer/HomeScreen/HomeScreen';
import TripsScreen from '../Screens/AppDrawer/Trips/TripsScreen';
import PaymentsScreen from '../Screens/AppDrawer/Payments/PaymentsScreen';
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
import {Auth} from '../Classes/Auth';
import {AuthContext} from '../Services/AuthenticationService';
import ForgotPasswordScreen from '../Screens/AuthenticationStack/ForgotPasswordScreen';
import {
  ArrowLeft,
  AlignLeft,
  Aperture,
  Bell,
  Bolt,
  CarFront,
  GraduationCap,
  HandCoins,
  Route,
  ShipWheel,
  University,
  UsersRound,
} from 'lucide-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {GetUser} from '../Controllers/UserController';
import {ScrollView} from 'react-native-gesture-handler';
import {getHeaderTitle} from '@react-navigation/elements';
import TripTransporterScreen from '../Screens/AppDrawer/Trips/TripTransporterScreen';
import {AppDrawerScreenStyles} from '../Stylesheets/GlobalStyles';
import RNFS from 'react-native-fs';

const AppDrawer = ({navigation}: any) => {
  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const [fullname, setFullname] = useState('');
  const [profileImageExists, setProfileImageExists] = useState(false);

  const role: number = Number(auth.GetUserRole());
  // const role: number = 1;

  const userId = auth.GetUserId();

  const Drawer = createDrawerNavigator();

  const iconSize = 20;
  const iconStrokeWidth = 1;
  const iconColor = '#000000';

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
    const checkImage = async () => {
      try {
        const filePath = `${RNFS.DocumentDirectoryPath}/profile_image.jpg`;
        const exists = await RNFS.exists(filePath);
        setProfileImageExists(exists);
      } catch (error) {
        console.error('Error checking profile image:', error);
        setProfileImageExists(false); // Fallback to default image on error
      }
    };

    checkImage();
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={(props: any) => {
        return (
          <SafeAreaView>
            <ScrollView>
              <View>
                <View>
                  <Image
                    style={AppDrawerScreenStyles.coverPhoto}
                    alt="profile photo"
                    source={require('../Images/background_image.jpg')}
                  />
                </View>
                <View style={AppDrawerScreenStyles.avatarContainer}>
                  <Pressable
                    onPress={() => navigation.navigate('Profile')}
                    style={({pressed}) => [{opacity: pressed ? 0.7 : 1}]}>
                    <Image
                      defaultSource={require('../Images/default_avatar_image.jpg')}
                      style={AppDrawerScreenStyles.avatar}
                      alt="Profile Photo"
                      source={
                        profileImageExists
                          ? {
                              uri: `file://${
                                RNFS.DocumentDirectoryPath
                              }/profile_image.jpg?${Date.now()}`,
                            }
                          : require('../Images/default_avatar_image.jpg')
                      }
                    />
                  </Pressable>
                  <Text style={AppDrawerScreenStyles.name}>{fullname}</Text>
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
        drawerStyle: {backgroundColor: '#ffffff', width: 250},
        headerTintColor: '#e8f0f3',
        headerTitleStyle: {fontWeight: 'bold'},
        drawerActiveTintColor: 'blue',
        drawerLabelStyle: {color: '#111'},
        header: ({navigation, route, options}) => {
          const title = getHeaderTitle(options, route.name);

          const iconSeletor = () => {
            if (
              title == 'User Account' ||
              title == 'Edit Personal Details' ||
              title == 'Business Information' ||
              title == 'Forgot Password'
            ) {
              return <ArrowLeft size={25} strokeWidth={2} color={'black'} />;
            } else if (title == 'Assign Passenger') {
              return <ArrowLeft size={25} strokeWidth={2} color={'black'} />;
            } else if (title == 'Trips') {
              if (role != 1) {
                return <AlignLeft size={25} strokeWidth={2} color={'black'} />;
              } else {
                return <ArrowLeft size={25} strokeWidth={2} color={'black'} />;
              }
            } else {
              return <AlignLeft size={25} strokeWidth={2} color={'black'} />;
            }
          };

          return (
            <View style={AppDrawerScreenStyles.toolbarContainer}>
              <View style={{width: '20%'}}>
                <Pressable
                  style={AppDrawerScreenStyles.toolbarLeftContainer}
                  onPress={() => {
                    if (
                      title == 'User Account' ||
                      title == 'Edit Personal Details' ||
                      title == 'Business Information'
                    ) {
                      navigation.navigate('Profile');
                    } else if (title == 'Assign Passenger') {
                      navigation.navigate('Manage Trip');
                    } else if (title == 'Trips') {
                      role != 1
                        ? navigation.toggleDrawer()
                        : navigation.navigate('Manage Trip');
                    } else if (title == 'Forgot Password') {
                      navigation.navigate('Edit User Account');
                    } else {
                      navigation.toggleDrawer();
                    }
                  }}>
                  {iconSeletor()}
                </Pressable>
              </View>
              <View style={{width: '60%', justifyContent: 'center'}}>
                <Text style={AppDrawerScreenStyles.toolbarText}>
                  {title != 'Home' ? title : ''}
                </Text>
              </View>
              <View
                style={{
                  width: '20%',
                  alignItems: 'flex-end',
                }}>
                <Pressable
                  style={AppDrawerScreenStyles.toolbarRightContainer}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}>
                  {title == 'Home' ? (
                    <Bell size={25} strokeWidth={2} color={'black'} />
                  ) : null}
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
      ) : null}

      {role != 3 ? (
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
              <Route
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
          title: 'Business Information',
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
        name="Forgot Password"
        component={ForgotPasswordScreen}
        options={{
          title: 'Forgot Password',
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
          title: 'Edit Personal Details',
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

export default AppDrawer;
