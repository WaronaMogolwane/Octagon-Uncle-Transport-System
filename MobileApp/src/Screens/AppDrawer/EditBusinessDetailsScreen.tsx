import {
  GestureResponderEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  ArrowLeftIcon,
  ButtonIcon,
  Button,
  ButtonText,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
  ArrowUpIcon,
  Heading,
} from '@gluestack-ui/themed';
import {BusinessDetail} from '../../Models/BusinessDetail';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {BusinessDetailForm} from '../../Components/Forms/BusinessDetailForm';
import {
  GetBusinessDetail,
  GetBusinessDetailForParent,
  UpdateBusinessDetail,
} from '../../Controllers/BusinessDetailController';
import {FilePen} from 'lucide-react-native';
import {AuthContext} from '../../Services/AuthenticationService';
import {Auth} from '../../Classes/Auth';

const EditBusinessDetailsScreen = ({navigation}: any) => {
  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const toast = useToast();

  const businessId = 'w8728321-394f-466b-833e-ea9dd60ba000';
  const role: number = 2;
  //const businessId = auth.GetBusinessId();
  //const role: number = Number(auth.GetUserRole());

  const [businessDetail, setBusinessDetail] = useState<BusinessDetail>();
  const [email, setEmail] = useState('');
  const [transporterName, setTransporterName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!businessDetail) {
      GetBusiness();
    }
  }, [businessDetail]);

  const GetBusiness = async () => {
    if (role == 1) {
      await GetBusinessDetail(businessId).then((result: any) => {
        setBusinessDetail(
          new BusinessDetail(
            result.businessDetailId,
            result.businessName,
            result.businessPhoneNumber,
            result.addressLine1,
            result.addressLine2,
            result.suburb,
            result.province,
            result.city,
            result.postalCode,
            businessId,
          ),
        );
      });
    } else {
      await GetBusinessDetailForParent(businessId).then((result: any) => {
        setEmail(result.email);
        setTransporterName(result.name);
        setBusinessName(result.businessName);
        setBusinessPhoneNumber(result.businessPhoneNumber);
        setAddress(result.address);
      });
    }
  };

  const businessDetailHelper = async (values: any) => {
    let businessDetail = new BusinessDetail(
      '',
      values.businessName,
      values.businessPhoneNumber,
      values.addressline1,
      values.addressline2,
      values.suburb,
      values.city,
      values.province,
      values.postalCode,
      businessId,
    );

    await UpdateBusinessDetail(businessDetail)
      .then((response: any) => {
        console.log(response);
        if (response[1] == 200) {
          //On success this code runs
          if (response[0].result != 0) {
            SuccessToast();
            navigation.navigate('Profile');
          } else {
            FaliureToast('Information is already saved');
          }
        } else {
          //On faluire this code runs
          FaliureToast(
            'Please check your internt and try again. If the problem persists contact support.',
          );
        }
      })
      .catch(error => console.log(error));
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

  const FaliureToast = (desciption: string) => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="error" variant="outline">
            <VStack space="xs">
              <ToastTitle>Something went wrong</ToastTitle>
              <ToastDescription>
                Please check your internt and try again. If the problem persists
                contact support.
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const businessDetailSchema = yup.object().shape({
    businessName: yup
      .string()
      .min(2, 'Business name too Short!')
      .max(50, 'Business name too Long!'),
    businessPhoneNumber: yup
      .string()
      .matches(
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
        'not valid',
      ),
    // .min(10, 'Business phone number should be 10 digits')
    // .max(10, 'Business phone number should be 10 digits'),
    addressline1: yup
      .string()
      .min(2, 'Address too Short!')
      .max(100, 'Address too Long!'),
    addressline2: yup.string().min(2, 'Too Short!').max(100, 'Too Long!'),
    suburb: yup
      .string()
      .min(2, 'Suburb too Short!')
      .max(50, 'Suburb too  Long!'),
    city: yup.string().min(2, 'City too Short!').max(50, 'City too Long!'),
    province: yup
      .string()
      .min(2, 'Province too Short!')
      .max(50, 'Province too Long!'),
    postalCode: yup
      .string()
      .min(4, 'Postal code too Short!')
      .max(4, 'Postal code too Long!'),
  });

  const businessDetailsInitialValues = {
    businessName: businessDetail?.businessName,
    businessPhoneNumber: businessDetail?.businessPhoneNumber,
    addressLine1: businessDetail?.addressLine1,
    addressline2: businessDetail?.addressLine2,
    suburb: businessDetail?.suburb,
    city: businessDetail?.city,
    province: businessDetail?.province,
    postalCode: businessDetail?.postalCode,
  };

  const formik = useFormik({
    initialValues: businessDetailsInitialValues,
    validationSchema: businessDetailSchema,
    enableReinitialize: true,

    onSubmit: async (values, {resetForm}) => {
      await businessDetailHelper(values);
    },
  });

  return (
    <SafeAreaView style={role == 1 ? ThemeStyles.container : styles.container}>
      <ScrollView>
        {role == 1 ? (
          <View>
            <Heading mb="$3">Update business details below.</Heading>
            <View style={{paddingBottom: 15, paddingTop: 15}}>
              <BusinessDetailForm
                showButton={false}
                buttonText={'Update Details'}
                businessNameIsInvalid={!!formik.errors.businessName}
                businessNameOnChangeText={formik.handleChange('businessName')}
                businessNameErrorText={formik?.errors?.businessName}
                businessNameOnBlur={formik.handleBlur('businessName')}
                businessNameValue={formik.values?.businessName!}
                businessPhoneNumberIsInvalid={
                  !!formik.errors.businessPhoneNumber
                }
                businessPhoneNumberOnChangeText={formik.handleChange(
                  'businessPhoneNumber',
                )}
                businessPhoneNumberErrorText={
                  formik?.errors?.businessPhoneNumber
                }
                businessPhoneNumberOnBlur={formik.handleBlur(
                  'businessPhoneNumber',
                )}
                businessPhoneNumberValue={formik.values?.businessPhoneNumber!}
                addressline1IsInvalid={!!formik.errors.addressLine1}
                addressline1OnChangeText={formik.handleChange('addressline1')}
                addressline1ErrorText={formik?.errors?.addressLine1}
                addressline1OnBlur={formik.handleBlur('addressline1')}
                addressline1Value={formik.values?.addressLine1!}
                addressline2IsInvalid={!!formik.errors.addressline2}
                addressline2OnChangeText={formik.handleChange('addressline2')}
                addressline2ErrorText={formik?.errors?.addressline2}
                addressline2OnBlur={formik.handleBlur('addressline2')}
                addressline2Value={formik.values?.addressline2!}
                suburbIsInvalid={!!formik.errors.suburb}
                suburbOnChangeText={formik.handleChange('suburb')}
                suburbErrorText={formik?.errors?.suburb}
                suburbOnBlur={formik.handleBlur('suburb')}
                suburbValue={formik.values?.suburb!}
                cityIsInvalid={!!formik.errors.city}
                cityOnChangeText={formik.handleChange('city')}
                cityErrorText={formik?.errors?.city}
                cityOnBlur={formik.handleBlur('city')}
                cityValue={formik.values?.city!}
                provinceIsInvalid={!!formik.errors.province}
                provinceOnChangeText={formik.handleChange('province')}
                provinceErrorText={formik?.errors?.province}
                provinceOnBlur={formik.handleBlur('province')}
                provinceValue={formik.values?.province!}
                postalCodeIsInvalid={!!formik.errors.postalCode}
                postalCodeOnChangeText={formik.handleChange('postalCode')}
                postalCodeErrorText={formik?.errors?.postalCode}
                postalCodeOnBlur={formik.handleBlur('postalCode')}
                postalCodeValue={formik.values?.postalCode!}
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
                      formik.handleSubmit as (
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
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.body}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatar}>RN</Text>
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{businessName}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Transporter Name:</Text>
                <Text style={styles.infoText}>{transporterName}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Phone number:</Text>
                <Text style={styles.infoText}>{businessPhoneNumber}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Business Email:</Text>
                <Text style={styles.infoText}>{email}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Location:</Text>
                <Text style={styles.infoText}>{address}</Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 35,
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
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ECF0F3',
  },
  body: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 0.16,
  },
  avatar: {
    fontSize: 72,
    fontWeight: '700',
  },
  nameContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginRight: 8,
  },
  infoText: {
    fontSize: 16,
  },
});

export default EditBusinessDetailsScreen;
