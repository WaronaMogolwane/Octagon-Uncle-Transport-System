import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../../Services/AuthenticationService';
import {Auth} from '../../../Classes/Auth';
import {
  Dimensions,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
} from 'react-native';
import {
  Text,
  Card,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  VStack,
  Image,
  ScrollView,
  View,
  SafeAreaView,
} from '@gluestack-ui/themed';
import {
  AlignLeft,
  Baby,
  Bell,
  CarFront,
  GraduationCap,
  Route,
  WalletMinimal,
} from 'lucide-react-native';
import {
  GetAllActivePassengerForBusiness,
  GetAllActivePassengerForParent,
  GetAllPassengerForBusiness,
  GetParentPassengers,
} from '../../../Controllers/PassengerController';
import {
  GetDriverVehicle,
  GetVehicles,
} from '../../../Controllers/VehicleController';
import {GetUser} from '../../../Controllers/UserController';
import {CheckTrip, StartTrip} from '../../../Services/TripServices';
import Carousel from 'react-native-reanimated-carousel';
import {TripsBlock} from '../../../Components/TripsBlock';
import {
  GetDailytTripsTransporter,
  GetUpcomingTripsForClient,
  GetUpcomingTripsForDriver,
} from '../../../Controllers/TripController';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PassengerBlock} from '../../../Components/PassengerBlock';
import {TripsBlockDiver} from '../../../Components/TripsBlockDriver';
import filter from 'lodash.filter';
import {GetUserProfileImage} from '../../../Controllers/UserDetailController';
import {
  RestoreImageViaAsyncStorage,
  SaveImageViaAsyncStorage,
} from '../../../Services/ImageStorageService';
import SmallHomeScreenCard from '../../../Components/Cards/SmallHomeScreenCard';
import LargeHomeScreenCard from '../../../Components/Cards/LargeHomeScreenCard';
import {FormatBalance} from '../../../Utilities/CurrencyFormat';
import {GetBalanceByBusinessId} from '../../../Controllers/PaymentsController';
import BankingDetailModal from '../../../Components/Modals/BankingDetailModal';
import {TripSummaryBlock} from '../../../Components/TripSummaryBlock';
import {IVehicle} from '../../../Props/VehicleProps';

