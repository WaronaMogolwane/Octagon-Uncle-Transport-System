import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../Services/AuthenticationService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Auth} from '../../Classes/Auth';
import {Pressable, StyleSheet, View} from 'react-native';
import {
  Text,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  VStack,
} from '@gluestack-ui/themed';
import {Baby, Bus, HandCoins, KeySquare} from 'lucide-react-native';
import {
  GetAllPassengerForBusiness,
  GetParentPassengers,
} from '../../Controllers/PassengerController';
import {GetVehicles} from '../../Controllers/VehicleController';
import {GetUser} from '../../Controllers/UserController';
import {CheckTrip, StartTrip} from '../../Services/TripServices';
import {toast} from '@lucide/lab';

const HomeScreen = ({navigation}: any) => {
  const {signOut, session}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));

  const [passengerCount, setPassengerCount] = useState('');
  const [vehicleCount, setVehicleCount] = useState('');
  const [userName, setUserName] = useState('');
  const [passengerList, setPassengerList] = useState([]);
  const [tripCount, setTripCount] = useState('');

  const [isStarted, setIsStarted] = useState(false);

  const role: number = Number(auth.GetUserRole());
  const userId = auth.GetUserId();
  const businessId = auth.GetBusinessId();
  const toast = useToast();
  // const role: number = 3;

  const iconSize = 100;
  const iconStrokeWidth = 1;
  const iconColor = '#FFFFFF';
  const textSize = 50;

  useEffect(() => {
    if (role == 1) {
      GetPassengers();
      GetVehicleCount();
    } else if (role == 2) {
      GetUserName();
      GetPassengers();
      GetPassegersByParent();
    } else if (role == 3) {
      GetUserName();
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
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff75'}}>
        <Pressable
          onPress={() => {
            navigation.navigate('Payments');
          }}
          style={{
            alignItems: 'center',
            height: '33%',
            backgroundColor: '#59d863',
            marginHorizontal: 15,
            marginTop: 10,
            marginBottom: 5,
            borderRadius: 5,
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <View>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Text
                  style={{
                    fontSize: 25,
                    color: 'white',
                    marginEnd: 5,
                    fontWeight: 'bold',
                  }}>
                  Balance
                </Text>
                <HandCoins size={25} strokeWidth={2} color={iconColor} />
              </View>
            </View>
            <View>
              <Text style={{fontSize: 70, color: 'white', fontWeight: '200'}}>
                R1000.00
              </Text>
            </View>
          </View>
        </Pressable>

        <View
          style={{
            flexDirection: 'row',
            height: '33%',
            justifyContent: 'center',
          }}>
          <Pressable
            onPress={() => {
              navigation.navigate('Manage Passengers');
            }}
            style={{
              alignItems: 'center',
              backgroundColor: '#e47501',
              width: '45%',
              borderRadius: 5,
              margin: 5,
            }}>
            <View>
              <View>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                  Passengers
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <View>
                  <Baby
                    size={iconSize}
                    strokeWidth={iconStrokeWidth}
                    color={iconColor}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: textSize,
                      fontWeight: '200',
                    }}>
                    {passengerCount}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>

          <Pressable
            onPress={() => {
              navigation.navigate('Manage Vehicles');
            }}
            style={{
              alignItems: 'center',
              backgroundColor: '#3ebec9',
              width: '45%',
              borderRadius: 5,
              margin: 5,
            }}>
            <View>
              <View>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                  Active Vehicles
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <KeySquare
                  size={iconSize}
                  strokeWidth={iconStrokeWidth}
                  color={iconColor}
                />
                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: textSize,
                      fontWeight: '200',
                    }}>
                    {vehicleCount}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        </View>

        <Pressable
          onPress={() => {
            navigation.navigate('Trip');
          }}
          style={{
            alignItems: 'center',
            height: '33%',
            backgroundColor: '#f8e648',
            marginTop: 5,
            marginHorizontal: 15,
            borderRadius: 5,
          }}>
          <View>
            <View>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 25}}>
                Today's trips
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Bus
                size={iconSize}
                strokeWidth={iconStrokeWidth}
                color={iconColor}
              />
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: textSize,
                    fontWeight: '200',
                  }}>
                  {tripCount}
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      </SafeAreaView>
    );
  } else if (role == 2) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff75'}}>
        <Pressable
          onPress={() => {
            navigation.navigate('Payments');
          }}
          style={{
            alignItems: 'flex-start',
            height: '33%',
            backgroundColor: '#3ebec9',
            marginHorizontal: 15,
            marginTop: 10,
            marginBottom: 5,
            borderRadius: 5,
          }}>
          <View>
            <View>
              <View style={{marginStart: 10, marginTop: 5}}>
                <Text
                  style={{
                    fontSize: 50,
                    color: 'white',
                    marginEnd: 5,
                    fontWeight: '400',
                  }}>
                  Welcome
                </Text>
              </View>
            </View>
            <View style={{marginStart: 60}}>
              <Text style={{fontSize: 60, color: 'white', fontWeight: '200'}}>
                {userName}
              </Text>
            </View>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate('Manage Passengers');
          }}
          style={{
            justifyContent: 'center',
            height: '33%',
            alignItems: 'center',
            backgroundColor: '#d86b68',
            marginHorizontal: 15,
            borderRadius: 5,
            margin: 5,
          }}>
          <View>
            <View>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                Passengers
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <View>
                <Baby
                  size={iconSize}
                  strokeWidth={iconStrokeWidth}
                  color={iconColor}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: textSize,
                    fontWeight: '200',
                  }}>
                  {passengerCount}
                </Text>
              </View>
            </View>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate('Trip');
          }}
          style={{
            alignItems: 'center',
            height: '33%',
            backgroundColor: '#ad5ce9',
            marginTop: 5,
            marginHorizontal: 15,
            borderRadius: 5,
          }}>
          <View>
            <View>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 25}}>
                Today's trips
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Bus
                size={iconSize}
                strokeWidth={iconStrokeWidth}
                color={iconColor}
              />
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: textSize,
                    fontWeight: '200',
                  }}>
                  {tripCount}
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      </SafeAreaView>
    );
  } else if (role == 3) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff75'}}>
        <Pressable
          onPress={() => {
            // navigation.navigate('Profile');
          }}
          style={{
            alignItems: 'flex-start',
            height: '33%',
            backgroundColor: '#e47501',
            marginHorizontal: 15,
            marginTop: 10,
            marginBottom: 5,
            borderRadius: 5,
          }}>
          <View>
            <View>
              <View style={{marginStart: 10, marginTop: 5}}>
                <Text
                  style={{
                    fontSize: 50,
                    color: 'white',
                    marginEnd: 5,
                    fontWeight: '400',
                  }}>
                  Welcome
                </Text>
              </View>
            </View>
            <View style={{marginStart: 60}}>
              <Text style={{fontSize: 60, color: 'white', fontWeight: '200'}}>
                {userName}
              </Text>
            </View>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            // navigation.navigate('Trips');
          }}
          style={{
            alignItems: 'center',
            height: '33%',
            backgroundColor: '#59d863',
            marginHorizontal: 15,
            marginTop: 10,
            marginBottom: 100,
            borderRadius: 5,
          }}>
          <View>
            <View>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                Pickups left
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <View>
                <Baby
                  size={iconSize}
                  strokeWidth={iconStrokeWidth}
                  color={iconColor}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: textSize,
                    fontWeight: '200',
                  }}>
                  {passengerCount}
                </Text>
              </View>
            </View>
          </View>
        </Pressable>

        {isStarted == false ? (
          <Pressable
            onPress={() => {
              onStartButtonPress();
            }}>
            <View style={styles.avatarContainer}>
              <View
                style={{
                  paddingStart: 15,
                  backgroundColor: 'black',
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: 40,
                    fontWeight: '600',
                  }}>
                  Start Trip
                </Text>
              </View>
            </View>
          </Pressable>
        ) : null}
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
});

export default HomeScreen;
