// SignInScreen.tsx
import {
  ActivityIndicator,
  GestureResponderEvent,
  ScrollView,
  Alert,
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
import {Image, View} from '@gluestack-ui/themed';
import {useNetwork} from '../../Services/NetworkContext'; // Adjust path as needed
import {NavigationProp} from '@react-navigation/native';

interface AuthContextType {
  signIn: (
    email: string,
    password: string,
    callback: (error: AxiosError | null, result: any) => void,
  ) => Promise<void>;
  session: any; // Replace with proper type if known
}

interface SignInScreenProps {
  navigation: NavigationProp<any>;
}

const SignInScreen: React.FC<SignInScreenProps> = ({navigation}) => {
  const {signIn, session} = useContext(AuthContext) as AuthContextType;
  const {isConnected} = useNetwork(); // Use network context
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
      try {
        // Check network connectivity using context
        if (!isConnected) {
          setIsLoading(false);
          Alert.alert(
            'No Internet',
            'Please check your internet connection and try again.',
          );
          console.error('No internet connection');
          return;
        }

        setIsLoading(true);
        // Attempt sign-in with retry logic
        let attempts = 0;
        const maxAttempts = 3;
        let lastError: AxiosError | null = null;

        while (attempts < maxAttempts) {
          try {
            await signIn(
              values.email,
              values.password,
              (error: AxiosError | null, result: any) => {
                if (error) {
                  lastError = error;
                  throw error; // Throw to be caught in retry loop
                } else if (result) {
                  // resetForm();
                  setIsLoading(false);
                }
              },
            );
            return; // Success, exit retry loop
          } catch (err) {
            attempts++;
            lastError = err as AxiosError;
            if (attempts < maxAttempts) {
              console.info(
                `Retrying sign-in attempt ${attempts + 1}/${maxAttempts}`,
              );
              await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
            }
          }
        }

        // Handle error after max retries
        setIsLoading(false);
        const errorMessage =
          (typeof lastError?.response?.data === 'string'
            ? lastError?.response?.data
            : JSON.stringify(lastError?.response?.data)) ||
          lastError?.message ||
          'An error occurred during sign-in';
        console.error('Sign-in error:', errorMessage);
        console.info('Full error:', lastError);
        Alert.alert('Sign-in Failed', errorMessage);
      } catch (err) {
        setIsLoading(false);
        console.error('Unexpected error during sign-in:', err);
        Alert.alert(
          'Error',
          'An unexpected error occurred. Please try again later.',
        );
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
          alt="ocatagon uncle logo"
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
