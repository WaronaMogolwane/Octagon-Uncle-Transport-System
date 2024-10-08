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

export default function UserDetailSignUp({navigation}: any) {
  const toast = useToast();
  const userId = 'c7728615-394f-466b-833e-ea9dd60ba836';

  const userDetailHelper = async (values: any) => {
    let userDetail = new UserDetail(
      '',
      values.firstname,
      values.lastname,
      values.addressline1,
      values.addressline2,
      values.suburb,
      values.city,
      values.province,
      values.postalcode,
      userId,
    );

    await AddUserDetail(userDetail)
      .then((r: any) => {
        if (r == 200) {
          //On success this code runs
          formik.resetForm();
          //navigation.push('Home');
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

  const userDetailSchema = yup.object().shape({
    firstname: yup
      .string()
      .min(2, 'Firstname too Short!')
      .max(50, 'Firstname too Long!')
      .required('Required'),
    lastname: yup
      .string()
      .min(2, 'lastname too Short!')
      .max(50, 'lastname too Long!')
      .required('Required'),
    addressline1: yup
      .string()
      .min(2, 'Address too Short!')
      .max(100, 'Address too Long!')
      .required('Required'),
    addressline2: yup.string().min(2, 'Too Short!').max(100, 'Too Long!'),
    suburb: yup
      .string()
      .min(2, 'Suburb too Short!')
      .max(50, 'Suburb too  Long!')
      .required('Required'),
    city: yup
      .string()
      .min(2, 'City too Short!')
      .max(50, 'City too Long!')
      .required('Required'),
    province: yup
      .string()
      .min(2, 'Province too Short!')
      .max(50, 'Province too Long!')
      .required('Required'),
    postalcode: yup
      .string()
      .min(2, 'Postal code too Short!')
      .max(4, 'Postal code too Long!')
      .required('Required'),
  });

  const userDetailsInitialValues = {
    firstname: '',
    lastname: '',
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

    onSubmit: (values, {resetForm}) => {
      userDetailHelper(values);
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
              $xs-borderRadius="$lg"
              source={{
                uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              }}
            />
          </View>
        </View>
        <View style={{paddingBottom: 15, paddingTop: 15}}>
          <UserDetailForm
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

          <CustomButton1
            onPress={() => navigation.goBack()}
            title="Go back home"
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
