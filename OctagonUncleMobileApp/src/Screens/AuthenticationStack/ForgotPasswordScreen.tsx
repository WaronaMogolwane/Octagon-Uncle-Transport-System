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

const ForgotPasswordScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  return (
    <SafeAreaView style={ThemeStyles.container}>
      <CustomFormControlInput
        labelText="Enter your"
        placeHolder="email"
        isInvalid={false}
        isRequired={true}
        type="text"
        onChangeText={() => {}}
        errorText={''}
        onBlur={() => {}}
        value={''}
      />
      <CustomButton1
        title="Next"
        onPress={() => {
          setShowModal(true);
        }}
      />
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
