import {GestureResponderEvent} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../../Services/AuthenticationService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {SignInForm} from '../../Components/Forms/SignInForm';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {CustomButton3} from '../../Components/Buttons';

const SignInScreen = ({navigation}: any) => {
  const {signIn, session}: any = useContext(AuthContext);
  const ref = React.useRef(null);

  const registerSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
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
      await signIn(values.email, values.password, (error: any, result: any) => {
        if (formik.isValid) {
          if (error) {
            console.log(error);
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
        onPress={GoToUserRoleSelectPage}
        title={'New around here? Create an account'}
      />
      {/* <CustomButton3
        onPress={GoToForgotPasswordPage}
        title={'Forgot Password'}
      /> */}
    </SafeAreaView>
  );
};

export default SignInScreen;
