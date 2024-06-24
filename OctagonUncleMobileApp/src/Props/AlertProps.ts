import { ChangeEvent } from "react";
import { GestureResponderEvent } from "react-native";

export type CaptureVehicleImageAlertProps = {
    ShowAlert: boolean;
    AlertTitle: string;
    ConfirmButtonTitle: string;
    AlertDescription: string;
    HandleTakePicture: (
        values: GestureResponderEvent | React.FormEvent<HTMLFormElement> | undefined
    ) => void;
    CancelAlertOnPress: () => void;
};
