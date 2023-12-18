import {View} from 'react-native';
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

const ForgotPasswordScreen = () => {
  const registerSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      )
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match'),
  });

  const registerInitialValues = {
    password: '',
    confirmPassword: '',
  };

  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerSchema,

    onSubmit: (values, {resetForm}) => {},
  });

  const [showModal, setShowModal] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  return (
    <SafeAreaView style={ThemeStyles.container}>
      {isEmailVerified ? (
        <View>
          <CustomFormControlInput
            labelText="New password"
            placeHolder="Password"
            value={formik.values?.password}
            type="password"
            isRequired={true}
            errorText={formik?.errors?.password}
            isInvalid={!!formik.errors.password}
            onChangeText={formik.handleChange('password')}
          />
          <CustomFormControlInput
            labelText="Confirm password"
            placeHolder="Password"
            value={formik.values?.confirmPassword}
            type="password"
            isRequired={true}
            errorText={formik?.errors?.confirmPassword}
            isInvalid={!!formik.errors.confirmPassword}
            onChangeText={formik.handleChange('confirmPassword')}
          />
        </View>
      ) : (
        <CustomFormControlInput
          labelText="Enter your email"
          placeHolder="email"
          isInvalid={false}
          isRequired={true}
          type="text"
          onChangeText={() => {}}
          errorText={''}
          onBlur={() => {}}
          value={''}
        />
      )}
      {isEmailVerified ? (
        <CustomButton1 title="Save" onPress={() => {}} />
      ) : (
        <CustomButton1
          title="Next"
          onPress={() => {
            setShowModal(true);
          }}
        />
      )}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
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
                setShowModal(false);
              }}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={() => {
                setShowModal(false);
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
