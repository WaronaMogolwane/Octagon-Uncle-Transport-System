import { GestureResponderEvent } from 'react-native/Libraries/Types/CoreEventTypes';
import React, { ChangeEvent, useEffect, useState } from "react";

export type InputProps = {
    isInvalid: boolean;
    isDisabled?: boolean;
    errorText?: string | undefined;
    isRequired: boolean;
    type: "password" | "text" | undefined;
    defaultValue?: string;
    placeHolder?: string;
    onBlur?: (e: any) => void;
    size?: string;
    labelText?: string;
    helperText?: string;
    value?: string;
    onChangeText?: (e: string | ChangeEvent<any>) => void;
};

export type ButtonProps = {
    title?: string;
    size?: string;
    variant?: string;
    action?: string;
    isDisabled?: boolean;
    isFocusVisible?: boolean;
    buttonText?: string;
    buttonIcon?: any;
    onPress: (
        values: GestureResponderEvent | React.FormEvent<HTMLFormElement> | undefined
    ) => void;
};

export type SignInFormProps = {
    emailIsInvalid: boolean;
    emailOnChangeText: (e: string | ChangeEvent<any>) => void;
    emailErrorText: string | undefined;
    emailOnBlur: (e: any) => void;
    emailValue: string;
    passwordIsInvalid: boolean;
    passwordOnChangeText: (e: string | ChangeEvent<any>) => void;
    passwordErrorText: string | undefined;
    passwordOnBlur: (e: any) => void;
    passwordValue: string;
    signInButtonOnPress: (
        values: GestureResponderEvent | React.FormEvent<HTMLFormElement> | undefined
    ) => void;
}