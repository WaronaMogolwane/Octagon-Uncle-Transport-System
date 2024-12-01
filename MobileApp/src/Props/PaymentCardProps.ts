import { GestureResponderEvent } from "react-native";

export type PaymentCardProps = {
    NumberOfPayments: string;
    Amount: string;
    CurrentPeriod: string;
    PaymentsType: "Expected" | "Declined"
    HandlePress?: (
        values:
            | GestureResponderEvent
            | React.FormEvent<HTMLFormElement>
            | undefined,
    ) => void;
};
