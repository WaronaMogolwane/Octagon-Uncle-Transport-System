import {GestureResponderEvent, ScrollView, View} from 'react-native';
import React, {useContext, useState} from 'react';
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
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {BusinessDetailForm} from '../../Components/Forms/BusinessDetailForm';
import {AddBusinessDetail} from '../../Controllers/BusinessDetailController';
import {
  CustomFormControlInput,
  CustomFormControlInputNumber,
} from '../../Components/CustomFormInput';
import {BankingDetail} from '../../Models/BankingDetail';
import {AddBankingDetail} from '../../Controllers/BankingDetailController';
import {Auth} from '../../Classes/Auth';
import {AuthContext} from '../../Services/AuthenticationService';

const BusinessDetailsScreen = ({navigation}: any) => {
  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));

  const toast = useToast();
  const ref = React.useRef(null);

  const [showModal, setShowModal] = useState(true);

  // const businessId = 'w8728321-394f-466b-833e-ea9dd60ba000';
  const businessId = auth.GetBusinessId();

  const businessDetailHelper = async (values: any) => {
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
          //On success this code runs
          formik.resetForm();
          //navigation.push('Home');
          successToast();
          navigation.navigate('Home');
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

  const successToast = () => {
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

  const BankingDetailModal = () => {
    return (
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(true);
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
              <CustomFormControlInput
                labelText="Bank Name"
                errorText={bankingFormik?.errors?.bankName}
                isInvalid={!!bankingFormik.errors.bankName}
                isDisabled={false}
                type="text"
                value={bankingFormik.values?.bankName}
                onChangeText={bankingFormik.handleChange('bankName')}
                isRequired={false}
                onBlur={bankingFormik.handleBlur('bankName')}
              />
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
            </View>
            <View>
              <Button
                size="sm"
                action="positive"
                borderWidth="$0"
                onPress={() => {
                  bankingFormik.handleSubmit();
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
      values.businessId,
    );

    console.log(bankingDetail);

    await AddBankingDetail(bankingDetail)
      .then((response: any) => {
        if (response == 200) {
          console.log('Submit');
        } else {
          console.log('It didnt work');
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const bankingDetailSchema = yup.object().shape({
    // bankName: yup
    //   .string()
    //   .min(2, 'Business name too Short!')
    //   .max(50, 'Business name too Long!')
    //   .required(),
    // branchNumber: yup
    //   .string()
    //   .matches(
    //     /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
    //     'not valid',
    //   )
    //   .min(10, 'Business phone number should be 10 digits')
    //   .max(10, 'Business phone number should be 10 digits')
    //   .required(),
    // accountName: yup
    //   .string()
    //   .min(2, 'Address too Short!')
    //   .max(100, 'Address too Long!')
    //   .required(),
    // accountNumber: yup
    //   .string()
    //   .min(2, 'Too Short!')
    //   .max(100, 'Too Long!')
    //   .required(),
  });

  const bankingDetailInitialValues = {
    bankName: '',
    branchNumber: '',
    accountName: '',
    accountNumber: '',
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
    city: yup.string().min(2, 'City too Short!').max(50, 'City too Long!'),
    province: yup
      .string()
      .min(2, 'Province too Short!')
      .max(50, 'Province too Long!')
      .required(),
    postalcode: yup
      .number()
      .required()
      .positive()
      .integer()
      .min(4, 'Postal code too Short!')
      .max(4, 'Postal code too Long!')
      .required(),
    // postalcode: yup
    //   .string()
    //   .min(4, 'Postal code too Short!')
    //   .max(4, 'Postal code too Long!')
    //   .required('Required'),
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
      businessDetailHelper(values);
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
