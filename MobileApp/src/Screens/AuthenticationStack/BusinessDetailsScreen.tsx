import {
  ActivityIndicator,
  GestureResponderEvent,
  ScrollView,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
} from '@gluestack-ui/themed';
import {BusinessDetail} from '../../Models/BusinessDetail';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {
  BusinessDetailsScreenStyles,
  ThemeStyles,
} from '../../Stylesheets/GlobalStyles';
import {BusinessDetailForm} from '../../Components/Forms/BusinessDetailForm';
import {AddBusinessDetail} from '../../Controllers/BusinessDetailController';
import {BankingDetail} from '../../Models/BankingDetail';
import {
  AddBankingDetail,
  GetBanksList,
} from '../../Controllers/BankingDetailController';
import {Auth} from '../../Classes/Auth';
import {AuthContext} from '../../Services/AuthenticationService';
import {useStorageState} from '../../Services/StorageStateService';
import BankingDetailModal from '../../Components/Modals/BankingDetailModal';

const BusinessDetailsScreen = ({navigation, route}: any) => {
  const {sessionId} = route.params;
  // const sessionId =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIzZTc0YWUxZC0zYTMxLTRkZTMtYTdmYS0yOGZhMGFhOWYxY2YiLCJVc2VyUm9sZSI6IjEiLCJFbWFpbCI6Ik5ld2VtYWlsQGdtYWlsLmNvbSIsIkJ1c2luZXNzSWQiOiIzZTc0YWUxZC0zYTMxLTRkZTMtYTdmYS0yOGZhMGFhOWYxY2YiLCJEYXRlQ3JlYXRlZCI6IjUvNy8yMDI1LCAyOjU3OjAzIFBNIiwiaWF0IjoxNzQ2NjIyNjIzfQ.xCK5i8kmzikSuu0KMKvnsg57gtsz7iBG3E9OrbU1G3M';

  const {session, isLoading, SetSession}: any = useContext(AuthContext);
  const [[tokenIsLoading, authToken], setAuthToken] =
    useStorageState('authToken');

  const [auth, setAuth] = useState(new Auth(sessionId));

  const toast = useToast();

  const [showModal, setShowModal] = useState(true);
  const [isBankNameFocus, setIsBankNameFocus] = useState(false);
  const [isAccountTypeFocus, setIsAccountTypeFocus] = useState(false);
  const [isDocumentTypeFocus, setIsDocumentTypeFocus] = useState(false);
  const [bankName, setBankName] = useState('');
  const [paystackBankCode, setPaystackBankCode] = useState('');
  const [paystackBankId, setPaystackBankId] = useState('');
  const [accountType, setAccountType] = useState('');
  const [documentType, setDocumentType] = useState('');

  const [IsLoading, setIsLoading] = useState(false);

  const [bankList, setBankList] = useState(['']);

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
    BankList();
  }, []);

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

  const businessId = auth.GetBusinessId();

  const BankList = async () => {
    await GetBanksList().then((result: any) => {
      if (result.length != 0) {
        setBankList(result);
      } else {
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

  const BusinessDetailHelper = async (values: any) => {
    setIsLoading(true);
    let businessDetail = new BusinessDetail(
      '',
      values.businessName.trim(),
      values.businessPhoneNumber.trim(),
      values.addressline1.trim(),
      values.addressline2.trim(),
      values.suburb.trim(),
      values.city.trim(),
      values.province.trim(),
      values.postalcode.trim(),
      businessId,
    );

    await AddBusinessDetail(businessDetail)
      .then((r: any) => {
        if (r == 200) {
          setShowModal(true);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.show({
            placement: 'top',
            render: ({id}) => {
              const toastId = 'toast-' + id;
              return (
                <Toast nativeID={toastId} action="attention" variant="outline">
                  <VStack space="xs">
                    <ToastTitle>Something went wrong</ToastTitle>
                    <ToastDescription>
                      Please check your internet and try again. If the problem
                      persists contact support.
                    </ToastDescription>
                  </VStack>
                </Toast>
              );
            },
          });
        }
      })
      .catch(error => {
        throw new Error(error);
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
                Details were not saved successfully. Please try again.
              </ToastTitle>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const SubmitBankingDetail = async (values: any) => {
    setIsLoading(true);
    let bankingDetail = new BankingDetail(
      bankName,
      values.branchNumber.trim(),
      values.accountName.trim(),
      values.accountNumber.trim(),
      businessId,
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
        // if (response == 200) {
        //   setShowModal(false);
        //   setIsLoading(false);
        //   SuccessToast();
        //   SetSession(authToken!);
        //   bankingFormik.resetForm();
        //   formik.resetForm();
        // } else {
        //   setIsLoading(false);
        //   FaliureToast();
        // }
      })
      .catch((error: any) => {
        setIsLoading(false);
        FaliureToast();
        throw new Error(error);
      });
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
    documentNumber: yup
      .string()
      .min(2, 'Document number too short')
      .max(50, 'Document number too long')
      .required('is required'),
  });

  const bankingDetailInitialValues = {
    branchNumber: '',
    accountName: '',
    accountNumber: '',
    comfirmAccountNumber: '',
    documentNumber: '',
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

  const bankingFormik = useFormik({
    initialValues: bankingDetailInitialValues,
    validationSchema: bankingDetailSchema,
    onSubmit: (values, {resetForm}) => {
      SubmitBankingDetail(values);
    },
  });

  const formik = useFormik({
    initialValues: businessDetailsInitialValues,
    validationSchema: businessDetailSchema,
    onSubmit: (values, {resetForm}) => {
      BusinessDetailHelper(values);
    },
  });

  return (
    <ScrollView>
      <SafeAreaView style={ThemeStyles.container}>
        {IsLoading ? (
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff75',
              zIndex: 100,
            }}>
            <ActivityIndicator size="large" />
            <Text>Working</Text>
          </View>
        ) : null}

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
            formik.resetForm();
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
        <View style={BusinessDetailsScreenStyles.container}>
          <BusinessDetailForm
            showButton={true}
            buttonText="Submit Business Details"
            businessNameIsInvalid={!!formik.errors.businessName}
            businessNameOnChangeText={formik.handleChange('businessName')}
            businessNameErrorText={formik?.errors?.businessName}
            businessNameOnBlur={formik.handleBlur('businessName')}
            businessNameValue={formik.values?.businessName}
            businessPhoneNumberIsInvalid={!!formik.errors.businessPhoneNumber}
            businessPhoneNumberOnChangeText={formik.handleChange(
              'businessPhoneNumber',
            )}
            businessPhoneNumberErrorText={formik?.errors?.businessPhoneNumber}
            businessPhoneNumberOnBlur={formik.handleBlur('businessPhoneNumber')}
            businessPhoneNumberValue={formik.values?.businessPhoneNumber}
            addressline1IsInvalid={!!formik.errors.addressline1}
            addressline1OnChangeText={formik.handleChange('addressline1')}
            addressline1ErrorText={formik?.errors?.addressline1}
            addressline1OnBlur={formik.handleBlur('addressline1')}
            addressline1Value={formik.values?.addressline1}
            addressline2IsInvalid={!!formik.errors.addressline2}
            addressline2OnChangeText={formik.handleChange('addressline2')}
            addressline2ErrorText={formik?.errors?.addressline2}
            addressline2OnBlur={formik.handleBlur('addressline2')}
            addressline2Value={formik.values?.addressline2}
            suburbIsInvalid={!!formik.errors.suburb}
            suburbOnChangeText={formik.handleChange('suburb')}
            suburbErrorText={formik?.errors?.suburb}
            suburbOnBlur={formik.handleBlur('suburb')}
            suburbValue={formik.values?.suburb}
            cityIsInvalid={!!formik.errors.city}
            cityOnChangeText={formik.handleChange('city')}
            cityErrorText={formik?.errors?.city}
            cityOnBlur={formik.handleBlur('city')}
            cityValue={formik.values?.city}
            provinceIsInvalid={!!formik.errors.province}
            provinceOnChangeText={formik.handleChange('province')}
            provinceErrorText={formik?.errors?.province}
            provinceOnBlur={formik.handleBlur('province')}
            provinceValue={formik.values?.province}
            postalCodeIsInvalid={!!formik.errors.postalcode}
            postalCodeOnChangeText={formik.handleChange('postalcode')}
            postalCodeErrorText={formik?.errors?.postalcode}
            postalCodeOnBlur={formik.handleBlur('postalcode')}
            postalCodeValue={formik.values?.postalcode}
            submitBusinessDetail={
              formik.handleSubmit as (
                values:
                  | GestureResponderEvent
                  | React.FormEvent<HTMLFormElement>
                  | undefined,
              ) => void
            }
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default BusinessDetailsScreen;
