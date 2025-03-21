// AuthContext and Dependencies
import React, {useContext, useEffect, useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Linking, RefreshControl, ScrollView} from 'react-native';
import {
  CustomButton1,
  CustomButton2,
  CustomButton3,
} from '../../../Components/Buttons';
import {ThemeStyles} from '../../../Stylesheets/GlobalStyles';
import {
  GetBalanceByBusinessId,
  GetDeclinedPaymentsSummary,
  GetPaymentsSummaryForThisMonth,
} from '../../../Controllers/PaymentsController';
import {Auth} from '../../../Classes/Auth';
import {AuthContext} from '../../../Services/AuthenticationService';
import {
  Text,
  useToast,
  View,
  VStack,
  ToastTitle,
  Toast,
} from '@gluestack-ui/themed';
import {PaymentCard} from '../../../Components/Cards/PaymentCards';
import BankingDetailModal from '../../../Components/Modals/BankingDetailModal';
import {useFormik} from 'formik';
import {
  GetBankingDetail,
  GetBanksList,
  UpdateBankingDetail,
} from '../../../Controllers/BankingDetailController';
import {BankingDetail} from '../../../Models/BankingDetail';
import * as yup from 'yup';
import NotificationToast from '../../../Components/Toasts/NotificationToast';

const TransporterPaymentsScreen = ({
  navigation,
  route,
  userRole,
  setUserRole,
}: any) => {
  const {reference} = route.params || {};
  const {session}: any = useContext(AuthContext);
  const auth = new Auth(session);
  const toast = useToast();

  // State Management
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
  const [bankingDetail, setBankingDetail] = useState<BankingDetail>();
  const [bankList, setBankList] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [bankName, setBankName] = useState('');
  const [paystackBankCode, setPaystackBankCode] = useState('');
  const [paystackBankId, setPaystackBankId] = useState('');

  // Utility Functions
  const FormatBalance = (balance: string) => {
    const formatter = new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    });
    const newBalance = Number(balance.slice(0, -2) + '.' + balance.slice(-2));
    return formatter.format(newBalance);
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

  const SwitchUserRole = () => {
    setUserRole(userRole === '1' ? '2' : '1');
  };

  const GetAvailableBalance = async (businessId: string) => {
    try {
      const result = await GetBalanceByBusinessId(businessId);
      setAvailableBalance(FormatBalance(result.Balance || '0'));
    } catch (error: any) {
      console.error(error.response?.data);
    }
  };

  const GetPaymentsForThisMonth = async (businessId: string) => {
    try {
      const result = await GetPaymentsSummaryForThisMonth(businessId);
      const formatted = {
        ...result,
        Amount: FormatBalance(result.Amount || '0'),
      };
      setExpectedPaymentsSummary(formatted);
    } catch (error: any) {
      console.error(error.response?.data);
    }
  };

  const GetDeclinedPaymentSummary = async (businessId: string) => {
    try {
      const result = await GetDeclinedPaymentsSummary(businessId);
      const formatted = {
        ...result,
        Amount: FormatBalance(result.Amount || '0'),
      };
      setDeclinedPaymentsSummary(formatted);
    } catch (error: any) {
      console.error(error.response?.data);
    }
  };

  const GetPaymentValues = async () => {
    const businessId = auth.GetBusinessId();
    await Promise.all([
      GetAvailableBalance(businessId),
      GetPaymentsForThisMonth(businessId),
      GetDeclinedPaymentSummary(businessId),
    ]);
  };

  const BankList = async () => {
    try {
      const result = await GetBanksList();
      setBankList(result);
    } catch {
      ShowToast(
        false,
        'Error',
        'Please check your internet connection and try again.',
      );
    }
  };

  const GetBanking = async () => {
    try {
      const result = await GetBankingDetail(auth.GetBusinessId());
      if (result) {
        const bankingDetailData = result[0]?.result[0];
        setBankingDetail(
          new BankingDetail(
            bankingDetailData.BankName,
            bankingDetailData.BranchNumber,
            bankingDetailData.AccountName,
            bankingDetailData.AccountNumber,
            bankingDetailData.BusinessId,
            bankingDetailData.PaystackBankId,
            bankingDetailData.PaystackBankCode,
            bankingDetailData.RecipientCode,
            bankingDetailData.BankingDetailId,
          ),
        );
        setShowModal(true);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const UpdateBankingDetails = async (values: any) => {
    setShowModal(false);
    try {
      const updatedDetail = new BankingDetail(
        bankName,
        values.branchNumber.trim(),
        values.accountName.trim(),
        values.accountNumber.trim(),
        auth.GetBusinessId(),
        paystackBankId,
        paystackBankCode,
        '',
      );

      const response = await UpdateBankingDetail(updatedDetail);
      if (response[1] === 200) {
        ShowToast(true, 'Success', 'Details saved successfully.');
      } else {
        throw new Error('Failed to save details');
      }
    } catch {
      setShowModal(true);
      ShowToast(false, 'Failure', 'Details were not saved. Please try again.');
    }
  };

  const RefreshPayments = useCallback(() => {
    setRefreshingPayments(true);
    GetPaymentValues().finally(() => setRefreshingPayments(false));
  }, []);

  useEffect(() => {
    GetPaymentValues();
    Linking.addEventListener('url', RefreshPayments);
  }, [reference]);

  // Formik Configuration
  const bankingDetailSchema = yup.object().shape({
    branchNumber: yup.string().required('Branch number is required'),
    accountName: yup.string().required('Account name is required'),
    accountNumber: yup
      .string()
      .required('Account number is required')
      .oneOf([yup.ref('comfirmAccountNumber')], 'Account number must match'),
    comfirmAccountNumber: yup.string().required('Confirmation required'),
  });

  const bankingFormik = useFormik({
    initialValues: {
      bankName: bankingDetail?.bankName,
      branchNumber: bankingDetail?.branchNumber,
      accountName: bankingDetail?.accountName,
      accountNumber: bankingDetail?.accountNumber,
      comfirmAccountNumber: bankingDetail?.accountNumber,
    },
    validationSchema: bankingDetailSchema,
    enableReinitialize: true,
    onSubmit: UpdateBankingDetails,
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={ThemeStyles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshingPayments}
            onRefresh={RefreshPayments}
          />
        }>
        {/* Available Balance Section */}
        <View style={{padding: 16}}>
          <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 8}}>
            Available Balance
          </Text>
          <Text style={{fontSize: 18}}>{availableBalance}</Text>
        </View>

        {/* Payment Summary */}
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
        />

        {/* Action Buttons */}
        <CustomButton3
          title="Payment History"
          onPress={() => navigation.navigate('TransporterPaymentHistory')}
        />
        <CustomButton3
          title="Banking Details"
          onPress={() => {
            BankList();
            GetBanking();
          }}
        />
        <CustomButton1
          title="WITHDRAW FUNDS"
          action="positive"
          size="sm"
          styles={{alignSelf: 'center', marginTop: 16}}
        />
        <CustomButton2 title="Switch User Role" onPress={SwitchUserRole} />
      </ScrollView>
      <BankingDetailModal
        ShowModal={showModal}
        DropdownIsFocus={isFocus}
        BankList={bankList}
        BranchNumberIsInvalid={!!bankingFormik.errors.branchNumber}
        BranchNumberErrorText={bankingFormik.errors.branchNumber}
        BranchNumberValue={bankingFormik.values.branchNumber}
        BranchNumberOnChangeText={bankingFormik.handleChange('branchNumber')}
        BranchNumberOnBlur={bankingFormik.handleBlur('branchNumber')}
        AccountNameIsInvalid={!!bankingFormik.errors.accountName}
        AccountNameErrorText={bankingFormik.errors.accountName}
        AccountNameValue={bankingFormik.values.accountName}
        AccountNameOnChangeText={bankingFormik.handleChange('accountName')}
        AccountNameOnBlur={bankingFormik.handleBlur('accountName')}
        AccountNumberIsInvalid={!!bankingFormik.errors.accountNumber}
        AccountNumberErrorText={bankingFormik.errors.accountNumber}
        AccountNumberValue={bankingFormik.values.accountNumber}
        AccountNumberOnChangeText={bankingFormik.handleChange('accountNumber')}
        AccountNumberOnBlur={bankingFormik.handleBlur('accountNumber')}
        ComfirmAccountNumberIsInvalid={
          !!bankingFormik.errors.comfirmAccountNumber
        }
        ComfirmAccountNumberErrorText={
          bankingFormik.errors.comfirmAccountNumber
        }
        ComfirmAccountNumberValue={bankingFormik.values.comfirmAccountNumber}
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
          bankingFormik.resetForm();
        }}
        HandleSubmit={() => {
          if (bankName !== '') {
            bankingFormik.handleSubmit();
          } else {
            setIsFocus(true);
            toast.show({
              placement: 'top',
              render: ({id}) => (
                <Toast
                  nativeID={`toast-${id}`}
                  action="attention"
                  variant="outline">
                  <VStack space="xs">
                    <ToastTitle>Please select a bank to proceed</ToastTitle>
                  </VStack>
                </Toast>
              ),
            });
          }
        }}
      />
    </SafeAreaView>
  );
};

export default TransporterPaymentsScreen;
