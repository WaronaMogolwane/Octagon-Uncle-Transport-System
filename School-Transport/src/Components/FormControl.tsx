import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Input,
  InputField,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  Button,
  ButtonText,
  Box,
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  Textarea,
  TextareaInput,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  VStack,
  Heading,
  Text,
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
} from "@gluestack-ui/themed";
import { FormStyles } from "../Stylesheets/GlobalStyles";

export const FormControlInput = ({
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
  onChangeText,
}: any) => {
  return (
    <FormControl
      style={FormStyles.input}
      isInvalid={isInvalid}
      size={size}
      isDisabled={isDisabled}
      isRequired={isRequired}>
      <FormControlLabel>
        <FormControlLabelText>{labelText}</FormControlLabelText>
      </FormControlLabel>
      <Input>
        <InputField
          type={type}
          defaultValue={defaultValue}
          placeholder={placeHolder}
          onChangeText={onChangeText}/>
      </Input>
      <FormControlHelper>
        <FormControlHelperText>{helperText}</FormControlHelperText>
      </FormControlHelper>
      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon}/>
        <FormControlErrorText>{errorText}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};
