import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TripCard} from '../../Components/TripCard';
import {
  GetPastTripsForClient,
  GetUpcomingTripsForClient,
} from '../../Controllers/TripController';

const TripsScreen = ({navigation}: any) => {
  const [UpcomingTripList, setUpcomingTripList] = useState([]);
  const [PastTripList, setPastTripList] = useState([]);
  const [refreshingUpcomingTrips, setRefreshingUpcomingTrips] =
    React.useState(false);
  const [refreshingPastTrips, setRefreshingPastTrips] = React.useState(false);

  const onRefreshPastTrips = React.useCallback(() => {
    setRefreshingPastTrips(true);
    getPastTrips();

    setTimeout(() => {
      setRefreshingUpcomingTrips(false);
    }, 500);
  }, []);

  const onRefreshUpcomingTrips = React.useCallback(() => {
    setRefreshingUpcomingTrips(true);
    getUpcomingTrips();

    setTimeout(() => {
      setRefreshingUpcomingTrips(true);
    }, 500);
  }, []);

  const payerId = 'c7728615-394f-466b-833e-ea9dd60ba836';
  const businessId = 'w8728321-394f-466b-833e-ea9dd60ba000';

  useEffect(() => {
    getUpcomingTrips();
    getPastTrips();
    getUpcomingTrips();
    getPastTrips();
  }, []);

  const getUpcomingTrips = async () => {
    await GetUpcomingTripsForClient(payerId, businessId).then(trip => {
      setUpcomingTripList(trip);
    });
  };

  const getPastTrips = async () => {
    await GetPastTripsForClient(payerId, businessId).then(trip => {
      setPastTripList(trip);
    });
  };

  const Tab = createMaterialTopTabNavigator();

  function FirstRoute() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={UpcomingTripList}
          data={UpcomingTripList}
          renderItem={({item}) => renderItemComponent(item)}
          refreshControl={
            <RefreshControl
              refreshing={refreshingUpcomingTrips}
              onRefresh={onRefreshUpcomingTrips}
            />
            <RefreshControl
              refreshing={refreshingUpcomingTrips}
              onRefresh={onRefreshUpcomingTrips}
            />
          }
        />
      </View>
    );
  }

  function SecondRoute() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={PastTripList}
          renderItem={({item}) => renderItemComponent(item)}
          refreshControl={
            <RefreshControl
              refreshing={refreshingPastTrips}
              onRefresh={onRefreshPastTrips}
            />
          }
      <View style={{flex: 1}}>
        <FlatList
          data={PastTripList}
          renderItem={({item}) => renderItemComponent(item)}
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

  const renderItemComponent = (itemData: any) => (
    <TripCard
      driverName={itemData.driverName}
      pickUpTime={itemData.pickUpTime}
      pickUpDate={itemData.pickUpDate}
      passengerName={itemData.passengerName}
      pickUpLocation={itemData.pickUpLocation}
      isSuccess={itemData.isSuccess}
    />
  );

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Upcoming Trps" component={FirstRoute} />
        <Tab.Screen name="Past Trips" component={SecondRoute} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    padding: 2,
    textAlign: 'center',
  },
});

export default TripsScreen;
