import {
  ActivityIndicator,
  GestureResponderEvent,
  ScrollView,
  Text,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../../Services/AuthenticationService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SignInScreenStyles, ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {SignInForm} from '../../Components/Forms/SignInForm';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {CustomButton3} from '../../Components/Buttons';
import {AxiosError} from 'axios';
import {
  Image,
  View,
  Toast,
  ToastTitle,
  useToast,
  ToastDescription,
  VStack,
} from '@gluestack-ui/themed';

const SignInScreen = ({navigation}: any) => {
  const {signIn}: any = useContext(AuthContext);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const passwordExp: RegExp =
    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*\?\!\_\,\+\=\@])(?=.*[a-zA-Z]).{8,16}$/;

  const registerSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        passwordExp,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (-, #, $, %, &, *, ?, !, _, ,, +, =, @)',
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
      try {
        await signIn(
          values.email,
          values.password,
          (error: AxiosError, result: any) => {
            if (error) {
              setIsLoading(false);
              if (error.response?.status === 500) {
                toast.show({
                  placement: 'top',
                  render: ({id}) => {
                    const toastId = 'toast-' + id;
                    return (
                      <Toast nativeID={toastId} action="error" variant="solid">
                        <VStack space="xs">
                          <ToastTitle>Error</ToastTitle>
                          <ToastDescription>
                            Incorrent email and password combination.
                          </ToastDescription>
                        </VStack>
                      </Toast>
                    );
                  },
                });
              }
            } else if (result) {
              resetForm();
              setIsLoading(false);
            }
          },
        );
      } catch (error) {
        setIsLoading(false);
        console.error('Unexpected error during sign-in:', error);
      }
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
      <ScrollView>
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
          alt="octagon uncle logo"
          style={SignInScreenStyles.image}
        />
        <View style={SignInScreenStyles.container}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;
