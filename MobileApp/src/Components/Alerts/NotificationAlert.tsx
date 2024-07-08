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
  Center,
  HStack,
  CheckCircleIcon,
} from '@gluestack-ui/themed';
import React from 'react';
import {CustomFormControlInput} from '../CustomFormInput';
import {RemoveVehicleAlertProps} from '../../Props/RemoveDriverAlertProps';
import {AlertTriangleIcon} from 'lucide-react-native';
import {
  CaptureVehicleImageAlertProps,
  NotificationAlertProps,
} from '../../Props/AlertProps';
import {ActivityIndicator} from 'react-native';
String.prototype.format = function () {
  var args = arguments;
  return this.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] == 'undefined' ? match : args[index];
  });
};

const NotificationAlert = (props: NotificationAlertProps) => {
  return (
    <>
      <AlertDialog
        isOpen={props.ShowAlert}
        onClose={() => {
          props.HandleCancel;
        }}
        size="md">
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader borderBottomWidth="$0">
            <HStack space="sm" alignItems="center">
              <Heading size="lg">{props.AlertTitle}</Heading>
            </HStack>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>{props.AlertDescription}</Text>
          </AlertDialogBody>
          <AlertDialogFooter borderTopWidth="$0">
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={props.HandleCancel}>
                <ButtonText fontSize="$md">Close</ButtonText>
              </Button>
              <Button
                action="primary"
                onPress={props.HandleConfirm}
                bgColor="$darkBlue700">
                <ButtonText>{props.ConfirmButtonTitle}</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NotificationAlert;
