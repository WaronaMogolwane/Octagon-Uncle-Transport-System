import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  TripCardParent,
  TripCardParentComplete,
} from '../../../Components/Cards/TripListForParentCard';
import {
  EndTrip,
  GetPastTripsForClient,
  GetPastTripsForDriver,
  GetUpcomingTripsForClient,
  GetUpcomingTripsForDriver,
  SetTripDropOffPickUpTime as SetDropOffTime,
  SetTripPickUpTime,
  UndoTripDropOffTime,
  UndoTripEnd,
  UndoTripPickUpTime,
  UpdatePassengerStatus,
} from '../../../Controllers/TripController';
import {
  GroupedFlatListStyles,
  ThemeStyles,
  TripScreenStyles,
} from '../../../Stylesheets/GlobalStyles';
import {
  TripCardDriver,
  TripCardDriverSwipable,
} from '../../../Components/Cards/TripListCardForDriver';
import {
  useToast,
  Modal,
  Text,
  Toast,
  ToastTitle,
  CloseIcon,
  Heading,
  Icon,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  VStack,
  ToastDescription,
  ModalFooter,
} from '@gluestack-ui/themed';
import {AuthContext} from '../../../Services/AuthenticationService';
import {Auth} from '../../../Classes/Auth';
import {Minus, MoveDown, Plus} from 'lucide-react-native';
import {CustomButton1} from '../../../Components/Buttons';
import COLORS from '../../../Const/colors';
import GroupedFlatList from '../../../Components/GroupedFlatList';

// // Define the type for a single record
type Record = {
  driverName?: string;
  tripId: string;
  passengerId: string;
  pickUpTime: string;
  passengerName: string;
  dropOffLocation: string;
  pickUpLocation: string;
  tripStatus: string;
  dropOffTime: string;
  leg: number;
  pickUpDate: string;
  title: string;
};

// Define the type for grouped data
type GroupedData = {
  [key: string]: Record[];
};

