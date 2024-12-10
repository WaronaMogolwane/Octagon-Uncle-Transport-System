import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import * as yup from 'yup';
import {
  CustomFormControlInput,
  CustomFormControlInputNumber,
} from '../../../Components/CustomFormInput';
import {useFormik} from 'formik';
import {BankingDetail} from '../../../Models/BankingDetail';
import {
  GetBankingDetail,
  GetBanksList,
  UpdateBankingDetail,
} from '../../../Controllers/BankingDetailController';
import {Auth} from '../../../Classes/Auth';
import {AuthContext} from '../../../Services/AuthenticationService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ButtonIcon,
  ButtonText,
  Button,
  Heading,
  ToastTitle,
  Toast,
  useToast,
  VStack,
} from '@gluestack-ui/themed';
import {ArrowLeftIcon, FilePen} from 'lucide-react-native';
import {AssignPassengerScreenStyles} from '../../../Stylesheets/GlobalStyles';
import {Dropdown} from 'react-native-element-dropdown';

export default function EditBankingDetailsScreen({navigation}: any) {
  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const [bankingDetail, setBankingDetail] = useState<BankingDetail>();
  const [IsLoading, setIsLoading] = useState(false);
  const [bankList, setBankList] = useState(['']);
  const [isFocus, setIsFocus] = useState(false);

  const businessId = auth.GetBusinessId();
  const toast = useToast();

  useEffect(() => {
    if (!bankingDetail) {
      setIsLoading(true);
      GetBankingDetails();
    }
  }, [bankingDetail]);

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

  const GetBankingDetails = async () => {
    await GetBankingDetail(businessId)
      .then(result => {
        if (result[1] == 200) {
          setBankingDetail(
            new BankingDetail(
              result[0].result[0].BankName,
              String(result[0].result[0].BranchNumber),
              result[0].result[0].AccountName,
              String(result[0].result[0].AccountNumber),
              result[0].result[0].BusinessId,
              result[0].result[0].PaystackId,
              result[0].result[0].PaystackCode,
              result[0].result[0].BankingDetailId,
            ),
          );
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch((error: any) => {
        console.error(error);
        setIsLoading(false);
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

  let bankingDetailInitialValues = {
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
      //   SubmitBankingDetail(values);
    },
  });

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

  const SubmitBankingDetail = async (values: any) => {
    setIsLoading(true);
    let bankingDetail = new BankingDetail(
      values.bankName,
      values.branchNumber.trim(),
      values.accountName.trim(),
      values.accountNumber.trim(),
      businessId,
      values.paystackBankId,
      values.paystackBankCode,
      '',
    );

    await UpdateBankingDetail(bankingDetail)
      .then((response: any) => {
        if (response == 200) {
          //On success this code runs
          // formik.resetForm();
          // setShowModal(false);
          // setIsLoading(false);
          SuccessToast();
          // SetSession(authToken!);
          // formik.resetForm();
        } else {
          setIsLoading(false);
          FaliureToast();
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#e8f0f3', alignItems: 'center'}}>
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

      <Heading mb="$3">Update your banking details below...</Heading>

      <Dropdown
        style={[
          AssignPassengerScreenStyles.dropdown,
          isFocus && {borderColor: 'red'},
        ]}
        placeholderStyle={AssignPassengerScreenStyles.placeholderStyle}
        selectedTextStyle={AssignPassengerScreenStyles.selectedTextStyle}
        inputSearchStyle={AssignPassengerScreenStyles.inputSearchStyle}
        iconStyle={AssignPassengerScreenStyles.iconStyle}
        data={bankList}
        search={true}
        maxHeight={300}
        labelField="name"
        valueField="name"
        placeholder={!isFocus ? 'Select bank name' : 'tap here...'}
        searchPlaceholder="Search..."
        value={bankList}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: any) => {
          // setBankName(item.name);
          // setPaystackBankId(item.id);
          // setPaystackBankCode(item.code);
          setIsFocus(false);
        }}
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
        onChangeText={bankingFormik.handleChange('comfirmAccountNumber')}
        isRequired={false}
        onBlur={bankingFormik.handleBlur('comfirmAccountNumber')}
      />

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <View style={{padding: 5}}>
            <Button
              size="md"
              variant="solid"
              action="secondary"
              isDisabled={false}
              isFocusVisible={false}
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <ButtonIcon as={ArrowLeftIcon} />
              <ButtonText>Back</ButtonText>
            </Button>
          </View>
          <View style={{padding: 5}}>
            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              onPress={
                bankingFormik.handleSubmit as (
                  values:
                    | GestureResponderEvent
                    | React.FormEvent<HTMLFormElement>
                    | undefined,
                ) => void
              }>
              <FilePen size={20} strokeWidth={1} color={'#FFFFFF'} />
              <ButtonText>Update</ButtonText>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
