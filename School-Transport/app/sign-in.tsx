import { router } from "expo-router";
import { FormControlInput } from "../src/Components/FormControl";
import React, { useState } from "react";
import { FormStyles, Theme } from "../src/Stylesheets/GlobalStyles";
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
import { Formik } from 'formik';
import { config } from "@gluestack-ui/config";

import { useSession } from "../src/Services/AuthenticationService";
import { UserSignIn } from "../src/Controllers/AuthenticationController";
import { SignInForm } from "../src/Components/SignInForm";

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

  return (
    <View styles={Theme.container}>
<SignInForm/>
    </View>
  );
}
