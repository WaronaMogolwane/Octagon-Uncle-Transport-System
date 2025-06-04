import {ScrollView, StyleSheet, Text, View} from 'react-native';
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
import {Dropdown} from 'react-native-element-dropdown';
import {
  AssignPassengerScreenStyles,
  FormStyles,
} from '../../Stylesheets/GlobalStyles';
import {
  CustomFormControlInputNumber,
  CustomFormControlInput,
} from '../CustomFormInput';
import {BankingDetailDetailModalProps} from '../../Props/ModalProps';

const BankingDetailModal = (props: BankingDetailDetailModalProps) => {
  // Dynamic label for DocumentType dropdown
  const documentTypeLabel =
    props.SelectedAccountType === 'personal'
      ? 'ID / Passport Number'
      : 'Business Registration Number';

  return (
    <Modal
      isOpen={props.ShowModal}
      onClose={props.CloseBankingDetailModalButtonOnPress}>
      <ModalBackdrop />
      <ModalContent style={{backgroundColor: '#ffffff'}}>
        <ModalHeader>
          <Heading size="lg">Banking Details</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody style={{height: '80%'}}>
          <ScrollView>
            <View style={{marginBottom: 20}}>
              <Text>Please enter your banking details below.</Text>
            </View>
            <View>
              <View style={{paddingBottom: 5}}>
                <Text style={[FormStyles.customLabelFont, {marginBottom: 10}]}>
                  Bank Name
                </Text>
                <Dropdown
                  style={[
                    AssignPassengerScreenStyles.dropdown,
                    props.DropdownIsFocus && {borderColor: 'red'},
                  ]}
                  placeholderStyle={
                    AssignPassengerScreenStyles.placeholderStyle
                  }
                  selectedTextStyle={
                    AssignPassengerScreenStyles.selectedTextStyle
                  }
                  inputSearchStyle={
                    AssignPassengerScreenStyles.inputSearchStyle
                  }
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
                  value={props.BankList.find(
                    item => item.name === props.SelectedBankName,
                  )}
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
              <View style={{paddingBottom: 10}}>
                <Text style={[FormStyles.customLabelFont, {marginBottom: 10}]}>
                  Account Type
                </Text>
                <Dropdown
                  style={[
                    AssignPassengerScreenStyles.dropdown,
                    props.DropdownIsFocusAccount && {borderColor: 'red'},
                  ]}
                  placeholderStyle={
                    AssignPassengerScreenStyles.placeholderStyle
                  }
                  selectedTextStyle={
                    AssignPassengerScreenStyles.selectedTextStyle
                  }
                  inputSearchStyle={
                    AssignPassengerScreenStyles.inputSearchStyle
                  }
                  iconStyle={AssignPassengerScreenStyles.iconStyle}
                  data={props.AccountTypeList}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={
                    !props.DropdownIsFocusAccount
                      ? 'Select account type'
                      : 'tap here...'
                  }
                  value={props.SelectedAccountType}
                  onFocus={props.OnFocusAccountTypeDropdown}
                  onBlur={props.OnBlurAccountTypeDropdown}
                  onChange={props.OnChangeAccountTypeDropdown}
                />
              </View>

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
                labelText="Confirm Account Number"
                errorText={props.ComfirmAccountNumberErrorText}
                isInvalid={props.ComfirmAccountNumberIsInvalid}
                isDisabled={false}
                type="text"
                value={props.ComfirmAccountNumberValue}
                onChangeText={props.ComfirmAccountNumberOnChangeText}
                isRequired={false}
                onBlur={props.ComfirmAccountNumberOnBlur}
              />

              <View style={{paddingBottom: 10}}>
                <Text style={[FormStyles.customLabelFont, {marginBottom: 10}]}>
                  {documentTypeLabel}
                </Text>
                <Dropdown
                  style={[
                    AssignPassengerScreenStyles.dropdown,
                    props.DropdownIsFocusDocument && {borderColor: 'red'},
                  ]}
                  placeholderStyle={
                    AssignPassengerScreenStyles.placeholderStyle
                  }
                  selectedTextStyle={
                    AssignPassengerScreenStyles.selectedTextStyle
                  }
                  inputSearchStyle={
                    AssignPassengerScreenStyles.inputSearchStyle
                  }
                  iconStyle={AssignPassengerScreenStyles.iconStyle}
                  data={props.DocumentTypeList}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={
                    !props.DropdownIsFocusDocument
                      ? `Select ${documentTypeLabel.toLowerCase()}`
                      : 'tap here...'
                  }
                  value={props.SelectedDocumentType}
                  onFocus={props.OnFocusDocumentTypeDropdown}
                  onBlur={props.OnBlurDocumentTypeDropdown}
                  onChange={props.OnChangeDocumentTypeDropdown}
                />
              </View>

              <CustomFormControlInputNumber
                labelText="Document Number"
                errorText={props.DocumentNumberErrorText}
                isInvalid={props.DocumentNumberIsInvalid}
                isDisabled={false}
                type="text"
                value={props.DocumentNumberValue}
                onChangeText={props.DocumentNumberOnChangeText}
                isRequired={false}
                onBlur={props.DocumentNumberOnBlur}
              />
            </View>

            <View>
              <Button
                size="sm"
                action="positive"
                borderWidth="$0"
                onPress={props.HandleSubmit}
                style={{marginBottom: 10}}>
                <ButtonText>Submit</ButtonText>
              </Button>
            </View>
          </ScrollView>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BankingDetailModal;
