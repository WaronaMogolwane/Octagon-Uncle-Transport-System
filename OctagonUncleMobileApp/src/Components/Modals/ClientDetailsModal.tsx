import {View} from 'react-native';
import React from 'react';
import {CustomFormControlInput} from '../CustomFormInput';
import {
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  Icon,
  CloseIcon,
  ModalBody,
  ModalFooter,
  ButtonText,
  Button,
  Modal,
  Image,
} from '@gluestack-ui/themed';
import {
  ClientDetailsModalProps,
  DriverDetailsModalProps,
} from '../../Props/ModalProps';
import VehicleSelect from '../Cards/Select/VehicleSelect';
import RemoveDriverAlert from '../Alerts/RemoveDriverAlert';
import RemoveClientAlert from '../Alerts/RemoveClientAlert';
const data: any = [];

const ClientDetailsModal = (props: ClientDetailsModalProps) => {
  return (
    <View>
      <Modal
        isOpen={props.ShowModal}
        onClose={props.CloseOtpModalButtonOnPress}>
        <ModalBackdrop />
        <ModalContent backgroundColor="#fff">
          <ModalHeader>
            <Heading size="lg">Manage Client</Heading>
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
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="negative"
              borderWidth="$0"
              onPress={props.OpenRemoveClientAlert}>
              <ButtonText>Remove client</ButtonText>
            </Button>
            <Button
              variant="solid"
              size="sm"
              action="primary"
              mr="$3"
              onPress={props.CloseOtpModalButtonOnPress}>
              {/* onPress={() => {}}> */}
              <ButtonText>Save</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <RemoveClientAlert
        VerifyRemoveIsInvalid={
          props.RemoveClientAlertProps.VerifyRemoveIsInvalid
        }
        VerifyRemoveOnChangeText={
          props.RemoveClientAlertProps.VerifyRemoveOnChangeText
        }
        VerifyRemoveErrorText={
          props.RemoveClientAlertProps.VerifyRemoveErrorText
        }
        VerifyRemoveOnBlur={props.RemoveClientAlertProps.VerifyRemoveOnBlur}
        VerifyRemoveValue={props.RemoveClientAlertProps.VerifyRemoveValue}
        RemoveDriverAlertIsOpen={
          props.RemoveClientAlertProps.RemoveClientAlertIsOpen
        }
        HandleRemoveDriver={props.RemoveClientAlertProps.HandleRemoveClient}
        CloseAlertOnPress={props.RemoveClientAlertProps.CloseAlertOnPress}
        RemoveDriverConfirmation={
          props.RemoveClientAlertProps.RemoveClientConfirmation
        }
      />
    </View>
  );
};

export default ClientDetailsModal;
