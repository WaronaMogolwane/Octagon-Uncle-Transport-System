import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  Heading,
  AlertDialogCloseButton,
  Icon,
  CloseIcon,
  AlertDialogBody,
  AlertDialogFooter,
  ButtonGroup,
  ButtonText,
  Input,
  InputField,
  Text,
  Button,
} from '@gluestack-ui/themed';
import React from 'react';
import {CustomFormControlInput} from '../CustomFormInput';
import {RemoveVehicleAlertProps} from '../../Props/RemoveDriverAlertProps';
String.prototype.format = function () {
  var args = arguments;
  return this.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] == 'undefined' ? match : args[index];
  });
};

const RemoveVehicleAlert = (props: RemoveVehicleAlertProps) => {
  return (
    <AlertDialog
      isOpen={props.RemoveVehicleAlertIsOpen}
      onClose={props.CloseAlertOnPress}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading size="lg">Remove vehicle</Heading>
          <AlertDialogCloseButton>
            <Icon as={CloseIcon} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text size="sm">
            Are you sure you want to remove
            {' {0}'.format(props.RemoveVehicleConfirmation)}? Any driver linked
            to this vehicled will be unlinked.
          </Text>
          <Text size="sm" highlight={true} bold={true}>
            Enter
            {' {0} '.format(props.RemoveVehicleConfirmation)}
            to remove the vehicle.
          </Text>
          <CustomFormControlInput
            placeHolder={' {0} '.format(props.RemoveVehicleConfirmation)}
            type="text"
            isInvalid={props.VerifyRemoveIsInvalid}
            onChangeText={props.VerifyRemoveOnChangeText}
            errorText={props.VerifyRemoveErrorText}
            value={props.VerifyRemoveValue}
            isRequired={true}
          />
        </AlertDialogBody>
        <AlertDialogFooter>
          <ButtonGroup space="lg">
            <Button
              size="md"
              variant="outline"
              action="secondary"
              onPress={props.CloseAlertOnPress}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              bg="$error600"
              action="negative"
              onPress={props.HandleRemoveVehicle}>
              <ButtonText>Remove</ButtonText>
            </Button>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveVehicleAlert;
