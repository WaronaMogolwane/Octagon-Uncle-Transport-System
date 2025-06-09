import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../../Services/AuthenticationService';
import {Auth} from '../../../Classes/Auth';
import {ActivityIndicator, FlatList} from 'react-native';
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
import {
  GetDailytTripsDriver,
  GetDailytTripsParent,
  GetDailytTripsTransporter,
} from '../../../Controllers/TripController';
import {GetUserProfileImage} from '../../../Controllers/UserDetailController';
import {SaveImageViaAsyncStorage} from '../../../Services/ImageStorageService';
import SmallHomeScreenCard from '../../../Components/Cards/SmallHomeScreenCard';
import {FormatBalance} from '../../../Utilities/CurrencyFormat';
import {
  GetBalanceByBusinessId,
  GetDeclinedPaymentsSummary,
  GetPaymentsSummaryForThisMonth,
} from '../../../Controllers/PaymentsController';
import {IVehicle} from '../../../Props/VehicleProps';
import {HomeScreenStyles, ThemeStyles} from '../../../Stylesheets/GlobalStyles';
import StatRowCard from '../../../Components/Cards/StatRowCard';
import {PassengerListHomeScreenCard} from '../../../Components/Cards/PassengerListHomeScreenCard';
import COLORS from '../../../Const/colors';
import {PieChart} from 'react-native-gifted-charts/dist/PieChart';
import RNFS from 'react-native-fs';
import {useNetwork} from '../../../Services/NetworkContext';

const Logger = {
  log: (...args: any[]) => console.log(...args),
  error: (...args: any[]) => console.error(...args),
};

