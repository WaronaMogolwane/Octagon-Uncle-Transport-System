import {GestureResponderEvent} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../../Services/AuthenticationService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {SignInForm} from '../../Components/Forms/SignInForm';
import {
  useToast,
  Toast,
  ToastTitle,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Input,
  InputField,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  Text,
  Modal,
  VStack,
  ToastDescription,
} from '@gluestack-ui/themed';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {
  CustomButton1,
  CustomButton2,
  CustomButton3,
} from '../../Components/Buttons';
import {SelectUserRoleForm} from '../../Components/Forms/SelectUserRoleForm';
import VerifyEmailModal from '../../Components/Modals/VerifyEmailModal';
import {UserVerifyEmail} from '../../Controllers/AuthenticationController';
import {UserInvitation} from '../../Models/UserInvitation';
import {useStorageState} from '../../Services/StorageStateService';

const SelectUserRoleScreen = ({navigation}: any) => {
  const ref = React.useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [userRole, setuserRole] = useState(0);
  const toast = useToast();

  const [selectedRole, setSelectedRole] = useState(0);

  const registerSchema = yup.object().shape({
    selectedUserRole: yup
      .number()
      .oneOf([1, 2, 3])
      .required('Please select a user type.'),
    otp: yup.string(),
  });

  const registerInitialValues = {
    selectedUserRole: '',
    otp: '',
  };

  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerSchema,

    onSubmit: values => {
      var selectedUserRole = formik.values.selectedUserRole;
      if (formik.isValid) {
        if (selectedUserRole === '2' || selectedUserRole === '3') {
          setShowModal(true);
        } else if (selectedUserRole === '1') {
          GoToSignUpPage(values.selectedUserRole, '');
        }
      }
    },
  });
  const GoToSignUpPage = (userRole: string, businessId: string) => {
    navigation.navigate('Sign Up', {
      userRole: userRole,
      businessId: businessId,
    });
  };

  const EmailVerification = async () => {
    await UserVerifyEmail(
      formik.values.otp,
      Number(formik.values.selectedUserRole),
      (error: any, result: any) => {
        if (formik.isValid) {
          if (error) {
            console.log(error);
          } else if (result) {
            setShowModal(false);
            ShowToast();
            GoToSignUpPage(
              formik.values.selectedUserRole,
              result.Data.BusinessId,
            );
          }
        }
      },
    );
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
              <ToastDescription>
                Invitation code successfully verfied.
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };
  return (
    <SafeAreaView style={ThemeStyles.container}>
      <SelectUserRoleForm
        userRoleSelectValue={formik.values?.selectedUserRole.toString()}
        userRoleSelectOnChangeText={formik.handleChange('selectedUserRole')}
        userRoleSelectIsInvalid={!!formik.errors.selectedUserRole}
        userRoleSelectErrorText={formik?.errors?.selectedUserRole}
        userRoleSelectOnBlur={formik.handleBlur('selectedUserRole')}
        nextButtonOnPress={
          formik.handleSubmit as (
            values:
              | GestureResponderEvent
              | React.FormEvent<HTMLFormElement>
              | undefined,
          ) => void
        }
      />
      <VerifyEmailModal
        otpIsInvalid={!!formik.errors.otp}
        otpOnChangeText={formik.handleChange('otp')}
        otpErrorText={formik?.errors?.otp}
        otpOnBlur={formik.handleBlur('otp')}
        otpValue={formik.values?.otp}
        ShowModal={showModal}
        ToEmailAddress={''}
        VerifyOtpButtonOnPress={() => {
          EmailVerification();
        }}
        CloseOtpModalButtonOnPress={() => {
          setShowModal(false);
        }}
      />
    </SafeAreaView>
  );
};

export default SelectUserRoleScreen;
