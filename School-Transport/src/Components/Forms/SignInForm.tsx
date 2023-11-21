import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { config } from "@gluestack-ui/config";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";
import {
  GluestackUIProvider,
  Text,
  Box,
  FormControlLabel,
  FormControl,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  AlertCircleIcon,
  Input,
  InputField,
  Button,
  ButtonText,
  Modal,
  ModalBackdrop,
  ModalBody,
  useToast,
  Toast,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalContent,
  Heading,
  Icon,
  CloseIcon,
  Image,
  View,
  AddIcon,
  ButtonIcon,
  Theme,
  VStack,
  InputSlot,
  InputIcon,
  EyeIcon,
  ToastTitle,
  EyeOffIcon,
} from "@gluestack-ui/themed";
import { GluestackUIStyledProvider } from "@gluestack-ui/themed";
//import { config } from "./../../../gluestack-ui.config";
import { FormStyles, ThemeStyles } from "../../Stylesheets/GlobalStyles";
import { GestureResponderEvent } from "react-native/Libraries/Types/CoreEventTypes";
import { CustomFormControlInput } from "../CustomFormInput";
import { CustomButton } from "../Button";
import {
  ButtonProps,
  InputProps,
  SignInFormProps,
} from "../../Models/FormControlProps";

export function SignInForm(props: SignInFormProps) {
  return (
    <View>
      <Heading mb="$3">Sign In</Heading>
      <VStack>
        <CustomFormControlInput
          labelText="Email"
          placeHolder="email"
          isInvalid={props.emailIsInvalid}
          isRequired={true}
          type="text"
          onChangeText={props.emailOnChangeText}
          errorText={props.emailErrorText}
          onBlur={props.emailOnBlur}
          value={props.emailValue}
        />

        <CustomFormControlInput
          labelText="Password"
          placeHolder="password"
          isInvalid={props.passwordIsInvalid}
          isRequired={true}
          type="password"
          onChangeText={props.passwordOnChangeText}
          errorText={props.passwordErrorText}
          onBlur={props.passwordOnBlur}
          value={props.passwordValue}
        />
        <CustomButton title={"Sign In"} onPress={props.signInButtonOnPress} />
      </VStack>
    </View>
  );
}
