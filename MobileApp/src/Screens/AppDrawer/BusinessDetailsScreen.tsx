import {GestureResponderEvent, ScrollView, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
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
  AssignPassengerScreenStyles,
  ThemeStyles,
} from '../../Stylesheets/GlobalStyles';
import {BusinessDetailForm} from '../../Components/Forms/BusinessDetailForm';
import {AddBusinessDetail} from '../../Controllers/BusinessDetailController';
import {
  CustomFormControlInput,
  CustomFormControlInputNumber,
} from '../../Components/CustomFormInput';
import {BankingDetail} from '../../Models/BankingDetail';
import {
  AddBankingDetail,
  GetBanksList,
  ValidateAccount,
} from '../../Controllers/BankingDetailController';
import {Auth} from '../../Classes/Auth';
import {AuthContext} from '../../Services/AuthenticationService';
import {Dropdown} from 'react-native-element-dropdown';

const BusinessDetailsScreen = ({navigation}: any) => {
  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));

  const toast = useToast();
  const ref = React.useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusAccount, setIsFocusAcccount] = useState(false);
  const [isFocusDocument, setIsFocusDocument] = useState(false);
  const [bankName, setBankName] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [bankId, setBankId] = useState('');
  const [accountType, setAccountType] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentLabel, setDocumentLabel] = useState('');

  const [bankList, setBankList] = useState(['']);

  useEffect(() => {
    BankList();
  }, []);

  const businessId = auth.GetUserId();

  const accountData = [
    {accountType: 'Personal', value: 'personal'},
    {accountType: 'Business', value: 'business'},
  ];

  const documentData = [
    {document: 'Identiy Card', value: 'identityNumber'},
    {document: 'Passport', value: 'passportNumber'},
    {document: 'Business Rgistration', value: 'businessRegistrationNumber '},
  ];

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

  const BusinessDetailHelper = async (values: any) => {
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
        } else {
          //On faluire this code runs
          toast.show({
            placement: 'top',
            render: ({id}) => {
              const toastId = 'toast-' + id;
              return (
                <Toast nativeID={toastId} action="attention" variant="outline">
                  <VStack space="xs">
                    <ToastTitle>Something went wrong</ToastTitle>
                    <ToastDescription>
                      Please check your internt and try again. If the problem
                      persists contact support.
                    </ToastDescription>
                  </VStack>
                </Toast>
              );
            },
          });
        }
      })
      .catch(error => console.error(error));
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

  const BankingDetailModal = () => {
    return (
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          formik.resetForm();
        }}
        finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Banking Details</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <View style={{marginBottom: 20}}>
              <Text>Please enter you banking details below.</Text>
            </View>
            <View>
              <View style={{width: '90%', paddingBottom: 20}}>
                <Dropdown
                  style={[
                    AssignPassengerScreenStyles.dropdown,
                    isFocus && {borderColor: 'red'},
                  ]}
                  placeholderStyle={
                    AssignPassengerScreenStyles.placeholderStyle
                  }
                  selectedTextStyle={
                    AssignPassengerScreenStyles.selectedTextStyle
                  }
                  inputSearchStyle={
                    AssignPassengerScreenStyles.inputSearchStyle
                  }
                  iconStyle={AssignPassengerScreenStyles.iconStyle}
                  data={bankList}
                  search={true}
                  maxHeight={300}
                  labelField="bankName"
                  valueField="bankName"
                  placeholder={!isFocus ? 'Select bank name' : 'tap here...'}
                  searchPlaceholder="Search..."
                  value={bankList}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item: any) => {
                    setBankName(item.bankName);
                    setBankId(item.bankId);
                    setBankCode(item.bankCode);
                    setIsFocus(false);
                  }}
                />
              </View>
            </View>
            <View>
              <CustomFormControlInputNumber
                labelText="Branch Number"
                isInvalid={!!bankingFormik.errors.branchNumber}
                errorText={bankingFormik?.errors?.branchNumber}
                isDisabled={false}
                type="text"
                value={bankingFormik.values?.branchNumber}
                onChangeText={bankingFormik.handleChange('branchNumber')}
                isRequired={false}
                onBlur={bankingFormik.handleBlur('branchNumber')}
              />

              <View style={{width: '90%', paddingBottom: 20}}>
                <Dropdown
                  style={[
                    AssignPassengerScreenStyles.dropdown,
                    isFocusAccount && {borderColor: 'red'},
                  ]}
                  placeholderStyle={
                    AssignPassengerScreenStyles.placeholderStyle
                  }
                  selectedTextStyle={
                    AssignPassengerScreenStyles.selectedTextStyle
                  }
                  inputSearchStyle={
                    AssignPassengerScreenStyles.inputSearchStyle
                  }
                  iconStyle={AssignPassengerScreenStyles.iconStyle}
                  data={accountData}
                  search={false}
                  maxHeight={300}
                  labelField="accountType"
                  valueField="value"
                  placeholder={
                    !isFocusAccount ? 'Select account type' : 'tap here...'
                  }
                  value={accountType}
                  onFocus={() => setIsFocusAcccount(true)}
                  onBlur={() => setIsFocusAcccount(false)}
                  onChange={(item: any) => {
                    setAccountType(item.value);
                    setIsFocusAcccount(false);
                  }}
                />
              </View>
              <CustomFormControlInput
                labelText="Account Name"
                errorText={bankingFormik?.errors?.accountName}
                isInvalid={!!bankingFormik.errors.accountName}
                isDisabled={false}
                type="text"
                value={bankingFormik.values?.accountName}
                onChangeText={bankingFormik.handleChange('accountName')}
                isRequired={false}
                onBlur={bankingFormik.handleBlur('accountName')}
              />
              <CustomFormControlInputNumber
                labelText="Account Number"
                errorText={bankingFormik?.errors?.accountNumber}
                isInvalid={!!bankingFormik.errors.accountNumber}
                isDisabled={false}
                type="text"
                value={bankingFormik.values?.accountNumber}
                onChangeText={bankingFormik.handleChange('accountNumber')}
                isRequired={false}
                onBlur={bankingFormik.handleBlur('accountNumber')}
              />

              <CustomFormControlInputNumber
                labelText="Comfirm Account Number"
                errorText={bankingFormik?.errors?.comfirmAccountNumber}
                isInvalid={!!bankingFormik.errors.comfirmAccountNumber}
                isDisabled={false}
                type="text"
                value={bankingFormik.values?.comfirmAccountNumber}
                onChangeText={bankingFormik.handleChange(
                  'comfirmAccountNumber',
                )}
                isRequired={false}
                onBlur={bankingFormik.handleBlur('comfirmAccountNumber')}
              />
            </View>
            <View>
              <Button
                size="sm"
                action="positive"
                borderWidth="$0"
                onPress={() => {
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
                              <ToastTitle>
                                Please select a bank to proceed
                              </ToastTitle>
                            </VStack>
                          </Toast>
                        );
                      },
                    });
                  }
                }}>
                <ButtonText>Submit</ButtonText>
              </Button>
            </View>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const SubmitBankingDetail = async (values: any) => {
    let bankingDetail = new BankingDetail(
      values.bankName.trim(),
      values.branchNumber.trim(),
      values.accountName.trim(),
      values.accountNumber.trim(),
      businessId,
      bankId,
      bankCode,
    );

    await AddBankingDetail(bankingDetail)
      .then((response: any) => {
        if (response == 200) {
          //On success this code runs
          formik.resetForm();
          setShowModal(false);
          SuccessToast();
          navigation.navigate('Home');
        } else {
          FaliureToast();
        }
      })
      .catch((error: any) => {
        console.log(error);
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
  });

  const bankingDetailInitialValues = {
    bankName: '',
    branchNumber: '',
    accountName: '',
    accountNumber: '',
    comfirmAccountNumber: '',
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
        <View style={{paddingBottom: 15, paddingTop: 15}}>
          {BankingDetailModal()}
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
