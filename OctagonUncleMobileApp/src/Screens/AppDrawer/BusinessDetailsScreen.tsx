import {GestureResponderEvent, ScrollView, View} from 'react-native';
import React from 'react';
import {
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

const BusinessDetailsScreen = ({navigation}: any) => {
  const toast = useToast();
  const businessId = 'w8728321-394f-466b-833e-ea9dd60ba000';

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
      values.postalcode,
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
