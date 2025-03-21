import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../../Services/AuthenticationService';
import {Auth} from '../../../Classes/Auth';
import {Dimensions, Pressable, StyleSheet} from 'react-native';
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

interface IVehicle {
  Make: string;
  Model: string;
  FrontImageUrl: string;
  Colour: string;
  LicenseNumber: string;
}

const HomeScreen = ({navigation}: any) => {
  const {signOut, session}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const [passengerCount, setPassengerCount] = useState('');
  const [vehicleCount, setVehicleCount] = useState('10');
  const [userName, setUserName] = useState('Nicholai');
  const [tripData, setTripData] = useState(['']);
  const [fullData, setFullData] = useState([]);
  const [activePassengers, setActivePasengers] = useState([]);
  const [amount, setAmount] = useState('1300.00');
  const [passengerList, setPassengerList] = useState([]);
  const [tripCount, setTripCount] = useState('');
  const [marginTopNumber, setMarginTopNumber] = useState(0);
  const [marginBottomNumber, setMarginBottomNumber] = useState(10);

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
    if (fullData[0] != '' && fullData.length != 0) {
      handleSearch();
    }
  }, [fullData]);

  useEffect(() => {
    RestoreImageViaAsyncStorage().then((result: any) => {
      if (result == '' || result == null) {
        GetUserProfileImage(userId).then(response => {
          if (response[1] == 200) {
            SaveImageViaAsyncStorage(response[0]);
          }
        });
      }
    });
  }, []);

  const CustomView = () => {
    const width = Dimensions.get('window').width;
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Carousel
          loop
          width={width / 1.5}
          height={width / 2}
          autoPlay={false}
          data={[...new Array(6).keys()]}
          scrollAnimationDuration={2000}
          onSnapToItem={index => console.log('current index:', index)}
          renderItem={({index}) => (
            <View
              style={{
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Card
                size="sm"
                variant="outline"
                style={{margin: 12, backgroundColor: '#ffffff'}}>
                <View>
                  <View
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50, // Half of the width or height
                      backgroundColor: '#d6f3f1',
                      display: 'flex', // Flexbox layout
                      flexDirection: 'row', // Horizontal arrangement
                      alignItems: 'center', // Align items vertically
                    }}>
                    <WalletMinimal
                      size={25}
                      strokeWidth={2}
                      color={'#3ba2a9'}
                      style={{
                        marginStart: 35,
                      }}
                    />
                  </View>
                  <View style={{marginStart: 16}}>
                    <Text
                      style={{
                        marginBottom: 0,
                        fontWeight: 'bold',
                        color: '#4b4842',
                      }}>
                      R{amount}
                    </Text>
                    <Text style={{fontSize: 10}}>Monthly Earnings</Text>
                  </View>
                </View>
              </Card>
            </View>
          )}
        />
      </View>
    );
  };

  const onStartButtonPress = () => {
    StartTrip().then((result: any) => {
      if (result == true) {
        navigation.navigate('Trip');
        setIsStarted(true);
      } else {
      }
    });
  };

  const ShowSuccessToast = () => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="attention" variant="solid">
            <VStack space="xs">
              <ToastTitle>Attention</ToastTitle>
              <ToastDescription>The trip has already started.</ToastDescription>
            </VStack>
          </Toast>
        );
      },
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
    await GetAllPassengerForBusiness(businessId).then((result: any) => {
      if (result.length != 0) {
        setPassengerCount(result.length);
        // setIsLoading(false);
      } else {
        setPassengerCount('0');
        // setIsLoading(false);
      }
    });
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
    GetAllActivePassengerForParent(userId).then(result => {
      if (result[0] != '') {
        setNoActivePassenger(false);
        setActivePasengers(result);
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
        // setNoPassenger(false);
        setPassengerList(result);
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

    if (fullData.length > 0) {
      setMarginBottomNumber(-10);
    } else {
      setMarginBottomNumber(10);
      setMarginTopNumber(-30);
    }

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
              marginBottom: marginBottomNumber,
              marginTop: marginTopNumber,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: '5%',
              }}>
              <SmallHomeScreenCard
                primaryText={'R 1000.00'}
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
          <View style={{height: '25%'}}>
            <LargeHomeScreenCard
              primaryText={passengerCount}
              secondaryText={'Active Passengers'}
              iconSelector={3}
            />
          </View>
          <View style={{height: '25%'}}>
            <TripsBlock tripList={tripData} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else if (role == 2) {
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#e8f0f3', height: '100%'}}>
        <ScrollView style={{minHeight: '100%'}}>
          <View style={{height: '33.5%'}}>
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
          <View style={{height: '33.5%'}}>
            <View
              style={{
                marginTop: '5%',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Card
                size="sm"
                variant="outline"
                style={{
                  height: '120%',
                  marginEnd: 15,
                  width: '41.7%',
                  backgroundColor: '#ffffff',
                  borderRadius: 5,
                  elevation: 10,
                  justifyContent: 'center',
                }}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('Edit Payment Details');
                  }}>
                  <View
                    style={{
                      alignItems: 'center', // Align items vertically
                      justifyContent: 'center',
                      display: 'flex', // Flexbox layout
                    }}>
                    <View
                      style={{
                        marginHorizontal: 12,
                        width: 100,
                        height: 100,
                        borderRadius: 50, // Half of the width or height
                        backgroundColor: '#d6f3f1',
                        flexDirection: 'row', // Horizontal arrangement
                        alignItems: 'center', // Align items vertically
                        justifyContent: 'center',
                      }}>
                      <WalletMinimal
                        size={25}
                        strokeWidth={2}
                        color={'#3ba2a9'}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginBottom: 0,
                          fontWeight: 'bold',
                          color: '#4b4842',
                        }}>
                        R{amount}
                      </Text>
                      <Text style={{fontSize: 10, textAlign: 'center'}}>
                        Amount Due
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </Card>

              <Card
                size="sm"
                variant="outline"
                style={{
                  height: '120%',
                  marginStart: 15,
                  width: '41.7%',
                  backgroundColor: '#ffffff',
                  borderRadius: 5,
                  elevation: 10,
                  justifyContent: 'center',
                }}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('Manage Passengers');
                  }}>
                  <View
                    style={{
                      alignItems: 'center', // Align items vertically
                      justifyContent: 'center',
                      display: 'flex', // Flexbox layout
                    }}>
                    <View
                      style={{
                        marginHorizontal: 12,
                        width: 100,
                        height: 100,
                        borderRadius: 50, // Half of the width or height
                        backgroundColor: '#f5eede',
                        flexDirection: 'row', // Horizontal arrangement
                        alignItems: 'center', // Align items vertically
                        justifyContent: 'center',
                      }}>
                      <GraduationCap
                        size={25}
                        strokeWidth={2}
                        color={'#e89d0e'}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginBottom: 0,
                          fontWeight: 'bold',
                          color: '#4b4842',
                        }}>
                        {passengerCount}
                      </Text>
                      <Text style={{fontSize: 10, textAlign: 'center'}}>
                        All Passengers
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </Card>
            </View>
          </View>
          <View style={{height: '33.5%'}}>
            {noActivePassenger ? (
              <Card
                size="sm"
                variant="outline"
                style={{
                  marginHorizontal: 17,
                  marginTop: '17%',
                  marginBottom: 10,
                  backgroundColor: '#ffffff',
                  borderRadius: 5,
                  elevation: 10,
                }}>
                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                  Active Passengers
                </Text>
                <View
                  style={{
                    marginTop: 10,
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
                  marginTop: '17%',
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
                              // flex: 1,
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
                                    // padding: -100,
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
            <TripsBlockDiver tripList={data} />
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
