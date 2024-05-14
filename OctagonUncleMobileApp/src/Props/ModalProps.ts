import { ChangeEvent } from "react";
import { GestureResponderEvent } from "react-native";
import { RemoveDriverAlertProps } from "./RemoveDriverAlertProps";
import { RemoveClientAlertProps } from "./RemoveClientAlertProps";

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