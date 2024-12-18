import {
  ActivityIndicator,
  GestureResponderEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Modal,
  Image,
  ArrowLeftIcon,
  ButtonIcon,
  Button,
  ButtonText,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
  Heading,
  CloseIcon,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Icon,
} from '@gluestack-ui/themed';
import {BusinessDetail} from '../../../Models/BusinessDetail';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {
  AssignPassengerScreenStyles,
  ThemeStyles,
} from '../../../Stylesheets/GlobalStyles';
import {BusinessDetailForm} from '../../../Components/Forms/BusinessDetailForm';
import {
  GetBusinessDetail,
  GetBusinessDetailForParent,
  UpdateBusinessDetail,
} from '../../../Controllers/BusinessDetailController';
import {FilePen} from 'lucide-react-native';
import {AuthContext} from '../../../Services/AuthenticationService';
import {Auth} from '../../../Classes/Auth';
import {RestoreImageViaAsyncStorage} from '../../../Services/ImageStorageService';
import {Dropdown} from 'react-native-element-dropdown';
import {
  CustomFormControlInputNumber,
  CustomFormControlInput,
} from '../../../Components/CustomFormInput';
import {
  GetBankingDetail,
  GetBanksList,
  UpdateBankingDetail,
} from '../../../Controllers/BankingDetailController';
import {BankingDetail} from '../../../Models/BankingDetail';
import BankingDetailModal from '../../../Components/Modals/BankingDetailModal';

const EditBusinessDetailsScreen = ({navigation}: any) => {
  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const toast = useToast();
  const ref = React.useRef(null);

  const businessId = auth.GetBusinessId();
  const role: number = Number(auth.GetUserRole());

  const storageUrl: string =
    'https://f005.backblazeb2.com/file/Dev-Octagon-Uncle-Transport/';

  const [businessDetail, setBusinessDetail] = useState<BusinessDetail>();

  const [email, setEmail] = useState('');
  const [transporterName, setTransporterName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [bankName, setBankName] = useState('');
  const [paystackBankCode, setPaystackBankCode] = useState('');
  const [paystackBankId, setPaystackBankId] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [bankList, setBankList] = useState(['']);

  const [IsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!businessDetail) {
      setIsLoading(true);
      GetBusiness();
    }
  }, [businessDetail]);

  useEffect(() => {
    RestoreImageViaAsyncStorage().then((result: any) => {
      setProfileImage(result);
    });
  }, []);

  const GetBusiness = async () => {
    if (role == 1) {
      await GetBusinessDetail(businessId)
        .then((result: any) => {
          if (result[1] == 200) {
            setBusinessDetail(
              new BusinessDetail(
                result[0].businessDetailId,
                result[0].businessName,
                result[0].businessPhoneNumber,
                result[0].addressLine1,
                result[0].addressLine2,
                result[0].suburb,
                result[0].province,
                result[0].city,
                result[0].postalCode,
                businessId,
              ),
            );
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        })
        .catch((error: any) => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      await GetBusinessDetailForParent(businessId)
        .then((result: any) => {
          setEmail(result.email);
          setTransporterName(result.name);
          setBusinessName(result.businessName);
          setBusinessPhoneNumber(result.businessPhoneNumber);
          setAddress(result.address);
        })
        .catch((error: any) => {
          console.log(error);
          setIsLoading(false);
        });
      setIsLoading(false);
    }
  };

  const businessDetailHelper = async (values: any) => {
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
      values.postalCode.trim(),
      businessId,
    );

    await UpdateBusinessDetail(businessDetail)
      .then((response: any) => {
        if (response[1] == 200) {
          //On success this code runs
          if (response[0].result != 0) {
            SuccessToast();
            navigation.navigate('Profile');
            setIsLoading(false);
          } else {
            FaliureToast();
            setIsLoading(false);
          }
        } else {
          //On faluire this code runs
          FaliureToast();
          setIsLoading(false);
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

  const FaliureToast = () => {
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
      )
      .min(10, 'Business phone number should be 10 digits')
      .max(10, 'Business phone number should be 10 digits'),
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
    addressline1: businessDetail?.addressLine1,
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
    <SafeAreaView
      style={
        role == 1
          ? {
              ...{
                flex: 1,
                alignItems: 'center',
              },
            }
          : styles.container
      }>
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
      {role == 1 ? (
        <View
          style={{
            width: '100%',
            backgroundColor: '#e8f0f3',
          }}>
          <ScrollView style={{width: '100%'}}>
            <Heading style={{textAlign: 'center'}} mb="$3">
              Update business details below.
            </Heading>
            <View
              style={{
                alignItems: 'center',
                paddingBottom: 15,
                paddingTop: 15,
              }}>
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
                addressline1IsInvalid={!!formik.errors.addressline1}
                addressline1OnChangeText={formik.handleChange('addressline1')}
                addressline1ErrorText={formik?.errors?.addressline1}
                addressline1OnBlur={formik.handleBlur('addressline1')}
                addressline1Value={formik.values?.addressline1!}
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
                    action="positive"
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
          </ScrollView>
        </View>
      ) : (
        <View>
          <View style={styles.body}>
            <View style={styles.avatarContainer}>
              <Image
                alt="profile photo"
                source={
                  profileImage == ''
                    ? require('./../../../Images/default_avatar_image.jpg')
                    : {uri: storageUrl + profileImage}
                }
                style={styles.avatar}
              />
            </View>
            <View style={{marginHorizontal: 10, alignItems: 'center'}}>
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
              <View style={{padding: 5, marginBottom: '100%'}}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f0f3',
    height: 'auto',
  },
  body: {
    // backgroundColor: '#e8f0f3',
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
    width: 140,
    height: 140,
    borderRadius: 70,
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