const TripsScreen = ({navigation}: any) => {
  const Tab = createMaterialTopTabNavigator();

  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));

  const userId = auth.GetUserId();

  const role: number = Number(auth.GetUserRole());

  const [UpcomingTripList, setUpcomingTripList] = useState([]);
  const [PastTripList, setPastTripList] = useState([]);

  const [refreshingUpcomingTrips, setRefreshingUpcomingTrips] =
    React.useState(false);
  const [refreshingPastTrips, setRefreshingPastTrips] = React.useState(false);

  const [statusCode, setStatusCode] = useState(true);

  const [showNoFutureTripText, setShowNoFutureTripText] = useState(false);
  const [showNoPastTripText, setShowNoPastTripText] = useState(false);

  const [IsLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cancelTrip, setCancelTrip] = useState(false);
  const [tripId, setTripId] = useState('');

  const [homeAddress, setHomeAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [tripLeg, setTripLeg] = useState(0);

  const [expandedGroups, setExpandedGroups] = useState<{
    [key: string]: boolean;
  }>({});

  const iconSizeTwo = 18;
  const iconStrokeWidthTwo = 1.5;

  const toast = useToast();
  const ref = React.useRef(null);

  const iconSize = 40;
  const iconStrokeWidth = 2;

  const onRefreshPastTrips = React.useCallback(async () => {
    setRefreshingPastTrips(true);
    try {
      await Promise.all([GetPastTrips(), GetUpcomingTrips()]);
    } catch (error) {
      console.error('Error refreshing trips:', error);
    } finally {
      setRefreshingPastTrips(false);
      setRefreshingUpcomingTrips(false);
    }
  }, []);

  const onRefreshUpcomingTrips = React.useCallback(async () => {
    setRefreshingUpcomingTrips(true);
    try {
      await Promise.all([GetUpcomingTrips(), GetPastTrips()]);
    } catch (error) {
      console.error('Error refreshing trips:', error);
    } finally {
      setRefreshingUpcomingTrips(false);
      setRefreshingPastTrips(false);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setRefreshingPastTrips(true);
      setRefreshingUpcomingTrips(true);

      GetUpcomingTrips();
      GetPastTrips();
    }, 2000);
  }, []);

  //The arrow down icon
  const plus = (
    <Plus
      size={iconSizeTwo}
      strokeWidth={iconStrokeWidthTwo}
      color={COLORS.customBlack}
    />
  );

  //The arrow left icon
  const minus = (
    <Minus
      size={iconSizeTwo}
      strokeWidth={iconStrokeWidthTwo}
      color={COLORS.customBlack}
    />
  );

  // Get the current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const currentDate = getCurrentDate();

  // Helper function to get the start of the week for a given date
  const getStartOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - dayOfWeek);
    return startOfWeek.toISOString().split('T')[0];
  };

  // Helper function to get the month and year for a given date
  const getMonthYear = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleString('default', {
      month: 'long',
    })} ${date.getFullYear()}`;
  };

  // Helper function to get the year for a given date
  const getYear = (dateString: string) => {
    return new Date(dateString).getFullYear().toString();
  };

  // Separate records for the current date and group the rest by week, month, and year
  const {currentDateRecords, groupedData} = PastTripList.reduce(
    (acc, item: Record) => {
      if (item.pickUpDate === currentDate) {
        acc.currentDateRecords.push(item);
      } else {
        const weekStart = getStartOfWeek(item.pickUpDate);
        const monthYear = getMonthYear(item.pickUpDate);
        const year = getYear(item.pickUpDate);

        // Group by year
        if (!acc.groupedData[year]) {
          acc.groupedData[year] = {};
        }

        // Group by month within the year
        if (!acc.groupedData[year][monthYear]) {
          acc.groupedData[year][monthYear] = {};
        }

        // Group by week within the month
        if (!acc.groupedData[year][monthYear][weekStart]) {
          acc.groupedData[year][monthYear][weekStart] = [];
        }

        acc.groupedData[year][monthYear][weekStart].push(item);
      }
      return acc;
    },
    {
      currentDateRecords: [] as Record[],
      groupedData: {} as {[key: string]: {[key: string]: GroupedData}},
    },
  );

  // Toggle the visibility of a group
  const toggleExpand = (key: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Render a single record item
  const renderItem = ({item}: {item: Record}) => {
    if (role === 2) {
      return (
        <TripCardParentComplete
          driverName={item.driverName ?? ''}
          pickUpTime={item.pickUpTime}
          pickUpDate={item.pickUpDate}
          passengerName={item.passengerName}
          pickUpLocation={item.pickUpLocation}
          tripStatus={Number(item.tripStatus)}
          dropOffTime={item.dropOffTime}
          leg={item.leg}
          handleAbsentPassenger={() => {
            // Handle icon press for other roles
          }}
        />
      );
    } else {
      return (
        <TripCardDriver
          passengerName={item.passengerName}
          pickUpTime={item.pickUpTime}
          pickUpDate={item.pickUpDate}
          pickUpLocation={item.pickUpLocation}
          tripStatus={Number(item.tripStatus)}
          dropOffTime={item.dropOffTime}
          leg={item.leg}
          handleUndo={() => {
            if (Number(item.tripStatus) == 0) {
              if (currentDate == item.pickUpDate.toString()) {
                UndoTripEnd(item.tripId).then(() => {
                  setIsLoading(true);
                  GetUpcomingTrips();
                  GetPastTrips();
                });
              } else {
                WarningToast();
              }
            } else if (Number(item.tripStatus) == 1) {
              if (currentDate == item.pickUpDate.toString()) {
                UndoTripEnd(item.tripId).then(() => {
                  setIsLoading(true);
                  GetUpcomingTrips();
                  GetPastTrips();
                });
              } else {
                WarningToast();
              }
            } else if (Number(item.tripStatus) == 3) {
              UndoTripDropOffTime(item.tripId).then(() => {
                setIsLoading(true);
                GetUpcomingTrips();
                GetPastTrips();
              });
            }
          }}
        />
      );
    }
  };

  // Render a group header
  const renderGroupHeader = (title: string, key: string) => (
    <TouchableOpacity
      onPress={() => toggleExpand(key)}
      style={GroupedFlatListStyles.groupHeader}>
      <Text style={GroupedFlatListStyles.groupHeaderText}>{title}</Text>
      {expandedGroups[key] ? minus : plus}
    </TouchableOpacity>
  );

  // Render the grouped data
  const renderGroupedData = () => {
    return Object.entries(groupedData).map(([year, months]) => (
      <View key={year}>
        {renderGroupHeader(`${year}`, year)}
        {expandedGroups[year] &&
          Object.entries(months).map(([monthYear, weeks]) => (
            <View key={monthYear}>
              {renderGroupHeader(`${monthYear}`, monthYear)}
              {expandedGroups[monthYear] &&
                Object.entries(weeks).map(([weekStart, records]) => (
                  <View key={weekStart}>
                    {renderGroupHeader(
                      `Week Starting: ${weekStart.replace(/-/g, '/')}`,
                      weekStart,
                    )}
                    {expandedGroups[weekStart] && (
                      <FlatList
                        data={records}
                        keyExtractor={item => item.tripId}
                        renderItem={renderItem}
                        extraData
                      />
                    )}
                  </View>
                ))}
            </View>
          ))}
      </View>
    ));
  };

  const WarningToast = () => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="error" variant="outline">
            <VStack space="xs">
              <ToastTitle>Cannot Restore Trip</ToastTitle>
              <ToastDescription>
                The date for this trip has passed and cannot be undone.
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const ClearStates = () => {
    setHomeAddress('');
    setDestinationAddress('');
    setTripLeg(0);
  };

  //Modal for driver that shows the address
  const TripDestinationModal = () => {
    return (
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          ClearStates();
        }}
        finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Address</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <View style={TripScreenStyles.modalContainer}>
              <Text style={TripScreenStyles.modalText}>
                {tripLeg == 0 ? homeAddress : destinationAddress}
              </Text>
              <MoveDown
                size={iconSize}
                strokeWidth={iconStrokeWidth}
                color={tripLeg == 0 ? '#3ba2a9' : '#c26b71'}
              />
              <Text style={TripScreenStyles.modalText}>
                {tripLeg == 0 ? destinationAddress : homeAddress}
              </Text>
            </View>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  //Empty flatlist text is defined
  const EmtpyFlatListText = () => {
    return (
      <View>
        <Text style={TripScreenStyles.flatListText}>
          You currently have no trips.
        </Text>
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
          setUpcomingTripList([]);
          setShowNoFutureTripText(true);
          setRefreshingUpcomingTrips(false);
        } else {
          setShowNoFutureTripText(false);
          setUpcomingTripList(trip);
          setRefreshingUpcomingTrips(false);
        }
      });
    } else if (role == 3) {
      return await GetUpcomingTripsForDriver(userId).then(trip => {
        if (trip.length == 0) {
          setShowNoFutureTripText(true);
          setUpcomingTripList([]);
          setRefreshingUpcomingTrips(false);
          setIsLoading(false);
        } else {
          setUpcomingTripList(trip);
          setShowNoFutureTripText(false);
          setRefreshingUpcomingTrips(false);
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
          setPastTripList([]);
          setShowNoPastTripText(true);
          setRefreshingPastTrips(false);
        } else {
          setShowNoPastTripText(false);
          setPastTripList(trip);
          setRefreshingPastTrips(false);
        }
      });
    } else if (role == 3) {
      return await GetPastTripsForDriver(userId).then(trip => {
        if (trip.length == 0) {
          setShowNoPastTripText(true);
          setPastTripList([]);
          setRefreshingPastTrips(false);

          setIsLoading(false);
        } else {
          setPastTripList(trip);
          setShowNoPastTripText(false);
          setRefreshingPastTrips(false);

          setIsLoading(false);
        }
      });
    }
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
      leg={itemData.leg}
      handleAbsentPassenger={() => {
        if (itemData.tripStatus == 0) {
          setTripId(itemData.tripId);
          setCancelTrip(true);
        } else {
          ShowErrorToast();
        }
      }}
    />
  );

  //Modal for parent warning about cancelling the trip
  const TripWarningModal = () => {
    return (
      <Modal
        style={TripScreenStyles.modalContainer}
        isOpen={cancelTrip}
        onClose={() => {
          setCancelTrip(false);
        }}
        finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent style={{backgroundColor: '#ffffff'}}>
          <ModalHeader>
            <Heading size="lg">Warning</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>
              You are about to cancel this pickup. Please note it cannot be
              reversed.
            </Text>
          </ModalBody>
          <ModalFooter
            style={{
              justifyContent: 'center',
            }}>
            <CustomButton1
              title="Cancel trip"
              size="md"
              action="negative"
              isDisabled={false}
              isFocusVisible={false}
              onPress={() => {
                ChangeTripStatus(tripId, 1);
              }}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  // Error toast
  const ShowErrorToast = () => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="error" variant="solid">
            <VStack space="xs">
              <ToastTitle>Cannot cancel</ToastTitle>
              <ToastDescription>
                The trip cannot be cancelled because it has already begun.
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  //Contains for interactive card for driver for upcoming trips
  const renderItemComponentDriverSwipable = (itemData: any) => (
    <TripCardDriverSwipable
      passengerName={itemData.passengerName}
      pickUpTime={itemData.pickUpTime}
      pickUpDate={itemData.pickUpDate}
      pickUpLocation={itemData.pickUpLocation}
      tripStatus={itemData.tripStatus}
      dropOffTime={itemData.dropOffTime}
      leg={itemData.leg}
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
      handleIconPress={() => {
        setShowModal(true);
        setHomeAddress(itemData.pickUpLocation);
        setDestinationAddress(itemData.dropOffLocation);
        setTripLeg(itemData.leg);
      }}
    />
  );

  //Contains Upcoming Flatlist for all roles
  function FirstRoute() {
    if (role == 2) {
      return (
        <View style={ThemeStyles.container}>
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
    } else if (role == 3) {
      return (
        <View style={ThemeStyles.container}>
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
    }
  }

  //Contains Past Flatlist for all roles
  function SecondRoute() {
    if (role == 2) {
      return (
        <View style={ThemeStyles.container}>
          {showNoPastTripText ? EmtpyFlatListText() : null}
          <FlatList
            style={GroupedFlatListStyles.container}
            ListHeaderComponent={
              <>
                {/* Display current date records at the top */}
                {currentDateRecords.length > 0 && (
                  <View style={GroupedFlatListStyles.container}>
                    <Text style={GroupedFlatListStyles.currentDateHeader}>
                      Today ({currentDate.replace(/-/g, '/')})
                    </Text>
                    {showNoPastTripText ? EmtpyFlatListText() : null}
                    <FlatList
                      data={currentDateRecords}
                      keyExtractor={item => item.tripId}
                      renderItem={renderItem}
                      extraData
                    />
                  </View>
                )}
              </>
            }
            data={[]} // Empty data array because we're rendering everything manually
            renderItem={() => null} // No need to render items here
            extraData
            refreshControl={
              <RefreshControl
                refreshing={refreshingPastTrips}
                onRefresh={onRefreshPastTrips}
              />
            }
            ListFooterComponent={
              <View style={GroupedFlatListStyles.container}>
                {/* Render grouped data */}
                {renderGroupedData()}
              </View>
            }
          />
        </View>
      );
    } else if (role == 3) {
      return (
        <View style={ThemeStyles.container}>
          {showNoPastTripText ? EmtpyFlatListText() : null}
          <FlatList
            style={GroupedFlatListStyles.container}
            ListHeaderComponent={
              <>
                {/* Display current date records at the top */}
                {currentDateRecords.length > 0 && (
                  <View style={GroupedFlatListStyles.container}>
                    <Text style={GroupedFlatListStyles.currentDateHeader}>
                      Today ({currentDate.replace(/-/g, '/')})
                    </Text>
                    {showNoPastTripText ? EmtpyFlatListText() : null}
                    <FlatList
                      data={currentDateRecords}
                      keyExtractor={item => item.tripId}
                      renderItem={renderItem}
                      extraData
                    />
                  </View>
                )}
              </>
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshingPastTrips}
                onRefresh={onRefreshPastTrips}
              />
            }
            extraData
            data={[]} // Empty data array because we're rendering everything manually
            renderItem={() => null} // No need to render items here
            ListFooterComponent={
              <View style={GroupedFlatListStyles.container}>
                {/* Render grouped data */}
                {renderGroupedData()}
              </View>
            }
          />
        </View>
      );
    }
  }

  return (
    <NavigationContainer independent={true}>
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
      {TripDestinationModal()}
      {TripWarningModal()}
      <Tab.Navigator>
        <Tab.Screen name="Upcoming Trips" component={FirstRoute} />
        <Tab.Screen name="Past Trips" component={SecondRoute} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TripsScreen;
