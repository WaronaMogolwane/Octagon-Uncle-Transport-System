import {Heading, View, VStack} from '@gluestack-ui/themed';
import {CustomFormControlInput} from '../CustomFormInput';
import {CustomButton1} from '../Buttons';
import {SignInFormProps} from '../../Models/FormControlProps';

export function SignInForm(props: SignInFormProps) {
  return (
    <View>
      <Heading mb="$3">Sign In</Heading>
      <VStack>
        <CustomFormControlInput
          labelText="Email"
          placeHolder="email"
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
          placeHolder="password"
          isInvalid={props.passwordIsInvalid}
          isRequired={true}
          type="password"
          onChangeText={props.passwordOnChangeText}
          errorText={props.passwordErrorText}
          onBlur={props.passwordOnBlur}
          value={props.passwordValue}
        />
        <CustomButton1 title="Sign In" onPress={props.signInButtonOnPress} />
      </VStack>
    </View>
  );
}
