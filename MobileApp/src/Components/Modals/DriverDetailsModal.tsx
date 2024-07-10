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
import {DriverDetailsModalProps} from '../../Props/ModalProps';
import VehicleSelect from '../Cards/Select/VehicleSelect';
import RemoveDriverAlert from '../Alerts/RemoveDriverAlert';
const data: any = [];

const DriverDetailsModal = (props: DriverDetailsModalProps) => {
  return (
    <View>
      <Modal
        isOpen={props.ShowModal}
        onClose={props.CloseOtpModalButtonOnPress}>
        <ModalBackdrop />
        <ModalContent backgroundColor="#fff">
          <ModalHeader>
            <Heading size="lg">Manage Driver</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Image
              source={props.profilePictureUrl}
              alt="Profile picture image."
            />
            <VehicleSelect
              data={data.length ? data : null}
              currentVehicle={''}
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
              onPress={props.OpenRemoveDriverAlert}>
              <ButtonText>Remove driver</ButtonText>
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
      <RemoveDriverAlert
        VerifyRemoveIsInvalid={
          props.RemoveDriverAlertProps.VerifyRemoveIsInvalid
        }
        VerifyRemoveOnChangeText={
          props.RemoveDriverAlertProps.VerifyRemoveOnChangeText
        }
        VerifyRemoveErrorText={
          props.RemoveDriverAlertProps.VerifyRemoveErrorText
        }
        VerifyRemoveOnBlur={props.RemoveDriverAlertProps.VerifyRemoveOnBlur}
        VerifyRemoveValue={props.RemoveDriverAlertProps.VerifyRemoveValue}
        RemoveDriverAlertIsOpen={
          props.RemoveDriverAlertProps.RemoveDriverAlertIsOpen
        }
        HandleRemoveDriver={props.RemoveDriverAlertProps.HandleRemoveDriver}
        CloseAlertOnPress={props.RemoveDriverAlertProps.CloseAlertOnPress}
        RemoveDriverConfirmation={
          props.RemoveDriverAlertProps.RemoveDriverConfirmation
        }
      />
    </View>
  );
};

export default DriverDetailsModal;
