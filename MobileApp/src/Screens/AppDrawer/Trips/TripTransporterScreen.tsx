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
import {
  FlatlistStyles,
  ThemeStyles,
  TripTransporterCardStyles,
} from '../../../Stylesheets/GlobalStyles';
import {TripCardDriver} from '../../../Components/Cards/TripListCardForDriver';
import {
  GetPastTripsForTransporter,
  GetUpcomingTripsForTransporter,
  UndoTripDropOffTime,
} from '../../../Controllers/TripController';
import {Auth} from '../../../Classes/Auth';
import {AuthContext} from '../../../Services/AuthenticationService';
import {
  TripTransporterCard,
  TripCardTransporterComplete,
} from '../../../Components/Cards/TripCardTransporter';
import {
  ArrowLeftIcon,
  CloseIcon,
  Fab,
  FabIcon,
  FabLabel,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@gluestack-ui/themed';
import {MoveDown} from 'lucide-react-native';

const TripTransporterScreen = ({route, navigation}: any) => {
  const Tab = createMaterialTopTabNavigator();
  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));

  const vehicleId = route.params.curentVehicle.vehicleId;
  const userId = auth.GetUserId();
  const iconSize = 40;
  const iconStrokeWidth = 2;
  const ref = React.useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [UpcomingTripList, setUpcomingTripList] = useState([]);
  const [PastTripList, setPastTripList] = useState([]);
  const [showNoFutureTripText, setShowNoFutureTripText] = useState(false);
  const [showNoPastTripText, setShowNoPastTripText] = useState(false);
  const [refreshingUpcomingTrips, setRefreshingUpcomingTrips] =
    React.useState(false);
  const [refreshingPastTrips, setRefreshingPastTrips] = React.useState(false);

  const [homeAddress, setHomeAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [tripLeg, setTripLeg] = useState(0);

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
  }, [vehicleId]);

  const ClearStates = () => {
    setHomeAddress('');
    setDestinationAddress('');
    setTripLeg(0);
  };

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
            <View style={TripTransporterCardStyles.modalContainer}>
              <Text style={TripTransporterCardStyles.modalText}>
                {tripLeg == 0 ? homeAddress : destinationAddress}
              </Text>
              <MoveDown
                size={iconSize}
                strokeWidth={iconStrokeWidth}
                color={tripLeg == 0 ? '#3ba2a9' : '#c26b71'}
              />
              <Text style={TripTransporterCardStyles.modalText}>
                {tripLeg == 0 ? destinationAddress : homeAddress}
              </Text>
            </View>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  //Card defined for Transporter
  const renderItemComponentTransporter = (itemData: any) => (
    <TripTransporterCard
      passengerName={itemData.passengerName}
      pickUpTime={itemData.pickUpTime}
      pickUpDate={itemData.pickUpDate}
      pickUpLocation={itemData.pickUpLocation}
      tripStatus={itemData.tripStatus}
      dropOffTime={itemData.dropOffTime}
      leg={Number(itemData.leg)}
      handleIconPress={() => {
        setShowModal(true);
        setHomeAddress(itemData.pickUpLocation);
        setDestinationAddress(itemData.dropOffLocation);
        setTripLeg(itemData.leg);
      }}
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
      leg={Number(itemData.leg)}
      handleIconPress={() => {
        setShowModal(true);
        setHomeAddress(itemData.pickUpLocation);
        setDestinationAddress(itemData.dropOffLocation);
        setTripLeg(itemData.leg);
      }}
    />
  );

  //Empty flatlist text is defined
  const EmtpyFlatListText = () => {
    return (
      <View>
        <Text style={TripTransporterCardStyles.emptyFlatListText}>
          You currently have no trips.
        </Text>
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
    return await GetUpcomingTripsForTransporter(userId, vehicleId).then(
      trip => {
        if (trip[0] == '') {
          setShowNoFutureTripText(true);
        } else {
          setUpcomingTripList(trip);
        }
      },
    );
  };

  //Gets all past Trips for all roles
  const GetPastTrips = async () => {
    return await GetPastTripsForTransporter(userId, vehicleId).then(trip => {
      if (trip[0] == '') {
        setShowNoPastTripText(true);
      } else {
        setPastTripList(trip);
      }
    });
  };

  function FirstRoute() {
    return (
      <View style={ThemeStyles.container}>
        {showNoFutureTripText ? EmtpyFlatListText() : null}
        <FlatList
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
      <View style={ThemeStyles.container}>
        {showNoPastTripText ? EmtpyFlatListText() : null}
        <FlatList
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
      </View>
    );
  }
  return (
    <NavigationContainer independent={true}>
      {TripDestinationModal()}
      <Tab.Navigator>
        <Tab.Screen name="Upcoming Trips" component={FirstRoute} />
        <Tab.Screen name="Past Trips" component={SecondRoute} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TripTransporterScreen;