const HomeScreen = ({navigation}: any) => {
  const {signOut, session}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const [passengerCount, setPassengerCount] = useState('0');
  const [vehicleCount, setVehicleCount] = useState('');
  const [userName, setUserName] = useState('');
  const [tripData, setTripData] = useState(['']);
  const [fullData, setFullData] = useState([]);
  const [activePassengers, setActivePassengers] = useState([]);
  const [amount, setAmount] = useState('1300.00');
  const [passengerList, setPassengerList] = useState([]);

  const [tripCount, setTripCount] = useState(0);
  const [missedTripsCount, setMissedTripsCount] = useState(0);
  const [activeTripsCount, setActiveTripsCount] = useState(0);
  const [completedTripsCount, setCompleteTripsCount] = useState(0);
  const [availableBalance, setAvailableBalance] = useState('0');

  const [isStarted, setIsStarted] = useState(true);
  const [noActivePassenger, setNoActivePassenger] = useState(true);

  const [vehicle, setVehicle] = useState<IVehicle>({
    Make: 'undefined',
    Model: 'undefined',
    FrontImageUrl: 'undefined',
    Colour: 'undefined',
    LicenseNumber: 'undefined',
  });

  const role: number = Number(auth.GetUserRole());
  // const role: number = 3;

  const userId = auth.GetUserId();
  const businessId = auth.GetBusinessId();

  const toast = useToast();

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

  useEffect(() => {
    GetUserName();

    if (role == 1) {
      GetPassengers();
      GetVehicleCount();
      GetAvailableBalance(auth.GetBusinessId());
      GetDailyBusinessTrips();
    } else if (role == 2) {
      GetPassengers();
      GetActivePasengers();
      GetUpcomingTrips();
    } else if (role == 3) {
      GetVehicleInfomation();
      GetUpcomingTrips();
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
      const result = await GetAllActivePassengerForBusiness(businessId);
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
      console.info(result);

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
        setNoActivePassenger(false);
        setActivePassengers(result);
      } else {
        setNoActivePassenger(true);
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

  const GetPassegersByParent = async () => {
    await GetParentPassengers(userId).then((result: any) => {
      if (result.length != 0) {
        setPassengerCount(result.length.toString());
        // setNoPassenger(false);
        // setPassengerList(result);
        // setStatusCode(!statusCode);
        // setIsLoading(false);
      } else {
        //   setNoPassenger(true);
        //   setIsLoading(false);
      }
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

  const universityIcon = (
    <GraduationCap
      size={iconSize}
      strokeWidth={iconStrokeWidth}
      color={iconColor}
    />
  );
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

  if (role == 1) {
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#e8f0f3', height: '100%'}}>
        <ScrollView>
          <View style={{height: '25%'}}>
            <View>
              <View style={{marginStart: 15}}>
                <Text
                  style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  Hello
                </Text>
              </View>

              <View style={{marginStart: 50}}>
                <Text
                  style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    color: 'black',
                    marginBottom: 50,
                  }}>
                  {userName}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              height: '25%',
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
              }}>
              <SmallHomeScreenCard
                primaryText={availableBalance}
                secondaryText={'Available Balance'}
                iconSelector={1}
              />

              <SmallHomeScreenCard
                primaryText={vehicleCount}
                secondaryText={'Active Vehicles'}
                iconSelector={2}
              />
            </View>
          </View>
          <View style={{height: '25%', marginBottom: 12}}>
            <LargeHomeScreenCard
              primaryText={passengerCount}
              secondaryText={'Active Passengers'}
              iconSelector={3}
            />
          </View>
          <View style={{height: '25%', marginHorizontal: 14}}>
            <TripSummaryBlock
              allTripsCount={tripCount}
              missedTripsCount={missedTripsCount}
              activeTripsCount={activeTripsCount}
              completedTripsCount={completedTripsCount}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else if (role == 2) {
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#e8f0f3', height: '100%'}}>
        <ScrollView>
          <View style={{height: '30%'}}>
            <View>
              <View style={{marginStart: 15}}>
                <Text
                  style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  Hello
                </Text>
              </View>

              <View style={{marginStart: 50}}>
                <Text
                  style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    color: 'black',
                    marginBottom: 50,
                  }}>
                  {userName}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              height: '35%',
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
              }}>
              <SmallHomeScreenCard
                primaryText={'R 1000.00'}
                secondaryText={'Available Balance'}
                iconSelector={1}
              />

              <SmallHomeScreenCard
                primaryText={passengerCount}
                secondaryText={'All Passengers'}
                iconSelector={3}
              />
            </View>
          </View>
          <View style={{height: '30%', marginBottom: 12}}>
            {noActivePassenger ? (
              <Card
                size="sm"
                variant="outline"
                style={{
                  marginHorizontal: 17,
                  marginBottom: 10,
                  backgroundColor: '#ffffff',
                  borderRadius: 5,
                  elevation: 10,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 10,
                  }}>
                  Active Passengers
                </Text>
                <View
                  style={{
                    marginBottom: 10,
                    alignItems: 'flex-start',
                    marginHorizontal: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                    }}>
                    You have no active passengers
                  </Text>
                </View>
              </Card>
            ) : (
              <Card
                size="sm"
                variant="outline"
                style={{
                  marginHorizontal: 17,
                  marginBottom: 10,
                  backgroundColor: '#ffffff',
                  borderRadius: 5,
                  elevation: 10,
                }}>
                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                  Active Passengers
                </Text>

                <ScrollView>
                  <View
                    style={{
                      marginVertical: 10,
                      marginBottom: 5,
                      alignItems: 'flex-start',
                      marginHorizontal: 15,
                    }}>
                    {activePassengers.map((item: any) => {
                      return (
                        <View
                          style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 10,
                            backgroundColor: '#ffffff',
                          }}
                          key={item.passengerId}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              borderRadius: 20,
                            }}>
                            <View>
                              <Text style={{fontSize: 16, fontWeight: '600'}}>
                                {universityIcon} {item.editedName}
                              </Text>
                            </View>

                            <View>
                              <Text style={{fontSize: 16, fontWeight: '600'}}>
                                <View
                                  style={{
                                    flex: 1,
                                    display: 'flex',
                                    borderRadius: 20, // Half of the width or
                                    backgroundColor: '#d6f3f1',
                                  }}>
                                  <Text
                                    style={{
                                      padding: -100,
                                      color: '#3ba2a9',
                                      fontWeight: '500',
                                    }}>
                                    Active
                                  </Text>
                                </View>
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </Card>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else if (role == 3) {
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#e8f0f3', height: '100%'}}>
        <ScrollView>
          <View style={{height: '33.3%'}}>
            <View>
              <View style={{marginStart: 15}}>
                <Text
                  style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  Hello
                </Text>
              </View>

              <View style={{marginStart: 50}}>
                <Text
                  style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    color: 'black',
                    marginBottom: 50,
                  }}>
                  {userName}
                </Text>
              </View>
            </View>
          </View>
          <View style={{height: '33.3%'}}>
            <Card
              size="sm"
              variant="outline"
              style={{
                marginHorizontal: 12,
                marginBottom: 10,
                backgroundColor: '#ffffff',
                borderRadius: 5,
                elevation: 10,
              }}>
              <Text
                style={{
                  // fontSize: 15,
                  marginStart: 15,
                  fontWeight: '500',
                  textAlign: 'left',
                  marginTop: 5,
                  marginBottom: 15,
                }}>
                Your Vehicle
              </Text>
              <View style={{flexDirection: 'row', flex: 1, marginBottom: 10}}>
                <View style={{width: '33%'}}>
                  <Image
                    style={{
                      width: 100,
                      aspectRatio: 1 / 1,
                      marginHorizontal: 12,
                      height: 100,
                      borderRadius: 50, // Half of the width or height
                      display: 'flex', // Flexbox layout
                      flexDirection: 'row', // Horizontal arrangement
                      alignItems: 'center', // Align items vertically
                      justifyContent: 'center',
                    }}
                    source={{
                      uri:
                        storageUrl + vehicle.FrontImageUrl ||
                        'https://eu.amcdn.co.za/cars/toyota-quantum-2-5d-4d-ses-fikile-2012-id-64381431-type-main.jpg',
                    }}
                    alt="Vehicle front picture."
                  />
                </View>

                <View style={{width: '67%'}}>
                  <View
                    style={{
                      marginTop: 15,
                      marginBottom: 30,
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'flex-start',
                    }}>
                    <Text style={styles.cardText}>{vehicle.Make}</Text>
                    <Text style={styles.cardText}>{vehicle.Model}</Text>
                  </View>
                  <View
                    style={{
                      marginStart: 12,
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'flex-start',
                    }}>
                    <Text style={styles.cardText}>{vehicle.Colour}</Text>
                    <Text style={styles.cardText}>{vehicle.LicenseNumber}</Text>
                  </View>
                </View>
              </View>
            </Card>
          </View>
          <View style={{height: '33.3%'}}>
            <TripsBlockDiver tripList={tripData} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#20B2AA',
  },
  cardText: {fontWeight: '500', fontSize: 16},
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },

  image: {
    width: 40,
    height: 40,
  },

  body: {
    padding: 30,
  },
  box: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  username: {
    color: '#20B2AA',
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 10,
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  coverPhoto: {
    width: '100%',
    height: 130,
    resizeMode: 'cover',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: -75,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  quicksandLight: {
    fontFamily: 'Quicksand-Light',
    fontSize: 20,
  },
  quicksandRegular: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 20,
  },
  ralewayItalic: {
    fontFamily: 'Raleway-Italic',
    fontSize: 20,
  },
  ralewayThin: {
    fontFamily: 'Raleway-ThinItalic',
    fontSize: 20,
  },
});

export default HomeScreen;
