import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Modal,
  Button,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Toast,
  ToastTitle,
  VStack,
} from '@gluestack-ui/themed';
import {toast} from '@lucide/lab';
import {Dropdown} from 'react-native-element-dropdown';
import {ref} from 'yup';
import {AssignPassengerScreenStyles} from '../../Stylesheets/GlobalStyles';
import {
  CustomFormControlInputNumber,
  CustomFormControlInput,
} from '../CustomFormInput';
import {BankingDetailDetailModalProps} from '../../Props/ModalProps';

const BankingDetailModal = (props: BankingDetailDetailModalProps) => {
  return (
    <Modal
      isOpen={props.ShowModal}
      onClose={props.CloseBankingDetailModalButtonOnPress}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Banking Details</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <View style={{marginBottom: 20}}>
            <Text>Please enter you banking details below.</Text>
          </View>
          <View>
            <View style={{width: '90%', paddingBottom: 20}}>
              <Dropdown
                style={[
                  AssignPassengerScreenStyles.dropdown,
                  props.DropdownIsFocus && {borderColor: 'red'},
                ]}
                placeholderStyle={AssignPassengerScreenStyles.placeholderStyle}
                selectedTextStyle={
                  AssignPassengerScreenStyles.selectedTextStyle
                }
                inputSearchStyle={AssignPassengerScreenStyles.inputSearchStyle}
                iconStyle={AssignPassengerScreenStyles.iconStyle}
                data={props.BankList}
                search={true}
                maxHeight={300}
                labelField="name"
                valueField="name"
                placeholder={
                  !props.DropdownIsFocus ? 'Select bank name' : 'tap here...'
                }
                searchPlaceholder="Search..."
                value={props.BankList}
                onFocus={props.OnFocusBankingDetailDropdown}
                onBlur={props.OnBlurBankingDetailDropdown}
                onChange={props.OnChangeBankingDetailDropdown}
              />
            </View>
          </View>
          <View>
            <CustomFormControlInputNumber
              labelText="Branch Number"
              isInvalid={props.BranchNumberIsInvalid}
              errorText={props.BranchNumberErrorText}
              isDisabled={false}
              type="text"
              value={props.BranchNumberValue}
              onChangeText={props.BranchNumberOnChangeText}
              isRequired={false}
              onBlur={props.BranchNumberOnBlur}
            />
            <CustomFormControlInput
              labelText="Account Name"
              errorText={props.AccountNameErrorText}
              isInvalid={props.AccountNameIsInvalid}
              isDisabled={false}
              type="text"
              value={props.AccountNameValue}
              onChangeText={props.AccountNameOnChangeText}
              isRequired={false}
              onBlur={props.AccountNameOnBlur}
            />
            <CustomFormControlInputNumber
              labelText="Account Number"
              errorText={props.AccountNumberErrorText}
              isInvalid={props.AccountNumberIsInvalid}
              isDisabled={false}
              type="text"
              value={props.AccountNumberValue}
              onChangeText={props.AccountNumberOnChangeText}
              isRequired={false}
              onBlur={props.AccountNumberOnBlur}
            />

            <CustomFormControlInputNumber
              labelText="Comfirm Account Number"
              errorText={props.ComfirmAccountNumberErrorText}
              isInvalid={props.ComfirmAccountNumberIsInvalid}
              isDisabled={false}
              type="text"
              value={props.ComfirmAccountNumberValue}
              onChangeText={props.ComfirmAccountNumberOnChangeText}
              isRequired={false}
              onBlur={props.ComfirmAccountNumberOnBlur}
            />
          </View>
          <View>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={props.HandleSubmit}>
              <ButtonText>Submit</ButtonText>
            </Button>
          </View>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BankingDetailModal;
