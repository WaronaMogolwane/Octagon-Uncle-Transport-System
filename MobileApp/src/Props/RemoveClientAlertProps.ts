import { ChangeEvent } from "react";
import { GestureResponderEvent } from "react-native";

export type RemoveClientAlertProps = {
    RemoveClientAlertIsOpen: boolean;
    VerifyRemoveIsInvalid: boolean;
    VerifyRemoveOnChangeText: (e: string | ChangeEvent<any>) => void;
    VerifyRemoveErrorText: string | undefined;
    VerifyRemoveOnBlur: (e: any) => void;
    VerifyRemoveValue: string;
    RemoveClientConfirmation: string;
    HandleRemoveClient: (
        values: GestureResponderEvent | React.FormEvent<HTMLFormElement> | undefined
    ) => void;
    CloseAlertOnPress: () => void;
};
