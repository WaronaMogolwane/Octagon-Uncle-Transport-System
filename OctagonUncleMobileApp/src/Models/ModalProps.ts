import { ChangeEvent } from "react";
import { GestureResponderEvent } from "react-native";

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