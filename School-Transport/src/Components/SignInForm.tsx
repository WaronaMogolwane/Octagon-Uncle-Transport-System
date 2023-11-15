import React, { useState } from "react";
import { Formik } from "formik";
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
  Theme,
} from "@gluestack-ui/themed";
import { FormStyles, ThemeStyles } from "../Stylesheets/GlobalStyles";
export const SignInForm = ({
  isInvalid,
  isDisabled,
  errorText,
  isRequired,
  type,
  defaultValue,
  placeHolder,
  size,
  labelText,
  helperText,
}: any) => {
  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values) => console.log(values)}
    >
      <View style={FormStyles.container}></View>
    </Formik>
  );
};
