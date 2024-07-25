import {
  ActivityIndicator,
  GestureResponderEvent,
  Text,
  View,
} from 'react-native';
import {UserDetailForm} from '../../Components/Forms/UserDetailForm';
import {
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
  Toast,
  ScrollView,
  ArrowLeftIcon,
  ButtonIcon,
  ButtonText,
  ArrowUpIcon,
  Button,
} from '@gluestack-ui/themed';
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UserDetail} from '../../Models/UserDetail';
import {
  GetUserDetail,
  UpdateUserDetail,
} from '../../Controllers/UserDetailController';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../Services/AuthenticationService';
import {Auth} from '../../Classes/Auth';
import {FilePen} from 'lucide-react-native';

export default function EditUserDetailsScreen({navigation}: any) {
  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const toast = useToast();

  const [userDetail, setUserDetail] = useState<UserDetail>();
  const [IsLoading, setIsLoading] = useState(false);

  const userId = auth.GetUserId();

  useEffect(() => {
    if (!userDetail) {
      setIsLoading(true);
      GetUser();
    }
  }, [userDetail]);

  const GetUser = async () => {
    await GetUserDetail(userId).then((result: any) => {
      setUserDetail(
        new UserDetail(
          result.userDetailId.trim(),
          result.firstName.trim(),
          result.lastName.trim(),
          result.phoneNumber.trim(),
          result.addressLine1.trim(),
          result.addressLine2.trim(),
          result.suburb.trim(),
          result.province.trim(),
          result.city.trim(),
          result.postalCode.trim(),
          userId,
        ),
      );
      setIsLoading(false);
    });
  };

  const userDetailHelper = async (values: any) => {
    setIsLoading(true);
    let userDetail = new UserDetail(
      '',
      values.firstName,
      values.lastName,
      values.phoneNumber,
      values.addressLine1,
      values.addressLine2,
      values.suburb,
      values.city,
      values.province,
      values.postalCode,
      userId,
    );

    await UpdateUserDetail(userDetail)
      .then((response: any) => {
        if (response[1] == 200) {
          //On success this code runs
          if (response[0].result != 0) {
            SuccessToast();
            navigation.navigate('Profile');
            setIsLoading(false);
          } else {
            FaliureToast('Information is already saved');
            setIsLoading(false);
          }
        } else {
          //On faluire this code runs
          FaliureToast(
            'Please check your internt and try again. If the problem persists contact support.',
          );
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
              <ToastTitle>Update successful</ToastTitle>
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

  const userDetailSchema = yup.object().shape({
    firstName: yup
      .string()
      .min(2, 'Firstname too Short!')
      .max(50, 'Firstname too Long!'),
    lastName: yup
      .string()
      .min(2, 'lastname too Short!')
      .max(50, 'lastname too Long!'),
    phoneNumber: yup
      .string()
      .matches(
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
        'not valid',
      )
      .min(10, 'phone number should be 10 digits')
      .max(10, 'phone number should be 10 digits'),
    addressLine1: yup
      .string()
      .min(2, 'Address too Short!')
      .max(100, 'Address too Long!'),
    addressLine2: yup.string().min(2, 'Too Short!').max(100, 'Too Long!'),
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

  let userDetailsInitialValues = {
    firstName: userDetail?.firstName,
    lastName: userDetail?.lastName,
    phoneNumber: userDetail?.phoneNumber,
    addressLine1: userDetail?.addressLine1,
    addressLine2: userDetail?.addressLine2,
    suburb: userDetail?.suburb,
    city: userDetail?.city,
    province: userDetail?.province,
    postalCode: userDetail?.postalCode,
  };

  const formik = useFormik({
    initialValues: userDetailsInitialValues,
    validationSchema: userDetailSchema,
    enableReinitialize: true,

    onSubmit: async (values, {resetForm}) => {
      await userDetailHelper(values);
    },
  });
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
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
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <View style={{paddingBottom: 15, paddingTop: 15}}>
            <UserDetailForm
              showButton={false}
              heading={'Update your details below'}
              firstNameIsInvalid={!!formik.errors.firstName}
              firstNameOnChangeText={formik.handleChange('firstName')}
              firstNameErrorText={formik?.errors?.firstName}
              firstNameOnBlur={formik.handleBlur('firstName')}
              firstNameValue={formik.values?.firstName!}
              lastNameIsInvalid={!!formik.errors.lastName}
              lastNameOnChangeText={formik.handleChange('lastName')}
              lastNameErrorText={formik?.errors?.lastName}
              lastNameOnBlur={formik.handleBlur('lastName')}
              lastNameValue={formik.values?.lastName!}
              phoneNumberIsInvalid={!!formik.errors.phoneNumber}
              phoneNumberOnChangeText={formik.handleChange('phoneNumber')}
              phoneNumberErrorText={formik?.errors?.phoneNumber}
              phoneNumberOnBlur={formik.handleBlur('phoneNumber')}
              phoneNumberValue={formik.values?.phoneNumber!}
              addressline1IsInvalid={!!formik.errors.addressLine1}
              addressline1OnChangeText={formik.handleChange('addressLine1')}
              addressline1ErrorText={formik?.errors?.addressLine1}
              addressline1OnBlur={formik.handleBlur('addressLine1')}
              addressline1Value={formik.values?.addressLine1!}
              addressline2IsInvalid={!!formik.errors.addressLine2}
              addressline2OnChangeText={formik.handleChange('addressLine2')}
              addressline2ErrorText={formik?.errors?.addressLine2}
              addressline2OnBlur={formik.handleBlur('addressline2')}
              addressline2Value={formik.values?.addressLine2!}
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
              submitUserDetails={
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
      </ScrollView>
    </SafeAreaView>
  );
}
