import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {FlatlistStyles} from '../../Stylesheets/GlobalStyles';
import {TripCardDriver} from '../../Components/Cards/TripListCardForDriver';
import {
  GetPastTripsForTransporter,
  GetUpcomingTripsForTransporter,
} from '../../Controllers/TripController';
import {Auth} from '../../Classes/Auth';
import {AuthContext} from '../../Services/AuthenticationService';

const TripTransporterScreen = () => {
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
    <TripCardDriver
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
        <Text>You currently have no trips.</Text>
      </View>
    );
  };

  const GetUpcomingTrips = async () => {
    return await GetUpcomingTripsForTransporter(userId).then(trip => {
      if (trip.length == 0) {
        setShowNoFutureTripText(true);
      } else {
        setUpcomingTripList(trip);
      }
    });
  };

  //Gets all past Trips for all roles
  const GetPastTrips = async () => {
    return await GetPastTripsForTransporter(userId).then(trip => {
      if (trip.length == 0) {
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
          renderItem={({item}) => renderItemComponentTransporter(item)}
          refreshControl={
            <RefreshControl
              refreshing={refreshingPastTrips}
              onRefresh={onRefreshPastTrips}
            />
          }
        />
      </View>
    );
  }
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Upcoming Trips" component={FirstRoute} />
        <Tab.Screen name="Past Trips" component={SecondRoute} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TripTransporterScreen;

const styles = StyleSheet.create({});
