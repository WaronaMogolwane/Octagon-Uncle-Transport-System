import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../../Services/AuthenticationService';
import {Auth} from '../../../Classes/Auth';
import {FlatList, ImageBackground, StyleSheet} from 'react-native';
import {
  Text,
  Card,
  Image,
  ScrollView,
  View,
  SafeAreaView,
} from '@gluestack-ui/themed';
import {
  GetUnassignedActivePassengerForBusiness,
  GetAllActivePassengerForParent,
} from '../../../Controllers/PassengerController';
import {
  GetDriverVehicle,
  GetVehicles,
} from '../../../Controllers/VehicleController';
import {GetUser} from '../../../Controllers/UserController';
import {CheckTrip, StartTrip} from '../../../Services/TripServices';
import {
  GetDailytTripsDriver,
  GetDailytTripsParent,
  GetDailytTripsTransporter,
  GetUpcomingTripsForClient,
  GetUpcomingTripsForDriver,
} from '../../../Controllers/TripController';
import {TripsBlockDiver} from '../../../Components/TripsBlockDriver';
import filter from 'lodash.filter';
import {GetUserProfileImage} from '../../../Controllers/UserDetailController';
import {
  RestoreImageViaAsyncStorage,
  SaveImageViaAsyncStorage,
} from '../../../Services/ImageStorageService';
import SmallHomeScreenCard from '../../../Components/Cards/SmallHomeScreenCard';
import {FormatBalance} from '../../../Utilities/CurrencyFormat';
import {GetBalanceByBusinessId} from '../../../Controllers/PaymentsController';
import {IVehicle} from '../../../Props/VehicleProps';
import {HomeScreenStyles, ThemeStyles} from '../../../Stylesheets/GlobalStyles';
import StatRowCard from '../../../Components/Cards/StatRowCard';
import {PassengerListHomeScreenCard} from '../../../Components/Cards/PassengerListHomeScreenCard';

