import React, {useState} from 'react';
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
  AlertCircleIcon,
  View,
} from '@gluestack-ui/themed';
import {FormStyles} from '../Stylesheets/GlobalStyles';
import {InputProps} from '../Models/FormControlProps';

export const CustomFormControlInput = (props: InputProps) => {
  const [showInputText, SetShowInputText] = useState(IsTextInput);

  function IsTextInput(): boolean {
    if (props.type == 'text') {
      return true;
    } else {
      return false;
    }
  }
  const handleState = () => {
    SetShowInputText(showState => {
      return !showState;
    });
  };

  return (
    <View>
      <FormControl
        style={FormStyles.input}
        isInvalid={props.isInvalid}
        size={props.size}
        isDisabled={props.isDisabled}
        isRequired={props.isRequired}>
        <FormControlLabel>
          <FormControlLabelText>{props.labelText}</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField
            type={showInputText ? 'text' : 'password'}
            defaultValue={props.defaultValue}
            placeholder={props.placeHolder}
            onChangeText={props.onChangeText}
            onBlur={props.onBlur}
            value={props.value}
          />
          {props.type == 'password' ? (
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
    </View>
  );
};
