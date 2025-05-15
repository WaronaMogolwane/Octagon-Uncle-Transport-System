import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import {
  Fab,
  ModalBackdrop,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  Heading,
  ModalBody,
  Modal,
  useToast,
  Toast,
  ToastDescription,
  VStack,
  ToastTitle,
  Button,
  ButtonText,
  Menu,
  MenuItem,
  MenuItemLabel,
  EditIcon,
  CloseIcon,
  FabIcon,
  Icon,
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
  CustomFormControlInputTwo,
} from '../../../Components/CustomFormInput';
import {useFormik} from 'formik';
import {AuthContext} from '../../../Services/AuthenticationService';
import VerifyEmailModal from '../../../Components/Modals/VerifyEmailModal';
import {Auth} from '../../../Classes/Auth';
import {OpenCamera, OpenFilePicker} from '../../../Services/CameraService';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {
  ClearImageViaAsyncStorage,
  DeleteImage,
  RestoreImageViaAsyncStorage,
  SaveImageViaAsyncStorage,
} from '../../../Services/ImageStorageService';
import {
  DeleteProfileUrl,
  GetUserProfileImage,
  UpdateProfileUrl,
} from '../../../Controllers/UserDetailController';
import {
  EditUserAccountScreenStyles,
  ThemeStyles,
} from '../../../Stylesheets/GlobalStyles';

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

  const [selected, setSelected] = React.useState(new Set([]));

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showEmailVerificationModal, setShowEmailVerificationModal] =
    useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const storageUrl: string =
    'https://f005.backblazeb2.com/file/Dev-Octagon-Uncle-Transport/';

  const passwordExp: RegExp =
    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*\?\!\_\,\+\=\@])(?=.*[a-zA-Z]).{8,16}$/;

  const userId = auth.GetUserId();

  const ref = React.useRef(null);
  const toast = useToast();

  useEffect(() => {
    GetCredentials();
  }, [refreshData]);

  useEffect(() => {
    if (isUpdating) {
      SaveImage(storageUrl + profileImage);
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
      if (result[0].result[0] == true) {
        emailOtp(emailFormik.values.email.trim(), (error: any, result: any) => {
          if (error) {
            throw new Error(error);
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
        style={EditUserAccountScreenStyles.container}
        isOpen={showEmailModal}
        onClose={() => {
          setShowEmailModal(false);
        }}
        finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent style={{backgroundColor: '#ffffff'}}>
          <ModalHeader>
            <Heading size="lg">Update Email</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text style={EditUserAccountScreenStyles.modalText}>
              Please enter your new email address below
            </Text>
            <CustomFormControlInputEmail
              labelText="New email"
              isInvalid={!!emailFormik.errors.email}
              isDisabled={false}
              type="text"
              value={emailFormik.values?.email}
              onChangeText={emailFormik.handleChange('email')}
              errorText={emailFormik?.errors?.email}
              isRequired={false}
              onBlur={emailFormik.handleBlur('email')}
            />

            <CustomButton1
              title="Verify"
              size="md"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              onPress={SendOtp}
            />
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
        <ModalContent style={{backgroundColor: '#ffffff'}}>
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
                style={EditUserAccountScreenStyles.changeAvatarButtonText}>
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
        DeleteImage();
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
        placement="bottom right"
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
            setIsUpdating(false);
            SaveImage(storageUrl + result[0]);
          }
        });
      }
    });
  };

  const SaveImage = async (imageUrl: string) => {
    const downloadDest = `${RNFS.DocumentDirectoryPath}/profile_image.jpg`;

    try {
      // Check if file already exists
      const fileExists = await RNFS.exists(downloadDest);

      // If file exists, delete it
      if (fileExists) {
        await RNFS.unlink(downloadDest);
        // console.log('Old image deleted:', downloadDest);
      }

      // Download and save the new image
      const downloadResponse = await RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: downloadDest,
      }).promise;

      if (downloadResponse.statusCode === 200) {
        // console.log('Image saved successfully:', downloadDest);
        setProfileImage(`file://${downloadDest}?${Date.now()}`);
        SaveImageViaAsyncStorage(`file://${downloadDest}`);
      } else {
        // console.log('Failed to save image:', downloadResponse.statusCode);
      }
    } catch (err) {
      // console.log('Error saving image:', err);
    }
  };

  const emailInitialValues = {
    email: '',
    otp: '',
  };

  const formikInitialValues = {
    email: email,
    password: password,
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
                throw new Error(error);
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

  const formik = useFormik({
    initialValues: formikInitialValues,
    enableReinitialize: true,

    onSubmit: async (values, {resetForm}) => {
      if (emailFormik.isValid) {
        if (!isEmailVerified) {
          await emailOtp(
            emailFormik.values.email,
            (error: any, result: any) => {
              if (error) {
                throw new Error(error);
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
    <View style={ThemeStyles.container}>
      {EmailModal()}
      {EmailVerificationModal()}
      {ChangePasswordModal()}

      <View
        style={[
          EditUserAccountScreenStyles.container,
          EditUserAccountScreenStyles.avatarContainer,
        ]}>
        {isUpdating ? (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff75',
              zIndex: 100,
              borderRadius: 75,
            }}>
            <ActivityIndicator size="large" />
            <Text>Working</Text>
          </View>
        ) : null}

        <Image
          style={EditUserAccountScreenStyles.avatar}
          source={
            profileImage !== ''
              ? {uri: profileImage}
              : require('../../../Images/default_avatar_image.jpg')
          }
        />
        <View style={EditUserAccountScreenStyles.fabPosition}>
          <FabMenu />
        </View>
      </View>

      <View style={EditUserAccountScreenStyles.form}>
        <CustomFormControlInputEmail
          isDisabled={true}
          labelText="Email"
          placeHolder="email"
          isInvalid={!!formik.errors.email}
          isRequired={false}
          type="text"
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          errorText={formik?.errors?.email}
          value={formik.values?.email!}
        />
        <Text
          onPress={() => {
            setShowEmailModal(true);
          }}
          style={EditUserAccountScreenStyles.changeAvatarButtonText}>
          Change Email
        </Text>

        <CustomFormControlInputTwo
          isDisabled={true}
          labelText="Password"
          placeHolder="password"
          isInvalid={!!formik.errors.password}
          isRequired={false}
          type="password"
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          errorText={formik?.errors?.password}
          value={formik.values?.password!}
        />
        <Text
          onPress={() => {
            setShowChangePassword(true);
          }}
          style={EditUserAccountScreenStyles.changeAvatarButtonText}>
          Change Password
        </Text>
      </View>
    </View>
  );
};

export default EditUserAccountScreen;
