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
import {SelectUserRoleFormStyles} from '../../Stylesheets/GlobalStyles';

export const SelectUserRoleForm = (props: SelectUserRoleFormProps) => {
  return (
    <View>
      <FormControl>
        <VStack space="md">
          {/* <Heading size="sm">What type of user are you?</Heading> */}
          <Text style={SelectUserRoleFormStyles.loginText}>
            What type of user are you?
          </Text>

          <Text fontSize="$sm" color="$textLight500" mb="$1">
            Choose how you will be using the app
          </Text>

          <RadioGroup
            value={props.userRoleSelectValue}
            onChange={props.userRoleSelectOnChangeText}
            mb="$10">
            <VStack space="sm">
              <Radio value="1" size="md" mb="$2">
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>Transporter</RadioLabel>
              </Radio>
              <Radio value="2" size="md" mb="$2">
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>Client</RadioLabel>
              </Radio>
              <Radio value="3" size="md" mb="$2">
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>Driver</RadioLabel>
              </Radio>
            </VStack>
          </RadioGroup>
        </VStack>
      </FormControl>

      <CustomButton1 title="Next" onPress={props.nextButtonOnPress} />
    </View>
  );
};
