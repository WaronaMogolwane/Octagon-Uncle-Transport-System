import { AddIcon, Button, ButtonIcon, ButtonText } from "@gluestack-ui/themed";
import React from "react";

type ButtonProps = {
  title: string;
  size: string;
  variant: string;
  action: string;
  isDisabled: boolean;
  isFocusVisible: boolean;
  buttonText: string;
  buttonIcon: any;
  onPress: () => void;
};

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
