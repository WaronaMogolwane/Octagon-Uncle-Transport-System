import { ChangeEvent } from "react";
import { GestureResponderEvent } from "react-native";

export type RemoveVehicleAlertProps = {
    RemoveVehicleAlertIsOpen: boolean;
    VerifyRemoveIsInvalid: boolean;
    VerifyRemoveOnChangeText: (e: string | ChangeEvent<any>) => void;
    VerifyRemoveErrorText: string | undefined;
    VerifyRemoveOnBlur: (e: any) => void;
    VerifyRemoveValue: string;
    RemoveVehicleConfirmation: string;
    HandleRemoveVehicle: (
        values: GestureResponderEvent | React.FormEvent<HTMLFormElement> | undefined
    ) => void;
    CloseAlertOnPress: () => void;
};
