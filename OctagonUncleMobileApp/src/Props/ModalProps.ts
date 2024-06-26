import { RemovePassengerDriverLinkingFromDB } from './../Data/PassengerDriverVehicleLinkingDAL';
import { ChangeEvent } from "react";
import { GestureResponderEvent } from "react-native";
import { RemoveVehicleAlertProps } from "./RemoveDriverAlertProps";
import { RemoveClientAlertProps } from "./RemoveClientAlertProps";
import { RemoveDriverAlertProps } from './RemoveVehicleAlertProps';

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
    SendInviteOnPress: (
        values: GestureResponderEvent | React.FormEvent<HTMLFormElement> | undefined
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
export type VehicleDetailsModalProps = {
    setNewLinkedDriver: React.Dispatch<React.SetStateAction<string>>
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
    CloseOtpModalButtonOnPress: () => void;
    RemoveVehicleAlertProps: RemoveVehicleAlertProps;
    DriverList: [];
    onDriverChange: (e: string | ChangeEvent<any>) => void;
    HandleSaveVehicle: (
        values:
            | GestureResponderEvent
            | React.FormEvent<HTMLFormElement>
            | undefined,
    ) => void;
};
