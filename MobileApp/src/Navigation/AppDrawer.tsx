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
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {GetUser} from '../Controllers/UserController';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RestoreImageViaAsyncStorage} from '../Services/ImageStorageService';

const AppDrawer = ({navigation}: any) => {
  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const [fullname, setFullname] = useState('');
  const [profileImage, setProfileImage] = useState('');

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

  useEffect(() => {
    RestoreImageViaAsyncStorage().then((result: any) => {
      setProfileImage(result);
    });
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
                          : {uri: profileImage}
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
      <Drawer.Screen
        name="Trip"
        component={TripsScreen}
        options={{
          title: 'Trips',
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
