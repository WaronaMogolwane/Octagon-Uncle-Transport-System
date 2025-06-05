import {ActivityIndicator, GestureResponderEvent, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  SelectUserRoleScreenStyles,
  ThemeStyles,
} from '../../Stylesheets/GlobalStyles';
import {
  useToast,
  Toast,
  ToastTitle,
  VStack,
  ToastDescription,
} from '@gluestack-ui/themed';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {SelectUserRoleForm} from '../../Components/Forms/SelectUserRoleForm';
import VerifyEmailModal from '../../Components/Modals/VerifyEmailModal';
import {UserVerifyEmail} from '../../Controllers/AuthenticationController';

const SelectUserRoleScreen = ({navigation}: any) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

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
  const GoToSignUpPage = (userRole: string, userInvitation: any) => {
    navigation.navigate('Sign Up', {
      userRole: userRole,
      businessId: userInvitation.BusinessId,
      userId: userInvitation.UserId,
    });
  };

  const EmailVerification = async () => {
    setIsLoading(true);

    await UserVerifyEmail(
      formik.values.otp,
      Number(formik.values.selectedUserRole),
      (error: any, result: any) => {
        if (formik.isValid) {
          if (error) {
            setIsLoading(false);
            throw new Error(error);
          } else if (result) {
            setShowModal(false);
            ShowToast();
            GoToSignUpPage(formik.values.selectedUserRole, result.Data);
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
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
      <View style={SelectUserRoleScreenStyles.container}>
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
          ToEmailAddress={'the email address provided.'}
          VerifyOtpButtonOnPress={() => {
            EmailVerification();
          }}
          CloseOtpModalButtonOnPress={() => {
            setShowModal(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectUserRoleScreen;
