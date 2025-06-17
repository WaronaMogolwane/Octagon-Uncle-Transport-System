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
  PaymentScheduleModalProps,
  VerifyOtpModalProps,
} from '../../Props/ModalProps';

const PaymentScheduleModal = (props: PaymentScheduleModalProps) => {
  return (
    <View>
      <Modal isOpen={props.ShowModal} onClose={props.CloseModalOnPress}>
        <ModalBackdrop />
        <ModalContent style={{backgroundColor: '#ffffff'}}>
          <ModalHeader>
            <Heading size="lg">Create Payment Plan</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <CustomFormControlInput
              labelText="Amount"
              placeHolder="0.00"
              isInvalid={props.AmountIsInvalid}
              isRequired={true}
              type="text"
              onChangeText={props.AmountOnChangeText}
              errorText={props.AmountErrorText}
              onBlur={props.AmountOnBlur}
              value={props.AmountValue}
            />
            <CustomFormControlInput
              labelText="Payment Day"
              placeHolder="Day of the month"
              isInvalid={props.PaymentDayIsInvalid}
              isRequired={true}
              type="text"
              onChangeText={props.PaymentDayOnChangeText}
              errorText={props.PaymentDayErrorText}
              onBlur={props.PaymentDayOnBlur}
              value={props.PaymentDayValue}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={props.BackOnPpress}>
              <ButtonText>Back</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={props.SendInviteOnPress}>
              <ButtonText>Send</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>
  );
};

export default PaymentScheduleModal;
