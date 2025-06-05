import {RemovePassengerDriverLinkingFromDB} from './../Data/PassengerDriverVehicleLinkingDAL';
import {ChangeEvent} from 'react';
import {GestureResponderEvent} from 'react-native';
import {RemoveVehicleAlertProps} from './RemoveDriverAlertProps';
import {RemoveClientAlertProps} from './RemoveClientAlertProps';
import {RemoveDriverAlertProps} from './RemoveVehicleAlertProps';

export type VerifyOtpModalProps = {
  ShowModal: boolean;
  ToEmailAddress: string;
  otpIsInvalid: boolean;
  otpOnChangeText: (e: string | ChangeEvent<any>) => void;
  otpErrorText: string | undefined;
  otpOnBlur: (e: any) => void;
  otpValue: string;
  VerifyOtpButtonOnPress: () => void;
  CloseOtpModalButtonOnPress: () => void;
};
export type PaymentScheduleModalProps = {
  ShowModal: boolean;
  AmountIsInvalid: boolean;
  AmountOnChangeText: (e: string | ChangeEvent<any>) => void;
  AmountErrorText: string | undefined;
  AmountOnBlur: (e: any) => void;
  AmountValue: string;
  PaymentDayIsInvalid: boolean;
  PaymentDayOnChangeText: (e: string | ChangeEvent<any>) => void;
  PaymentDayErrorText: string | undefined;
  PaymentDayOnBlur: (e: any) => void;
  PaymentDayValue: string;
  SendInviteOnPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
  CloseModalOnPress: () => void;
  BackOnPpress: () => void;
};
export type InvitationModalProps = {
  ShowModal: boolean;
  firstNameIsInvalid: boolean;
  firstNameOnChangeText: (e: string | ChangeEvent<any>) => void;
  firstNameErrorText: string | undefined;
  firstNameOnBlur: (e: any) => void;
  firstNameValue: string;
  lastNameIsInvalid: boolean;
  lastNameOnChangeText: (e: string | ChangeEvent<any>) => void;
  lastNameErrorText: string | undefined;
  lastNameOnBlur: (e: any) => void;
  lastNameValue: string;
  emailIsInvalid: boolean;
  emailOnChangeText: (e: string | ChangeEvent<any>) => void;
  emailErrorText: string | undefined;
  emailOnBlur: (e: any) => void;
  emailValue: string;
  confirmButtonText?: string;
  SendInviteOnPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
  CloseOtpModalButtonOnPress: () => void;
};
export type DriverDetailsModalProps = {
  ShowModal: boolean;
  firstNameIsInvalid: boolean;
  firstNameOnChangeText: (e: string | ChangeEvent<any>) => void;
  firstNameErrorText: string | undefined;
  firstNameOnBlur: (e: any) => void;
  firstNameValue: string;
  lastNameIsInvalid: boolean;
  lastNameOnChangeText: (e: string | ChangeEvent<any>) => void;
  lastNameErrorText: string | undefined;
  lastNameOnBlur: (e: any) => void;
  lastNameValue: string;
  emailIsInvalid: boolean;
  emailOnChangeText: (e: string | ChangeEvent<any>) => void;
  emailErrorText: string | undefined;
  emailOnBlur: (e: any) => void;
  emailValue: string;
  profilePictureUrl: string;
  vehicleLicenseNumber: string;
  OpenRemoveDriverAlert: () => void;
  CloseOtpModalButtonOnPress: () => void;
  RemoveDriverAlertProps: RemoveDriverAlertProps;
  // RemoveDriverAlertIsOpen: boolean;
  // VerifyRemoveIsInvalid: boolean;
  // VerifyRemoveOnChangeText: (e: string | ChangeEvent<any>) => void;
  // VerifyRemoveErrorText: string | undefined;
  // VerifyRemoveOnBlur: (e: any) => void;
  // VerifyRemoveValue: string;
  // HandleRemoveDriver: (
  //     values: GestureResponderEvent | React.FormEvent<HTMLFormElement> | undefined
  // ) => void;
  // CloseAlertOnPress: () => void;
};
export type ClientDetailsModalProps = {
  ShowModal: boolean;
  firstNameIsInvalid: boolean;
  firstNameOnChangeText: (e: string | ChangeEvent<any>) => void;
  firstNameErrorText: string | undefined;
  firstNameOnBlur: (e: any) => void;
  firstNameValue: string;
  lastNameIsInvalid: boolean;
  lastNameOnChangeText: (e: string | ChangeEvent<any>) => void;
  lastNameErrorText: string | undefined;
  lastNameOnBlur: (e: any) => void;
  lastNameValue: string;
  emailIsInvalid: boolean;
  emailOnChangeText: (e: string | ChangeEvent<any>) => void;
  emailErrorText: string | undefined;
  emailOnBlur: (e: any) => void;
  emailValue: string;
  profilePictureUrl: string;
  vehicleLicenseNumber: string;
  OpenRemoveClientAlert: () => void;
  CloseOtpModalButtonOnPress: () => void;
  RemoveClientAlertProps: RemoveClientAlertProps;
  // RemoveDriverAlertIsOpen: boolean;
  // VerifyRemoveIsInvalid: boolean;
  // VerifyRemoveOnChangeText: (e: string | ChangeEvent<any>) => void;
  // VerifyRemoveErrorText: string | undefined;
  // VerifyRemoveOnBlur: (e: any) => void;
  // VerifyRemoveValue: string;
  // HandleRemoveDriver: (
  //     values: GestureResponderEvent | React.FormEvent<HTMLFormElement> | undefined
  // ) => void;
  // CloseAlertOnPress: () => void;
};

