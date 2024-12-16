import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CustomButton1,
  CustomButton2,
  CustomButton3,
} from '../../../Components/Buttons';
import {cardCredit} from '@lucide/lab';
import {ThemeStyles} from '../../../Stylesheets/GlobalStyles';
import {
  HandCoins,
  Baby,
  KeySquare,
  Bus,
  ArrowLeftIcon,
  ClockIcon,
  Icon,
} from 'lucide-react-native';
import {Alert, Linking, StyleSheet} from 'react-native';
import {
  GetBalanceByBusinessId,
  GetDeclinedPaymentsSummary,
  GetPaymentsSummaryForThisMonth,
  GetUpcomingPaymentsSummary,
  GetUserCardAuthorizations,
  TokenizePaymentMethod,
} from '../../../Controllers/PaymentsController';
import {Auth} from '../../../Classes/Auth';
import {AuthContext} from '../../../Services/AuthenticationService';
import {
  Badge,
  BadgeText,
  Button,
  ButtonIcon,
  ButtonText,
  Card,
  Divider,
  FlatList,
  Heading,
  HStack,
  RefreshControl,
  ScrollView,
  Text,
  Toast,
  ToastTitle,
  useToast,
  View,
  VStack,
} from '@gluestack-ui/themed';
import {
  PaymentCard,
  PaymentMethodCard,
} from '../../../Components/Cards/PaymentCards';
import {useFormik} from 'formik';
import {
  GetBankingDetail,
  GetBanksList,
  UpdateBankingDetail,
} from '../../../Controllers/BankingDetailController';
import {BankingDetail} from '../../../Models/BankingDetail';
import * as yup from 'yup';
import BankingDetailModal from '../../../Components/Modals/BankingDetailModal';
import uuid from 'react-native-uuid';
import {useRoute} from '@react-navigation/native';

String.prototype.format = function () {
  var args = arguments;
  return this.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] == 'undefined' ? match : args[index];
  });
};