// Retry function to handle temporary network issues
const retry = async (fn: () => Promise<any>, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

const HomeScreen = ({navigation}: any) => {
  const {signOut, session}: any = useContext(AuthContext);
  const {isConnected} = useNetwork();
  const [auth] = useState(new Auth(session));
  const [passengerCount, setPassengerCount] = useState('0');
  const [vehicleCount, setVehicleCount] = useState('0');
  const [userName, setUserName] = useState('');
  const [activePassengers, setActivePassengers] = useState([]);
  const [isActivePassenger, setIsActivePassenger] = useState(false);
  const [tripCount, setTripCount] = useState(0);
  const [missedTripsCount, setMissedTripsCount] = useState(0);
  const [activeTripsCount, setActiveTripsCount] = useState(0);
  const [completedTripsCount, setCompleteTripsCount] = useState(0);
  const [availableBalance, setAvailableBalance] = useState('0');
  const [showPieChartText, setShowPieChartText] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const [expectedPaymentsSummary, setExpectedPaymentsSummary] = useState({
    Amount: '',
    CurrentPeriod: '',
    NumberOfPayments: '',
  });
  const [declinedPaymentsSummary, setDeclinedPaymentsSummary] = useState({
    Amount: '',
    CurrentPeriod: '',
    NumberOfPayments: '',
  });

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

  const storageUrl: string =
    'https://f005.backblazeb2.com/file/Dev-Octagon-Uncle-Transport';

  const pieChartData = [
    {
      id: 1,
      value: 1,
      color: COLORS.customGreen,
      textColor: COLORS.customBlack,
      textSize: 14,
      textBackgroundColor: COLORS.customGreen,
      textBackgroundRadius: 14,
      fontWeight: '500',
    },
    {
      id: 2,
      value: Number(expectedPaymentsSummary.NumberOfPayments) || 0,
      color: COLORS.customYellow,
      textColor: COLORS.customBlack,
      textSize: 14,
      textBackgroundColor: COLORS.customYellow,
      textBackgroundRadius: 14,
      fontWeight: '500',
    },
    {
      id: 3,
      value: Number(declinedPaymentsSummary.NumberOfPayments) || 0,
      color: COLORS.customRed,
      textColor: COLORS.customBlack,
      textSize: 14,
      textBackgroundColor: COLORS.customRed,
      textBackgroundRadius: 14,
      fontWeight: '500',
    },
  ];

  const fetchData = useCallback(async () => {
    if (!isConnected) {
      setIsDataLoading(false);
      return;
    }
    setIsDataLoading(true);

    try {
      await GetUserName();

      if (role === 1) {
        await Promise.all([
          GetPaymentsForThisMonth(),
          GetDeclinedPaymentSummary(),
          GetPassengers(),
          GetVehicleCount(),
          GetAvailableBalance(auth.GetBusinessId()),
          GetDailyBusinessTrips(),
        ]);
      } else if (role === 2) {
        await Promise.all([
          GetDailyParentTrips(),
          GetPassengers(),
          GetActivePasengers(),
        ]);
      } else if (role === 3) {
        await Promise.all([GetVehicleInfomation(), GetDailyDriverTrips()]);
      }

      await GetProfileImage();
    } catch (error) {
      Logger.error('Error fetching data:', error);
    } finally {
      setIsDataLoading(false);
    }
  }, [isConnected, role, auth]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const GetPaymentsForThisMonth = useCallback(async () => {
    try {
      const result = await retry(() =>
        GetPaymentsSummaryForThisMonth(businessId),
      );
      const expectedPayments: any = result;
      expectedPayments.Amount = FormatBalance(expectedPayments.Amount || '0');
      setExpectedPaymentsSummary(expectedPayments);
    } catch (error: any) {
      Logger.error('Error fetching payments:', error);
    }
  }, [businessId]);

  const GetDeclinedPaymentSummary = useCallback(async () => {
    try {
      const result = await retry(() => GetDeclinedPaymentsSummary(businessId));
      const declinedPayments: any = result;
      declinedPayments.Amount = FormatBalance(declinedPayments.Amount || '0');
      setDeclinedPaymentsSummary(declinedPayments);
    } catch (error: any) {
      Logger.error('Error fetching declined payments:', error);
    }
  }, [businessId]);

  const GetProfileImage = async () => {
    const downloadDest = `${RNFS.DocumentDirectoryPath}/profile_image.jpg`;
    try {
      const fileExists = await RNFS.exists(downloadDest);
      if (fileExists) return;

      const result = await retry(() => GetUserProfileImage(userId));
      if (result[1] === 200 && result[0]) {
        const downloadResponse = await RNFS.downloadFile({
          fromUrl: storageUrl + '/' + result[0],
          toFile: downloadDest,
        }).promise;

        if (downloadResponse.statusCode === 200) {
          SaveImageViaAsyncStorage(`file://${downloadDest}`);
        }
      }
    } catch (err) {
      Logger.error('Error handling profile image:', err);
    }
  };

  const GetDailyBusinessTrips = async () => {
    setTripCount(0);
    setMissedTripsCount(0);
    setActiveTripsCount(0);
    setCompleteTripsCount(0);
    try {
      const result = await retry(() => GetDailytTripsTransporter(businessId));
      if (result.length) {
        setTripCount(result.length);
        result.forEach((item: any) => {
          if (item.tripStatus === 1) setMissedTripsCount(prev => prev + 1);
          if (item.tripStatus === 2) setActiveTripsCount(prev => prev + 1);
          if (item.tripStatus === 3) setCompleteTripsCount(prev => prev + 1);
        });
      }
    } catch (error) {
      Logger.error('Error fetching business trips:', error);
    }
  };

  const GetDailyParentTrips = async () => {
    setTripCount(0);
    setMissedTripsCount(0);
    setActiveTripsCount(0);
    setCompleteTripsCount(0);
    try {
      const result = await retry(() => GetDailytTripsParent(userId));
      if (result.length) {
        setTripCount(result.length);
        result.forEach((item: any) => {
          if (item.tripStatus === 1) setMissedTripsCount(prev => prev + 1);
          if (item.tripStatus === 2) setActiveTripsCount(prev => prev + 1);
          if (item.tripStatus === 3) setCompleteTripsCount(prev => prev + 1);
        });
      }
    } catch (error) {
      Logger.error('Error fetching parent trips:', error);
    }
  };

  const GetDailyDriverTrips = async () => {
    setTripCount(0);
    setMissedTripsCount(0);
    setActiveTripsCount(0);
    setCompleteTripsCount(0);
    try {
      const result = await retry(() => GetDailytTripsDriver(userId));
      if (result.length) {
        setTripCount(result.length);
        result.forEach((item: any) => {
          if (item.tripStatus === 1) setMissedTripsCount(prev => prev + 1);
          if (item.tripStatus === 2) setActiveTripsCount(prev => prev + 1);
          if (item.tripStatus === 3 && item.isCompleted === 1)
            setCompleteTripsCount(prev => prev + 1);
        });
      }
    } catch (error) {
      Logger.error('Error fetching driver trips:', error);
    }
  };

  const GetVehicleCount = useCallback(async () => {
    try {
      await retry(() =>
        GetVehicles(businessId, (error: any, result: any) => {
          if (error) {
            throw error;
          }
          const length =
            typeof result?.data?.length === 'number' ? result.data.length : 0;
          setVehicleCount(length.toString());
        }),
      );
    } catch (error: any) {
      Logger.error('Error fetching vehicle count:', error);
      setVehicleCount('0');
    }
  }, [businessId]);

  const GetPassengers = async () => {
    try {
      let result;
      if (role === 1) {
        result = await retry(() => GetActivePassengerForBusiness(businessId));
      } else if (role === 2) {
        result = await retry(() => GetAllActivePassengerForParent(userId));
      }
      if (Array.isArray(result)) {
        setPassengerCount(result.length.toString());
      } else {
        setPassengerCount('0');
      }
    } catch (error) {
      Logger.error('Error fetching passengers:', error);
      setPassengerCount('0');
    }
  };

  const GetVehicleInfomation = async () => {
    try {
      const result = await retry(() => GetDriverVehicle(userId));
      if (result && Array.isArray(result) && result.length > 0) {
        setVehicle(result[0]);
      } else {
        setVehicle({
          Make: 'Not available',
          Model: 'Not available',
          FrontImageUrl: 'Not available',
          Colour: 'Not available',
          LicenseNumber: 'Not available',
        });
      }
    } catch (error) {
      Logger.error('Error fetching vehicle information:', error);
      setVehicle({
        Make: 'Not available',
        Model: 'Not available',
        FrontImageUrl: 'Not available',
        Colour: 'Not available',
        LicenseNumber: 'Not available',
      });
    }
  };

  const GetActivePasengers = async () => {
    try {
      const result = await retry(() => GetAllActivePassengerForParent(userId));
      if (result.length > 0 && result[0] !== '') {
        setIsActivePassenger(true);
        setActivePassengers(result);
      } else {
        setIsActivePassenger(false);
      }
    } catch (error) {
      Logger.error('Error fetching active passengers:', error);
    }
  };

  const GetUserName = async () => {
    try {
      const result = await retry(() => GetUser(userId));
      setUserName(result.firstName);
    } catch (error) {
      Logger.error('Error fetching user name:', error);
    }
  };

  const GetAvailableBalance = async (businessId: string) => {
    try {
      const result = await retry(() => GetBalanceByBusinessId(businessId));
      setAvailableBalance(FormatBalance(result.Balance || '0'));
    } catch (error) {
      Logger.error('Error fetching balance:', error);
    }
  };

  const renderItemComponentPassengers = ({item}: {item: any}) => (
    <PassengerListHomeScreenCard
      firstName={item.firstName}
      lastName={item.lastName}
      isActive={true}
      isDeleted={false}
      onPress={() => {}}
    />
  );

  const EmtpyFlatListText = () => (
    <View>
      <Text style={HomeScreenStyles.emptyFlatListText}>
        You have no active passengers
      </Text>
    </View>
  );

  const getTimeOfDay = (): string => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 18) return 'Afternoon';
    if (hour >= 18 && hour < 21) return 'Evening';
    return 'Night';
  };

  const PieChartText = () => (
    <View>
      <Text style={HomeScreenStyles.piesChartTitle}>Payments</Text>
    </View>
  );

  const renderLegend = (text: string, color: string) => (
    <View style={{flexDirection: 'row', marginBottom: 12}}>
      <View
        style={{
          height: 18,
          width: 18,
          marginRight: 10,
          borderRadius: 4,
          backgroundColor: color,
        }}
      />
      <Text style={{color: COLORS.customBlack, fontSize: 16}}>{text}</Text>
    </View>
  );

  if (isDataLoading) {
    return (
      <SafeAreaView style={ThemeStyles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
          <Text color="$black" mt="$2">
            Loading data...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (role === 1) {
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
            onPress={() => setShowPieChartText(!showPieChartText)}
            showText={showPieChartText}
          />
          <View style={HomeScreenStyles.legend}>
            {renderLegend('Paid', COLORS.customGreen)}
            {renderLegend('Pending', COLORS.customYellow)}
            {renderLegend('Failed', COLORS.customRed)}
          </View>
        </View>
        <View style={{height: '20%'}}>
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
              primaryText={vehicleCount}
              secondaryText={'Active vehicle'}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <SmallHomeScreenCard
              primaryText={passengerCount}
              secondaryText={'Active passengers'}
            />
            <SmallHomeScreenCard
              primaryText={tripCount.toString()}
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
            tetiaryText={missedTripsCount.toString()}
          />
          <StatRowCard
            primaryText={'Active'}
            secondaryText={'Trips'}
            tetiaryText={activeTripsCount.toString()}
          />
          <StatRowCard
            primaryText={'Completed'}
            secondaryText={'Trips'}
            tetiaryText={completedTripsCount.toString()}
          />
        </View>
      </SafeAreaView>
    );
  } else if (role === 2) {
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
              primaryText={passengerCount}
              secondaryText={'All passengers'}
            />
          </View>
          <View style={HomeScreenStyles.flatList}>
            {isActivePassenger ? null : <EmtpyFlatListText />}
            <FlatList
              data={activePassengers}
              renderItem={renderItemComponentPassengers}
              keyExtractor={(item, index) => index.toString()}
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
            tetiaryText={missedTripsCount.toString()}
          />
          <StatRowCard
            primaryText={'Active'}
            secondaryText={'Trips'}
            tetiaryText={activeTripsCount.toString()}
          />
          <StatRowCard
            primaryText={'Completed'}
            secondaryText={'Trips'}
            tetiaryText={completedTripsCount.toString()}
          />
          <StatRowCard
            primaryText={'Total'}
            secondaryText={'Trips'}
            tetiaryText={tripCount.toString()}
          />
        </View>
      </SafeAreaView>
    );
  } else if (role === 3) {
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
              source={
                vehicle?.FrontImageUrl !== 'Not available'
                  ? {uri: storageUrl + vehicle?.FrontImageUrl}
                  : undefined
              }
              alt="Vehicle front picture."
              style={HomeScreenStyles.vehicleImage}
            />
            <View style={HomeScreenStyles.vehicleInfo}>
              <View style={HomeScreenStyles.itemContainer}>
                <Text style={HomeScreenStyles.itemPrimaryText}>Make: </Text>
                <Text style={HomeScreenStyles.itemSecondaryText}>
                  {vehicle?.Make}
                </Text>
              </View>
              <View style={HomeScreenStyles.itemContainer}>
                <Text style={HomeScreenStyles.itemPrimaryText}>Model: </Text>
                <Text style={HomeScreenStyles.itemSecondaryText}>
                  {vehicle?.Model}
                </Text>
              </View>
              <View style={HomeScreenStyles.itemContainer}>
                <Text style={HomeScreenStyles.itemPrimaryText}>Color: </Text>
                <Text style={HomeScreenStyles.itemSecondaryText}>
                  {vehicle?.Colour}
                </Text>
              </View>
              <View style={HomeScreenStyles.itemContainer}>
                <Text style={HomeScreenStyles.itemPrimaryText}>License: </Text>
                <Text style={HomeScreenStyles.itemSecondaryText}>
                  {vehicle?.LicenseNumber}
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
            tetiaryText={missedTripsCount.toString()}
          />
          <StatRowCard
            primaryText={'Active'}
            secondaryText={'Trips'}
            tetiaryText={activeTripsCount.toString()}
          />
          <StatRowCard
            primaryText={'Completed'}
            secondaryText={'Trips'}
            tetiaryText={completedTripsCount.toString()}
          />
          <StatRowCard
            primaryText={'Total'}
            secondaryText={'Trips'}
            tetiaryText={tripCount.toString()}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={ThemeStyles.container}>
        <Text>Invalid role</Text>
      </SafeAreaView>
    );
  }
};

export default HomeScreen;
