import { router } from "expo-router";
import { useFormik } from "formik";
import * as yup from "yup";
import { GestureResponderEvent } from "react-native/Libraries/Types/CoreEventTypes";
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
  useToast,
  Toast,
  ToastTitle,
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
import { SignInForm } from "../src/Components/Forms/SignInForm";
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

  const registerSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      )
      .required("Password is required"),
  });

  const registerInitialValues = {
    email: "",
    password: "",
  };

  const toast = useToast();
  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerSchema,

    onSubmit: (values, { resetForm }) => {
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          return (
            <Toast nativeID={id} variant="accent" action="success">
              <ToastTitle>Signed in successfully</ToastTitle>
            </Toast>
          );
        },
      });
      resetForm();
    },
  });
  return (
    <SafeAreaView style={ThemeStyles.container}>
      <SignInForm
        emailIsInvalid={!!formik.errors.email}
        emailOnChangeText={formik.handleChange("email")}
        emailErrorText={formik?.errors?.email}
        emailOnBlur={formik.handleBlur("email")}
        emailValue={formik.values?.email}
        passwordIsInvalid={!!formik.errors.password}
        passwordOnChangeText={formik.handleChange("password")}
        passwordErrorText={formik?.errors?.password}
        passwordOnBlur={formik.handleBlur("password")}
        passwordValue={formik.values?.password}
        signInButtonOnPress={
          formik.handleSubmit as (
            values:
              | GestureResponderEvent
              | React.FormEvent<HTMLFormElement>
              | undefined
          ) => void
        }
      />
    </SafeAreaView>
  );
}
