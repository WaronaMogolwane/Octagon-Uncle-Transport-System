import { GestureResponderEvent } from 'react-native/Libraries/Types/CoreEventTypes';
import React, { ChangeEvent, useEffect, useState } from 'react';

export type InputProps = {
  isInvalid: boolean;
  isDisabled?: boolean;
  errorText?: string | undefined;
  isRequired: boolean;
  type: 'password' | 'text' | undefined;
  defaultValue?: string;
  placeHolder?: string;
  onBlur?: (e: any) => void;
  size?: 'sm' | 'md' | 'lg' | undefined;
  labelText?: string;
  helperText?: string;
  value?: string;
  onChangeText?: (e: string | ChangeEvent<any>) => void;
};

export type ButtonProps = {
  title?: string;
  size?: 'sm' | 'md' | 'lg' | undefined;
  variant?: string;
  action?: "default" | "negative" | "primary" | "secondary" | "positive" | undefined;
  isDisabled?: boolean;
  isFocusVisible?: boolean;
  buttonText?: string;
  buttonIcon?: any;
  onPress?: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
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
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};
export type SetPasswordFormProps = {
  passwordIsInvalid: boolean;
  passwordOnChangeText: (e: string | ChangeEvent<any>) => void;
  passwordErrorText: string | undefined;
  passwordOnBlur: (e: any) => void;
  passwordValue: string;
  confirmPasswordIsInvalid: boolean;
  confirmPasswordOnChangeText: (e: string | ChangeEvent<any>) => void;
  confirmPasswordErrorText: string | undefined;
  confirmPasswordOnBlur: (e: any) => void;
  confirmPasswordValue: string;
  setPasswordButtonOnPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};
export type SignUpFormProps = {
  passwordIsInvalid: boolean;
  passwordOnChangeText: (e: string | ChangeEvent<any>) => void;
  passwordErrorText: string | undefined;
  passwordOnBlur: (e: any) => void;
  passwordValue: string;
  confirmPasswordIsInvalid: boolean;
  confirmPasswordOnChangeText: (e: string | ChangeEvent<any>) => void;
  confirmPasswordErrorText: string | undefined;
  confirmPasswordOnBlur: (e: any) => void;
  confirmPasswordValue: string;
  emailIsInvalid: boolean;
  emailOnChangeText: (e: string | ChangeEvent<any>) => void;
  emailErrorText: string | undefined;
  emailOnBlur: (e: any) => void;
  emailValue: string;
  signUpButtonOnPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};
export type SelectUserRoleFormProps = {
  userRoleSelectIsInvalid: boolean;
  userRoleSelectOnChangeText: (e: string | ChangeEvent<any>) => void;
  userRoleSelectErrorText: string | undefined;
  userRoleSelectOnBlur: (e: any) => void;
  userRoleSelectValue: string;
  nextButtonOnPress: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};

export type UserDetailsFormProps = {
  firstNameIsInvalid: boolean;
  firstNameOnChangeText: (e: string | ChangeEvent<any>) => void;
  firstNameErrorText: string | undefined;
  firstNameOnBlur: (e: any) => void;
  firstNameValue: string;
  lastNameIsInvalid: boolean;
  lastNameOnChangeText: (e: string | ChangeEvent<any>) => void;
  lastNameErrorText: string | undefined;
  lastNameOnBlur: (e: any) => void;
  lastNameValue: string;
  addressline1IsInvalid: boolean;
  addressline1OnChangeText: (e: string | ChangeEvent<any>) => void;
  addressline1ErrorText: string | undefined;
  addressline1OnBlur: (e: any) => void;
  addressline1Value: string;
  addressline2IsInvalid: boolean;
  addressline2OnChangeText: (e: string | ChangeEvent<any>) => void;
  addressline2ErrorText: string | undefined;
  addressline2OnBlur: (e: any) => void;
  addressline2Value: string;
  suburbIsInvalid: boolean;
  suburbOnChangeText: (e: string | ChangeEvent<any>) => void;
  suburbErrorText: string | undefined;
  suburbOnBlur: (e: any) => void;
  suburbValue: string;
  cityIsInvalid: boolean;
  cityOnChangeText: (e: string | ChangeEvent<any>) => void;
  cityErrorText: string | undefined;
  cityOnBlur: (e: any) => void;
  cityValue: string;
  provinceIsInvalid: boolean;
  provinceOnChangeText: (e: string | ChangeEvent<any>) => void;
  provinceErrorText: string | undefined;
  provinceOnBlur: (e: any) => void;
  provinceValue: string;
  postalCodeIsInvalid: boolean;
  postalCodeOnChangeText: (e: string | ChangeEvent<any>) => void;
  postalCodeErrorText: string | undefined;
  postalCodeOnBlur: (e: any) => void;
  postalCodeValue: string;
  submitUserDetails: (
    values:
      | GestureResponderEvent
      | React.FormEvent<HTMLFormElement>
      | undefined,
  ) => void;
};
