import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import UserDetailSignUp from './src/Screens/UserDetailsSignUp';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {UpcomingTrips} from './src/Screens/UpcomingTrips';
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function HomeScreen({navigation}: any) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button
          onPress={() => navigation.navigate('Trips')}
          title="Go to Trips"
        />
        <Button
          onPress={() => navigation.navigate('Payments')}
          title="Go to Payments"
        />
        <Button
          onPress={() => navigation.navigate('Manage Vehicles')}
          title="Go to Manage Vehicles"
        />
        <Button
          onPress={() => navigation.navigate('Manage Drivers')}
          title="Go to Manage Drivers"
        />
        <Button
          onPress={() => navigation.navigate('Manage Clients')}
          title="Go to Manage Clients"
        />
        <Button
          onPress={() => navigation.navigate('Profile')}
          title="Go to Profile"
        />
      </View>
    );
  }
  function TripsScreen({navigation}: any) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
    );
  }
  function PaymentsScreen({navigation}: any) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
    );
  }
  function ManageVehiclesScreen({navigation}: any) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
    );
  }
  function ManageDriversScreen({navigation}: any) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
    );
  }
  function ManageClientsScreen({navigation}: any) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
    );
  }
  function ProfileScreen({navigation}: any) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
    );
  }
  const Drawer = createDrawerNavigator();
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Trips" component={TripsScreen} />
          <Drawer.Screen name="Payments" component={PaymentsScreen} />
          <Drawer.Screen
            name="Manage Vehicles"
            component={ManageVehiclesScreen}
          />
          <Drawer.Screen
            name="Manage Drivers"
            component={ManageDriversScreen}
          />
          <Drawer.Screen
            name="Manage Clients"
            component={ManageClientsScreen}
          />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen
            name="User Detail Sign-up"
            component={UserDetailSignUp}
          />
          <Drawer.Screen
            name="Upcoming Trips"
            component={UpcomingTrips}
            options={{headerShown: false}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

export default App;
