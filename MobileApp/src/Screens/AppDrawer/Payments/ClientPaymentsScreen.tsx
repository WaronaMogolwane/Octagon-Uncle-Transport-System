import React, {useContext, useEffect, useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, Linking, Modal, StyleSheet} from 'react-native';
import {
  FlatList,
  Heading,
  HStack,
  Text,
  Toast,
  ToastTitle,
  useToast,
  View,
  VStack,
} from '@gluestack-ui/themed';
import {
  CustomButton1,
  CustomButton2,
  CustomButton3,
} from '../../../Components/Buttons';
import {ThemeStyles} from '../../../Stylesheets/GlobalStyles';
import {
  GetMonthlyPaymentDetails,
  GetUserCardAuthorizations,
  PayAmount,
  TokenizePaymentMethod,
} from '../../../Controllers/PaymentsController';
import {Auth} from '../../../Classes/Auth';
import {AuthContext} from '../../../Services/AuthenticationService';
import {
  MonthlyPaymentDetailsCard,
  PaymentMethodCard,
} from '../../../Components/Cards/PaymentCards';
import NotificationToast from '../../../Components/Toasts/NotificationToast';
import {AuthorizationCharge} from '../../../Models/PaymentsModel';
import {MonthlyPaymentDetailsCardProps} from '../../../Props/PaymentCardProps';
import uuid from 'react-native-uuid';
import {ArrowRight, CreditCard} from 'lucide-react-native';
import COLORS from '../../../Const/colors';

type Props = {
  navigation: any;
  route: any;
  userRole: string;
  setUserRole: (role: string) => void;
};

