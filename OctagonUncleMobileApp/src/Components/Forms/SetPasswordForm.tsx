import {Heading, View, VStack} from '@gluestack-ui/themed';
import {CustomFormControlInput} from '../CustomFormInput';
import {CustomButton1} from '../Buttons';
import {
  SetPasswordFormProps,
  SignInFormProps,
} from '../../Models/FormControlProps';

export const SetPasswordForm = (props: SetPasswordFormProps) => {
  return (
    <View>
      <Heading mb="$3">Set your password</Heading>
      <VStack>
        <CustomFormControlInput
          labelText="Password"
          placeHolder="password"
          isInvalid={props.passwordIsInvalid}
          isRequired={true}
          type="password"
          onChangeText={props.passwordOnChangeText}
          errorText={props.passwordErrorText}
          onBlur={props.passwordOnBlur}
          value={props.passwordValue}
        />
        <CustomFormControlInput
          labelText="Confirm Password"
          placeHolder="password"
          isInvalid={props.passwordIsInvalid}
          isRequired={true}
          type="password"
          onChangeText={props.passwordOnChangeText}
          errorText={props.passwordErrorText}
          onBlur={props.passwordOnBlur}
          value={props.passwordValue}
        />
        <CustomButton1
          title="Save password"
          onPress={props.setPasswordButtonOnPress}
        />
      </VStack>
    </View>
  );
};