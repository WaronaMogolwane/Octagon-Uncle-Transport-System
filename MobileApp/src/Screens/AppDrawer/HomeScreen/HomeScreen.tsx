import React, {useContext, useEffect, useState, useCallback} from 'react';
import {AuthContext} from '../../../Services/AuthenticationService';
import {Auth} from '../../../Classes/Auth';
import {FlatList, View} from 'react-native';
import {
  Text,
  Image,
  SafeAreaView,
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
  VStack,
} from '@gluestack-ui/themed';
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

const HomeScreen = ({navigation}: any) => {
  const {signOut, session}: any = useContext(AuthContext);
  const {isConnected, isLoading: networkLoading, checkNetwork} = useNetwork();
  const toast = useToast();
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
  const [showPieChartText, setShowPieChartText] = useState(false);
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

  const showErrorToast = useCallback(() => {
    toast.show({
      placement: 'top',
      render: ({id}) => (
        <Toast nativeID={`toast-${id}`} action="error" variant="solid">
          <VStack space="xs">
            <ToastTitle>Something went wrong</ToastTitle>
            <ToastDescription>Please try again later.</ToastDescription>
          </VStack>
        </Toast>
      ),
    });
  }, [toast]);

  const showOfflineToast = useCallback(() => {
    toast.show({
      placement: 'top',
      render: ({id}) => (
        <Toast nativeID={`toast-${id}`} action="error" variant="solid">
          <VStack space="xs">
            <ToastTitle>Offline</ToastTitle>
            <ToastDescription>
              No internet connection. Please try again when online.
            </ToastDescription>
          </VStack>
        </Toast>
      ),
    });
  }, [toast]);

  // Utility to wrap API calls with network check
  const withNetworkCheck = useCallback(
    async (apiCall: () => Promise<void>, functionName: string) => {
      if (networkLoading) {
        console.log(`Skipping ${functionName}: Network state loading`);
        return;
      }
      if (!(await checkNetwork())) {
        console.log(`Skipping ${functionName}: Device offline`);
        showOfflineToast();
        return;
      }
      try {
        await apiCall();
      } catch (error) {
        console.error(`${functionName} failed:`, error);
        showErrorToast();
      }
    },
    [networkLoading, checkNetwork, showOfflineToast, showErrorToast],
  );

  const GetPaymentsForThisMonth = useCallback(async () => {
    await GetPaymentsSummaryForThisMonth(
      businessId,
      (error: any, result: any) => {
        if (error) {
          throw new Error(error.response?.data || 'Unknown error');
        }
        const expectedPayments: any = result;
        expectedPayments.Amount = FormatBalance(expectedPayments.Amount || '0');
        setExpectedPaymentsSummary(expectedPayments);
      },
    );
  }, [businessId]);

  const GetDeclinedPaymentSummary = useCallback(async () => {
    await GetDeclinedPaymentsSummary(businessId, (error: any, result: any) => {
      if (error) {
        throw new Error(error.response?.data || 'Unknown error');
      }
      const declinedPayments: any = result;
      declinedPayments.Amount = FormatBalance(declinedPayments.Amount || '0');
      setDeclinedPaymentsSummary(declinedPayments);
    });
  }, [businessId]);

  const GetProfileImage = useCallback(async () => {
    const downloadDest = `${RNFS.DocumentDirectoryPath}/profile_image.jpg`;
    const fileExists = await RNFS.exists(downloadDest);
    if (fileExists) {
      return;
    }
    const [imageUrl, status] = await GetUserProfileImage(userId);
    if (status === 200 && imageUrl) {
      const downloadResponse = await RNFS.downloadFile({
        fromUrl: storageUrl + '/' + imageUrl,
        toFile: downloadDest,
      }).promise;
      if (downloadResponse.statusCode === 200) {
        await SaveImageViaAsyncStorage(`file://${downloadDest}`);
      } else {
        console.warn(
          'Failed to download profile image:',
          downloadResponse.statusCode,
        );
      }
    }
  }, [userId, storageUrl]);

  const GetDailyBusinessTrips = useCallback(async () => {
    setTripCount(0);
    setMissedTripsCount(0);
    setActiveTripsCount(0);
    setCompleteTripsCount(0);
    const result = await GetDailytTripsTransporter(businessId);
    if (result?.length) {
      setTripCount(result.length);
      result.forEach((item: any) => {
        if (item.tripStatus == 1) setMissedTripsCount(prev => prev + 1);
        if (item.tripStatus == 2) setActiveTripsCount(prev => prev + 1);
        if (item.tripStatus == 3) setCompleteTripsCount(prev => prev + 1);
      });
    } else {
      setTripCount(0);
    }
  }, [businessId]);

  const GetDailyParentTrips = useCallback(async () => {
    setTripCount(0);
    setMissedTripsCount(0);
    setActiveTripsCount(0);
    setCompleteTripsCount(0);
    const result = await GetDailytTripsParent(userId);
    if (result?.length) {
      setTripCount(result.length);
      result.forEach((item: any) => {
        if (item.tripStatus == 1) setMissedTripsCount(prev => prev + 1);
        if (item.tripStatus == 2) setActiveTripsCount(prev => prev + 1);
        if (item.tripStatus == 3) setCompleteTripsCount(prev => prev + 1);
      });
    } else {
      setTripCount(0);
    }
  }, [userId]);

  const GetDailyDriverTrips = useCallback(async () => {
    setTripCount(0);
    setMissedTripsCount(0);
    setActiveTripsCount(0);
    setCompleteTripsCount(0);
    const result = await GetDailytTripsDriver(userId);
    if (result?.length) {
      setTripCount(result.length);
      result.forEach((item: any) => {
        if (item.tripStatus == 1) setMissedTripsCount(prev => prev + 1);
        if (item.tripStatus == 2) setActiveTripsCount(prev => prev + 1);
        if (item.tripStatus == 3 && item.isCompleted == 1)
          setCompleteTripsCount(prev => prev + 1);
      });
    } else {
      setTripCount(0);
    }
  }, [userId]);

  const GetVehicleCount = useCallback(async () => {
    await GetVehicles(businessId, (error: any, result: any) => {
      if (error) {
        throw new Error(error.response.data);
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
    if (role == 1) {
      try {
        const result = await GetActivePassengerForBusiness(businessId);
        if (result.length != 0) {
          setPassengerCount(result.length.toString());
        } else {
          setPassengerCount('0');
        }
      } catch (error) {
        throw new Error('Error fetching passengers: ' + error);
        setPassengerCount('0');
      }
    } else if (role == 2) {
      try {
        const result = await GetAllActivePassengerForParent(userId);
        if (result.length != 0) {
          setPassengerCount(result.length.toString());
        } else {
          setPassengerCount('0');
        }
      } catch (error) {
        throw new Error('Error fetching passengers: ' + error);
        setPassengerCount('0');
      }
    }
  };

  const GetVehicleInfomation = useCallback(async () => {
    const result = await GetDriverVehicle(userId);
    if (result?.length) {
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
  }, [userId]);

  const GetActivePasengers = useCallback(async () => {
    const result = await GetAllActivePassengerForParent(userId);
    if (result?.length && result[0] !== '') {
      setIsActivePassenger(true);
      setActivePassengers(result);
    } else {
      setIsActivePassenger(false);
    }
  }, [userId]);

  const GetUserName = async () => {
    await GetUser(userId)
      .then((result: any) => {
        setUserName(result.firstName);
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  };

  const GetAvailableBalance = async (businessId: string) => {
    return await GetBalanceByBusinessId(
      businessId,
      (error: any, result: any) => {
        if (error) {
          throw new Error(error.response.data);
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

  const renderLegend = (text: any, color: any) => (
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
            innerRadius={75}
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
              primaryText={vehicleCount || '0'}
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
              HomeScreenStyles.itemSecondaryText,
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
          <Text style={[HomeScreenStyles.primaryHeading, {marginStart: 25}]}>
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
              renderItem={({item}) => renderItemComponentPassengers(item)}
            />
          </View>
        </View>
        <View style={{height: '50%'}}>
          <Text
            style={[
              HomeScreenStyles.titleText,
              HomeScreenStyles.itemSecondaryText,
              {marginBottom: 15, marginTop: 20, color: COLORS.customBlack},
            ]}>
            Daily Stats
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
        <View style={{height: '25%'}}>
          <Text style={HomeScreenStyles.primaryHeading}>Good</Text>
          <Text style={[HomeScreenStyles.primaryHeading, {marginStart: 25}]}>
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
              source={{uri: storageUrl + vehicle?.FrontImageUrl}}
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
              HomeScreenStyles.itemSecondaryText,
              {marginBottom: 15, marginTop: 10, color: COLORS.customBlack},
            ]}>
            Daily Stats
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
  }
};

export default HomeScreen;
