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
  Image,
} from '@gluestack-ui/themed';
import {
  DriverDetailsModalProps,
  VerifyOtpModalProps,
} from '../../Models/ModalProps';

const DriverDetailsModal = (props: DriverDetailsModalProps) => {
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
            <Image
              source={props.profilePictureUrl}
              alt="Profile picture image."
            />
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
              isDisabled={true}
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
              isDisabled={true}
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
              isDisabled={true}
            />
            <Text>Current Vehicle: {props.vehicleLicenseNumber}</Text>
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
              action="negative"
              borderWidth="$0"
              onPress={props.HandleRemoveDriver}>
              <ButtonText>Remove driver</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>
  );
};

export default DriverDetailsModal;
