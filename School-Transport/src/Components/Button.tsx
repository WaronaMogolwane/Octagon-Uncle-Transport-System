import React from "react";
import { GestureResponderEvent } from "react-native/Libraries/Types/CoreEventTypes";
import { useFormik } from "formik";
import * as yup from "yup";

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
import { ButtonProps } from "../Models/FormControlProps";

export const CustomButton = (props: ButtonProps) => {
  return (
    <Button
      size="md"
      variant="solid"
      action="primary"
      isDisabled={props.isDisabled}
      isFocusVisible={props.isFocusVisible}
      onPress={props.onPress}
    >
      <ButtonText>{props.title} </ButtonText>
      <ButtonIcon as={props.buttonIcon} />
    </Button>
  );
};
