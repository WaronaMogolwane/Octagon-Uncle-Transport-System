import {StyleSheet} from 'react-native';
import {
  UserSignUp,
  UserSignIn,
  UserForgotPassword,
  UserSetPassword,
  UserVerifyEmail,
} from '../../Controllers/AuthenticationController';
import {CustomFormControlInput} from '../../Components/CustomFormInput';
import {useState, useEffect, useRef} from 'react';
import {FormStyles, ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {
  GluestackUIProvider,
  Text,
  Box,
  FormControlLabel,
  FormControl,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  AlertCircleIcon,
  Input,
  InputField,
  Button,
  ButtonText,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalContent,
  Heading,
  Icon,
  CloseIcon,
  Image,
} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {SafeAreaView} from 'react-native-safe-area-context';

const SignUpScreen = () => {
  const ref = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [role, setRole] = useState('');
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    cellphone: '',
    IdNumber: '',
  });

  const handleOnChange = (text: any, input: any) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  return (
    <SafeAreaView style={ThemeStyles.container}>
      <Box>
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
        {isEmailVerified ? (
          <FormControl>
            <Button bg="$darkBlue600">
              <ButtonText fontSize="$sm" fontWeight="$medium">
                Next
              </ButtonText>
            </Button>
          </FormControl>
        ) : (
          <FormControl>
            <Button
              bg="$darkBlue600"
              onPress={() => setShowModal(true)}
              ref={ref}>
              <ButtonText fontSize="$sm" fontWeight="$medium">
                Confirm
              </ButtonText>
            </Button>
          </FormControl>
        )}
      </Box>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Cellphone verification</Heading>
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
              <InputField placeholder="Enter Text here" />
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
              <ButtonText>Explore</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SafeAreaView>
  );

  const userAuthentication = {
    SignUp: async (userEmail: string, userPassword: string) => {
      await UserSignUp(userEmail, userPassword)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    SignIn: async (userEmail: string, userPassword: string) => {
      await UserSignIn(userEmail, userPassword)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    ForgotPassword: async (userEmail: string) => {
      await UserForgotPassword(userEmail)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    SetPassword: async (userPassword: string) => {
      await UserSetPassword(userPassword)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    VerifyEmail: async () => {
      await UserVerifyEmail()
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      fontSize: 16,
      marginVertical: 16,
    },
  });
};
export default SignUpScreen;
