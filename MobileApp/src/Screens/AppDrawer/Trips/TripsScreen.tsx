import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  GestureResponderEvent,
  RefreshControl,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TripCardParent} from '../../../Components/Cards/TripListForParentCard';
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
  UndoTripDropOffTime,
  UndoTripEnd,
  UndoTripPickUpTime,
  UpdatePassengerStatus,
} from '../../../Controllers/TripController';
import {TripCardDriverSwipable} from '../../../Components/Cards/TripListCardForDriverSwipable';
import {FlatlistStyles} from '../../../Stylesheets/GlobalStyles';
import {TripCardDriver} from '../../../Components/Cards/TripListCardForDriver';
import {
  useToast,
  Fab,
  FabIcon,
  FabLabel,
  ArrowLeftIcon,
  Text,
  Toast,
  ToastTitle,
  ToastDescription,
  VStack,
} from '@gluestack-ui/themed';
import {VehicleCard} from '../../../Components/Cards/LinkedVehicleListCard';
import {GetVehiclesAndDrivers} from '../../../Controllers/VehicleController';
import {GetDriverId} from '../../../Controllers/DriverVehicleLinkingController.tsx';
import {AuthContext} from '../../../Services/AuthenticationService';
import {Auth} from '../../../Classes/Auth';

const TripsScreen = ({navigation}: any) => {
  const Tab = createMaterialTopTabNavigator();

  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));

  const userId = auth.GetUserId();
  const role: number = Number(auth.GetUserRole());
  // const role: number = 2;

  const [UpcomingTripList, setUpcomingTripList] = useState([]);
  const [PastTripList, setPastTripList] = useState([]);

  const [refreshingUpcomingTrips, setRefreshingUpcomingTrips] =
    React.useState(false);
  const [refreshingPastTrips, setRefreshingPastTrips] = React.useState(false);

  const [statusCode, setStatusCode] = useState(true);

  const [showNoFutureTripText, setShowNoFutureTripText] = useState(false);
  const [showNoPastTripText, setShowNoPastTripText] = useState(false);

  const [IsLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onRefreshPastTrips = React.useCallback(() => {
    setRefreshingPastTrips(true);
    setShowNoPastTripText(false);

    setTimeout(() => {
      // setRefreshingPastTrips(true);
      GetPastTrips()
        .then(() => {
          setRefreshingPastTrips(false);
        })
        .catch((error: any) => {
          console.error(error);
          setRefreshingPastTrips(false);
        });
    }, 2000);
    // setRefreshingPastTrips(false);
  }, []);

  const onRefreshUpcomingTrips = React.useCallback(() => {
    setShowNoFutureTripText(false);
    setRefreshingUpcomingTrips(true);

    setTimeout(() => {
      // setRefreshingUpcomingTrips(true);
      GetUpcomingTrips()
        .then(() => {
          setRefreshingUpcomingTrips(false);
        })
        .catch(() => {
          setRefreshingUpcomingTrips(false);
        });
    }, 2000);

    // setRefreshingUpcomingTrips(false);
  }, []);

  useEffect(() => {
    setRefreshingUpcomingTrips(true);
    setTimeout(() => {
      GetUpcomingTrips();
      GetPastTrips();
      setRefreshingUpcomingTrips(false);
    }, 2000);
  }, [role, userId, role]);

  //Empty flatlist text is defined
  const EmtpyFlatListText = () => {
    return (
      <View style={{backgroundColor: '#e8f0f3'}}>
        <Text style={{textAlign: 'center'}}>You currently have no trips.</Text>
      </View>
    );
  };

  //This is where the Toast is defined
  const ShowToast = () => {
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
    setIsLoading(true);
    if (tripStatus == 1) {
      await UpdatePassengerStatus(tripId, tripStatus).then(result => {
        if (result[1] == 200) {
          EndTrip(tripId).then(result => {
            if (result[1] == 200) {
              GetUpcomingTrips();
              GetPastTrips();
              setIsLoading(false);
              setStatusCode(!statusCode);
            } else {
              ShowToast();
              setIsLoading(false);
            }
          });
        } else {
          setIsLoading(false);
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
              setIsLoading(false);
            } else {
              ShowToast();
              setIsLoading(false);
            }
          });
        } else {
          setIsLoading(false);
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
              setIsLoading(false);
            } else {
              ShowToast();
              setIsLoading(false);
            }
          });
        } else {
          ShowToast();
          setIsLoading(false);
        }
      });
    } else if (tripStatus == 0) {
      await SetDropOffTime(tripId).then(result => {
        if (result[1] == 200) {
          UpdatePassengerStatus(tripId, tripStatus).then(result2 => {});
          EndTrip(tripId).then(result3 => {
            if (result3[1] == 200) {
              GetUpcomingTrips();
              GetPastTrips();
              setStatusCode(!statusCode);
              setIsLoading(false);
            } else {
              ShowToast();
              setIsLoading(false);
            }
          });
        }
      });
    }
  };

  //Gets all upcoming Trips for all roles
  const GetUpcomingTrips = async () => {
    if (role == 2) {
      return await GetUpcomingTripsForClient(userId).then(trip => {
        if (trip.length == 0) {
          setShowNoFutureTripText(true);
        } else {
          setUpcomingTripList(trip);
        }
      });
    } else if (role == 3) {
      return await GetUpcomingTripsForDriver(userId).then(trip => {
        if (trip.length == 0) {
          setUpcomingTripList([]);
          setShowNoFutureTripText(true);
          setIsLoading(false);
        } else {
          setUpcomingTripList(trip);
          setIsLoading(false);
        }
      });
    }
  };

  //Gets all past Trips for all roles
  const GetPastTrips = async () => {
    if (role == 2) {
      return await GetPastTripsForClient(userId).then(trip => {
        if (trip.length == 0) {
          setShowNoPastTripText(true);
        } else {
          setPastTripList(trip);
        }
      });
    } else if (role == 3) {
      return await GetPastTripsForDriver(userId).then(trip => {
        if (trip.length == 0) {
          setShowNoPastTripText(true);

          setPastTripList([]);
          setIsLoading(false);
        } else {
          setPastTripList(trip);
          setShowNoPastTripText(false);
          setIsLoading(false);
        }
      });
    }
  };

  //Handles FAB onPress
  const HandleBackFabPress = () => {
    if (role == 2 || role == 3) {
      navigation.goBack();
    }
    if (role == role) {
      navigation.goBack();
    } else {
      // setTempUserId(userId);
      // setTempRole(role);
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
        if (itemData.tripStatus == 0) {
          ChangeTripStatus(itemData.tripId, 1);
        } else if (itemData.tripStatus == 2) {
          UndoTripPickUpTime(itemData.tripId).then(() => {
            setIsLoading(true);
            GetUpcomingTrips();
            GetPastTrips();
          });
        }
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
      handleUndo={() => {
        if (itemData.tripStatus == 1) {
          UndoTripEnd(itemData.tripId).then(() => {
            setIsLoading(true);
            GetUpcomingTrips();
            GetPastTrips();
          });
        } else if (itemData.tripStatus == 3) {
          UndoTripDropOffTime(itemData.tripId).then(() => {
            setIsLoading(true);
            GetUpcomingTrips();
            GetPastTrips();
          });
        }
      }}
    />
  );

  //Contains Upcoming Flatlist for all roles
  function FirstRoute() {
    if (role == 2) {
      return (
        <View style={FlatlistStyles.container}>
          {showNoFutureTripText ? EmtpyFlatListText() : null}
          <FlatList
            style={{backgroundColor: '#e8f0f3'}}
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
    } else if (role == 3) {
      return (
        <View style={FlatlistStyles.container}>
          {showNoFutureTripText ? EmtpyFlatListText() : null}
          <FlatList
            style={{backgroundColor: '#e8f0f3'}}
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
    }
  }

  //Contains Past Flatlist for all roles
  function SecondRoute() {
    if (role == 2) {
      return (
        <View style={FlatlistStyles.container}>
          {showNoPastTripText ? EmtpyFlatListText() : null}
          <FlatList
            style={{backgroundColor: '#e8f0f3'}}
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
    } else if (role == 3) {
      return (
        <View style={FlatlistStyles.container}>
          {showNoPastTripText ? EmtpyFlatListText() : null}
          <FlatList
            style={{backgroundColor: '#e8f0f3'}}
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
    }
  }

  return (
    <NavigationContainer independent={true}>
      {GoBackFab()}
      {IsLoading ? (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff75',
            zIndex: 100,
          }}>
          <ActivityIndicator size="large" />
          <Text>Working</Text>
        </View>
      ) : null}
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

export default TripsScreen;
