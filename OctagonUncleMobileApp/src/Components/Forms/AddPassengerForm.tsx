import {Heading, VStack} from '@gluestack-ui/themed';
import {View} from 'react-native';
import {AddPassengerFormProps} from '../../Models/FormControlProps';
import {CustomButton1} from '../Buttons';
import {CustomFormControlInput} from '../CustomFormInput';

export function AddPassengerForm(props: AddPassengerFormProps) {
  return (
    <View>
      <VStack>
        <CustomFormControlInput
          labelText="Firstname"
          placeHolder="firstname"
          isInvalid={props.firstNameIsInvalid}
          isRequired={true}
          type="text"
          onChangeText={props.firstNameOnChangeText}
          errorText={props.firstNameErrorText}
          onBlur={props.firstNameOnBlur}
          value={props.firstNameValue}
        />

        <CustomFormControlInput
          labelText="Lastname"
          placeHolder="lastname"
          isInvalid={props.lastNameIsInvalid}
          isRequired={true}
          type="text"
          onChangeText={props.lastNameOnChangeText}
          errorText={props.lastNameErrorText}
          onBlur={props.lastNameOnBlur}
          value={props.lastNameValue}
        />
        <CustomFormControlInput
          labelText="Age"
          placeHolder="age"
          isInvalid={props.ageIsInvalid}
          isRequired={true}
          type="text"
          onChangeText={props.ageOnChangeText}
          errorText={props.ageErrorText}
          onBlur={props.ageOnBlur}
          value={props.ageValue}
        />
        <CustomFormControlInput
          labelText="Home Address"
          placeHolder="home address"
          isInvalid={props.homeAddressIsInvalid}
          isRequired={false}
          type="text"
          onChangeText={props.homeAddressOnChangeText}
          errorText={props.homeAddressErrorText}
          onBlur={props.homeAddressOnBlur}
          value={props.homeAddressValue}
        />

        <CustomFormControlInput
          labelText="Destination Address"
          placeHolder="destination address"
          isInvalid={props.destinationAddressIsInvalid}
          isRequired={true}
          type="text"
          onChangeText={props.destinationAddressOnChangeText}
          errorText={props.destinationAddressErrorText}
          onBlur={props.destinationAddressOnBlur}
          value={props.destinationAddressValue}
        />
        <CustomButton1 title={'Submit'} onPress={props.submitPassenger} />
      </VStack>
    </View>
  );
}
