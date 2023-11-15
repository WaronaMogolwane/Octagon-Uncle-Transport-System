import { router } from "expo-router";
import { FormControlInput } from "../src/Components/FormControl";
import React, { useState } from "react";
import { FormStyles, ThemeStyles } from "../src/Stylesheets/GlobalStyles";
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
} from "@gluestack-ui/themed";
import { Formik } from "formik";
import { config } from "@gluestack-ui/config";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useSession } from "../src/Services/AuthenticationService";
import { UserSignIn } from "../src/Controllers/AuthenticationController";
import { SignInForm } from "../src/Components/SignInForm";
import axios from "axios";
export default function SignIn() {
  const { signIn }: any = useSession();

  const ref = React.useRef(null);

  const UserAuth = {
    SignIn: (userEmail: string, userPassword: string) => {
      UserSignIn(userEmail, userPassword)
        .then((response) => {
          console.log(response);
          signIn(userEmail, userPassword);
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace("/");
        })
        .catch((error) => {
          console.log(error);
          // setPasswordInput({
          //   isInvalid: false,
          //   isDisabled: false,
          //   errorText: "Email and password do not match.",
          // });
        });
    },
    ValidateLoginInputs: (email: string, password: string) => {},
  };

  const apiCall = () => {
    fetch("http://192.168.1.36:9999/auth/send-email-otp", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userDetails: {
          email: "mogolwanew@gmail.com",
          userId: "",
          firstName: "Warona",
        },
      }),
    });
  };
  return (
    <SafeAreaView style={FormStyles.container}>
      <Button>
        <ButtonText onPress={apiCall}>Press me</ButtonText>
      </Button>
    </SafeAreaView>
  );
}
