import React from "react";
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

type FormControlProps = {
  isValid: boolean;
  isDisabled: boolean;
  isRequired: boolean;
  type: "password" | "text";
  defaultValue: string;
  placeHolder: string;
  size: string;
  labelText: string;
  helperText: string;
  errorText: string;
  onChangeText: (text: any) => void;
};
export const FormControlInput = (props: FormControlProps) => {
  return (
    <FormControl
      isInvalid={props.isValid}
      size={props.size}
      isDisabled={props.isDisabled}
      isRequired={props.isRequired}
    >
      <FormControlLabel>
        <FormControlLabelText>{props.labelText}</FormControlLabelText>
      </FormControlLabel>
      <Input>
        <InputField
          type={props.type}
          defaultValue={props.defaultValue}
          placeholder={props.placeHolder}
          onChangeText={props.onChangeText}
        />
      </Input>

      <FormControlHelper>
        <FormControlHelperText>{props.helperText}</FormControlHelperText>
      </FormControlHelper>

      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>{props.errorText}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};
export const FormControlLabelInput = (props: FormControlProps) => {
  return (
    <FormControl
      isInvalid={props.isValid}
      size={props.size}
      isDisabled={props.isDisabled}
      isRequired={props.isRequired}
    >
      <FormControlLabel>
        <FormControlLabelText>{props.labelText}</FormControlLabelText>
      </FormControlLabel>
      <Input>
        <InputField
          type={props.type}
          defaultValue={props.defaultValue}
          placeholder={props.placeHolder}
          onChangeText={props.onChangeText}
        />
      </Input>

      <FormControlHelper>
        <FormControlHelperText>{props.helperText}</FormControlHelperText>
      </FormControlHelper>

      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>{props.errorText}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};
export const FormInput = (props: FormControlProps) => {
  return (
    <FormControl
      isInvalid={props.isValid}
      size={props.size}
      isDisabled={props.isDisabled}
      isRequired={props.isRequired}
    >
      <FormControlLabel>
        <FormControlLabelText>{props.labelText}</FormControlLabelText>
      </FormControlLabel>
      <Input>
        <InputField
          type={props.type}
          defaultValue={props.defaultValue}
          placeholder={props.placeHolder}
          onChangeText={props.onChangeText}
        />
      </Input>

      <FormControlHelper>
        <FormControlHelperText>{props.helperText}</FormControlHelperText>
      </FormControlHelper>

      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>{props.errorText}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};
