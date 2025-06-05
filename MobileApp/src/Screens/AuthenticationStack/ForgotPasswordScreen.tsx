import {ActivityIndicator, GestureResponderEvent, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {CustomFormControlInput} from '../../Components/CustomFormInput';
import {CustomButton1} from '../../Components/Buttons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ForgotPasswordScreenStyles,
  ThemeStyles,
} from '../../Stylesheets/GlobalStyles';
import {
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  Icon,
  CloseIcon,
  ModalBody,
  Input,
  InputField,
  ModalFooter,
  ButtonText,
  Text,
  Button,
  Modal,
  useToast,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
} from '@gluestack-ui/themed';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {SetPasswordForm} from '../../Components/Forms/SetPasswordForm';
import {
  CheckDuplicateEmail,
  RestorUserPassword,
  UpdateUserPassword,
} from '../../Controllers/UserController';
import VerifyEmailModal from '../../Components/Modals/VerifyEmailModal';
import {AuthContext} from '../../Services/AuthenticationService';

const ForgotPasswordScreen = ({route, navigation}: any) => {
  const {signIn, session, signUp, emailOtp, verifyOtp}: any =
    useContext(AuthContext);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userId, setUserId] = useState('');

  const userRole = route.params?.userRole;
  const toast = useToast();

  const passwordExp: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

  const registerSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        passwordExp,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      ),
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

  const ShowSuccessToast = (label: string) => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="success" variant="solid">
            <VStack space="xs">
              <ToastTitle>Success</ToastTitle>
              <ToastDescription>{label} changed successfully.</ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const ShowFaliureToast = (label: string) => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="error" variant="solid">
            <VStack space="xs">
              <ToastTitle>Error</ToastTitle>
              <ToastDescription>
                {label} change unsuccessful, please try again.
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const UpdatePassword = () => {
    RestorUserPassword(userId, formik.values.confirmPassword).then(
      (response: any) => {
        if (response[1] == 200) {
          if (userRole == '1' || userRole == '2' || userRole == '3') {
            navigation.navigate('Edit User Account');
            setIsLoading(false);
          } else {
            ShowSuccessToast('Password');
            navigation.navigate('Sign In');
            setIsLoading(false);
          }
        } else {
          ShowFaliureToast('Password');
          setIsLoading(false);
        }
      },
    );
  };

  const CheckEmailAddress = () => {
    CheckDuplicateEmail(formik.values?.email.toLowerCase()).then(
      (result: any) => {
        if (result[0].result[0] == false) {
          SendOtp();
          setUserId(result[0].result[1][0][0].UserId);
          setIsLoading(false);
        } else {
          ShowNoEmailToast();
          setIsLoading(false);
        }
      },
    );
  };

  const VerifyOtp = async () => {
    verifyOtp(
      formik.values.otp,
      formik.values.email,
      (error: any, result: any) => {
        if (error) {
          console.warn(error);
          ShowWrongOTPToast();
          setIsLoading(false);
        } else {
          setIsEmailVerified(true);
          setShowModal(false);
          setIsLoading(false);
        }
      },
    );
  };

  const SendOtp = async () => {
    await emailOtp(formik.values.email, (error: any, result: any) => {
      if (error) {
        console.error(error);
        setIsLoading(false);
      } else {
        console.log(result.data);
        setShowModal(true);
        setIsLoading(false);
      }
    });
  };

  const ShowNoEmailToast = () => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="error" variant="solid">
            <VStack space="xs">
              <ToastTitle>Email not found</ToastTitle>
              <ToastDescription>
                The email provided is not registered please try check it and try
                agin.
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const ShowWrongOTPToast = () => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="success" variant="solid">
            <VStack space="xs">
              <ToastTitle>Wrong OTP</ToastTitle>
              <ToastDescription>
                The OTP entered is incorrect, please check it and try again.
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerSchema,

    onSubmit: (values, {resetForm}) => {
      if (isEmailVerified) {
        setIsLoading(true);
        UpdatePassword();
      } else {
        setIsLoading(true);
        CheckEmailAddress();
      }
    },
  });

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
      {isEmailVerified ? (
        <View style={ForgotPasswordScreenStyles.container}>
          <SetPasswordForm
            passwordIsInvalid={!!formik.errors.password}
            passwordOnChangeText={formik.handleChange('password')}
            passwordErrorText={formik?.errors?.password}
            passwordValue={formik.values?.password}
            passwordOnBlur={formik.handleBlur('password')}
            confirmPasswordIsInvalid={!!formik.errors.confirmPassword}
            confirmPasswordOnChangeText={formik.handleChange('confirmPassword')}
            confirmPasswordErrorText={formik?.errors?.confirmPassword}
            confirmPasswordOnBlur={formik.handleBlur('confirmPassword')}
            confirmPasswordValue={formik.values?.confirmPassword}
            setPasswordButtonOnPress={
              formik.handleSubmit as (
                values:
                  | GestureResponderEvent
                  | React.FormEvent<HTMLFormElement>
                  | undefined,
              ) => void
            }
          />
        </View>
      ) : (
        <View style={ForgotPasswordScreenStyles.container}>
          <CustomFormControlInput
            labelText="Email"
            placeHolder="Email"
            isInvalid={!!formik.errors.email}
            isRequired={true}
            type="text"
            onChangeText={formik.handleChange('email')}
            errorText={formik?.errors?.email}
            onBlur={formik.handleBlur('email')}
            value={formik.values?.email}
          />
          <CustomButton1
            title={'Confirm Email'}
            onPress={
              formik.handleSubmit as (
                values:
                  | GestureResponderEvent
                  | React.FormEvent<HTMLFormElement>
                  | undefined,
              ) => void
            }
          />
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
        </View>
      )}

      <Modal
        isOpen={showOtpModal}
        onClose={() => {
          setShowOtpModal(false);
        }}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Email verification</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>Enter the OTP sent to {formik.values?.email}</Text>
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}>
              <InputField placeholder="Enter the code here" />
            </Input>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowOtpModal(false);
              }}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={() => {
                setShowOtpModal(false);
                setIsEmailVerified(true);
              }}>
              <ButtonText>Verify</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
