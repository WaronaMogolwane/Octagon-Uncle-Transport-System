import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../../Services/AuthenticationService';
import {Auth} from '../../../Classes/Auth';
import {Dimensions, FlatList, ImageBackground, StyleSheet} from 'react-native';
import {Text, Image, View, SafeAreaView} from '@gluestack-ui/themed';
import {
  GetActivePassengerForBusiness,
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
import COLORS from '../../../Const/colors';
import {PieChart} from 'react-native-gifted-charts/dist/PieChart';

const HomeScreen = ({navigation}: any) => {
  const {signOut, session}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const [passengerCount, setPassengerCount] = useState('0');
  const [vehicleCount, setVehicleCount] = useState('');
  const [userName, setUserName] = useState('');
  const [activePassengers, setActivePassengers] = useState([]);
  const [isActivePassenger, setIsActivePassenger] = useState(false);

  const [tripCount, setTripCount] = useState(0);
  const [missedTripsCount, setMissedTripsCount] = useState(0);
  const [activeTripsCount, setActiveTripsCount] = useState(0);
  const [completedTripsCount, setCompleteTripsCount] = useState(0);
  const [availableBalance, setAvailableBalance] = useState('0');

  const [isStarted, setIsStarted] = useState(true);
  const [showPieChartText, setShowPieChartText] = useState(false);

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

  const storageUrl: string =
    'https://f005.backblazeb2.com/file/Dev-Octagon-Uncle-Transport';

  const pieChartData = [
    {
      id: 1,
      value: 50,
      color: COLORS.customGreen,
      textColor: COLORS.customBlack,
      textSize: 14,
      textBackgroundColor: COLORS.customGreen,
      textBackgroundRadius: 14,
      fontWeight: '500',
    },
    {
      id: 2,
      value: 80,
      color: COLORS.customYellow,
      textColor: COLORS.customBlack,
      textSize: 14,
      textBackgroundColor: COLORS.customYellow,
      textBackgroundRadius: 14,
      fontWeight: '500',
    },
    {
      id: 3,
      value: 90,
      color: COLORS.customRed,
      textColor: COLORS.customBlack,
      textSize: 14,
      textBackgroundColor: COLORS.customRed,
      textBackgroundRadius: 14,
      fontWeight: '500',
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
    } else if (role == 3) {
      GetVehicleInfomation();
      GetDailyDriverTrips();
    }
  }, []);

  // useEffect(() => {
  //   if (role == 3) {
  //     CheckTrip().then((result: any) => {
  //       setIsStarted(result);
  //     });
  //   }
  // }, []);

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
      const result = await GetActivePassengerForBusiness(businessId);
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

  const getTimeOfDay = (): string => {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 12) {
      return 'Morning';
    } else if (hour >= 12 && hour < 18) {
      return 'Afternoon';
    } else if (hour >= 18 && hour < 21) {
      return 'Evening';
    } else {
      return 'Night';
    }
  };

  const PieChartText = () => {
    return (
      <View>
        <Text style={HomeScreenStyles.piesChartTitle}>Payments</Text>
      </View>
    );
  };

  const renderLegend = (text: any, color: any) => {
    return (
      <View style={{flexDirection: 'row', marginBottom: 12}}>
        <View
          style={{
            height: 18,
            width: 18,
            marginRight: 10,
            borderRadius: 4,
            backgroundColor: color || 'white',
          }}
        />
        <Text style={{color: COLORS.customBlack, fontSize: 16}}>
          {text || ''}
        </Text>
      </View>
    );
  };

  if (role == 1) {
    return (
      <SafeAreaView style={ThemeStyles.container}>
        <View style={HomeScreenStyles.chartContainer}>
          <Text style={HomeScreenStyles.titleText}>
            Good {getTimeOfDay()}, {userName}!
          </Text>
          <PieChart
            donut
            semiCircle
            data={pieChartData}
            radius={80}
            innerRadius={65}
            showValuesAsLabels
            showTextBackground
            centerLabelComponent={PieChartText}
            labelsPosition={'onBorder'}
            onPress={() => {
              setShowPieChartText(!showPieChartText);
            }}
            showText={showPieChartText}
          />
          <View style={HomeScreenStyles.legend}>
            {renderLegend('Paid', COLORS.customGreen)}
            {renderLegend('Pending', COLORS.customYellow)}
            {renderLegend('Failed', COLORS.customRed)}
          </View>
        </View>
        <View style={{height: '20%'}}>
          {/* <Text style={HomeScreenStyles.titleText}>
            Good morning, {userName}!
          </Text> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginBottom: 10,
              marginTop: 25,
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
              {marginTop: 85.5, marginBottom: 13.5},
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
          <Text style={HomeScreenStyles.primaryHeading}>Good</Text>
          <Text style={[HomeScreenStyles.primaryHeading, {marginStart: 50}]}>
            {getTimeOfDay()}
          </Text>
          <Text
            style={[
              HomeScreenStyles.primaryHeading,
              HomeScreenStyles.secondaryHeading,
            ]}>
            {userName}
          </Text>
        </View>
        <View style={{height: '25%'}}>
          {/* <Text style={HomeScreenStyles.titleText}>
            Good morning, {userName}!
          </Text> */}
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
          <StatRowCard
            primaryText={'Total'}
            secondaryText={'Trips'}
            tetiaryText={tripCount ? tripCount.toString() : '0'}
          />
        </View>
      </SafeAreaView>
    );
  } else if (role == 3) {
    return (
      <SafeAreaView style={ThemeStyles.container}>
        <View style={{height: '25%'}}>
          <Text style={HomeScreenStyles.primaryHeading}>Good</Text>
          <Text style={[HomeScreenStyles.primaryHeading, {marginStart: 50}]}>
            {getTimeOfDay()}
          </Text>
          <Text
            style={[
              HomeScreenStyles.primaryHeading,
              HomeScreenStyles.secondaryHeading,
            ]}>
            {userName}
          </Text>
        </View>
        <View style={{height: '25%'}}>
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
          <StatRowCard
            primaryText={'Total'}
            secondaryText={'Trips'}
            tetiaryText={tripCount ? tripCount.toString() : '0'}
          />
        </View>
      </SafeAreaView>
    );
  }
};

export default HomeScreen;
