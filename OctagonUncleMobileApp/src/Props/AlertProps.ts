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
export type NotificationAlertProps = {
    // Action: "Primary" | 'Danger'
    ShowAlert: boolean;
    AlertTitle: string;
    ConfirmButtonTitle: string;
    AlertDescription: string;
    HandleConfirm: () => void;
    HandleCancel: () => void;
};
