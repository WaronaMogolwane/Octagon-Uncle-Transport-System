import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

export type PaymentMethodCardProps = {
    MaskedCardNumber: string;
    IsActive: boolean;
    CardType: "visa" | "mastercard" | "amex" | "discover" | "jcb" | "diners-club" | "unionpay" | "maestro" | "hiper" | "elo" | "mir" | "paypal";
    IsExpiringSoon?: boolean;
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
    styles?: StyleProp<ViewStyle>;
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