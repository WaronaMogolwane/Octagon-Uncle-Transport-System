import {View, GestureResponderEvent} from 'react-native';
import React, {ChangeEvent, useState} from 'react';
import {
  CircleIcon,
  FormControl,
  Heading,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  VStack,
  Text,
  FormControlErrorIcon,
  FormControlError,
  FormControlErrorText,
  AlertCircleIcon,
} from '@gluestack-ui/themed';
import {CustomButton1} from '../Buttons';
import {
  ButtonProps,
  SelectUserRoleFormProps,
  SignInFormProps,
} from '../../Models/FormControlProps';

const SelectUserRoleForm = (props: SelectUserRoleFormProps) => {
  return (
    <View>
      <FormControl>
        <VStack space="md">
          <Heading size="sm">What type of user are you?</Heading>
          <RadioGroup
            value={props.userRoleSelectValue}
            onChange={props.userRoleSelectOnChangeText}>
            <VStack space="sm">
              <Radio value="1" size="md">
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>Transporter</RadioLabel>
              </Radio>
              <Radio value="2" size="md">
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>Driver</RadioLabel>
              </Radio>
              <Radio value="3" size="md">
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>Client</RadioLabel>
              </Radio>
            </VStack>
          </RadioGroup>
          <Text fontSize="$sm" color="$textLight500">
            Choose how you will be using the app
          </Text>
        </VStack>
      </FormControl>

      <CustomButton1 title="Next" onPress={props.nextButtonOnPress} />
    </View>
  );
};

export default SelectUserRoleForm;
