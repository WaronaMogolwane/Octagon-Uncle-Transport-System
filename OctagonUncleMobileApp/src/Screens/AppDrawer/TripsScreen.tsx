import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  GestureResponderEvent,
  RefreshControl,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TripCardParent} from '../../Components/TripCardParent';
import {
  EndTrip,
  GetPastTripsForClient,
  GetPastTripsForDriver,
  GetPastTripsForTransporter,
  GetTrip,
  GetUpcomingTripsForClient,
  GetUpcomingTripsForDriver,
  GetUpcomingTripsForTransporter,
  UpdatePassengerStatus,
} from '../../Controllers/TripController';
import {TripCardDriverSwipable} from '../../Components/TripCardDriverSwipable';
import {FlatlistStyles} from '../../Stylesheets/GlobalStyles';
import {Passenger} from '../../Models/Passenger';
import {TripCardDriver} from '../../Components/TripCardDriver';
import {getTime} from 'date-fns';

const TripsScreen = ({navigation}: any) => {
  const Tab = createMaterialTopTabNavigator();

  const parentId = 'c7728615-394f-466b-833e-ea9dd60ba836';
  const businessId = 'w8728321-394f-466b-833e-ea9dd60ba000';
  const role: number = 2;

  const [UpcomingTripList, setUpcomingTripList] = useState([]);
  const [PastTripList, setPastTripList] = useState([]);
  const [refreshingUpcomingTrips, setRefreshingUpcomingTrips] =
    React.useState(false);
  const [refreshingPastTrips, setRefreshingPastTrips] = React.useState(false);
  const [statusCode, setStatusCode] = useState(true);

  const onRefreshPastTrips = React.useCallback(() => {
    setRefreshingPastTrips(true);

    setTimeout(() => {
      setRefreshingUpcomingTrips(true);
      getPastTrips();
      setRefreshingUpcomingTrips(false);
    }, 2000);

    //setRefreshingPastTrips(false);
  }, []);

  const onRefreshUpcomingTrips = React.useCallback(() => {
    setRefreshingUpcomingTrips(true);

    setTimeout(() => {
      setRefreshingUpcomingTrips(true);
      getUpcomingTrips();
      setRefreshingUpcomingTrips(false);
    }, 2000);

    //setRefreshingUpcomingTrips(false);
  }, []);

  useEffect(() => {
    setRefreshingUpcomingTrips(true);

    setTimeout(() => {
      getUpcomingTrips();
      getPastTrips();

      setRefreshingUpcomingTrips(false);
    }, 2000);
  }, []);

  const changeTripStatus = async (
    tripId: string,
    passengerId: string,
    status: number,
  ) => {
    await GetTrip(tripId).then((trip: any) => {
      const now = new Date();
      let time = `${now.getHours()}:${now.getMinutes()}`;
      let pArray = [...trip.passenger];
      let nArray: Passenger[] = [];

      let passengerCount = 0;
      let passengerTotal = pArray.length;

      pArray.forEach((item: any) => {
        let pickUpTime = item.PickUpTime;
        let dropOffTime = item.DropOffTime;

        if (item.PassengerId == passengerId) {
          let updatedPassenger = new Passenger(
            item.PassengerId,
            item.FirstName,
            item.LastName,
            item.Age,
            item.HomeAddress,
            item.DestinationAddress,
            item.ParentId,
            item.BusinessId,
            String(status),
            status == 2 ? time : pickUpTime,
            status == 3 ? time : dropOffTime,
          );

          nArray.push(updatedPassenger);
        } else {
          nArray.push(item);
        }

        if (item.TripStatus == 3 || item.TripStatus == 1) {
          passengerCount++;
        }
      });

      if (passengerCount == passengerTotal) {
        EndTrip(tripId);
      }

      UpdatePassengerStatus(nArray, tripId).then(response => {
        getUpcomingTrips().then(() => {
          //setStatusCode(!statusCode);
        });
        getPastTrips().then(() => {
          //setStatusCode(!statusCode);
        });
        setStatusCode(!statusCode);
      });
    });
  };

  const getUpcomingTrips = async () => {
    if (role == 1) {
      return await GetUpcomingTripsForClient(parentId, businessId).then(
        trip => {
          setUpcomingTripList(trip);
        },
      );
    } else if (role == 2) {
      return await GetUpcomingTripsForDriver(parentId, businessId).then(
        trip => {
          setUpcomingTripList(trip);
        },
      );
    } else if (role == 3) {
      return await GetUpcomingTripsForTransporter(parentId, businessId).then(
        trip => {
          setUpcomingTripList(trip);
        },
      );
    }
  };

  const getPastTrips = async () => {
    if (role == 1) {
      return await GetPastTripsForClient(parentId, businessId).then(trip => {
        setPastTripList(trip);
      });
    } else if (role == 2) {
      return await GetPastTripsForDriver(parentId, businessId).then(trip => {
        setPastTripList(trip);
      });
    } else if (role == 3) {
      return await GetPastTripsForTransporter(parentId, businessId).then(
        trip => {
          setPastTripList(trip);
        },
      );
    }
  };

  const renderItemComponentParent = (itemData: any) => (
    <TripCardParent
      driverName={itemData.driverName}
      pickUpTime={itemData.pickUpTime}
      pickUpDate={itemData.pickUpDate}
      passengerName={itemData.passengerName}
      pickUpLocation={itemData.pickUpLocation}
      isSuccess={itemData.isSuccess}
    />
  );

  const renderItemComponentDriverSwipable = (itemData: any) => (
    <TripCardDriverSwipable
      passengerName={itemData.passengerName}
      pickUpTime={itemData.pickUpTime}
      pickUpDate={itemData.pickUpDate}
      pickUpLocation={itemData.pickUpLocation}
      tripStatus={itemData.tripStatus}
      handlePickup={() => {
        changeTripStatus(itemData.tripId, itemData.passengerId, 2);
      }}
      handleDropoff={() => {
        changeTripStatus(itemData.tripId, itemData.passengerId, 3);
      }}
      handleAbsentPassenger={() => {
        changeTripStatus(itemData.tripId, itemData.passengerId, 1);
      }}
    />
  );

  const renderItemComponentDriver = (itemData: any) => (
    <TripCardDriver
      passengerName={itemData.passengerName}
      pickUpTime={itemData.pickUpTime}
      pickUpDate={itemData.pickUpDate}
      pickUpLocation={itemData.pickUpLocation}
      tripStatus={itemData.tripStatus}
      dropOffTime={itemData.dropOffTime}
    />
  );

  const renderItemComponentTransporter = (itemData: any) => (
    <TripCardParent
      driverName={itemData.driverName}
      pickUpTime={itemData.pickUpTime}
      pickUpDate={itemData.pickUpDate}
      passengerName={itemData.passengerName}
      pickUpLocation={itemData.pickUpLocation}
      isSuccess={itemData.isSuccess}
    />
  );

  function FirstRoute() {
    if (role == 1) {
      return (
        <View style={FlatlistStyles.container}>
          <FlatList
            data={UpcomingTripList}
            extraData={statusCode}
            renderItem={({item}) => renderItemComponentParent(item)}
            refreshControl={
              <RefreshControl
                refreshing={refreshingUpcomingTrips}
                onRefresh={onRefreshUpcomingTrips}
              />
            }
          />
        </View>
      );
    } else if (role == 2) {
      return (
        <View style={FlatlistStyles.container}>
          <FlatList
            data={UpcomingTripList}
            extraData={statusCode}
            renderItem={({item}) => renderItemComponentDriverSwipable(item)}
            refreshControl={
              <RefreshControl
                refreshing={refreshingUpcomingTrips}
                onRefresh={onRefreshUpcomingTrips}
              />
            }
          />
        </View>
      );
    } else if (role == 3) {
      return (
        <View style={FlatlistStyles.container}>
          <FlatList
            data={UpcomingTripList}
            extraData={statusCode}
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
  }

  function SecondRoute() {
    if (role == 1) {
      return (
        <View style={{flex: 1}}>
          <FlatList
            data={PastTripList}
            extraData={statusCode}
            renderItem={({item}) => renderItemComponentParent(item)}
            refreshControl={
              <RefreshControl
                refreshing={refreshingPastTrips}
                onRefresh={onRefreshPastTrips}
              />
            }
          />
        </View>
      );
    } else if (role == 2) {
      return (
        <View style={{flex: 1}}>
          <FlatList
            data={PastTripList}
            extraData={statusCode}
            renderItem={({item}) => renderItemComponentDriver(item)}
            refreshControl={
              <RefreshControl
                refreshing={refreshingPastTrips}
                onRefresh={onRefreshPastTrips}
              />
            }
          />
        </View>
      );
    } else if (role == 3) {
      return (
        <View style={{flex: 1}}>
          <FlatList
            data={PastTripList}
            extraData={statusCode}
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
  }

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Upcoming Trps" component={FirstRoute} />
        <Tab.Screen name="Past Trips" component={SecondRoute} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TripsScreen;
