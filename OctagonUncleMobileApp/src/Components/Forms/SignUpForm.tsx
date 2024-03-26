import {Heading, View, VStack} from '@gluestack-ui/themed';
import {CustomFormControlInput} from '../CustomFormInput';
import {CustomButton1} from '../Buttons';
import {
  SetPasswordFormProps,
  SignInFormProps,
  SignUpFormProps,
} from '../../Models/FormControlProps';

export const SignUpForm = (props: SignUpFormProps) => {
  return (
    <View>
      <Heading mb="$3">Sign Up</Heading>
      <VStack>
        <CustomFormControlInput
          labelText="Email"
          placeHolder="Email"
          isInvalid={props.emailIsInvalid}
          isRequired={true}
          type="text"
          onChangeText={props.emailOnChangeText}
          errorText={props.emailErrorText}
          onBlur={props.emailOnBlur}
          value={props.emailValue}
        />
        <CustomFormControlInput
          labelText="Password"
          placeHolder="Password"
          isInvalid={props.passwordIsInvalid}
          isRequired={true}
          type="password"
          onChangeText={props.passwordOnChangeText}
          errorText={props.passwordErrorText}
          onBlur={props.passwordOnBlur}
          value={props.passwordValue}
        />
        <CustomFormControlInput
          labelText="Confirm password"
          placeHolder="Password"
          value={props.confirmPasswordValue}
          type="password"
          isRequired={true}
          errorText={props.confirmPasswordErrorText}
          isInvalid={props.confirmPasswordIsInvalid}
          onChangeText={props.confirmPasswordOnChangeText}
        />
        <CustomButton1 title="Sign Up" onPress={props.signUpButtonOnPress} />
      </VStack>
    </View>
  );
};
