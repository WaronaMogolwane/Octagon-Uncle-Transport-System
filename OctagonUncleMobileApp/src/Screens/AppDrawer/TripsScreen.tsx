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
import {
  useToast,
  Toast,
  ToastTitle,
  Fab,
  FabIcon,
  FabLabel,
  AddIcon,
} from '@gluestack-ui/themed';
import {VehicleCard} from '../../Components/VehicleCard';
import {GetVehiclesAndDrivers} from '../../Controllers/VehicleController';
import {GetDriverId} from '../../Controllers/DriverVehicleLinkingController.tsx';

const TripsScreen = ({navigation}: any) => {
  const Tab = createMaterialTopTabNavigator();

  //const userId = 'c7728615-394f-466b-833e-ea9dd60ba836'; //Parent userId
  //const userId = 'w8728321-394f-466b-833e-ea9dd60ba000'; //Business userId
  //let userId = '201a514b-17f3-4fe0-adfc-92c2d578c601';  //Driiver userId
  const role: number = 1;
  //const tempSessionProvider = 'w8728321-394f-466b-833e-ea9dd60ba000';
  const tempSessionProvider = 'c7728615-394f-466b-833e-ea9dd60ba836';

  const [userId, setUserId] = useState(tempSessionProvider);

  const [tempRole, setTempRole] = useState(role);

  const [UpcomingTripList, setUpcomingTripList] = useState([]);
  const [PastTripList, setPastTripList] = useState([]);

  const [refreshingUpcomingTrips, setRefreshingUpcomingTrips] =
    React.useState(false);
  const [refreshingPastTrips, setRefreshingPastTrips] = React.useState(false);

  const [statusCode, setStatusCode] = useState(true);

  const [vehicleList, setVehicleList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const [showFab, setShowFab] = useState(false);

  const onRefreshPastTrips = React.useCallback(() => {
    setRefreshingPastTrips(true);

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      //setRefreshing(true);

      GetVehiclesAndDrivers(userId)
        .then(result => {
          setVehicleList(result);
          setRefreshing(false);
        })
        .catch(() => {
          setRefreshing(false);
        });
    }, 2000);

    setRefreshing(false);
  }, []);

  useEffect(() => {
    setRefreshingUpcomingTrips(true);

    if (tempRole != 3) {
      setTimeout(() => {
        GetUpcomingTrips();
        GetPastTrips();

        setRefreshingUpcomingTrips(false);
      }, 2000);
    } else {
      setTimeout(() => {
        setRefreshing(true);

        GetVehiclesAndDrivers(userId)
          .then(result => {
            setVehicleList(result);
            setRefreshing(false);
          })
          .catch(() => {
            setRefreshing(false);
          });
      }, 2000);
    }
  }, [tempRole]);

  const ShowToast = () => {
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

  const ChangeTripStatus = async (tripId: string, tripStatus: number) => {
    if (tripStatus == 1) {
      await UpdatePassengerStatus(tripId, tripStatus).then(result => {
        if (result[1] == 200) {
          EndTrip(tripId).then(result => {
            if (result[1] == 200) {
              GetUpcomingTrips();
              GetPastTrips();
              setStatusCode(!statusCode);
            } else {
              ShowToast();
            }
          });
        }
      });
    } else if (tripStatus == 2) {
      await SetTripPickUpTime(tripId).then(result => {
        if (result[1] == 200) {
          UpdatePassengerStatus(tripId, tripStatus).then(result => {
            if (result[1] == 200) {
              GetUpcomingTrips();
              GetPastTrips();
              setStatusCode(!statusCode);
            } else {
              ShowToast();
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
              GetUpcomingTrips();
              GetPastTrips();
              setStatusCode(!statusCode);
            } else {
              ShowToast();
            }
          });
        } else {
          ShowToast();
        }
      });
    }
  };

  const GetUpcomingTrips = async () => {
    if (tempRole == 1) {
      return await GetUpcomingTripsForClient(userId).then(trip => {
        setUpcomingTripList(trip);
      });
    } else if (tempRole == 2) {
      return await GetUpcomingTripsForDriver(userId).then(trip => {
        setUpcomingTripList(trip);
      });
    } else if (tempRole == 3) {
      return await GetUpcomingTripsForTransporter(userId).then(trip => {
        setUpcomingTripList(trip);
      });
    }
  };

  const GetPastTrips = async () => {
    if (tempRole == 1) {
      return await GetPastTripsForClient(userId).then(trip => {
        setPastTripList(trip);
      });
    } else if (tempRole == 2) {
      return await GetPastTripsForDriver(userId).then(trip => {
        setPastTripList(trip);
      });
    } else if (tempRole == 3) {
      return await GetPastTripsForTransporter(userId).then(trip => {
        setPastTripList(trip);
      });
    }
  };

  const HandleBackFabPress = () => {
    setUserId(tempSessionProvider);
    setShowFab(false);
    setTempRole(role);
  };

  const GoBackFab = () => {
    return (
      <Fab
        onPress={HandleBackFabPress}
        size="sm"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}>
        <FabIcon as={AddIcon} mr="$3" />
        <FabLabel>Back</FabLabel>
      </Fab>
    );
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
        ChangeTripStatus(itemData.tripId, 2);
      }}
      handleDropoff={() => {
        ChangeTripStatus(itemData.tripId, 3);
      }}
      handleAbsentPassenger={() => {
        ChangeTripStatus(itemData.tripId, 1);
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

  const vehicleSelectorTransporter = (itemData: any) => (
    <VehicleCard
      registrationNumber={itemData.registrationNumber}
      make={itemData.make}
      model={itemData.model}
      color={itemData.color}
      fullName={itemData.fullName}
      onPress={() => {
        GetDriverId(itemData.vehicleId).then((result: any) => {
          setUserId(result[0].DriverId);
          setTempRole(2);
          setShowFab(true);
        });
      }}
    />
  );

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

  function FirstRoute() {
    if (tempRole == 1) {
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
    } else if (tempRole == 2) {
      return (
        <View style={FlatlistStyles.container}>
          {showFab == true ? GoBackFab() : null}
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
    } else if (tempRole == 3) {
      return (
        <View style={FlatlistStyles.container}>
          <FlatList
            data={vehicleList}
            renderItem={({item}) => vehicleSelectorTransporter(item)}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      );
    }
  }

  function SecondRoute() {
    if (tempRole == 1) {
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
    } else if (tempRole == 2) {
      return (
        <View style={{flex: 1}}>
          {showFab == true ? GoBackFab() : null}
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
    } else if (tempRole == 3) {
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
      {tempRole != 3 ? (
        <Tab.Navigator>
          <Tab.Screen name="Upcoming Trps" component={FirstRoute} />
          <Tab.Screen name="Past Trips" component={SecondRoute} />
        </Tab.Navigator>
      ) : (
        <FlatList
          data={vehicleList}
          renderItem={({item}) => vehicleSelectorTransporter(item)}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </NavigationContainer>
  );
};

export default TripsScreen;
