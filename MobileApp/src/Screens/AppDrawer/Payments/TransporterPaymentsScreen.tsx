// AuthContext and Dependencies
import React, {useContext, useEffect, useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Linking, RefreshControl, ScrollView} from 'react-native';
import {CustomButton1, CustomButton2} from '../../../Components/Buttons';
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
  Heading,
} from '@gluestack-ui/themed';
import {PaymentCard} from '../../../Components/Cards/PaymentCards';
import BankingDetailModal from '../../../Components/Modals/BankingDetailModal';
import {useFormik} from 'formik';
import {
  AddBankingDetail,
  GetBankingDetail,
  GetBanksList,
  UpdateBankingDetail,
} from '../../../Controllers/BankingDetailController';
import {BankingDetail} from '../../../Models/BankingDetail';
import * as yup from 'yup';
import NotificationToast from '../../../Components/Toasts/NotificationToast';
import {ArrowRight} from 'lucide-react-native';

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
  const [isBankNameFocus, setIsBankNameFocus] = useState(false);
  const [isAccountTypeFocus, setIsAccountTypeFocus] = useState(false);
  const [isDocumentTypeFocus, setIsDocumentTypeFocus] = useState(false);
  const [accountType, setAccountType] = useState('');
  const [documentType, setDocumentType] = useState('');
  const UpdateBankingDetails = async (values: any) => {
    setShowModal(false);
    try {
      const updatedDetail = new BankingDetail(
        bankName,
        values.branchNumber.trim(),
        values.accountName.trim(),
        values.accountNumber.trim(),
        auth.GetBusinessId(), /// oooo nice ima steal this
        paystackBankId,
        paystackBankCode,
        accountType, //These are from the drop down
        documentType, // these are from the drop down
        values.documentNumber.trim(),
        bankingDetail?.bankingDetailId, //this would be the place where you put the bankingDetailId
        bankingDetail?.recipientCode, //this where yould put you recipient number
      ); //where do i get them??

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
  // Utility Functions
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
      throw new Error(error.response?.data);
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
      throw new Error(error.response?.data);
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
      throw new Error(error.response?.data);
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
            bankingDetailData.accountType,
            bankingDetailData.documentType,
            bankingDetailData.documentNumber,
            bankingDetailData.RecipientCode,
            bankingDetailData.BankingDetailId,
          ),
        );
        setShowModal(true);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const RefreshPayments = useCallback(() => {
    setRefreshingPayments(true);
    GetPaymentValues().finally(() => setRefreshingPayments(false));
  }, []);
  const accountTypeList = [
    {label: 'Business', value: 'business'},
    {label: 'Personal', value: 'personal'},
  ];

  const fullDocumentTypeList = [
    {label: 'Identity Number', value: 'identityNumber'},
    {label: 'Passport Number', value: 'passportNumber'},
    {
      label: 'Business Registration Number',
      value: 'businessRegistrationNumber',
    },
  ];

  // Filter documentTypeList based on accountType
  const documentTypeList =
    accountType === 'business'
      ? fullDocumentTypeList.filter(
          item => item.value === 'businessRegistrationNumber',
        )
      : fullDocumentTypeList.filter(
          item => item.value !== 'businessRegistrationNumber',
        );
  useEffect(() => {
    // Reset documentType if it’s no longer valid based on accountType
    if (
      accountType === 'business' &&
      documentType !== 'businessRegistrationNumber'
    ) {
      setDocumentType('');
    } else if (
      accountType === 'personal' &&
      documentType === 'businessRegistrationNumber'
    ) {
      setDocumentType('');
    }
  }, [accountType]);

  useEffect(() => {
    GetPaymentValues();
    Linking.addEventListener('url', RefreshPayments);
  }, [reference]);
  const SubmitBankingDetail = async (values: any) => {
    // setIsLoading(true);
    let bankingDetail = new BankingDetail(
      bankName,
      values.branchNumber.trim(),
      values.accountName.trim(),
      values.accountNumber.trim(),
      auth.GetBusinessId(),
      paystackBankId,
      paystackBankCode,
      accountType,
      documentType,
      values.documentNumber.trim(),
      '',
      '',
    );

    await AddBankingDetail(bankingDetail)
      .then((response: any) => {
        if (response == 200) {
          setShowModal(false);

          bankingFormik.resetForm();
        } else {
        }
      })
      .catch((error: any) => {
        // setIsLoading(false);
        // FaliureToast();
        throw new Error(error);
      });
  };

  const bankingDetailInitialValues = {
    branchNumber: '',
    accountName: '',
    accountNumber: '',
    comfirmAccountNumber: '',
    documentNumber: '',
  };
  const bankingDetailSchema = yup.object().shape({
    branchNumber: yup
      .string()
      // .matches(/^(\$?[1-9]\d{0,2}(,\d{3})*|\d+)?(\.\d{1,2})?$/, 'not valid')
      .min(5, 'Branch number should be more than 5 digits')
      .max(10, 'Branch number should not be more than 10 digits')
      .required('is required'),
    accountName: yup
      .string() // ayt
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
    documentNumber: yup
      .string()
      .min(2, 'Document number too short')
      .max(50, 'Document number too long')
      .required('is required'),
  });
  // Formik Configuration
  const bankingFormik = useFormik({
    initialValues: bankingDetailInitialValues,
    validationSchema: bankingDetailSchema,
    onSubmit: (values, {resetForm}) => {
      SubmitBankingDetail(values);
    },
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
        <View>
          {/* Available Balance Section */}
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 16,
              marginBottom: 32,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 4}}>
              Available Balance
            </Text>
            <Heading style={{fontSize: 40, paddingTop: 16}}>
              {availableBalance}
            </Heading>
          </View>

          {/* Payment Summary */}
          <View
            style={{
              paddingHorizontal: 16,
            }}>
            <PaymentCard
              PaymentsType="Expected"
              NumberOfPayments={expectedPaymentsSummary.NumberOfPayments || '0'}
              Amount={expectedPaymentsSummary.Amount}
              CurrentPeriod={expectedPaymentsSummary.CurrentPeriod}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 16,
            }}>
            <PaymentCard
              PaymentsType="Declined"
              NumberOfPayments={declinedPaymentsSummary.NumberOfPayments || '0'}
              Amount={declinedPaymentsSummary.Amount}
              CurrentPeriod={declinedPaymentsSummary.CurrentPeriod}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 16,
            }}>
            {/* Action Buttons */}
            <CustomButton2
              size="md"
              title="Payment History"
              onPress={() => navigation.navigate('TransporterPaymentHistory')}
              buttonIcon={ArrowRight}
              styles={{borderWidth: 0, paddingLeft: 0}}
              textColor="#525252"
              color="#525252"
              buttonIcontyles={{marginLeft: 'auto'}}
            />

            <CustomButton2
              size="md"
              title="Banking Details"
              onPress={() => {
                BankList();
                GetBanking();
              }}
              buttonIcon={ArrowRight}
              styles={{borderWidth: 0, paddingLeft: 0, marginBottom: 32}}
              textColor="#525252"
              color="#525252"
              buttonIcontyles={{marginLeft: 'auto'}}
            />
            <CustomButton1
              styles={{
                backgroundColor: '#e8eef2',
                width: '70%',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              textColor="#000000"
              size="md"
              title="Transfer to bank"
            />

            <CustomButton2 title="Switch User Role" onPress={SwitchUserRole} />
          </View>
        </View>
      </ScrollView>
      <BankingDetailModal
        ShowModal={showModal}
        DropdownIsFocus={isBankNameFocus}
        DropdownIsFocusAccount={isAccountTypeFocus}
        DropdownIsFocusDocument={isDocumentTypeFocus}
        BankList={bankList}
        AccountTypeList={accountTypeList}
        DocumentTypeList={documentTypeList}
        SelectedBankName={bankName}
        SelectedAccountType={accountType}
        SelectedDocumentType={documentType}
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
        AccountNumberOnChangeText={bankingFormik.handleChange('accountNumber')}
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
        DocumentNumberIsInvalid={!!bankingFormik.errors.documentNumber}
        DocumentNumberErrorText={bankingFormik?.errors?.documentNumber}
        DocumentNumberValue={bankingFormik.values?.documentNumber}
        DocumentNumberOnChangeText={bankingFormik.handleChange(
          'documentNumber',
        )}
        DocumentNumberOnBlur={bankingFormik.handleBlur('documentNumber')}
        OnFocusBankingDetailDropdown={() => setIsBankNameFocus(true)}
        OnBlurBankingDetailDropdown={() => setIsBankNameFocus(false)}
        OnChangeBankingDetailDropdown={(item: any) => {
          setBankName(item.name);
          setPaystackBankId(item.id);
          setPaystackBankCode(item.code);
          setIsBankNameFocus(false);
        }}
        OnFocusAccountTypeDropdown={() => setIsAccountTypeFocus(true)}
        OnBlurAccountTypeDropdown={() => setIsAccountTypeFocus(false)}
        OnChangeAccountTypeDropdown={(item: any) => {
          setIsAccountTypeFocus(false);
          setAccountType(item.value);
        }}
        OnFocusDocumentTypeDropdown={() => setIsDocumentTypeFocus(true)}
        OnBlurDocumentTypeDropdown={() => setIsDocumentTypeFocus(false)}
        OnChangeDocumentTypeDropdown={(item: any) => {
          setIsDocumentTypeFocus(false);
          setDocumentType(item.value);
        }}
        CloseBankingDetailModalButtonOnPress={() => {
          setShowModal(false);
          bankingFormik.resetForm();
        }}
        HandleSubmit={() => {
          if (bankName === '') {
            setIsBankNameFocus(true);
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
          } else if (accountType === '') {
            setIsAccountTypeFocus(true);
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
                      <ToastTitle>
                        Please select an account type to proceed
                      </ToastTitle>
                    </VStack>
                  </Toast>
                );
              },
            });
          } else if (documentType === '') {
            setIsDocumentTypeFocus(true);
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
                      <ToastTitle>
                        Please select a document type to proceed
                      </ToastTitle>
                    </VStack>
                  </Toast>
                );
              },
            });
          } else {
            bankingFormik.handleSubmit();
          }
        }}
      />
    </SafeAreaView>
  );
};

export default TransporterPaymentsScreen;
