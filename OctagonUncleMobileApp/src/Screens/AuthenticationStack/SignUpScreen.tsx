import {useContext, useState} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, GestureResponderEvent} from 'react-native';
import {SignUpForm} from '../../Components/Forms/SignUpForm';
import VerifyEmailModal from '../../Components/Modals/VerifyEmailModal';
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {UserSignUp} from '../../Controllers/AuthenticationController';
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

const SignUpScreen = ({route, navigation}: any) => {
  const {userRole, businessId} = route.params;
  const [showModal, setShowModal] = useState(false);
  const {signIn, session, signUp, emailOtp, verifyOtp}: any =
    useContext(AuthContext);
  const toast = useToast();

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [role, setRole] = useState('');

  const phoneRegExp: RegExp =
    /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
  const passwordExp: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

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
      if (formik.isValid) {
        if (userRole == 1 && !isEmailVerified) {
          await emailOtp(formik.values.email, (error: any, result: any) => {
            if (error) {
              console.error(error);
            } else {
              setShowModal(true);
            }
          });
        } else {
          await SignUpNewUser();
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
        console.error(error);
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
          console.warn(error);
        } else {
          ShowToast();
          setIsEmailVerified(true);
          setShowModal(false);
          SignUpNewUser();
        }
      },
    );
  };
  const SignUpNewUser: any = async () => {
    const newUser: User = {
      email: formik.values.email,
      password: formik.values.password,
      businessId: businessId,
      userRole: userRole,
    };

    await signUp(newUser, (error: any, result: any) => {
      if (error) {
        console.error(error);
      } else {
        ShowToast();
        navigation.navigate('Personal Details', {
          sessionId: result.headers.sessionid,
        });
      }
    });
  };

  return (
    <SafeAreaView style={ThemeStyles.container}>
      <View>
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