export type BankingDetailDetailModalProps = {
  ShowModal: boolean;
  DropdownIsFocus: boolean;
  DropdownIsFocusAccount: boolean;
  DropdownIsFocusDocument: boolean;
  BankList: any[];
  AccountTypeList: any[];
  DocumentTypeList: any[];
  BranchNumberIsInvalid: boolean;
  BranchNumberErrorText: string | undefined;
  BranchNumberValue: string | undefined;
  BranchNumberOnChangeText: (e: string | ChangeEvent<any>) => void;
  BranchNumberOnBlur: (e: any) => void;
  AccountNameIsInvalid: boolean;
  AccountNameErrorText: string | undefined;
  AccountNameValue: string | undefined;
  AccountNameOnChangeText: (e: string | ChangeEvent<any>) => void;
  AccountNameOnBlur: (e: any) => void;
  AccountNumberIsInvalid: boolean;
  AccountNumberErrorText: string | undefined;
  AccountNumberValue: string | undefined;
  AccountNumberOnChangeText: (e: string | ChangeEvent<any>) => void;
  AccountNumberOnBlur: (e: any) => void;
  ComfirmAccountNumberIsInvalid: boolean;
  ComfirmAccountNumberErrorText: string | undefined;
  ComfirmAccountNumberValue: string | undefined;
  ComfirmAccountNumberOnChangeText: (e: string | ChangeEvent<any>) => void;
  ComfirmAccountNumberOnBlur: (e: any) => void;
  DocumentNumberIsInvalid: boolean;
  DocumentNumberErrorText: string | undefined;
  DocumentNumberValue: string | undefined;
  DocumentNumberOnChangeText: (e: string | ChangeEvent<any>) => void;
  DocumentNumberOnBlur: (e: any) => void;
  SelectedBankName: string;
  SelectedAccountType: string;
  SelectedDocumentType: string;
  OnFocusBankingDetailDropdown: () => void;
  OnBlurBankingDetailDropdown: () => void;
  OnChangeBankingDetailDropdown: (e: any) => void;
  OnFocusAccountTypeDropdown: () => void;
  OnBlurAccountTypeDropdown: () => void;
  OnChangeAccountTypeDropdown: (e: any) => void;
  OnFocusDocumentTypeDropdown: () => void;
  OnBlurDocumentTypeDropdown: () => void;
  OnChangeDocumentTypeDropdown: (e: any) => void;
  CloseBankingDetailModalButtonOnPress: () => void;
  HandleSubmit: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};

export type VehicleDetailsModalProps = {
  setNewLinkedDriver: React.Dispatch<React.SetStateAction<string>>;
  LicenseNumberIsInvalid: boolean;
  LicenseNumberOnChangeText: (e: string | ChangeEvent<any>) => void;
  LicenseNumberErrorText: string | undefined;
  LicenseNumberOnBlur: (e: any) => void;
  LicenseNumberValue: string;
  RegistrationNumberIsInvalid: boolean;
  RegistrationNumberOnChangeText: (e: string | ChangeEvent<any>) => void;
  RegistrationNumberErrorText: string | undefined;
  RegistrationNumberOnBlur: (e: any) => void;
  RegistrationNumberValue: string;
  VinIsInvalid: boolean;
  VinOnChangeText: (e: string | ChangeEvent<any>) => void;
  VinErrorText: string | undefined;
  VinOnBlur: (e: any) => void;
  VinValue: string;
  EngineNumberIsInvalid: boolean;
  EngineNumberOnChangeText: (e: string | ChangeEvent<any>) => void;
  EngineNumberErrorText: string | undefined;
  EngineNumberOnBlur: (e: any) => void;
  EngineNumberValue: string;
  MakeIsInvalid: boolean;
  MakeOnChangeText: (e: string | ChangeEvent<any>) => void;
  MakeErrorText: string | undefined;
  MakeOnBlur: (e: any) => void;
  MakeValue: string;
  ModelIsInvalid: boolean;
  ModelOnChangeText: (e: string | ChangeEvent<any>) => void;
  ModelErrorText: string | undefined;
  ModelOnBlur: (e: any) => void;
  ModelValue: string;
  ColourIsInvalid: boolean;
  ColourOnChangeText: (e: string | ChangeEvent<any>) => void;
  ColourErrorText: string | undefined;
  ColourOnBlur: (e: any) => void;
  ColourValue: string;
  CurrentDriverId: string | null;
  LicenseDiskImageUrl: string;
  VehicleImageFrontUrl: string;
  VehicleImageBackUrl: string;
  ShowModal: boolean;
  OpenRemoveVehicleAlert: () => void;
  HandleCloseModal: () => void;
  RemoveVehicleAlertProps: RemoveVehicleAlertProps;
  DriverList: [];
  onDriverChange: (e: string | ChangeEvent<any>) => void;
  NewLinkedDriverId: string;
  HandleUnlinkDriver: () => void;
  HandleLinkDriver: () => void;
  HandleReScan: () => void;
  HandleSaveVehicle: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};
