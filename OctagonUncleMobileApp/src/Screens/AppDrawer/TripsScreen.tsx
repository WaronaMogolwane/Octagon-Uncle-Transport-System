import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TripCardParent} from '../../Components/TripCardParent';
import {
  EndTrip,
  GetPastTripsForClient,
  GetPastTripsForDriver,
  GetPastTripsForTransporter,
  GetUpcomingTripsForClient,
  GetUpcomingTripsForDriver,
  GetUpcomingTripsForTransporter,
  SetTripDropOffPickUpTime as SetDropOffTime,
  SetTripPickUpTime,
  UpdatePassengerStatus,
} from '../../Controllers/TripController';
import {TripCardDriverSwipable} from '../../Components/TripCardDriverSwipable';
import {FlatlistStyles} from '../../Stylesheets/GlobalStyles';
import {TripCardDriver} from '../../Components/TripCardDriver';
import {useToast, Toast, ToastTitle} from '@gluestack-ui/themed';

const TripsScreen = ({navigation}: any) => {
  const Tab = createMaterialTopTabNavigator();

  const parentId = 'c7728615-394f-466b-833e-ea9dd60ba836';
  const businessId = 'w8728321-394f-466b-833e-ea9dd60ba000';
  const driverId = '201a514b-17f3-4fe0-adfc-92c2d578c601';
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
      getPastTrips()
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
    setRefreshingUpcomingTrips(true);

    setTimeout(() => {
      setRefreshingUpcomingTrips(true);
      getUpcomingTrips()
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
      getUpcomingTrips();
      getPastTrips();

      setRefreshingUpcomingTrips(false);
    }, 2000);
  }, []);

  const showToast = () => {
    const toast = useToast();

    toast.show({
      placement: 'top',
      render: ({id}) => {
        return (
          <Toast nativeID={id} variant="accent" action="error">
            <ToastTitle>Something went wrong, please try again</ToastTitle>
          </Toast>
        );
      },
    });
  };

  const changeTripStatus = async (tripId: string, tripStatus: number) => {
    if (tripStatus == 1) {
      await UpdatePassengerStatus(tripId, tripStatus).then(result => {
        if (result[1] == 200) {
          EndTrip(tripId).then(result => {
            if (result[1] == 200) {
              getUpcomingTrips();
              getPastTrips();
              setStatusCode(!statusCode);
            } else {
              showToast();
            }
          });
        }
      });
    } else if (tripStatus == 2) {
      await SetTripPickUpTime(tripId).then(result => {
        if (result[1] == 200) {
          UpdatePassengerStatus(tripId, tripStatus).then(result => {
            if (result[1] == 200) {
              getUpcomingTrips();
              getPastTrips();
              setStatusCode(!statusCode);
            } else {
              showToast();
            }
          });
        }
      });
    } else if (tripStatus == 3) {
      await SetDropOffTime(tripId).then(result => {
        if (result[1] == 200) {
          UpdatePassengerStatus(tripId, tripStatus).then(result2 => {});
          EndTrip(tripId).then(result3 => {
            if (result3[1] == 200) {
              getUpcomingTrips();
              getPastTrips();
              setStatusCode(!statusCode);
            } else {
              showToast();
            }
          });
        } else {
          showToast();
        }
      });
    }
  };

  const getUpcomingTrips = async () => {
    if (role == 1) {
      return await GetUpcomingTripsForClient(parentId).then(trip => {
        setUpcomingTripList(trip);
      });
    } else if (role == 2) {
      return await GetUpcomingTripsForDriver(driverId).then(trip => {
        setUpcomingTripList(trip);
      });
    } else if (role == 3) {
      return await GetUpcomingTripsForTransporter(businessId).then(trip => {
        setUpcomingTripList(trip);
      });
    }
  };

  const getPastTrips = async () => {
    if (role == 1) {
      return await GetPastTripsForClient(parentId).then(trip => {
        setPastTripList(trip);
      });
    } else if (role == 2) {
      return await GetPastTripsForDriver(driverId).then(trip => {
        setPastTripList(trip);
      });
    } else if (role == 3) {
      return await GetPastTripsForTransporter(businessId).then(trip => {
        setPastTripList(trip);
      });
    }
  };

  const renderItemComponentParent = (itemData: any) => (
    <TripCardParent
      driverName={itemData.driverName}
      pickUpTime={itemData.pickUpTime}
      pickUpDate={itemData.pickUpDate}
      passengerName={itemData.passengerName}
      pickUpLocation={itemData.pickUpLocation}
      tripStatus={itemData.tripStatus}
      dropOffTime={itemData.dropoffTime}
    />
  );

  const renderItemComponentDriverSwipable = (itemData: any) => (
    <TripCardDriverSwipable
      passengerName={itemData.passengerName}
      pickUpTime={itemData.pickUpTime}
      pickUpDate={itemData.pickUpDate}
      pickUpLocation={itemData.pickUpLocation}
      tripStatus={itemData.tripStatus}
      dropOffTime={itemData.dropOffTime}
      handlePickup={() => {
        changeTripStatus(itemData.tripId, 2);
      }}
      handleDropoff={() => {
        changeTripStatus(itemData.tripId, 3);
      }}
      handleAbsentPassenger={() => {
        changeTripStatus(itemData.tripId, 1);
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
      tripStatus={itemData.isSuccess}
      dropOffTime={itemData.dropOffTime}
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