const HomeScreen = ({navigation}: any) => {
  const {signOut, session}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const [passengerCount, setPassengerCount] = useState('0');
  const [vehicleCount, setVehicleCount] = useState('');
  const [userName, setUserName] = useState('');
  const [tripData, setTripData] = useState(['']);
  const [fullData, setFullData] = useState([]);
  const [activePassengers, setActivePassengers] = useState([]);
  const [isActivePassenger, setIsActivePassenger] = useState(false);

  const [tripCount, setTripCount] = useState(0);
  const [missedTripsCount, setMissedTripsCount] = useState(0);
  const [activeTripsCount, setActiveTripsCount] = useState(0);
  const [completedTripsCount, setCompleteTripsCount] = useState(0);
  const [availableBalance, setAvailableBalance] = useState('0');

  const [isStarted, setIsStarted] = useState(true);

  const [vehicle, setVehicle] = useState<IVehicle>({
    Make: 'undefined',
    Model: 'undefined',
    FrontImageUrl: 'undefined',
    Colour: 'undefined',
    LicenseNumber: 'undefined',
  });

  const role: number = Number(auth.GetUserRole());
  // const role: number = 2;

  const userId = auth.GetUserId();
  const businessId = auth.GetBusinessId();

  const iconSize = 15;
  const iconStrokeWidth = 1;
  const iconColor = '#000000';

  const storageUrl: string =
    'https://f005.backblazeb2.com/file/Dev-Octagon-Uncle-Transport';

  const data = [
    {
      tripId: '1',
      driverName: 'Driver Dan',
      pickUpDate: '08/07/2005',
      passengerName: 'Kelcie Cash',
      isActive: false,
    },
    {
      tripId: '2',
      driverName: 'Driver Dan',
      pickUpDate: '08/07/2005',
      passengerName: 'Tsephi Ncube',
      isActive: true,
    },
    {
      tripId: '3',
      driverName: 'Driver Dan',
      pickUpDate: '08/07/2005',
      passengerName: 'Sockman Grootman',
      isActive: false,
    },
  ];

  const data2 = [
    {
      tripId: '1',
      firstName: 'John',
      lastName: 'Snow',
      isActive: true,
    },
    {
      tripId: '2',
      firstName: 'Jane',
      lastName: 'Snow',
      isActive: true,
    },
    {
      tripId: '3',
      firstName: 'Mary',
      lastName: 'Snow',
      isActive: true,
    },
    {
      tripId: '4',
      firstName: 'Trevor ',
      lastName: 'James',
      isActive: true,
    },
  ];

  useEffect(() => {
    GetUserName();

    if (role == 1) {
      GetPassengers();
      GetVehicleCount();
      GetAvailableBalance(auth.GetBusinessId());
      GetDailyBusinessTrips();
    } else if (role == 2) {
      GetDailyParentTrips();
      GetPassengers();
      GetActivePasengers();
      GetUpcomingTrips();
    } else if (role == 3) {
      GetVehicleInfomation();
      GetDailyDriverTrips();
    }
  }, []);

  useEffect(() => {
    if (role == 3) {
      CheckTrip().then((result: any) => {
        setIsStarted(result);
      });
    }
  }, []);

  useEffect(() => {
    if (fullData[0] != '' && fullData.length > 0) {
      handleSearch();
    }
  }, [fullData]);

  useEffect(() => {
    const fetchProfileImage = async () => {
      const result = await RestoreImageViaAsyncStorage();
      if (!result) {
        const response = await GetUserProfileImage(userId);
        if (response[1] === 200) {
          await SaveImageViaAsyncStorage(response[0]);
        }
      }
    };
    fetchProfileImage();
  }, []);

  const onStartButtonPress = () => {
    StartTrip().then((result: any) => {
      if (result == true) {
        navigation.navigate('Trip');
        setIsStarted(true);
      } else {
      }
    });
  };

  const GetDailyBusinessTrips = async () => {
    setTripCount(0);
    setMissedTripsCount(0);
    setActiveTripsCount(0);
    setCompleteTripsCount(0);

    await GetDailytTripsTransporter(businessId).then((result: any) => {
      if (result.length != 0) {
        setTripCount(result.length);

        result.forEach((item: any) => {
          if (item.tripStatus == 1) {
            setMissedTripsCount(missedTripsCount + 1);
          }

          if (item.tripStatus == 2) {
            setActiveTripsCount(activeTripsCount + 1);
          }

          if (item.tripStatus == 3) {
            setCompleteTripsCount(completedTripsCount + 1);
          }
        });
      } else {
        setTripCount(0);
      }
    });
  };

  const GetDailyParentTrips = async () => {
    setTripCount(0);
    setMissedTripsCount(0);
    setActiveTripsCount(0);
    setCompleteTripsCount(0);

    await GetDailytTripsParent(userId).then((result: any) => {
      if (result.length != 0) {
        setTripCount(result.length);

        result.forEach((item: any) => {
          if (item.tripStatus == 1) {
            setMissedTripsCount(missedTripsCount + 1);
          }

          if (item.tripStatus == 2) {
            setActiveTripsCount(activeTripsCount + 1);
          }

          if (item.tripStatus == 3) {
            setCompleteTripsCount(completedTripsCount + 1);
          }
        });
      } else {
        setTripCount(0);
      }
    });
  };

  const GetDailyDriverTrips = async () => {
    setTripCount(0);
    setMissedTripsCount(0);
    setActiveTripsCount(0);
    setCompleteTripsCount(0);

    await GetDailytTripsDriver(userId).then((result: any) => {
      if (result.length != 0) {
        setTripCount(result.length);

        result.forEach((item: any) => {
          if (item.tripStatus == 1) {
            setMissedTripsCount(missedTripsCount + 1);
          }

          if (item.tripStatus == 2) {
            setActiveTripsCount(activeTripsCount + 1);
          }

          if (item.tripStatus == 3) {
            setCompleteTripsCount(completedTripsCount + 1);
          }
        });
      } else {
        setTripCount(0);
      }
    });
  };

  const GetUpcomingTrips = async () => {
    if (role == 2) {
      await GetUpcomingTripsForClient(userId).then((response: any) => {
        setFullData(response);
      });
    } else if (role == 3) {
      await GetUpcomingTripsForDriver(userId).then(response => {
        setFullData(response);
      });
    }
  };

  const GetVehicleCount = async () => {
    await GetVehicles(businessId, (error: any, result: any) => {
      if (error) {
        console.error(error.response.data);
      } else {
        if (result.data.length != 0) {
          setVehicleCount(result.data.length);
        } else {
          setVehicleCount('0');
        }
      }
    });
  };

  const GetPassengers = async () => {
    try {
      const result = await GetUnassignedActivePassengerForBusiness(businessId);
      if (result.length != 0) {
        setPassengerCount(result.length.toString());
      } else {
        setPassengerCount('0');
      }
    } catch (error) {
      console.error('Error fetching passengers:', error);
      setPassengerCount('0');
    }
  };

  const GetVehicleInfomation = async () => {
    GetDriverVehicle(userId).then(result => {
      if (result != undefined) {
        setVehicle(result[0]);
      } else {
        //it failed.
      }
    });
  };

  const GetActivePasengers = async () => {
    await GetAllActivePassengerForParent(userId).then(result => {
      if (result.length > 0 && result[0] !== '') {
        setIsActivePassenger(true);
        setActivePassengers(result);
      } else {
        setIsActivePassenger(false);
      }
    });
  };

  const GetUserName = async () => {
    await GetUser(userId)
      .then((result: any) => {
        setUserName(result.firstName);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleSearch = () => {
    const date = new Date().toLocaleDateString('en-CA');
    const formattedQuery = date;

    const filterData: any = filter(fullData, (user: any) => {
      return contains(user, formattedQuery);
    });

    setTripData(filterData);
  };

  const contains = ({pickUpDate}: any, query: any) => {
    if (pickUpDate.toLowerCase().includes(query)) {
      return true;
    }

    return false;
  };

  const GetAvailableBalance = async (businessId: string) => {
    return await GetBalanceByBusinessId(
      businessId,
      (error: any, result: any) => {
        if (error) {
          console.error(error.response.data);
        } else {
          setAvailableBalance(FormatBalance(result.Balance || '0'));
        }
      },
    );
  };

  const renderItemComponentPassengers = (itemData: any) => (
    <PassengerListHomeScreenCard
      firstName={itemData.firstName}
      lastName={itemData.lastName}
      isActive={true}
      isDeleted={false}
      onPress={() => {}}
    />
  );

  const EmtpyFlatListText = () => {
    return (
      <View>
        <Text style={HomeScreenStyles.emptyFlatListText}>
          You have no active passengers
        </Text>
      </View>
    );
  };

  if (role == 1) {
    return (
      <SafeAreaView style={ThemeStyles.container}>
        <View style={{height: '25%'}}>
          <ImageBackground
            source={require('../../../Images/driver_image_homescreen.jpg')}
            resizeMode="cover"
            style={HomeScreenStyles.backgroundImage}
          />
        </View>
        <View style={{height: '25%'}}>
          <Text style={HomeScreenStyles.titleText}>
            Good morning, {userName}!
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginBottom: 10,
            }}>
            <SmallHomeScreenCard
              primaryText={availableBalance}
              secondaryText={'Balance'}
            />
            <SmallHomeScreenCard
              primaryText={vehicleCount ? vehicleCount.toString() : '0'}
              secondaryText={'Active vehicle'}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <SmallHomeScreenCard
              primaryText={passengerCount}
              secondaryText={'Active passengers'}
            />
            <SmallHomeScreenCard
              primaryText={tripCount ? tripCount.toString() : '0'}
              secondaryText={'Total trips'}
            />
          </View>
        </View>
        <View style={{height: '50%'}}>
          <Text
            style={[
              HomeScreenStyles.titleText,
              HomeScreenStyles.secondTitleText,
            ]}>
            Today's stats
          </Text>
          <StatRowCard
            primaryText={'Missed'}
            secondaryText={'Trips'}
            tetiaryText={missedTripsCount ? missedTripsCount.toString() : '0'}
          />
          <StatRowCard
            primaryText={'Active'}
            secondaryText={'Trips'}
            tetiaryText={activeTripsCount ? activeTripsCount.toString() : '0'}
          />
          <StatRowCard
            primaryText={'Completed'}
            secondaryText={'Trips'}
            tetiaryText={
              completedTripsCount ? completedTripsCount.toString() : '0'
            }
          />
          {/* <StatRowCard
            primaryText={'Total'}
            secondaryText={'Trips'}
            tetiaryText={tripCount ? tripCount.toString() : '0'}
          /> */}
        </View>
      </SafeAreaView>
    );
  } else if (role == 2) {
    return (
      <SafeAreaView style={ThemeStyles.container}>
        <View style={{height: '25%'}}>
          <ImageBackground
            source={require('../../../Images/driver_image_homescreen.jpg')}
            resizeMode="cover"
            style={HomeScreenStyles.backgroundImage}
          />
        </View>
        <View style={{height: '25%'}}>
          <Text style={HomeScreenStyles.titleText}>
            Good morning, {userName}!
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginBottom: 10,
            }}>
            <SmallHomeScreenCard
              primaryText={'R' + availableBalance}
              secondaryText={'Balance due'}
            />
            <SmallHomeScreenCard
              primaryText={passengerCount ? passengerCount.toString() : '0'}
              secondaryText={'All passengers'}
            />
          </View>
          <View style={HomeScreenStyles.flatList}>
            {isActivePassenger ? null : EmtpyFlatListText()}
            <FlatList
              extraData
              data={activePassengers}
              renderItem={({item}) => renderItemComponentPassengers(item)}
            />
          </View>
        </View>
        <View style={{height: '50%'}}>
          <Text
            style={[
              HomeScreenStyles.titleText,
              HomeScreenStyles.secondTitleText,
            ]}>
            Today's stats
          </Text>
          <StatRowCard
            primaryText={'Missed'}
            secondaryText={'Trips'}
            tetiaryText={missedTripsCount ? missedTripsCount.toString() : '0'}
          />
          <StatRowCard
            primaryText={'Active'}
            secondaryText={'Trips'}
            tetiaryText={activeTripsCount ? activeTripsCount.toString() : '0'}
          />
          <StatRowCard
            primaryText={'Completed'}
            secondaryText={'Trips'}
            tetiaryText={
              completedTripsCount ? completedTripsCount.toString() : '0'
            }
          />
          {/* <StatRowCard
            primaryText={'Total'}
            secondaryText={'Trips'}
            tetiaryText={tripCount ? tripCount.toString() : '0'}
          /> */}
        </View>
      </SafeAreaView>
    );
  } else if (role == 3) {
    return (
      <SafeAreaView style={ThemeStyles.container}>
        <View style={{height: '25%'}}>
          <ImageBackground
            source={require('../../../Images/driver_image_homescreen.jpg')}
            resizeMode="cover"
            style={HomeScreenStyles.backgroundImage}
          />
        </View>
        <View style={{height: '25%'}}>
          <Text style={HomeScreenStyles.titleText}>
            Good morning, {userName}!
          </Text>
          <View style={HomeScreenStyles.vehicleContainer}>
            <Image
              source={{
                uri: storageUrl + vehicle.FrontImageUrl,
              }}
              alt="Vehicle front picture."
              style={HomeScreenStyles.vehicleImage}
            />
            <View style={HomeScreenStyles.vehicleInfo}>
              <View style={HomeScreenStyles.itemContainer}>
                <Text style={HomeScreenStyles.itemPrimaryText}>Make: </Text>
                <Text style={HomeScreenStyles.itemSecondaryText}>
                  {vehicle.Make}
                </Text>
              </View>
              <View style={HomeScreenStyles.itemContainer}>
                <Text style={HomeScreenStyles.itemPrimaryText}>Model: </Text>
                <Text style={HomeScreenStyles.itemSecondaryText}>
                  {vehicle.Model}
                </Text>
              </View>
              <View style={HomeScreenStyles.itemContainer}>
                <Text style={HomeScreenStyles.itemPrimaryText}>Color: </Text>
                <Text style={HomeScreenStyles.itemSecondaryText}>
                  {vehicle.Colour}
                </Text>
              </View>
              <View style={HomeScreenStyles.itemContainer}>
                <Text style={HomeScreenStyles.itemPrimaryText}>License: </Text>
                <Text style={HomeScreenStyles.itemSecondaryText}>
                  {vehicle.LicenseNumber}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{height: '50%'}}>
          <Text
            style={[
              HomeScreenStyles.titleText,
              HomeScreenStyles.secondTitleText,
            ]}>
            Today's stats
          </Text>
          <StatRowCard
            primaryText={'Missed'}
            secondaryText={'Trips'}
            tetiaryText={missedTripsCount ? missedTripsCount.toString() : '0'}
          />
          <StatRowCard
            primaryText={'Active'}
            secondaryText={'Trips'}
            tetiaryText={activeTripsCount ? activeTripsCount.toString() : '0'}
          />
          <StatRowCard
            primaryText={'Completed'}
            secondaryText={'Trips'}
            tetiaryText={
              completedTripsCount ? completedTripsCount.toString() : '0'
            }
          />
          {/* <StatRowCard
            primaryText={'Total'}
            secondaryText={'Trips'}
            tetiaryText={tripCount ? tripCount.toString() : '0'}
          /> */}
        </View>
      </SafeAreaView>
    );
  }
};

export default HomeScreen;
