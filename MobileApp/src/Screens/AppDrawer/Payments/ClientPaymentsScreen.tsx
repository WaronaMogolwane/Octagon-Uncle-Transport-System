import React, {useContext, useEffect, useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, Linking, Modal} from 'react-native';
import {
  FlatList,
  Heading,
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

  const auth = new Auth(session);

  // States
  const [refreshingPayments, setRefreshingPayments] = useState(false);
  const [cardAuthorizationList, setCardAuthorizationList] = useState<any[]>([]);
  const [monthlyPaymentsSummary, setMonthlyPaymentsSummary] =
    useState<MonthlyPaymentDetailsCardProps>({
      Amount: '0',
      NextPaymentDate: '',
      PaymentFailed: false,
    });
  const toast = useToast();

  const formatBalance = (balance: string | number): string => {
    if (!balance) return 'R 0.00'; // Handle null or undefined balance

    const balanceString = String(balance); // Ensure it's a string
    const formatter = new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    });

    const newBalance = Number(
      balanceString.slice(0, -2) + '.' + balanceString.slice(-2),
    );

    return formatter.format(newBalance);
  };

  const showToast = (isSuccess: boolean, title: string, message: string) => {
    toast.show({
      placement: 'top',
      render: ({id}) => (
        <NotificationToast
          ToastId={'toast-' + id}
          Title={title}
          IsSuccess={isSuccess}
          Message={message}
        />
      ),
    });
  };

  const successToast = () => showToast(true, 'Details saved successfully', '');

  const failureToast = () =>
    showToast(false, 'Save failed', 'Please try again.');

  // API Calls
  const getPaymentMethods = async () => {
    try {
      const result = await GetUserCardAuthorizations(auth.GetUserId());
      setCardAuthorizationList(result);
    } catch (error) {
      console.error(error);
    }
  };

  const getMonthlyPaymentsSummary = async () => {
    try {
      const result = await GetMonthlyPaymentDetails(auth.GetUserId());
      setMonthlyPaymentsSummary(result);
    } catch (error) {
      console.error(error);
    }
  };

  const getPaymentValues = async () => {
    await Promise.all([getPaymentMethods(), getMonthlyPaymentsSummary()]);
  };

  const addPaymentMethod = async () => {
    if (cardAuthorizationList.length >= 5) {
      showToast(
        false,
        'Maximum Payment Methods Reached',
        'Remove a payment method to add another.',
      );
      return;
    }

    const email = auth.GetEmail();
    const userId = auth.GetUserId();
    const businessId = auth.GetBusinessId();
    const reference = `CA-${uuid.v4()}`;

    try {
      const result = await TokenizePaymentMethod(
        email,
        reference,
        userId,
        businessId,
      );
      const authorizationUrl: string = result.data.authorization_url;

      if (await Linking.canOpenURL(authorizationUrl)) {
        await Linking.openURL(authorizationUrl);
      } else {
        console.warn(`Cannot open URL: ${authorizationUrl}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const payNow = async (amount: string) => {
    const authorizationCharge: AuthorizationCharge = {
      email: auth.GetEmail(),
      amount,
      authorization_code: 'AUTH_efz5240h2i',
      reference: `MCA-${uuid.v4()}`,
      metadata: {
        user_id: auth.GetUserId(),
        transporter_user_id: '856f9966-968c-478a-92ed-d95a52ac0225',
        charge_type: 'Manual Card Authorization',
      },
    };

    try {
      await PayAmount(authorizationCharge);
      successToast();
    } catch (error) {
      console.error(error);
      failureToast();
    }
  };

  // Event Handlers
  const switchUserRole = () => {
    setUserRole(userRole === '1' ? '2' : '1');
  };

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };

  // Effects
  useEffect(() => {
    getPaymentValues();
  }, [reference]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#e8f0f3'}}>
      <View style={{flex: 1}}>
        <MonthlyPaymentDetailsCard
          Amount={formatBalance(monthlyPaymentsSummary?.Amount || '0')}
          NextPaymentDate={monthlyPaymentsSummary.NextPaymentDate}
          PaymentFailed={monthlyPaymentsSummary.PaymentFailed}
          HandlePayNowPress={() => payNow(monthlyPaymentsSummary.Amount)}
        />

        <View>
          <Heading style={{marginBottom: 8}}>Payment Methods</Heading>
          <FlatList
            data={cardAuthorizationList}
            renderItem={({item}: any) => (
              <PaymentMethodCard
                MaskedCardNumber={item.MaskedCardNumber}
                CardType={item.CardType}
                IsActive={Boolean(Number(item.IsActive))}
              />
            )}
            keyExtractor={(item: any) => item.CardAuthorisationId}
          />

          <CustomButton1
            size="sm"
            title="Add Payment Method"
            onPress={addPaymentMethod}
          />

          <CustomButton3
            size="sm"
            title="View All Transactions"
            onPress={() => navigateToScreen('TransporterPaymentHistory')}
          />

          <CustomButton2
            size="sm"
            title="Switch User Role"
            onPress={switchUserRole}
          />
        </View>
      </View>

      <Modal transparent={true} animationType="fade" visible={false}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={{marginTop: 10, color: '#fff', fontSize: 18}}>
            Loading...
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ClinetsPaymentsScreen;
