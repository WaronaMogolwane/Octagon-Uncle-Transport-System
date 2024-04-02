import {GestureResponderEvent, View} from 'react-native';
import React, {useState} from 'react';
import {CustomFormControlInput} from '../CustomFormInput';
import {CustomButton1} from '../Buttons';
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
import {
  InvitationModalProps,
  VerifyOtpModalProps,
} from '../../Props/ModalProps';

const VerifyEmailModal = (props: InvitationModalProps) => {
  return (
    <View>
      <Modal
        isOpen={props.ShowModal}
        onClose={props.CloseOtpModalButtonOnPress}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Invite Driver</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <CustomFormControlInput
              labelText="First Name"
              placeHolder="First Name"
              isInvalid={props.firstNameIsInvalid}
              isRequired={true}
              type="text"
              onChangeText={props.firstNameOnChangeText}
              errorText={props.firstNameErrorText}
              onBlur={props.firstNameOnBlur}
              value={props.firstNameValue}
            />
            <CustomFormControlInput
              labelText="Last Name"
              placeHolder="Last Name"
              isInvalid={props.lastNameIsInvalid}
              isRequired={true}
              type="text"
              onChangeText={props.lastNameOnChangeText}
              errorText={props.lastNameErrorText}
              onBlur={props.lastNameOnBlur}
              value={props.lastNameValue}
            />
            <CustomFormControlInput
              labelText="Email"
              placeHolder="Email"
              isInvalid={props.emailIsInvalid}
              isRequired={true}
              type="text"
              onChangeText={props.emailOnChangeText}
              errorText={props.emailErrorText}
              onBlur={props.emailOnBlur}
              value={props.emailValue}
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
              onPress={props.SendInviteOnPress}>
              <ButtonText>Invite Driver</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>
  );
};

export default VerifyEmailModal;
