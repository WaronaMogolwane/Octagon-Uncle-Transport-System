import { router } from "expo-router";
import { Button } from "react-native";
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
import { CustomButton } from "../src/Components/Button";
export default function SignIn() {
  const { signIn, session }: any = useSession();
  const ref = React.useRef(null);

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

    onSubmit: async (values, { resetForm }) => {
      console.log("Form Valid: " + formik.isValid);

      await signIn("test", "test", (error: any, result: any) => {
        if (formik.isValid) {
          if (error) {
            console.log(error);
          } else if (result) {
            //console.log(result);
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
            console.log("Sign In session " + session);
            router.replace("/");
          }
        }
      });
    },
  });

  const ForgotPassword = () => {
    router.push("/Forgot-Password/");
  };
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
      <Button onPress={ForgotPassword} title="Forgot Password" />
    </SafeAreaView>
  );
}
