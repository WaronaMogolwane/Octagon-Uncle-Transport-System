import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Fab,
  FabIcon,
  ArrowLeftIcon,
  FabLabel,
  ModalBackdrop,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  Heading,
  ModalBody,
  CloseIcon,
  Icon,
  Modal,
  useToast,
  Toast,
  ToastDescription,
  VStack,
  ToastTitle,
  Button,
  ButtonText,
  TrashIcon,
  ButtonIcon,
} from '@gluestack-ui/themed';
import * as yup from 'yup';
import {CustomButton1} from '../../Components/Buttons';
import {
  GetUser,
  UpdateUserEmail,
  UpdateUserPassword,
} from '../../Controllers/UserController';
import {
  CustomFormControlInput,
  CustomFormControlInputEmail,
} from '../../Components/CustomFormInput';
import {useFormik} from 'formik';
import {AuthContext} from '../../Services/AuthenticationService';
import VerifyEmailModal from '../../Components/Modals/VerifyEmailModal';
import {err} from 'react-native-svg/lib/typescript/xml';

const EditUserAccountScreen = ({navigation}: any) => {
  const {session, emailOtp, verifyOtp}: any = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showEmailVerificationModal, setShowEmailVerificationModal] =
    useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const passwordExp: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

  const userId = 'ffe121bd-de71-4016-813b-50e70e7fa298';

  const ref = React.useRef(null);
  const toast = useToast();

  useEffect(() => {
    GetCredentials();
  }, [refreshData]);

  const GetCredentials = async () => {
    await GetUser(userId).then((result: any) => {
      setEmail(result.email);
      setPassword(result.password);
      setName(result.name);
    });
  };

  const SendOtp = async () => {
    await emailOtp(
      emailFormik.values.email.trim(),
      (error: any, result: any) => {
        if (error) {
          console.error(error);
        } else {
          console.log(result.data);
          ShowEmailSentToast();
          setShowEmailModal(false);
          setShowEmailVerificationModal(true);
        }
      },
    );
  };

  const UpdateEmail = async () => {
    UpdateUserEmail(userId, emailFormik.values.email, name).then(
      (response: any) => {
        if (response[1] == 200) {
          ShowSuccessToast('Email');
          passwordFormik.resetForm();
          setRefreshData(!refreshData);
        } else if (
          response[2] == 'AxiosError: Request failed with status code 499'
        ) {
          ShowDuplicateEmailToast();
        }
        {
          ShowFaliureToast('Email');
        }
      },
    );
  };

  const ChangePassword = async () => {
    UpdateUserPassword(
      userId,
      passwordFormik.values.confirmPassword,
      passwordFormik.values.oldPassword,
    ).then((response: any) => {
      if (response[1] == 200) {
        ShowSuccessToast('Password');
        setShowChangePassword(false);
        passwordFormik.resetForm();
      } else if (
        response[2] == 'AxiosError: Request failed with status code 499'
      ) {
        ShowWrongPasswordToast();
      } else {
        ShowFaliureToast('Password');
      }
    });
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

  const ShowWrongPasswordToast = () => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="error" variant="solid">
            <VStack space="xs">
              <ToastTitle>Error</ToastTitle>
              <ToastDescription>
                Old password enterd incorret please check it and try again.
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const ShowEmailSentToast = () => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="success" variant="solid">
            <VStack space="xs">
              <ToastTitle>Success</ToastTitle>
              <ToastDescription>Email sent successfully.</ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const ShowDuplicateEmailToast = () => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="error" variant="solid">
            <VStack space="xs">
              <ToastTitle>Error</ToastTitle>
              <ToastDescription>
                The email provided already exsits, please choose another one
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const VerifyOtp = async () => {
    verifyOtp(
      emailFormik.values.otp.trim(),
      emailFormik.values.email.trim(),
      (error: any, result: any) => {
        if (error) {
          console.warn(error);
          ShowFaliureToast('Email');
        } else {
          if (result[0] == undefined) {
            ShowFaliureToast('Email');
          } else {
            setIsEmailVerified(true);
            setShowEmailVerificationModal(false);
            UpdateEmail();
          }
        }
      },
    );
  };

  const EmailModal = () => {
    return (
      <Modal
        isOpen={showEmailModal}
        onClose={() => {
          setShowEmailModal(false);
        }}
        finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Update Email</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <View>
              <Text>Please enter your new email adddress below</Text>
            </View>
            <View>
              <CustomFormControlInputEmail
                labelText="New Email"
                isInvalid={!!emailFormik.errors.email}
                isDisabled={false}
                type="text"
                value={emailFormik.values?.email}
                onChangeText={emailFormik.handleChange('email')}
                isRequired={false}
                onBlur={emailFormik.handleBlur('email')}
              />
            </View>
            <View>
              <Button
                size="sm"
                action="positive"
                borderWidth="$0"
                onPress={() => {
                  SendOtp();
                }}>
                <ButtonText>Verify</ButtonText>
              </Button>
            </View>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const ChangePasswordModal = () => {
    return (
      <Modal
        isOpen={showChangePassword}
        onClose={() => {
          setShowChangePassword(false);
          passwordFormik.resetForm();
        }}
        finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Update Password</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <View style={{marginBottom: 20}}>
              <Text>Change the passsword of your account below.</Text>
            </View>
            <View style={{marginBottom: 50}}>
              <CustomFormControlInput
                labelText="Old Password"
                errorText={passwordFormik?.errors?.oldPassword}
                isInvalid={!!passwordFormik.errors.oldPassword}
                isDisabled={false}
                type="password"
                value={passwordFormik.values?.oldPassword}
                onChangeText={passwordFormik.handleChange('oldPassword')}
                isRequired={false}
                onBlur={passwordFormik.handleBlur('oldPassword')}
              />
              <Text
                onPress={() => {
                  navigation.navigate('Forgot Password');
                }}
                style={styles.changeAvatarButtonText}>
                Forgot password?
              </Text>
            </View>
            <View>
              <CustomFormControlInput
                labelText="New Password"
                isInvalid={!!passwordFormik.errors.newPassword}
                errorText={passwordFormik?.errors?.newPassword}
                isDisabled={false}
                type="password"
                value={passwordFormik.values?.newPassword}
                onChangeText={passwordFormik.handleChange('newPassword')}
                isRequired={false}
                onBlur={passwordFormik.handleBlur('newPassword')}
              />
              <CustomFormControlInput
                labelText="Comfirm New Passord"
                errorText={passwordFormik?.errors?.confirmPassword}
                isInvalid={!!passwordFormik.errors.confirmPassword}
                isDisabled={false}
                type="password"
                value={passwordFormik.values?.confirmPassword}
                onChangeText={passwordFormik.handleChange('confirmPassword')}
                isRequired={false}
                onBlur={passwordFormik.handleBlur('confirmPassword')}
              />
            </View>
            <View>
              <Button
                size="sm"
                action="positive"
                borderWidth="$0"
                onPress={() => {
                  passwordFormik.handleSubmit();
                }}>
                <ButtonText>Change Password</ButtonText>
              </Button>
            </View>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const EmailVerificationModal = () => {
    return (
      <VerifyEmailModal
        ShowModal={showEmailVerificationModal}
        ToEmailAddress={emailFormik.values.email}
        VerifyOtpButtonOnPress={() => {
          VerifyOtp();
        }}
        CloseOtpModalButtonOnPress={() => {
          setShowEmailVerificationModal(false);
        }}
        otpIsInvalid={!!emailFormik.errors.otp}
        otpOnChangeText={emailFormik.handleChange('otp')}
        otpErrorText={emailFormik?.errors?.otp}
        otpOnBlur={emailFormik.handleBlur('otp')}
        otpValue={emailFormik.values?.otp}
      />
    );
  };

  const emailInitialValues = {
    email: '',
    otp: '',
  };

  const passwordInitialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const passwordSchema = yup.object().shape({
    oldPassword: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      )
      .required('Please enter old password'),
    newPassword: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      )
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Passwords must match')
      .required(),
  });

  const emailSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    otp: yup.string(),
  });

  const passwordFormik = useFormik({
    initialValues: passwordInitialValues,
    validationSchema: passwordSchema,

    onSubmit: async (values, {resetForm}) => {
      if (passwordFormik.isValid) {
        ChangePassword();
      }
    },
  });

  const emailFormik = useFormik({
    initialValues: emailInitialValues,
    validationSchema: emailSchema,

    onSubmit: async (values, {resetForm}) => {
      if (emailFormik.isValid) {
        if (!isEmailVerified) {
          await emailOtp(
            emailFormik.values.email,
            (error: any, result: any) => {
              if (error) {
                console.error(error);
              } else {
                setShowEmailVerificationModal(true);
              }
            },
          );
        } else {
          //await SignUpNewUser();
        }
      }
    },
  });

  // const GoBackFab = () => {
  //   return (
  //     <Fab
  //       onPress={navigation.navigate('Profile')}
  //       size="sm"
  //       placement="bottom right"
  //       isHovered={false}
  //       isDisabled={false}
  //       isPressed={false}>
  //       <FabIcon as={ArrowLeftIcon} mr="$1" />
  //       <FabLabel>Back</FabLabel>
  //     </Fab>
  //   );
  // };

  return (
    <View style={styles.container}>
      <View>{EmailModal()}</View>
      <View>{EmailVerificationModal()}</View>
      <View>{ChangePasswordModal()}</View>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://www.bootdey.com/img/Content/avatar/avatar3.png',
          }}
        />
        <TouchableOpacity
          style={styles.changeAvatarButton}
          onPress={() => {
            /* open image picker */
          }}>
          <Text style={styles.changeAvatarButtonText}>
            Change Profile Picture
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          editable={false}
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text
          onPress={() => {
            setShowEmailModal(true);
          }}
          style={styles.changeAvatarButtonText}>
          Change Email
        </Text>

        <Text style={styles.label}>Password</Text>
        <TextInput
          editable={false}
          secureTextEntry={true}
          textContentType="password"
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <Text
          onPress={() => {
            setShowChangePassword(true);
          }}
          style={styles.changeAvatarButtonText}>
          Change Password
        </Text>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <View style={{padding: 5}}>
              <Button
                size="md"
                variant="solid"
                action="secondary"
                isDisabled={false}
                isFocusVisible={false}
                onPress={() => {
                  navigation.navigate('Profile');
                }}>
                <ButtonIcon as={ArrowLeftIcon} />
                <ButtonText>Back</ButtonText>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  form: {
    width: '80%',
  },
  label: {
    marginTop: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: '#1E90FF',
    fontSize: 18,
  },
});

export default EditUserAccountScreen;
