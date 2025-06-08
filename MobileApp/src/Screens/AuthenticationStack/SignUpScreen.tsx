import {useContext, useState} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, GestureResponderEvent, ActivityIndicator} from 'react-native';
import {SignUpForm} from '../../Components/Forms/SignUpForm';
import VerifyEmailModal from '../../Components/Modals/VerifyEmailModal';
import {SignUpScreenStyles, ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {
  GetUserInvitation,
  UserSignUp,
} from '../../Controllers/AuthenticationController';
import {User} from '../../Models/UserModel';
import {useStorageState} from '../../Services/StorageStateService';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
} from '@gluestack-ui/themed';
import {AuthContext} from '../../Services/AuthenticationService';
import {AxiosError} from 'axios';
import uuid from 'react-native-uuid';

const SignUpScreen = ({route, navigation}: any) => {
  const {userRole, businessId, userId} = route.params;
  const [showModal, setShowModal] = useState(false);
  const {signIn, session, signUp, emailOtp, verifyOtp}: any =
    useContext(AuthContext);
  const toast = useToast();

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [role, setRole] = useState('');

  const phoneRegExp: RegExp =
    /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
  // const passwordExp1: RegExp =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
  const passwordExp: RegExp =
    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*\?\!\_\,\+\=\@])(?=.*[a-zA-Z]).{8,16}$/;

  const registerSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        passwordExp,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      )
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match'),
    email: yup.string().email('Invalid email').required('Email is required'),
    otp: yup.string(),
  });
  const registerInitialValues = {
    password: '',
    confirmPassword: '',
    email: '',
    otp: '',
  };
  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, {resetForm}) => {
      setIsLoading(true);
      if (formik.isValid) {
        if (userRole == 1 && !isEmailVerified) {
          await emailOtp(formik.values.email, (error: any, result: any) => {
            if (error) {
              setIsLoading(false);
              throw new Error(error);
            } else {
              setShowModal(true);
              setIsLoading(false);
            }
          });
        } else {
          await GetInvitation(
            formik.values.email,
            (error: any, result: any) => {
              if (error) {
              } else {
                SignUpNewUser(result[0].UserId);
              }
            },
          );
          setIsLoading(false);
        }
      }
    },
  });

  const GoToUserDetailsSignUp = () => {
    navigation.navigate('User Details Sign Up');
  };
  const ShowToast = () => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="success" variant="solid">
            <VStack space="xs">
              <ToastTitle>Success</ToastTitle>
              <ToastDescription>Email successfully verified.</ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const SendOtp = async () => {
    await emailOtp(formik.values.email, (error: any, result: any) => {
      if (error) {
        throw new Error(error);
      } else {
        console.log(result.data);
      }
    });
  };

  const VerifyOtp = async () => {
    verifyOtp(
      formik.values.otp,
      formik.values.email,
      (error: any, result: any) => {
        if (error) {
          console.warn(error.response?.data);
        } else {
          ShowToast();
          setIsEmailVerified(true);
          setShowModal(false);
          SignUpNewUser();
        }
      },
    );
  };
  const SignUpNewUser = async (userId?: string) => {
    const newUserId: any = userId;
    const newUser: User = {
      userId: newUserId,
      email: formik.values.email,
      password: formik.values.password,
      businessId: businessId,
      userRole: userRole,
    };
    await signUp(newUser, (error: any, result: any) => {
      if (error) {
        throw new Error(error);
      } else {
        ShowToast();
        navigation.navigate({
          name: 'Personal Details',
          params: {sessionId: result.headers.sessionid},
          merge: true,
        });
      }
    });
  };
  const GetInvitation = async (
    email: string,
    callback: (error: any, result: any) => void,
  ) => {
    await GetUserInvitation(
      email,
      userRole,
      async (error: AxiosError, result: any) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, result);
        }
      },
    );
  };
  return (
    <SafeAreaView style={ThemeStyles.container}>
      <View style={SignUpScreenStyles.container}>
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
        <SignUpForm
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
          confirmPasswordIsInvalid={!!formik.errors.confirmPassword}
          confirmPasswordOnChangeText={formik.handleChange('confirmPassword')}
          confirmPasswordErrorText={formik?.errors?.confirmPassword}
          confirmPasswordOnBlur={formik.handleBlur('confirmPassword')}
          confirmPasswordValue={formik.values?.confirmPassword}
          signUpButtonOnPress={
            formik.handleSubmit as (
              values:
                | GestureResponderEvent
                | React.FormEvent<HTMLFormElement>
                | undefined,
            ) => void
          }
        />
      </View>
      <VerifyEmailModal
        ShowModal={showModal}
        ToEmailAddress={formik.values.email}
        VerifyOtpButtonOnPress={() => {
          VerifyOtp();
        }}
        CloseOtpModalButtonOnPress={() => {
          setShowModal(false);
        }}
        otpIsInvalid={!!formik.errors.otp}
        otpOnChangeText={formik.handleChange('otp')}
        otpErrorText={formik?.errors?.otp}
        otpOnBlur={formik.handleBlur('otp')}
        otpValue={formik.values?.otp}
      />
    </SafeAreaView>
  );
};
export default SignUpScreen;