const PaymentsScreen = ({navigation, route}: any) => {
  const {trxref, reference} = route.params || {};
  const {session}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const [availableBalance, setAvailableBalance] = useState('0');
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
  const [userRole, setUserRole] = useState('');
  const [cardAuthorizationList, setCardAuthorizationList] = useState([]);

  const toast = useToast();
  const businessId = auth.GetBusinessId();
  const SwitchUserRole = () => {
    if (userRole == '1') {
      setUserRole('2');
    } else {
      setUserRole('1');
    }
  };
  const GetBanking = async () => {
    GetBankingDetail(businessId).then((result: any) => {
      if (result[1] == 200) {
        setBankingDetail(
          new BankingDetail(
            result[0].result[0].BankName.toString(),
            result[0].result[0].BranchNumber.toString(),
            result[0].result[0].AccountName.toString(),
            result[0].result[0].AccountNumber.toString(),
            result[0].result[0].BusinessId.toString(),
            result[0].result[0].PaystackBankId.toString(),
            result[0].result[0].PaystackBankCode.toString(),
            result[0].result[0].RecipientCode.toString(),
            result[0].result[0].BankingDetailId,
          ),
        );
        // setBankName(result[0].result[0].BankName.toString());
        // setPaystackBankId(result[0].result[0].PaystackBankId.toString());
        // setPaystackBankCode(result[0].result[0].PaystackBankCode.toString());

        setShowModal(true);
      }
    });
  };
  const BankList = async () => {
    await GetBanksList().then((result: any) => {
      if (result.length != 0) {
        setBankList(result);
      } else {
        //somthing went wrong
        toast.show({
          placement: 'top',
          render: ({id}) => {
            const toastId = 'toast-' + id;
            return (
              <Toast nativeID={toastId} action="error" variant="outline">
                <VStack space="xs">
                  <ToastTitle>
                    Please check your internet connection and try again.
                  </ToastTitle>
                </VStack>
              </Toast>
            );
          },
        });
      }
    });
  };
  const SuccessToast = () => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="success" variant="outline">
            <VStack space="xs">
              <ToastTitle>Details saved successfully</ToastTitle>
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
                Details were not save successfully. Please try again.
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
    GetAvailableBalance(auth.GetBusinessId());
    GetPaymentsForThisMonth(auth.GetBusinessId());
    GetDeclinedPaymentSummary(auth.GetBusinessId());
    GetPaymentMethods();
  };
  const NavigateToScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };
  const FormatBalance = (balance: string) => {
    const formatter = new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    });
    let newBalance = Number(
      balance.substring(0, balance.length - 2) +
        '.' +
        balance.substring(balance.length - 2),
    );
    return formatter.format(newBalance);
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
  const GetPaymentsForThisMonth = async (businessId: string) => {
    return await GetPaymentsSummaryForThisMonth(
      businessId,
      (error: any, result: any) => {
        if (error) {
          console.error(error.response.data);
        } else {
          const expectedPayments: any = result;
          expectedPayments.Amount = FormatBalance(
            expectedPayments.Amount || '0',
          );
          setExpectedPaymentsSummary(expectedPayments);
        }
      },
    );
  };
  const GetDeclinedPaymentSummary = async (businessId: string) => {
    return await GetDeclinedPaymentsSummary(
      businessId,
      (error: any, result: any) => {
        if (error) {
          console.error(error.response.data);
        } else {
          const declinedPayments: any = result;
          declinedPayments.Amount = FormatBalance(
            declinedPayments.Amount || '0',
          );
          setDeclinedPaymentsSummary(declinedPayments);
        }
      },
    );
  };
  const AddPaymentMethod = async () => {
    const email: string = auth.GetEmail();
    const userId: string = auth.GetUserId();
    const businessId: string = auth.GetBusinessId();
    const reference: string = 'CA-{0}'.format(uuid.v4());
    await TokenizePaymentMethod(
      email,
      reference,
      userId,
      businessId,
      async (error: any, result: any) => {
        if (error) {
          console.error(error);
        } else {
          const authorizationUrl: string = result.data.authorization_url;

          // Checking if the link is supported for links with custom URL scheme.
          const supported = await Linking.canOpenURL(authorizationUrl);

          if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(authorizationUrl);
          } else {
            await Linking.openURL(authorizationUrl);
            //Alert.alert(`Don't know how to open this URL: ${authorizationUrl}`);
          }
        }
      },
    );
  };
  const GetPaymentMethods = async () => {
    await GetUserCardAuthorizations(
      auth.GetUserId(),
      (error: any, result: any) => {
        if (error) {
          console.error(error);
        } else {
          setCardAuthorizationList(result);
        }
      },
    );
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

  useEffect(() => {
    //setUserRole(auth.GetUserRole());
    setUserRole('2');
    GetPaymentValues();
    Linking.addEventListener('url', event => {
      console.log(event);
      console.log(reference);
      onRefreshPayments();
    });
  }, [reference]);

  if (userRole == '1') {
    return (
      <SafeAreaView style={{height: '100%'}}>
        <ScrollView
          style={{}}
          contentContainerStyle={ThemeStyles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshingPayments}
              onRefresh={onRefreshPayments}
            />
          }>
          <View
            style={{
              height: '10%',
              width: '90%',
              marginTop: 8,
              marginBottom: 32,
            }}>
            <View
              style={
                {
                  // alignItems: 'center',
                }
              }>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    marginVertical: 'auto',
                  }}>
                  <Text
                    style={{
                      fontSize: 28,
                      fontWeight: 'bold',
                      // color: 'white',
                      marginBottom: 4,
                    }}>
                    Available Balance
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    // color: 'white',
                    fontWeight: '500',
                    // alignSelf: 'center',
                    marginBottom: 4,
                  }}>
                  {availableBalance}
                </Text>
              </View>
            </View>
          </View>
          <PaymentCard
            PaymentsType="Expected"
            NumberOfPayments={expectedPaymentsSummary.NumberOfPayments || '0'}
            Amount={expectedPaymentsSummary.Amount}
            CurrentPeriod={expectedPaymentsSummary.CurrentPeriod}
          />
          <PaymentCard
            PaymentsType="Declined"
            NumberOfPayments={declinedPaymentsSummary.NumberOfPayments || '0'}
            Amount={declinedPaymentsSummary.Amount}
            CurrentPeriod={declinedPaymentsSummary.CurrentPeriod}
            HandlePress={() => 'TransporterPaymentHistory'}
          />
          <View style={{width: '90%'}}>
            <CustomButton3
              title="Payment History"
              size="md"
              action="primary"
              styles={{marginTop: 16, alignSelf: 'flex-start'}}
              onPress={() => NavigateToScreen('TransporterPaymentHistory')}
            />
            <CustomButton3
              title="Banking Details"
              size="md"
              action="primary"
              styles={{marginTop: 8, alignSelf: 'flex-start'}}
              onPress={() => {
                BankList();
                GetBanking();
                setShowModal(true);
              }}
            />
          </View>
          <CustomButton1
            title="WITHDRAW FUNDS"
            action="positive"
            size="sm"
            styles={{
              alignSelf: 'center',
              marginTop: 'auto',
            }}
          />
          <CustomButton2
            title="Switch User Role"
            onPress={() => {
              SwitchUserRole();
            }}
          />
        </ScrollView>
        <BankingDetailModal
          ShowModal={showModal}
          DropdownIsFocus={isFocus}
          BankList={bankList}
          BranchNumberIsInvalid={!!bankingFormik.errors.branchNumber}
          BranchNumberErrorText={bankingFormik?.errors?.branchNumber}
          BranchNumberValue={bankingFormik.values?.branchNumber}
          BranchNumberOnChangeText={bankingFormik.handleChange('branchNumber')}
          BranchNumberOnBlur={bankingFormik.handleBlur('branchNumber')}
          AccountNameIsInvalid={!!bankingFormik.errors.accountName}
          AccountNameErrorText={bankingFormik?.errors?.accountName}
          AccountNameValue={bankingFormik.values?.accountName}
          AccountNameOnChangeText={bankingFormik.handleChange('accountName')}
          AccountNameOnBlur={bankingFormik.handleBlur('accountName')}
          AccountNumberIsInvalid={!!bankingFormik.errors.accountNumber}
          AccountNumberErrorText={bankingFormik?.errors?.accountNumber}
          AccountNumberValue={bankingFormik.values?.accountNumber}
          AccountNumberOnChangeText={bankingFormik.handleChange(
            'accountNumber',
          )}
          AccountNumberOnBlur={bankingFormik.handleBlur('accountNumber')}
          ComfirmAccountNumberIsInvalid={
            !!bankingFormik.errors.comfirmAccountNumber
          }
          ComfirmAccountNumberErrorText={
            bankingFormik?.errors?.comfirmAccountNumber
          }
          ComfirmAccountNumberValue={bankingFormik.values?.comfirmAccountNumber}
          ComfirmAccountNumberOnChangeText={bankingFormik.handleChange(
            'comfirmAccountNumber',
          )}
          ComfirmAccountNumberOnBlur={bankingFormik.handleBlur(
            'comfirmAccountNumber',
          )}
          OnFocusBankingDetailDropdown={() => setIsFocus(true)}
          OnBlurBankingDetailDropdown={() => setIsFocus(false)}
          OnChangeBankingDetailDropdown={(item: any) => {
            setBankName(item.name);
            setPaystackBankId(item.id);
            setPaystackBankCode(item.code);
            setIsFocus(false);
          }}
          CloseBankingDetailModalButtonOnPress={() => {
            setShowModal(false);
            formik.resetForm();
          }}
          HandleSubmit={() => {
            if (bankName != '') {
              bankingFormik.handleSubmit();
            } else {
              setIsFocus(true);

              toast.show({
                placement: 'top',
                render: ({id}) => {
                  const toastId = 'toast-' + id;
                  return (
                    <Toast
                      nativeID={toastId}
                      action="attention"
                      variant="outline">
                      <VStack space="xs">
                        <ToastTitle>Please select a bank to proceed</ToastTitle>
                      </VStack>
                    </Toast>
                  );
                },
              });
            }
          }}
        />
      </SafeAreaView>
    );
  }
  if (userRole == '2') {
    return (
      <SafeAreaView
        style={(ThemeStyles.container, {width: '100%', height: '100%'})}>
        <View style={{backgroundColor: '#e8f0f3', flex: 1}}>
          <View style={{}}>
            <Card
              style={{
                borderRadius: 5,
                paddingHorizontal: '5%',
              }}>
              <HStack>
                <VStack>
                  <Text style={{fontWeight: 'bold', fontSize: 15}}>
                    Next Payment Date
                  </Text>
                  <Text style={{fontSize: 18}}>08/05/2024</Text>
                  <Text style={{fontWeight: 'bold', fontSize: 15}}>Amount</Text>
                  <Text style={{fontSize: 18}}>R 230.00</Text>
                </VStack>
                <CustomButton1
                  title="Pay Now"
                  styles={{marginLeft: 'auto', alignSelf: 'center'}}
                />
              </HStack>
            </Card>
          </View>
          <View>
            <Heading style={{marginBottom: 8}}>Payment Methods</Heading>
            <FlatList
              style={{flexGrow: 0}}
              data={cardAuthorizationList}
              extraData
              renderItem={({item}: any) => (
                <PaymentMethodCard
                  MaskedCardNumber={item.MaskedCardNumber}
                  CardType={item.CardType}
                  IsActive={Boolean(Number(item.IsActive))}
                />
              )}
              keyExtractor={(item: any) => item.CardAuthorisationId}
              // refreshControl={
              //   <RefreshControl
              //     refreshing={refreshingVehicles}
              //     onRefresh={onRefreshVehicles}
              //   />
              // }
            />

            <CustomButton1
              size="sm"
              title="Add payment method"
              styles={{alignSelf: 'flex-start'}}
              onPress={() => {
                AddPaymentMethod();
              }}
            />

            <View>
              <CustomButton3
                size="sm"
                title="View all transactioons"
                styles={{
                  marginTop: 8,
                  alignSelf: 'flex-start',
                  marginHorizontal: 16,
                }}
                onPress={() => NavigateToScreen('TransporterPaymentHistory')}
              />
              <CustomButton2
                title="Switch User Role"
                onPress={() => {
                  SwitchUserRole();
                }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
};
export default PaymentsScreen;
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
