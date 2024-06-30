import { ChangeEvent } from "react";
import { GestureResponderEvent } from "react-native";

export type RemoveDriverAlertProps = {
    RemoveDriverAlertIsOpen: boolean;
    VerifyRemoveIsInvalid: boolean;
    VerifyRemoveOnChangeText: (e: string | ChangeEvent<any>) => void;
    VerifyRemoveErrorText: string | undefined;
    VerifyRemoveOnBlur: (e: any) => void;
    VerifyRemoveValue: string;
    RemoveDriverConfirmation: string;
    HandleRemoveDriver: (
        values: GestureResponderEvent | React.FormEvent<HTMLFormElement> | undefined
    ) => void;
    CloseAlertOnPress: () => void;
};
