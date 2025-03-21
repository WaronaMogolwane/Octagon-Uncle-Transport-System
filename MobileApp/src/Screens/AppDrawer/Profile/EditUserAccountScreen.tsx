import {
  ActivityIndicator,
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
  Menu,
  AddIcon,
  MenuItem,
  MenuItemLabel,
  EditIcon,
  Card,
} from '@gluestack-ui/themed';
import * as yup from 'yup';
import {CustomButton1} from '../../../Components/Buttons';
import {
  CheckDuplicateEmail,
  GetUser,
  UpdateUserEmail,
  UpdateUserPassword,
} from '../../../Controllers/UserController';
import {
  CustomFormControlInput,
  CustomFormControlInputEmail,
} from '../../../Components/CustomFormInput';
import {useFormik} from 'formik';
import {AuthContext} from '../../../Services/AuthenticationService';
import VerifyEmailModal from '../../../Components/Modals/VerifyEmailModal';
import {err} from 'react-native-svg/lib/typescript/xml';
import {Auth} from '../../../Classes/Auth';
import {OpenCamera, OpenFilePicker} from '../../../Services/CameraService';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {Camera} from 'lucide-react';
import {Images} from 'lucide-react';
import {Aperture} from 'lucide-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ClearImageViaAsyncStorage,
  RestoreImageViaAsyncStorage,
  SaveImageViaAsyncStorage,
} from '../../../Services/ImageStorageService';
import {
  DeleteProfileUrl,
  GetUserProfileImage,
  UpdateProfileUrl,
} from '../../../Controllers/UserDetailController';

