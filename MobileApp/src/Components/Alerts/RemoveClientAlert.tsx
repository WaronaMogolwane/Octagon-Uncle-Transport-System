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
import {RemoveClientAlertProps} from '../../Props/RemoveClientAlertProps';
String.prototype.format = function () {
  var args = arguments;
  return this.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] == 'undefined' ? match : args[index];
  });
};

const RemoveClientAlert = (props: RemoveClientAlertProps) => {
  return (
    <AlertDialog
      isOpen={props.RemoveClientAlertIsOpen}
      onClose={props.CloseAlertOnPress}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading size="lg">Remove client</Heading>
          <AlertDialogCloseButton>
            <Icon as={CloseIcon} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text size="sm">
            Are you sure you want to remove
            {' {0} '.format(props.RemoveClientConfirmation)}
            as your driver? Any vehicle linked to this driver will have to be
            linked to another driver.
          </Text>
          <Text size="sm" highlight={true}>
            Enter
            {' {0} '.format(props.RemoveClientConfirmation)}
            to remove the driver.
          </Text>
          <CustomFormControlInput
            placeHolder={' {0} '.format(props.RemoveClientConfirmation)}
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
              onPress={props.HandleRemoveClient}>
              <ButtonText>Remove</ButtonText>
            </Button>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveClientAlert;
