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
  EditIcon,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  ButtonGroup,
} from '@gluestack-ui/themed';
import {
  DriverDetailsModalProps,
  VerifyOtpModalProps,
} from '../../Models/ModalProps';
import VehicleSelect from '../Cards/Select/VehicleSelect';

const data: any = [
  // {label: 'BHD842GP', value: '1'},
  // {label: 'Item 2', value: '2'},
  // {label: 'Item 3', value: '3'},
  // {label: 'Item 4', value: '4'},
  // {label: 'Item 5', value: '5'},
  // {label: 'Item 6', value: '6'},
  // {label: 'Item 7', value: '7'},
  // {label: 'Item 8', value: '8'},
];

const ManageDriverModal = (props: DriverDetailsModalProps) => {
  const [showRemoveDriverDialog, setShowRemoveDriverDialog] =
    React.useState(false);
  function RemoveDriver(driverId: string) {
    //throw new Error('Function not implemented.');
  }
  const RemoveDriverAlert = () => {
    return (
      <AlertDialog
        isOpen={showRemoveDriverDialog}
        onClose={() => {
          setShowRemoveDriverDialog(false);
        }}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">Remove driver</Heading>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm">
              Are you sure you want to remove{' '}
              {props.firstNameValue + ' ' + props.lastNameValue} as your driver?
              Any vehicle linked to this driver will have to be linked to
              another driver.
            </Text>
            <Text size="sm" highlight={true}>
              Enter{' "'}
              {props.firstNameValue + ' ' + props.lastNameValue}" to remove the driver.
            </Text>
            <CustomFormControlInput
              placeHolder={props.firstNameValue + ' ' + props.lastNameValue}
              isRequired={false}
              isInvalid={false}
            />
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowRemoveDriverDialog(false);
                }}>
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                bg="$error600"
                action="negative"
                onPress={() => {
                  RemoveDriver('');
                  setShowRemoveDriverDialog(false);
                }}>
                <ButtonText>Remove</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

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
              // onPress={props.HandleRemoveDriver}>
              onPress={() => {
                setShowRemoveDriverDialog(true);
              }}>
              <ButtonText>Remove driver</ButtonText>
            </Button>
            <Button
              variant="solid"
              size="sm"
              action="primary"
              mr="$3"
              // onPress={props.CloseOtpModalButtonOnPress}>
              onPress={() => {}}>
              <ButtonText>Save</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <RemoveDriverAlert />
    </View>
  );
};

export default ManageDriverModal;
