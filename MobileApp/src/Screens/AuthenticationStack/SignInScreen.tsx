import {ActivityIndicator, GestureResponderEvent, Text} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../../Services/AuthenticationService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SignInScreenStyles, ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {SignInForm} from '../../Components/Forms/SignInForm';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {CustomButton3} from '../../Components/Buttons';
import {AxiosError} from 'axios';
import {Image, View} from '@gluestack-ui/themed';

const SignInScreen = ({navigation}: any) => {
  const {signIn, session}: any = useContext(AuthContext);
  const ref = React.useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const registerSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*\?\!\_\,\+\=\@])(?=.*[a-zA-Z]).{8,16}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      )
      .required('Password is required'),
  });

  const registerInitialValues = {
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerSchema,

    onSubmit: async (values, {resetForm}) => {
      setIsLoading(true);
      await signIn(
        values.email,
        values.password,
        (error: AxiosError, result: any) => {
          if (formik.isValid) {
            if (error) {
              setIsLoading(false);
              console.error(error.response!.data);
              console.info('error', error);
            } else if (result) {
              resetForm();
              // setIsLoading(false);
            }
          }
        },
      );
      console.log(values);
      await signIn(values.email, values.password, (error: any, result: any) => {
        if (formik.isValid) {
          if (error) {
            throw new Error(error.response!.data);
          } else if (result) {
            resetForm();
          }
        }
      });
    },
  });

  const GoToForgotPasswordPage = () => {
    navigation.navigate('Forgot Password');
  };
  const GoToUserRoleSelectPage = () => {
    navigation.navigate('User Role');
  };
  return (
    <SafeAreaView style={ThemeStyles.container}>
      {isLoading ? (
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
        </View>
      ) : null}
      <Image
        source={require('../../Images/octagon_logo.jpg')}
        resizeMode="contain"
        alt="ocatagon uncle logo"
        style={SignInScreenStyles.image}
      />
      <View style={SignInScreenStyles.container}>
        {/* <Text style={SignInScreenStyles.loginText}>Sign In</Text> */}
        <SignInForm
          emailIsInvalid={!!formik.errors.email}
          emailOnChangeText={formik.handleChange('email')}
          emailErrorText={formik?.errors?.email}
          emailOnBlur={formik.handleBlur('email')}
          emailValue={formik.values?.email}
          passwordIsInvalid={!!formik.errors.password}
          passwordOnChangeText={formik.handleChange('password')}
          passwordErrorText={formik?.errors?.password}
          passwordOnBlur={formik.handleBlur('password')}
          passwordValue={formik.values?.password}
          signInButtonOnPress={
            formik.handleSubmit as (
              values:
                | GestureResponderEvent
                | React.FormEvent<HTMLFormElement>
                | undefined,
            ) => void
          }
        />
        <CustomButton3
          onPress={GoToForgotPasswordPage}
          title={'Forgot Password'}
        />
        <CustomButton3
          onPress={GoToUserRoleSelectPage}
          title={'New around here? Create an account'}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