const ClinetsPaymentsScreen: React.FC<Props> = ({
  navigation,
  route,
  userRole,
  setUserRole,
}) => {
  const {trxref, reference} = route.params || {};
  const {session}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const [refreshingPayments, setRefreshingPayments] = useState(false);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false); // For Pay Now
  const [isAddingPaymentMethod, setIsAddingPaymentMethod] = useState(false); // For Add Payment Method

  const [cardAuthorizationList, setCardAuthorizationList] = useState([]);
  const [paymentAmount, setPaymentAmount] = useState('0');
  const [paymentSuccessful, setPaymentSuccessful] = useState(true);
  const [monthlyPaymentsSummary, setMonthlyPaymentsSummary] =
    useState<MonthlyPaymentDetailsCardProps>({
      Amount: '0',
      NextPaymentDate: '',
      PaymentFailed: false,
    });
  const toast = useToast();
  const businessId = auth.GetBusinessId();

  const SwitchUserRole = () => {
    if (userRole === '1') {
      setUserRole('2');
    } else {
      setUserRole('1');
    }
  };

  const ShowToast = (isSuccess: boolean, title: string, message: string) => {
    toast.show({
      placement: 'top',
      render: ({id}) => (
        <NotificationToast
          ToastId={`toast-${id}`}
          Title={title}
          IsSuccess={isSuccess}
          Message={message}
        />
      ),
    });
  };

  // Made GetPaymentValues a useCallback to avoid re-creation if not needed, and for use Effect dependency
  const GetPaymentValues = useCallback(async () => {
    await Promise.all([GetPaymentMethods(), GetMonthlyPaymentsSummary()]).catch(
      error => {
        ShowToast(false, 'Error', 'Failed to load payment details.');
        throw new Error('Error fetching payment values: \n' + error);
      },
    );
  }, []);

  const FormatBalance = (balance: string) => {
    try {
      const formatter = new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
      });
      let newBalance = Number(
        balance.substring(0, balance.length - 2) +
          '.' +
          balance.substring(balance.length - 2),
      );
      const formattedAmount: string = formatter.format(newBalance);
      return formattedAmount;
    } catch (error: any) {
      ShowToast(false, 'Error', 'Failed to format balance.');
      return `R ${parseFloat(balance || '0').toFixed(2)}`;
    }
  };

  const GetPaymentMethods = async () => {
    try {
      const result = await GetUserCardAuthorizations(auth.GetUserId());
      setCardAuthorizationList(result);
    } catch (error: any) {
      ShowToast(false, 'Error', 'Failed to load payment methods.');
      setCardAuthorizationList([]);
      throw new Error('Error getting payment methods: \n' + error.message);
    }
  };

  const GetMonthlyPaymentsSummary = async () => {
    try {
      const result: MonthlyPaymentDetailsCardProps =
        await GetMonthlyPaymentDetails(auth.GetUserId());
      setPaymentAmount(result.Amount);
      const formatted = {
        ...result,
        Amount: FormatBalance(result.Amount! || '0')!,
      };
      setMonthlyPaymentsSummary(formatted);
      setPaymentSuccessful(!Boolean(result.PaymentFailed));
    } catch (error: any) {
      ShowToast(false, 'Error', 'Failed to load monthly payments summary.');
      setMonthlyPaymentsSummary({
        Amount: 'R 0.00',
        NextPaymentDate: '',
        PaymentFailed: false,
      });
      throw new Error(
        'Error getting monthly payments summary: \n' + error.message,
      );
    }
  };

  const PayNow = async (amount: string) => {
    setPaymentSuccessful(true);
    if (!cardAuthorizationList || cardAuthorizationList.length === 0) {
      ShowToast(
        false,
        'Payment Error',
        'No payment method available. Please add a card.',
      );
      setPaymentSuccessful(false);
      return;
    }

    setIsProcessingPayment(true);
    const cardAuth: any = cardAuthorizationList[0];
    const authorizationCharge: AuthorizationCharge = {
      email: auth.GetEmail(),
      amount: amount,
      authorization_code: cardAuth.AuthorizationCode,
      reference: `MCA-${uuid.v4()}`,
      metadata: {
        user_id: auth.GetUserId(),
        transporter_user_id: auth.GetBusinessId(),
        charge_type: 'Manual Card Authorization',
      },
    };

    try {
      const result = await PayAmount(authorizationCharge);
      if (result && result.message === 'Authorization successfully charged.') {
        setPaymentSuccessful(!Boolean(result.PaymentFailed));
        ShowToast(
          true,
          'Payment Successful',
          'Your payment has been processed successfully.',
        );
        setPaymentSuccessful(false);
      } else {
        setPaymentSuccessful(false);
        ShowToast(
          false,
          'Payment Failed',
          result?.message || 'An unknown error occurred during payment.',
        );
      }
    } catch (error: any) {
      setPaymentSuccessful(false);
      ShowToast(
        false,
        'Payment Failed',
        error.response?.data?.message ||
          error.message ||
          'Failed to process payment. Please try again.',
      );
      throw new Error(
        'Error during PayNow: ' + error.response?.data || error.message,
      );
    } finally {
      setTimeout(() => {
        GetPaymentValues();
        setIsProcessingPayment(false);
      }, 500);
    }
  };

  const AddPaymentMethod = async () => {
    if (cardAuthorizationList.length >= 5) {
      ShowToast(
        false,
        'Maximum amount of payment methods reached',
        'You already have 5 payment methods. Remove a payment method to add another.',
      );
      return;
    }

    setIsAddingPaymentMethod(true);
    const email: string = auth.GetEmail();
    const userId: string = auth.GetUserId();
    const businessId: string = auth.GetBusinessId();
    const reference: string = `CA-${uuid.v4()}`;

    try {
      const result = await TokenizePaymentMethod(
        email,
        reference,
        userId,
        businessId,
      );
      const authorizationUrl: string = result.data.authorization_url;

      const supported = await Linking.canOpenURL(authorizationUrl);

      if (supported) {
        await Linking.openURL(authorizationUrl);
        // Do NOT set setIsAddingPaymentMethod(false) here.
        // It will be deactivated when the app returns via the deep link
        // and onRefreshPayments/GetPaymentValues finishes.
      } else {
        await Linking.openURL(authorizationUrl); // Fallback if canOpenURL returns false for some reason
        ShowToast(false, 'Error', 'Could not open payment authorization URL.');
        setIsAddingPaymentMethod(false); // Stop loading if browser can't open
      }
    } catch (error: any) {
      ShowToast(
        false,
        'Error',
        error.message || 'Failed to add payment method.',
      );
      setIsAddingPaymentMethod(false); // Stop loading if API call fails before opening browser
      throw new Error('Error adding payment method: \n' + error.message);
    }
  };

  const NavigateToScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };

  // Callback for when app returns from deep link (e.g., after adding payment method)
  const onRefreshPayments = React.useCallback(async () => {
    setRefreshingPayments(true);
    try {
      await GetPaymentValues(); // This will fetch the updated card authorization list
    } catch (error) {
      throw new Error('Error during refresh payments: \n' + error);
    } finally {
      setRefreshingPayments(false);
      setIsAddingPaymentMethod(false);
      ShowToast(true, 'Card added', 'Your card has been added successfully.');
    }
  }, [GetPaymentValues]); // Dependency for useCallback

  useEffect(() => {
    setUserRole('2');
    GetPaymentValues();

    const handleDeepLink = (event: {url: string}) => {
      onRefreshPayments();
    };

    Linking.addEventListener('url', handleDeepLink);

    return () => {
      // Clean up the event listener when the component unmounts
      //Linking.removeEventListener('url', handleDeepLink);
    };
  }, [
    reference,
    onRefreshPayments,
    setUserRole,
    GetPaymentValues,
    paymentSuccessful,
  ]); // Added GetPaymentValues as a dependency

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={{flex: 1}}>
        <View style={{paddingHorizontal: 16, marginTop: 16, marginBottom: 16}}>
          <HStack>
            <View>
              <Heading size="md">Status</Heading>
              <Text style={{fontSize: 14, color: 'gray'}}>
                {monthlyPaymentsSummary.PaymentFailed
                  ? 'Payment failed'
                  : 'Payment successful'}
              </Text>
            </View>
            <View style={{marginLeft: 'auto'}}>
              <CustomButton1
                textColor={COLORS.white}
                size="sm"
                title={paymentSuccessful ? 'Paid' : 'Pay now'}
                action={'positive'}
                isDisabled={paymentSuccessful}
                onPress={() => {
                  PayNow(paymentAmount);
                }}
              />
            </View>
          </HStack>
        </View>
        <MonthlyPaymentDetailsCard
          styles={{
            paddingHorizontal: 16,
            marginBottom: 16,
          }}
          Amount={monthlyPaymentsSummary?.Amount}
          NextPaymentDate={monthlyPaymentsSummary.NextPaymentDate}
          PaymentFailed={monthlyPaymentsSummary.PaymentFailed}
        />

        <View style={{paddingHorizontal: 16, paddingTop: 16, marginBottom: 16}}>
          <Heading size="md" style={{marginBottom: 12}}>
            Payment Methods
          </Heading>
          <FlatList
            data={cardAuthorizationList}
            renderItem={({item}: any) => (
              <PaymentMethodCard
                MaskedCardNumber={item.MaskedCardNumber}
                CardType={item.CardType.trim()}
                IsActive={Boolean(Number(item.IsActive))}
                IsExpiringSoon={true} // You might want to calculate this dynamically
              />
            )}
            keyExtractor={(item: any) => item.CardAuthorisationId}
            ItemSeparatorComponent={() => <View style={{height: 8}} />}
            contentContainerStyle={{paddingBottom: 16}}
          />
          <CustomButton2
            size="md"
            title="Add payment method"
            onPress={AddPaymentMethod}
            buttonIcon={ArrowRight}
            leftButtonIcon={CreditCard}
            styles={{borderWidth: 0, paddingLeft: 0}}
            textColor="#525252"
            color="#525252"
            buttonIcontyles={{marginLeft: 'auto'}}
          />
          <CustomButton1
            size="md"
            title="View all transactions"
            styles={{backgroundColor: '#e8eef2'}}
            textColor="#000000"
            onPress={() => NavigateToScreen('TransporterPaymentHistory')}
          />
          <CustomButton2 title="Switch User Role" onPress={SwitchUserRole} />
        </View>
      </View>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isProcessingPayment || isAddingPaymentMethod}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={{marginTop: 10, color: '#fff', fontSize: 18}}>
            {isProcessingPayment
              ? 'Processing payment...'
              : 'Adding payment method...'}
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ClinetsPaymentsScreen;
