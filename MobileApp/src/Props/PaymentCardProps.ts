import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

export type PaymentMethodCardProps = {
    MaskedCardNumber: string;
    IsActive: boolean;
    CardType: string;
    HandlePress?: (
        values:
            | GestureResponderEvent
            | React.FormEvent<HTMLFormElement>
            | undefined,
    ) => void;
};
export type MonthlyPaymentDetailsCardProps = {
    Amount: string;
    PaymentFailed: boolean;
    NextPaymentDate: string;
    HandlePayNowPress?: (
        values:
            | GestureResponderEvent
            | React.FormEvent<HTMLFormElement>
            | undefined,
    ) => void;
    styles?: StyleProp<ViewStyle>;
};
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
export type PaymentHistoryCardProps = {
    FirstName: string;
    LastName: string;
    Date: string;
    Amount: string;
    Status: "success" | "failed" | 'refunded'
    UserRole: number
    HandleCardPress?: (
        values:
            | GestureResponderEvent
            | React.FormEvent<HTMLFormElement>
            | undefined,
    ) => void;
    HandlePayNowPress?: (
        values:
            | GestureResponderEvent
            | React.FormEvent<HTMLFormElement>
            | undefined,
    ) => void;
};