const EditUserAccountScreen = ({navigation}: any) => {
  const {session, emailOtp, verifyOtp}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [profileImage, setProfileImage] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [confirmButtonTitle, setConfirmButtonTitle] = useState('Capture front');
  const [selected, setSelected] = React.useState(new Set([]));

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showEmailVerificationModal, setShowEmailVerificationModal] =
    useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const storageUrl: string =
    'https://f005.backblazeb2.com/file/Dev-Octagon-Uncle-Transport/';

  const passwordExp: RegExp =
    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*\?\!\_\,\+\=\@])(?=.*[a-zA-Z]).{8,16}$/;

  const userId = auth.GetUserId();

  const ref = React.useRef(null);
  const toast = useToast();

  const date = new Date();

  useEffect(() => {
    GetCredentials();
  }, [refreshData]);

  useEffect(() => {
    if (isUpdating) {
      SaveImageViaAsyncStorage(profileImage);
    }
  }, [profileImage]);

  useEffect(() => {
    if (!isUpdating) {
      RestoreImageViaAsyncStorage().then((result: any) => {
        if (result != '') {
          setProfileImage(result);
        }
      });
    }
  }, [isChanged]);

  useEffect(() => {
    if (imageUri != '') {
      setIsUpdating(true);
      UploadImage();
    }
  }, [imageUri]);

  const GetCredentials = async () => {
    await GetUser(userId).then((result: any) => {
      setEmail(result.email);
      setPassword(result.password);
      setName(result.name);
    });
  };

  const SendOtp = async () => {
    CheckDuplicateEmail(emailFormik.values.email.trim()).then((result: any) => {
      if (result[0].result == true) {
        emailOtp(emailFormik.values.email.trim(), (error: any, result: any) => {
          if (error) {
            console.error(error);
          } else {
            ShowEmailSentToast();
            setShowEmailModal(false);
            setShowEmailVerificationModal(true);
          }
        });
      } else if (result[0].result == false) {
        ShowDuplicateEmailToast();
      }
    });
  };

  const UpdateEmail = async () => {
    await UpdateUserEmail(userId, emailFormik.values.email, name).then(
      (response: any) => {
        if (response[1] == 200) {
          ShowSuccessToast('Email');
          passwordFormik.resetForm();
          setRefreshData(!refreshData);
        } else {
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
        } else {
          setIsEmailVerified(true);
          setShowEmailVerificationModal(false);
          emailFormik.resetForm();
          UpdateEmail();
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
              <Text>Please enter your new email address below</Text>
            </View>
            <View>
              <CustomFormControlInputEmail
                labelText="New Email"
                isInvalid={!!emailFormik.errors.email}
                isDisabled={false}
                type="text"
                value={emailFormik.values?.email}
                onChangeText={emailFormik.handleChange('email')}
                errorText={emailFormik?.errors?.email}
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

  async function GetFileBlob(url: string, callback: any) {
    let data: Blob;
    await fetch(url)
      .then(response => response.blob())
      .then(blob => {
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function (e) {
          callback(e.target!.result.toString());
        };
      });
  }

  const CaptureImage = () => {
    OpenCamera(false, (result: any, error: any) => {
      if (error) {
      } else {
        const image: ImageOrVideo = result;
        GetFileBlob(image.path, async function (imageUrl: string) {
          setImageUri(imageUrl);
        });
      }
    });
  };

  const OpenGallery = () => {
    OpenFilePicker((result: any, error: any) => {
      if (error) {
      } else {
        const image: ImageOrVideo = result;
        GetFileBlob(image.path, async function (imageUrl: string) {
          setImageUri(imageUrl);
        });
      }
    });
  };

  const ClearImage = () => {
    DeleteProfileUrl(userId).then((response: any) => {
      if (response[1] == 200) {
        ClearImageViaAsyncStorage().then(() => {
          setProfileImage('');
          setIsUpdating(false);
        });
      }
    });
  };

  const FabMenu = () => {
    return (
      <Menu
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={keys => {
          const selectedMenuItem: any = keys;
          if (selectedMenuItem.currentKey === 'Camera') {
            CaptureImage();
          }
          if (selectedMenuItem.currentKey === 'Gallery') {
            OpenGallery();
          }
          if (selectedMenuItem.currentKey === 'Delete Image') {
            setIsUpdating(true);
            ClearImage();
          }
        }}
        closeOnSelect={true}
        placement="bottom"
        trigger={({...triggerProps}) => {
          return (
            <Fab
              {...triggerProps}
              style={{zIndex: 1}}
              size="md"
              placement="bottom right"
              isHovered={false}
              isDisabled={false}
              isPressed={false}>
              <FabIcon as={EditIcon} />
            </Fab>
          );
        }}>
        <MenuItem key="Camera" textValue="Camera">
          <MenuItemLabel size="sm">Camera</MenuItemLabel>
        </MenuItem>
        <MenuItem key="Gallery" textValue="Gallery">
          <MenuItemLabel size="sm">Gallery</MenuItemLabel>
        </MenuItem>
        <MenuItem key="Delete Image" textValue="Delete Image">
          <MenuItemLabel size="sm">Delete Image</MenuItemLabel>
        </MenuItem>
      </Menu>
    );
  };

  const UploadImage = async () => {
    await UpdateProfileUrl(userId, imageUri).then((response: any) => {
      if (response[1] == 200) {
        GetUserProfileImage(userId).then((result: any) => {
          if (result[1] == 200) {
            setProfileImage(result[0]);
            setIsUpdating(false);
          }
        });
      }
    });
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
        /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*\?\!\_\,\+\=\@])(?=.*[a-zA-Z]).{8,16}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      )
      .required('Please enter old password'),
    newPassword: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*\?\!\_\,\+\=\@])(?=.*[a-zA-Z]).{8,16}$/,
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

  return (
    <View style={styles.container}>
      {IsLoading ? (
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
          <Text>Saving</Text>
        </View>
      ) : null}

      <View>{EmailModal()}</View>
      <View>{EmailVerificationModal()}</View>
      <View>{ChangePasswordModal()}</View>
      <View style={styles.avatarContainer}>
        {isUpdating ? (
          <View
            style={{
              width: 150,
              height: 150,
              borderRadius: 75,
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
            <Text>Working</Text>
          </View>
        ) : null}
        <Image
          style={styles.avatar}
          source={
            profileImage == ''
              ? require('../../../Images/default_avatar_image.jpg')
              : {
                  uri:
                    storageUrl +
                    profileImage +
                    '?xc=' +
                    date.getTime() +
                    date.getDate(),
                }
          }
        />
        <Text></Text>
        <FabMenu />
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
    backgroundColor: '#e8f0f3',
  },
  form: {
    width: '90%',
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
    backgroundColor: '#fff',
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
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: '#1E90FF',
    fontSize: 16,
  },
});

export default EditUserAccountScreen;
