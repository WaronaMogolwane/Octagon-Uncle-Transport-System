import React from 'react';
import {Button, ButtonText, ButtonIcon} from '@gluestack-ui/themed';
import {ButtonProps} from '../Models/FormControlProps';

export const CustomButton1 = (props: ButtonProps) => {
  return (
    <Button
      mb="$2"
      size="md"
      variant="solid"
      style={props.styles}
      action={props.action}
      isDisabled={props.isDisabled}
      isFocusVisible={props.isFocusVisible}
      onPress={props.onPress}>
      <ButtonText>{props.title}</ButtonText>
    </Button>
  );
};
export const CustomButton2 = (props: ButtonProps) => {
  return (
    <Button
      mb="$2"
      size={props.size}
      variant="outline"
      action={props.action}
      style={props.styles}
      isDisabled={props.isDisabled}
      isFocusVisible={props.isFocusVisible}
      onPress={props.onPress}>
      <ButtonText>{props.title}</ButtonText>
      <ButtonIcon as={props.buttonIcon} />
    </Button>
  );
};
export const CustomButton3 = (props: ButtonProps) => {
  return (
    <Button
      size={props.size}
      variant="link"
      style={props.styles}
      action={props.action}
      isDisabled={props.isDisabled}
      isFocusVisible={props.isFocusVisible}
      onPress={props.onPress}>
      <ButtonText>{props.title}</ButtonText>
    </Button>
  );
};
