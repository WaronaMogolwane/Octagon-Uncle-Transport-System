import React, {useContext, useEffect, useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, Linking, Modal, StyleSheet} from 'react-native';
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
  GetBalanceByBusinessId,
  GetDeclinedPaymentsSummary,
  GetMonthlyPaymentDetails,
  GetPaymentsSummaryForThisMonth,
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
import {useFormik} from 'formik';
import {
  GetBankingDetail,
  GetBanksList,
  UpdateBankingDetail,
} from '../../../Controllers/BankingDetailController';
import {BankingDetail} from '../../../Models/BankingDetail';
import * as yup from 'yup';

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
  const onRefreshPayments = React.useCallback(() => {
    setRefreshingPayments(true);
    setTimeout(() => {
      try {
        GetPaymentValues();
      } catch (error) {}
    }, 2000);
    setRefreshingPayments(false);
  }, []);
  const [bankingDetail, setBankingDetail] = useState<BankingDetail>();
  const [IsLoading, setIsLoading] = useState(false);

  const [bankList, setBankList] = useState(['']);
  const [showModal, setShowModal] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [bankName, setBankName] = useState('');
  const [paystackBankCode, setPaystackBankCode] = useState('');
  const [paystackBankId, setPaystackBankId] = useState('');
  const [cardAuthorizationList, setCardAuthorizationList] = useState([]);
  const [monthlyPaymentsSummary, setMonthlyPaymentsSummary] =
    useState<MonthlyPaymentDetailsCardProps>({
      Amount: '0',
      NextPaymentDate: '',
      PaymentFailed: false,
    });

  const toast = useToast();
  const businessId = auth.GetBusinessId();
  const SwitchUserRole = () => {
    if (userRole == '1') {
      setUserRole('2');
    } else {
      setUserRole('1');
    }
  };
  const SuccessToast = () => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="success" variant="outline">
            <VStack space="xs">
              <ToastTitle>Details saved successfully </ToastTitle>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const FaliureToast = () => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="error" variant="outline">
            <VStack space="xs">
              <ToastTitle>
                Details were not save successfully.Please try again.
              </ToastTitle>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const UpdateBankingDetails = async (values: any) => {
    setShowModal(false);
    setIsLoading(true);
    let bankingDetail = new BankingDetail(
      bankName,
      values.branchNumber.trim(),
      values.accountName.trim(),
      values.accountNumber.trim(),
      businessId,
      paystackBankId,
      paystackBankCode,
      '',
    );
    await UpdateBankingDetail(bankingDetail).then((response: any) => {
      if (response[1] == 200) {
        //On success this code runs
        setIsLoading(false);
        SuccessToast();
      } else {
        setIsLoading(false);
        setShowModal(true);
        FaliureToast();
      }
    });
    // .catch((error: any) => {
    //   console.error(error);
    // });
  };

  const bankingDetailSchema = yup.object().shape({
    branchNumber: yup
      .string()
      .matches(
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
        'not valid',
      )
      .min(5, 'Branch number should be more than 5 digits')
      .max(10, 'Branch number should not be more than 10 digits')
      .required('is required'),
    accountName: yup
      .string()
      .min(2, 'Account name too short!')
      .max(100, 'Account name too long')
      .required('is required'),
    accountNumber: yup
      .string()
      .min(5, 'Account number too short')
      .max(20, 'Account number too long!')
      .required('is required'),
    comfirmAccountNumber: yup
      .string()
      .min(5, 'Account number too short')
      .max(20, 'Account number too long!')
      .required('is required')
      .oneOf([yup.ref('accountNumber')], 'Account number must match'),
  });

  const bankingDetailInitialValues = {
    bankName: bankingDetail?.bankName,
    branchNumber: bankingDetail?.branchNumber,
    accountName: bankingDetail?.accountName,
    accountNumber: bankingDetail?.accountNumber,
    comfirmAccountNumber: bankingDetail?.accountNumber,
  };

  const bankingFormik = useFormik({
    initialValues: bankingDetailInitialValues,
    validationSchema: bankingDetailSchema,
    enableReinitialize: true,

    onSubmit: (values, {resetForm}) => {
      UpdateBankingDetails(values);
    },
  });
  const GetPaymentValues = () => {
    GetPaymentMethods();
    GetMonthlyPaymentsSummary();
  };
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
      console.error(error);
    }
  };
  const GetPaymentMethods = async () => {
    try {
      const result = await GetUserCardAuthorizations(auth.GetUserId());
      setCardAuthorizationList(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const GetMonthlyPaymentsSummary = async () => {
    try {
      const result: MonthlyPaymentDetailsCardProps =
        await GetMonthlyPaymentDetails(auth.GetUserId());
      console.log(result);
      const formatted = {
        ...result,
        Amount: FormatBalance(result.Amount! || '0')!,
      };

      setMonthlyPaymentsSummary(formatted);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const PayNow = async (amount: string) => {
    const authorizationCharge: AuthorizationCharge = {
      email: 'mogolwanew@gmail.com',
      amount: amount,
      authorization_code: 'AUTH_efz5240h2i',
      reference: `MCA-${uuid.v4()}`,
      metadata: {
        user_id: auth.GetUserId(),
        transporter_user_id: '856f9966-968c-478a-92ed-d95a52ac0225',
        charge_type: 'Manual Card Authorization',
      },
    };

    try {
      const result = await PayAmount(authorizationCharge);
      console.log(result);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const AddPaymentMethod = async () => {
    if (cardAuthorizationList.length > 4) {
      ShowToast(
        false,
        'Maximum amount of payment methods reached',
        'You already have 5 payment methods. Remove a payment method to add another.',
      );
      return;
    }

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

      // Checking if the link is supported
      const supported = await Linking.canOpenURL(authorizationUrl);

      if (supported) {
        await Linking.openURL(authorizationUrl);
      } else {
        await Linking.openURL(authorizationUrl);
        // Alert.alert(`Don't know how to open this URL: ${authorizationUrl}`);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const NavigateToScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };
  const businessDetailSchema = yup.object().shape({
    businessName: yup
      .string()
      .min(2, 'Business name too Short!')
      .max(50, 'Business name too Long!')
      .required(),
    businessPhoneNumber: yup
      .string()
      .matches(
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
        'not valid',
      )
      .min(10, 'Business phone number should be 10 digits')
      .max(10, 'Business phone number should be 10 digits')
      .required(),
    addressline1: yup
      .string()
      .min(2, 'Address too Short!')
      .max(100, 'Address too Long!')
      .required(),
    addressline2: yup.string().min(2, 'Too Short!').max(100, 'Too Long!'),
    suburb: yup
      .string()
      .min(2, 'Suburb too Short!')
      .max(50, 'Suburb too  Long!')
      .required(),
    city: yup
      .string()
      .min(2, 'City too Short!')
      .max(50, 'City too Long!')
      .required(),
    province: yup
      .string()
      .min(2, 'Province too Short!')
      .max(50, 'Province too Long!')
      .required(),
    postalcode: yup
      .string()
      .min(4, 'Postal code too Short!')
      .max(4, 'Postal code too Long!')
      .required(),
  });

  const businessDetailsInitialValues = {
    businessName: '',
    businessPhoneNumber: '',
    addressline1: '',
    addressline2: '',
    suburb: '',
    city: '',
    province: '',
    postalcode: '',
  };

  const formik = useFormik({
    initialValues: businessDetailsInitialValues,
    validationSchema: businessDetailSchema,

    onSubmit: (values, {resetForm}) => {
      BusinessDetailHelper(values);
    },
  });
  const ShowToast = (isSuccess: boolean, title: string, message: string) => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <NotificationToast
            ToastId={toastId}
            Title={title}
            IsSuccess={isSuccess}
            Message={message}
          />
        );
      },
    });
  };
  useEffect(() => {
    //setUserRole(auth.GetUserRole());
    setUserRole('2');
    GetPaymentValues();
    Linking.addEventListener('url', event => {
      onRefreshPayments();
    });
  }, [reference]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#e8f0f3'}}>
      <View style={{flex: 1}}>
        <MonthlyPaymentDetailsCard
          Amount={monthlyPaymentsSummary?.Amount}
          NextPaymentDate={monthlyPaymentsSummary.NextPaymentDate}
          PaymentFailed={monthlyPaymentsSummary.PaymentFailed}
          HandlePayNowPress={() => PayNow(monthlyPaymentsSummary.Amount)}
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
            onPress={AddPaymentMethod}
          />

          <CustomButton3
            size="sm"
            title="View All Transactions"
            onPress={() => NavigateToScreen('TransporterPaymentHistory')}
          />

          <CustomButton2
            size="sm"
            title="Switch User Role"
            onPress={SwitchUserRole}
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
function BusinessDetailHelper(values: any) {
  throw new Error('Function not implemented.');
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  form: {
    width: '80%',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    marginTop: 10,
    color: '#1E90FF',
    fontSize: 16,
  },
});
export default ClinetsPaymentsScreen;
