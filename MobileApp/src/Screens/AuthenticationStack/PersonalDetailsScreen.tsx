import {GestureResponderEvent, View} from 'react-native';
import {UserDetailForm} from '../../Components/Forms/UserDetailForm';
import {
  Image,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
  Toast,
  ScrollView,
} from '@gluestack-ui/themed';
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UserDetail} from '../../Models/UserDetail';
import {AddUserDetail} from '../../Controllers/UserDetailController';
import {CustomButton1} from '../../Components/Buttons';
import {useContext, useEffect, useState} from 'react';
import {decode} from 'base-64';
import {useStorageState} from '../../Services/StorageStateService';
import {Auth} from '../../Classes/Auth';
import {AuthContext} from '../../Services/AuthenticationService';
global.atob = decode;

export default function PersonalDetailsScreen({route, navigation}: any) {
  const {userRole, businessId} = route.params;
  const {sessionId} = route.params;
  const [[tokenIsLoading, authToken], setAuthToken] =
    useStorageState('authToken');
  const [[isLoading, session], setSession] = useStorageState('session');
  const {SetSession}: any = useContext(AuthContext);

  const [auth, setAuth] = useState(new Auth(sessionId));
  const toast = useToast();

  const userId = auth.GetUserId();

  const userDetailHelper = async (values: any) => {
    let userDetail = new UserDetail(
      '',
      values.firstname.trim(),
      values.lastname.trim(),
      values.phonenumber.trim(),
      values.addressline1.trim(),
      values.addressline2.trim(),
      values.suburb.trim(),
      values.city.trim(),
      values.province.trim(),
      values.postalcode.trim(),
      userId,
    );

    await AddUserDetail(userDetail)
      .then((r: any) => {
        if (r == 200) {
          //On success this cofe runs
          if (auth.GetUserRole() == '1') {
            navigation.navigate({
              name: 'Business Details',
              params: {sessionId: sessionId},
              merge: true,
            });
          } else {
            SetSession(authToken!);
            formik.resetForm();
          }
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
      .catch(error => console.log(error));
  };

  const userDetailSchema = yup.object().shape({
    firstname: yup
      .string()
      .min(2, 'Firstname too Short!')
      .max(50, 'Firstname too Long!'),
    lastname: yup
      .string()
      .min(2, 'lastname too Short!')
      .max(50, 'lastname too Long!'),
    phoneNumber: yup
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
    postalcode: yup
      .string()
      .min(2, 'Postal code too Short!')
      .max(4, 'Postal code too Long!'),
  });

  const userDetailsInitialValues = {
    firstname: '',
    lastname: '',
    phonenumber: '',
    addressline1: '',
    addressline2: '',
    suburb: '',
    city: '',
    province: '',
    postalcode: '',
  };

  const formik = useFormik({
    initialValues: userDetailsInitialValues,
    validationSchema: userDetailSchema,

    onSubmit: async (values, {resetForm}) => {
      await userDetailHelper(values);
    },
  });
  return (
    <ScrollView>
      <SafeAreaView style={ThemeStyles.container}>
        <View style={ThemeStyles.container}>
          <View style={{margin: 5}}>
            <Image
              size="xl"
              alt="Logo of Company"
              borderRadius={30}
              source={{
                uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              }}
            />
          </View>
        </View>
        <View style={{paddingBottom: 15, paddingTop: 15}}>
          <UserDetailForm
            showButton={true}
            heading="Add User Details"
            firstNameIsInvalid={!!formik.errors.firstname}
            firstNameOnChangeText={formik.handleChange('firstname')}
            firstNameErrorText={formik?.errors?.firstname}
            firstNameOnBlur={formik.handleBlur('firstname')}
            firstNameValue={formik.values?.firstname}
            lastNameIsInvalid={!!formik.errors.lastname}
            lastNameOnChangeText={formik.handleChange('lastname')}
            lastNameErrorText={formik?.errors?.lastname}
            lastNameOnBlur={formik.handleBlur('lastname')}
            lastNameValue={formik.values?.lastname}
            phoneNumberIsInvalid={!!formik.errors.phonenumber}
            phoneNumberOnChangeText={formik.handleChange('phonenumber')}
            phoneNumberErrorText={formik?.errors?.phonenumber}
            phoneNumberOnBlur={formik.handleBlur('phonenumber')}
            phoneNumberValue={formik.values?.phonenumber}
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
      </SafeAreaView>
    </ScrollView>
  );
}
