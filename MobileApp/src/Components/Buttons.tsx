import React from 'react';
import {Button, ButtonText, ButtonIcon, Text} from '@gluestack-ui/themed';
import {ButtonProps} from '../Models/FormControlProps';

export const CustomButton1 = (props: ButtonProps) => {
  return (
    <Button
      mb="$2"
      size={props.size}
      variant="solid"
      style={props.styles}
      action={props.action}
      isDisabled={props.isDisabled}
      isFocusVisible={props.isFocusVisible}
      onPress={props.onPress}
      borderRadius={10}>
      <ButtonText color={props.textColor}>{props.title}</ButtonText>
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
      onPress={props.onPress}
      borderColor={props.color}>
      {props.leftButtonIcon ? (
        <ButtonIcon
          style={{marginRight: 16, width: 32}}
          as={props.leftButtonIcon}
          color={props.color}
          size="xl"
        />
      ) : null}
      <Text color={props.textColor} style={{fontSize: 16, fontWeight: '700'}}>
        {props.title}
      </Text>
      <ButtonIcon
        as={props.buttonIcon}
        style={props.buttonIcontyles}
        color={props.color}
      />
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
