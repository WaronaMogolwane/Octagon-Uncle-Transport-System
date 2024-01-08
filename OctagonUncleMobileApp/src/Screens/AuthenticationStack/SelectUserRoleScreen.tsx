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
} from '@gluestack-ui/themed';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {
  CustomButton1,
  CustomButton2,
  CustomButton3,
} from '../../Components/Buttons';
import SelectUserRoleForm from '../../Components/Forms/SelectUserRoleForm';

const SelectUserRoleScreen = ({navigation}: any) => {
  const {signIn, session}: any = useContext(AuthContext);
  const ref = React.useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [userRole, setuserRole] = useState(0);

  const [selectedRole, setSelectedRole] = useState(0);

  const registerSchema = yup.object().shape({
    selectedUserRole: yup
      .string()
      .oneOf(['1', '2', '3'])
      .required('Please select a user type.'),
  });

  const registerInitialValues = {
    selectedUserRole: '',
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
          GoToSignUpPage(values.selectedUserRole);
        }
      }
    },
  });
  const GoToSignUpPage = (userRole: string) => {
    navigation.navigate('Sign Up');
  };

  return (
    <SafeAreaView style={ThemeStyles.container}>
      <SelectUserRoleForm
        userRoleSelectValue={formik.values?.selectedUserRole}
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
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">User verification</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>
              Enter the code that was sent to you when the Transporter signed
              you up as their xxx {}
            </Text>
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}>
              <InputField placeholder="Enter code here" />
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
                GoToSignUpPage(formik.values.selectedUserRole);
              }}>
              <ButtonText>Verify</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SafeAreaView>
  );
};

export default SelectUserRoleScreen;
