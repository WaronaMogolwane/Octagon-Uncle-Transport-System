import {GestureResponderEvent, View} from 'react-native';
import React, {useState} from 'react';
import {CustomFormControlInput} from '../../Components/CustomFormInput';
import {CustomButton1} from '../../Components/Buttons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';
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
} from '@gluestack-ui/themed';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {SetPasswordForm} from '../../Components/Forms/SetPasswordForm';

const ForgotPasswordScreen = () => {
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
    phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  });

  const registerInitialValues = {
    password: '',
    confirmPassword: '',
    email: '',
    cellphone: '',
  };

  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerSchema,

    onSubmit: (values, {resetForm}) => {
      if (isEmailVerified) {
      } else {
        setShowOtpModal(true);
      }
    },
  });
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  return (
    <SafeAreaView style={ThemeStyles.container}>
      {isEmailVerified ? (
        <View>
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
        <View>
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
          <CustomFormControlInput
            labelText="Cellphone"
            placeHolder="Cellphone"
            isInvalid={!!formik.errors.cellphone}
            isRequired={true}
            type="text"
            onChangeText={formik.handleChange('cellphone')}
            errorText={formik?.errors?.cellphone}
            onBlur={formik.handleBlur('cellphone')}
            value={formik.values?.cellphone}
          />
          <CustomButton1
            title={'Confirm Email'}
            onPress={() => {
              formik.handleSubmit as (
                values:
                  | GestureResponderEvent
                  | React.FormEvent<HTMLFormElement>
                  | undefined,
              ) => void;
            }}
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
            <Text>Enter the OTP sent to {}</Text>
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
