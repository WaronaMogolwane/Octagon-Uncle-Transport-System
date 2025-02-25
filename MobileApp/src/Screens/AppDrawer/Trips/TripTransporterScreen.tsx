import {FlatList, RefreshControl, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  ThemeStyles,
  TripTransporterCardStyles,
} from '../../../Stylesheets/GlobalStyles';
import {
  GetPastTripsForTransporter,
  GetUpcomingTripsForTransporter,
} from '../../../Controllers/TripController';
import {Auth} from '../../../Classes/Auth';
import {AuthContext} from '../../../Services/AuthenticationService';
import {
  TripTransporterCard,
  TripCardTransporterComplete,
} from '../../../Components/Cards/TripCardTransporter';
import {
  CloseIcon,
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
import GroupedFlatList from '../../../Components/GroupedFlatList';
import COLORS from '../../../Const/colors';

const TripTransporterScreen = ({route, navigation}: any) => {
  const Tab = createMaterialTopTabNavigator();
  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));

  const vehicleId = route.params.curentVehicle.vehicleId;
  const userId = auth.GetUserId();
  const role = auth.GetUserRole();
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

    const refreshData = async () => {
      try {
        await Promise.all([GetPastTrips(), GetUpcomingTrips()]);
      } catch (error) {
        console.error('Error refreshing trips:', error);
      } finally {
        setRefreshingPastTrips(false);
        setRefreshingUpcomingTrips(false);
      }
    };

    setTimeout(refreshData, 2000);
  }, []);

  const onRefreshUpcomingTrips = React.useCallback(() => {
    setRefreshingUpcomingTrips(true);

    const refreshData = async () => {
      try {
        await Promise.all([GetUpcomingTrips(), GetPastTrips()]);
      } catch (error) {
        console.error('Error refreshing trips:', error);
      } finally {
        setRefreshingUpcomingTrips(false);
        setRefreshingPastTrips(false);
      }
    };

    setTimeout(refreshData, 2000);
  }, []);

  useEffect(() => {
    setRefreshingUpcomingTrips(true);
    setRefreshingPastTrips(true);

    setTimeout(() => {
      GetUpcomingTrips();
      GetPastTrips();
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
      <Text style={TripTransporterCardStyles.emptyFlatListText}>
        You currently have no trips.
      </Text>
    );
  };

  const GetUpcomingTrips = async () => {
    return await GetUpcomingTripsForTransporter(userId, vehicleId).then(
      trip => {
        if (trip.length === 0) {
          setShowNoFutureTripText(true);
          setUpcomingTripList([]);
          setRefreshingUpcomingTrips(false);
        } else {
          setShowNoFutureTripText(false);
          setUpcomingTripList(trip);
          setRefreshingUpcomingTrips(false);
        }
      },
    );
  };

  //Gets all past Trips for all roles
  const GetPastTrips = async () => {
    return await GetPastTripsForTransporter(userId, vehicleId).then(trip => {
      if (trip.length === 0) {
        setShowNoPastTripText(true);
        setPastTripList([]);
        setRefreshingPastTrips(false);
      } else {
        setPastTripList(trip);
        setShowNoPastTripText(false);
        setRefreshingPastTrips(false);
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
        <GroupedFlatList
          pastTrips={PastTripList}
          role={role}
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
