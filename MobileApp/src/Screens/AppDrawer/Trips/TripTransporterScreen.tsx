import {
  FlatList,
  GestureResponderEvent,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {FlatlistStyles} from '../../../Stylesheets/GlobalStyles';
import {TripCardDriver} from '../../../Components/Cards/TripListCardForDriver';
import {
  GetPastTripsForTransporter,
  GetUpcomingTripsForTransporter,
  UndoTripDropOffTime,
} from '../../../Controllers/TripController';
import {Auth} from '../../../Classes/Auth';
import {AuthContext} from '../../../Services/AuthenticationService';
import {
  TripCardTransporter,
  TripCardTransporterComplete,
} from '../../../Components/Cards/TripCardTransporter';
import {ArrowLeftIcon, Fab, FabIcon, FabLabel} from '@gluestack-ui/themed';

const TripTransporterScreen = ({navigation}: any) => {
  const Tab = createMaterialTopTabNavigator();
  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));

  const userId = auth.GetUserId();
  const role: number = Number(auth.GetUserRole());

  const [UpcomingTripList, setUpcomingTripList] = useState([]);
  const [PastTripList, setPastTripList] = useState([]);
  const [showNoFutureTripText, setShowNoFutureTripText] = useState(false);
  const [showNoPastTripText, setShowNoPastTripText] = useState(false);
  const [refreshingUpcomingTrips, setRefreshingUpcomingTrips] =
    React.useState(false);
  const [refreshingPastTrips, setRefreshingPastTrips] = React.useState(false);

  const onRefreshPastTrips = React.useCallback(() => {
    setRefreshingPastTrips(true);
    setShowNoPastTripText(false);

    setTimeout(() => {
      setRefreshingUpcomingTrips(true);
      GetPastTrips()
        .then(() => {
          setRefreshingPastTrips(false);
        })
        .catch(() => {
          setRefreshingPastTrips(false);
        });
    }, 2000);
    setRefreshingPastTrips(false);
  }, []);

  const onRefreshUpcomingTrips = React.useCallback(() => {
    setShowNoFutureTripText(false);
    setRefreshingUpcomingTrips(true);

    setTimeout(() => {
      setRefreshingUpcomingTrips(true);
      GetUpcomingTrips()
        .then(() => {
          setRefreshingUpcomingTrips(false);
        })
        .catch(() => {
          setRefreshingUpcomingTrips(false);
        });
    }, 2000);

    setRefreshingUpcomingTrips(false);
  }, []);

  useEffect(() => {
    setRefreshingUpcomingTrips(true);

    setTimeout(() => {
      GetUpcomingTrips();
      GetPastTrips();
      setRefreshingUpcomingTrips(false);
    }, 2000);
  }, []);

  //Card defined for Transporter
  const renderItemComponentTransporter = (itemData: any) => (
    <TripCardTransporter
      passengerName={itemData.passengerName}
      pickUpTime={itemData.pickUpTime}
      pickUpDate={itemData.pickUpDate}
      pickUpLocation={itemData.pickUpLocation}
      tripStatus={itemData.tripStatus}
      dropOffTime={itemData.dropOffTime}
    />
  );

  //Card defined for Transporter
  const renderItemComponentTransporterComplete = (itemData: any) => (
    <TripCardTransporterComplete
      passengerName={itemData.passengerName}
      pickUpTime={itemData.pickUpTime}
      pickUpDate={itemData.pickUpDate}
      pickUpLocation={itemData.pickUpLocation}
      tripStatus={itemData.tripStatus}
      dropOffTime={itemData.dropOffTime}
    />
  );

  //Empty flatlist text is defined
  const EmtpyFlatListText = () => {
    return (
      <View style={{backgroundColor: '#e8f0f3'}}>
        <Text style={{textAlign: 'center'}}>You currently have no trips.</Text>
      </View>
    );
  };
  const GoBackFab = () => {
    return (
      <Fab
        onPress={() => {
          navigation.navigate('Manage Trip');
        }}
        size="sm"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}>
        <FabIcon as={ArrowLeftIcon} mr="$1" />
        <FabLabel>Back</FabLabel>
      </Fab>
    );
  };

  const GetUpcomingTrips = async () => {
    return await GetUpcomingTripsForTransporter(userId).then(trip => {
      if (trip[0] == '') {
        setShowNoFutureTripText(true);
      } else {
        setUpcomingTripList(trip);
      }
    });
  };

  //Gets all past Trips for all roles
  const GetPastTrips = async () => {
    return await GetPastTripsForTransporter(userId).then(trip => {
      if (trip[0] == '') {
        setShowNoPastTripText(true);
      } else {
        setPastTripList(trip);
      }
    });
  };

  function FirstRoute() {
    return (
      <View style={FlatlistStyles.container}>
        {showNoFutureTripText ? EmtpyFlatListText() : null}
        <FlatList
          style={{backgroundColor: '#e8f0f3'}}
          data={UpcomingTripList}
          extraData
          renderItem={({item}) => renderItemComponentTransporter(item)}
          refreshControl={
            <RefreshControl
              refreshing={refreshingUpcomingTrips}
              onRefresh={onRefreshUpcomingTrips}
            />
          }
        />
        <View>{GoBackFab()}</View>
      </View>
    );
  }

  //Contains Past Flatlist for all roles
  function SecondRoute() {
    return (
      <View style={FlatlistStyles.container}>
        {showNoPastTripText ? EmtpyFlatListText() : null}
        <FlatList
          style={{backgroundColor: '#e8f0f3'}}
          data={PastTripList}
          extraData
          renderItem={({item}) => renderItemComponentTransporterComplete(item)}
          refreshControl={
            <RefreshControl
              refreshing={refreshingPastTrips}
              onRefresh={onRefreshPastTrips}
            />
          }
        />
        <View>{GoBackFab()}</View>
      </View>
    );
  }
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {backgroundColor: '#e8f0f3', elevation: 10},
        }}>
        <Tab.Screen name="Upcoming Trips" component={FirstRoute} />
        <Tab.Screen name="Past Trips" component={SecondRoute} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TripTransporterScreen;

const styles = StyleSheet.create({});
