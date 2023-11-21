import React, { ChangeEvent, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  InputIcon,
  InputSlot,
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
  EyeOffIcon,
  EyeIcon,
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
import { InputProps } from "../Models/FormControlProps";

export const CustomFormControlInput = (props: InputProps) => {
  const [showInputText, SetShowInputText] = useState(IsTextInput);

  function IsTextInput(): boolean {
    if (props.type == "text") {
      return true;
    } else {
      return false;
    }
  }
  const handleState = () => {
    SetShowInputText((showState) => {
      return !showState;
    });
  };

  return (
    <FormControl
      style={FormStyles.input}
      isInvalid={props.isInvalid}
      size={props.size}
      isDisabled={props.isDisabled}
      isRequired={props.isRequired}
    >
      <FormControlLabel>
        <FormControlLabelText>{props.labelText}</FormControlLabelText>
      </FormControlLabel>
      <Input>
        <InputField
          type={showInputText ? "text" : "password"}
          defaultValue={props.defaultValue}
          placeholder={props.placeHolder}
          onChangeText={props.onChangeText}
          onBlur={props.onBlur}
          value={props.value}
        />
        {props.type == "password" ? (
          <InputSlot onPress={handleState} pr="$3">
            <InputIcon as={showInputText ? EyeIcon : EyeOffIcon} />
          </InputSlot>
        ) : null}
      </Input>
      {props.helperText ? (
        <FormControlHelper>
          <FormControlHelperText>{props.helperText}</FormControlHelperText>
        </FormControlHelper>
      ) : null}
      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>{props.errorText}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};
