import React, {useContext, useEffect, useState} from 'react';
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
  ArrowLeftIcon,
  Text,
} from '@gluestack-ui/themed';
import {VehicleCard} from '../../Components/VehicleCard';
import {GetVehiclesAndDrivers} from '../../Controllers/VehicleController';
import {GetDriverId} from '../../Controllers/DriverVehicleLinkingController.tsx';
import {useGlobalState} from '../../State';

const TripsScreen = ({navigation}: any) => {
  const Tab = createMaterialTopTabNavigator();

  const [userId, x] = useGlobalState('userId');
  const [role, y] = useGlobalState('role');

  const [tempUserId, setTempUserId] = useState(userId);

  const [tempRole, setTempRole] = useState(role);

  const [UpcomingTripList, setUpcomingTripList] = useState([]);
  const [PastTripList, setPastTripList] = useState([]);

  const [refreshingUpcomingTrips, setRefreshingUpcomingTrips] =
    React.useState(false);
  const [refreshingPastTrips, setRefreshingPastTrips] = React.useState(false);

  const [statusCode, setStatusCode] = useState(true);

  const [vehicleList, setVehicleList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const [showNoFutureTripText, setShowNoFutureTripText] = useState(false);
  const [showNoPastTripText, setShowNoPastTripText] = useState(false);

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      //setRefreshing(true);

      GetVehiclesAndDrivers(tempUserId)
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
    if (tempRole != 1) {
      setTimeout(() => {
        GetUpcomingTrips();
        GetPastTrips();
        setRefreshingUpcomingTrips(false);
      }, 2000);
    } else {
      setTimeout(() => {
        setRefreshing(true);

        GetVehiclesAndDrivers(tempUserId)
          .then(result => {
            setVehicleList(result);
            setRefreshing(false);
          })
          .catch(() => {
            setRefreshing(false);
          });
      }, 2000);
    }
  }, [tempRole, userId, role]);

  //Empty flatlist text is defined
  const EmtpyFlatListText = () => {
    return (
      <View>
        <Text>You currently have no trips.</Text>
      </View>
    );
  };

  //This is where the Toast is defined
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

  //Changes the status from the Driver's perspective
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

  //Gets all upcoming Trips for all roles
  const GetUpcomingTrips = async () => {
    if (tempRole == 2) {
      return await GetUpcomingTripsForClient(tempUserId).then(trip => {
        if (trip.length == 0) {
          setShowNoFutureTripText(true);
        } else {
          setUpcomingTripList(trip);
        }
      });
    } else if (tempRole == 3) {
      return await GetUpcomingTripsForDriver(tempUserId).then(trip => {
        if (trip.length == 0) {
          setShowNoFutureTripText(true);
        } else {
          setUpcomingTripList(trip);
        }
      });
    } else if (tempRole == 1) {
      return await GetUpcomingTripsForTransporter(tempUserId).then(trip => {
        if (trip.length == 0) {
          setShowNoFutureTripText(true);
        } else {
          setUpcomingTripList(trip);
        }
      });
    }
  };

  //Gets all past Trips for all roles
  const GetPastTrips = async () => {
    if (tempRole == 2) {
      return await GetPastTripsForClient(tempUserId).then(trip => {
        if (trip.length == 0) {
          setShowNoPastTripText(true);
        } else {
          setPastTripList(trip);
        }
      });
    } else if (tempRole == 3) {
      return await GetPastTripsForDriver(tempUserId).then(trip => {
        if (trip.length == 0) {
          setShowNoPastTripText(true);
        } else {
          setPastTripList(trip);
        }
      });
    } else if (tempRole == 1) {
      return await GetPastTripsForTransporter(tempUserId).then(trip => {
        if (trip.length == 0) {
          setShowNoPastTripText(true);
        } else {
          setPastTripList(trip);
        }
      });
    }
  };

  //Handles FAB onPress
  const HandleBackFabPress = () => {
    if (role == 2 || role == 3) {
      navigation.goBack();
    } else {
      setTempUserId(userId);
      setTempRole(role);
    }
  };

  //Defines the FAB for all roles
  const GoBackFab = () => {
    return (
      <Fab
        onPress={HandleBackFabPress}
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

  //Contains card for Parent
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

  //Contains for interactive card for driver for upcoming trips
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

  //Contains card for Driver for past trips
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

  //Card defined to select Drivers Linked to Vehicle
  const vehicleSelectorTransporter = (itemData: any) => (
    <VehicleCard
      registrationNumber={itemData.registrationNumber}
      make={itemData.make}
      model={itemData.model}
      color={itemData.color}
      fullName={itemData.fullName}
      onPress={() => {
        GetDriverId(itemData.vehicleId).then((result: any) => {
          setTempUserId(result[0].DriverId);
          setTempRole(2);
        });
      }}
    />
  );

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

  //Contains Upcoming Flatlist for all roles
  function FirstRoute() {
    if (tempRole == 2) {
      return (
        <View style={FlatlistStyles.container}>
          {showNoFutureTripText ? EmtpyFlatListText() : null}
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
    } else if (tempRole == 3) {
      return (
        <View style={FlatlistStyles.container}>
          {showNoFutureTripText ? EmtpyFlatListText() : null}
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
    } else if (tempRole == 1) {
      return (
        <View style={FlatlistStyles.container}>
          {showNoFutureTripText ? EmtpyFlatListText() : null}
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
  //Contains Past Flatlist for all roles
  function SecondRoute() {
    if (tempRole == 2) {
      return (
        <View style={FlatlistStyles.container}>
          {showNoPastTripText ? EmtpyFlatListText() : null}
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
    } else if (tempRole == 3) {
      return (
        <View style={FlatlistStyles.container}>
          {showNoPastTripText ? EmtpyFlatListText() : null}
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
    } else if (tempRole == 1) {
      return (
        <View style={FlatlistStyles.container}>
          {showNoPastTripText ? EmtpyFlatListText() : null}
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
      {GoBackFab()}
      {tempRole != 1 ? (
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
