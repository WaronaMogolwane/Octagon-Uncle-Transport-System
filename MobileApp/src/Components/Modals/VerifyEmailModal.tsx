import {GestureResponderEvent, View} from 'react-native';
import React, {useState} from 'react';
import {
  CustomFormControlInput,
  CustomFormControlInputNumber,
} from '../../Components/CustomFormInput';
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
import {VerifyOtpModalProps} from '../../Props/ModalProps';

const VerifyEmailModal = (props: VerifyOtpModalProps) => {
  return (
    <View>
      <Modal
        isOpen={props.ShowModal}
        onClose={props.CloseOtpModalButtonOnPress}>
        <ModalBackdrop />
        <ModalContent style={{backgroundColor: '#ffffff'}}>
          <ModalHeader>
            <Heading size="lg">Email verification</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text style={{marginBottom: 15}}>
              Enter the OTP sent to {props.ToEmailAddress}
            </Text>
            <CustomFormControlInputNumber
              labelText="OTP"
              placeHolder="Enter the code here"
              isInvalid={props.otpIsInvalid}
              isRequired={true}
              type="text"
              onChangeText={props.otpOnChangeText}
              errorText={props.otpErrorText}
              onBlur={props.otpOnBlur}
              value={props.otpValue}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={props.CloseOtpModalButtonOnPress}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={props.VerifyOtpButtonOnPress}>
              <ButtonText>Verify</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>
  );
};

export default VerifyEmailModal;
