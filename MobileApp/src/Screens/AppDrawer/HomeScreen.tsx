import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../Services/AuthenticationService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Auth} from '../../Classes/Auth';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Text,
  Card,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  VStack,
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
  GetAllPassengerForBusiness,
  GetParentPassengers,
} from '../../Controllers/PassengerController';
import {GetVehicles} from '../../Controllers/VehicleController';
import {GetUser} from '../../Controllers/UserController';
import {CheckTrip, StartTrip} from '../../Services/TripServices';
import Carousel from 'react-native-reanimated-carousel';
import {SpendingBlock} from '../../Components/TripsBlocks';
import {GetUpcomingTripsForClient} from '../../Controllers/TripController';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PassengerBlock} from '../../Components/PassengerBlock';

const HomeScreen = ({navigation}: any) => {
  const {signOut, session}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const [passengerCount, setPassengerCount] = useState('');
  const [vehicleCount, setVehicleCount] = useState('10');
  const [userName, setUserName] = useState('Nicholai');
  const [tripData, setTripData] = useState(['']);
  const [amount, setAmount] = useState('1300.00');
  const [passengerList, setPassengerList] = useState([]);
  const [tripCount, setTripCount] = useState('');

  const [isStarted, setIsStarted] = useState(false);

  // const role: number = Number(auth.GetUserRole());
  const userId = auth.GetUserId();
  const businessId = auth.GetBusinessId();
  const toast = useToast();
  const role: number = 2;

  const iconSize = 100;
  const iconStrokeWidth = 1;
  const iconColor = '#FFFFFF';
  const textSize = 50;

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

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
      GetPassegersByParent();
      GetUpcomingTrips();
    } else if (role == 3) {
      GetPassengers();
    }
  }, []);

  useEffect(() => {
    if (role == 3) {
      CheckTrip().then((result: any) => {
        setIsStarted(result);
      });
    }
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
    GetUpcomingTripsForClient(userId).then((response: any) => {
      setTripData(response);
      console.log(tripData);
    });
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

  if (role == 1) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#e8f0f3'}}>
        <ScrollView>
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

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Pressable
              onPress={() => {
                navigation.navigate('Payments');
              }}
              style={{
                marginEnd: 15,
                width: '41.7%',
                backgroundColor: '#ffffff',
                borderRadius: 5,
                elevation: 10,
                justifyContent: 'center',
              }}>
              <Card size="sm" variant="outline">
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
                      Monthly Earnings
                    </Text>
                  </View>
                </View>
              </Card>
            </Pressable>

            <Pressable
              onPress={() => {
                navigation.navigate('Manage Vehicles');
              }}
              style={{
                marginStart: 15,
                width: '41.7%',
                backgroundColor: '#ffffff',
                borderRadius: 5,
                elevation: 10,
                justifyContent: 'center',
              }}>
              <Card size="sm" variant="outline">
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
                      backgroundColor: '#fadcdc',
                      display: 'flex', // Flexbox layout
                      flexDirection: 'row', // Horizontal arrangement
                      alignItems: 'center', // Align items vertically
                      justifyContent: 'center',
                    }}>
                    <CarFront size={25} strokeWidth={2} color={'#c26b71'} />
                  </View>
                  <View>
                    <Text
                      style={{
                        textAlign: 'center',
                        marginBottom: 0,
                        fontWeight: 'bold',
                        color: '#4b4842',
                      }}>
                      {vehicleCount}
                    </Text>
                    <Text style={{fontSize: 10, textAlign: 'center'}}>
                      Vehicles
                    </Text>
                  </View>
                </View>
              </Card>
            </Pressable>
          </View>

          <Pressable
            style={{
              marginTop: 15,
              marginHorizontal: 15,
              backgroundColor: '#ffffff',
              borderRadius: 5,
              elevation: 10,
              justifyContent: 'center',
            }}
            onPress={() => {
              navigation.navigate('Manage Passengers');
            }}>
            <Card size="sm" variant="outline">
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
                  <GraduationCap size={25} strokeWidth={2} color={'#e89d0e'} />
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
                    Passengers
                  </Text>
                </View>
              </View>
            </Card>
          </Pressable>

          <View style={{height: '29%'}}>
            <SpendingBlock tripList={tripData} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else if (role == 2) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#e8f0f3'}}>
        <ScrollView>
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Pressable
              onPress={() => {
                navigation.navigate('Edit Payment Details');
              }}
              style={{
                marginEnd: 15,
                width: '41.7%',
                backgroundColor: '#ffffff',
                borderRadius: 5,
                elevation: 10,
                justifyContent: 'center',
              }}>
              <Card size="sm" variant="outline">
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
              </Card>
            </Pressable>

            <Pressable
              onPress={() => {
                navigation.navigate('Manage Passengers');
              }}
              style={{
                marginStart: 15,
                width: '41.7%',
                backgroundColor: '#ffffff',
                borderRadius: 5,
                elevation: 10,
                justifyContent: 'center',
              }}>
              <Card size="sm" variant="outline">
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
              </Card>
            </Pressable>
          </View>
          <View style={{height: '29%'}}>
            <PassengerBlock tripList={data} />
          </View>
          <View style={{height: '29%'}}>
            <SpendingBlock tripList={data} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else if (role == 3) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#e8f0f3'}}>
        <ScrollView>
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

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Card
              size="sm"
              variant="outline"
              style={{
                marginEnd: 15,
                width: '41.7%',
                backgroundColor: '#ffffff',
                borderRadius: 5,
                elevation: 10,
                justifyContent: 'center',
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
                  <WalletMinimal size={25} strokeWidth={2} color={'#3ba2a9'} />
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
                    Monthly Earnings
                  </Text>
                </View>
              </View>
            </Card>

            <Card
              size="sm"
              variant="outline"
              style={{
                marginStart: 15,
                width: '41.7%',
                backgroundColor: '#ffffff',
                borderRadius: 5,
                elevation: 10,
                justifyContent: 'center',
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
                    backgroundColor: '#fadcdc',
                    display: 'flex', // Flexbox layout
                    flexDirection: 'row', // Horizontal arrangement
                    alignItems: 'center', // Align items vertically
                    justifyContent: 'center',
                  }}>
                  <CarFront size={25} strokeWidth={2} color={'#c26b71'} />
                </View>
                <View>
                  <Text
                    style={{
                      textAlign: 'center',
                      marginBottom: 0,
                      fontWeight: 'bold',
                      color: '#4b4842',
                    }}>
                    {vehicleCount}
                  </Text>
                  <Text style={{fontSize: 10, textAlign: 'center'}}>
                    Vehicles
                  </Text>
                </View>
              </View>
            </Card>
          </View>

          <View style={{height: '29%'}}>
            <SpendingBlock tripList={tripData} />
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
