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
import {FormStyles, ManageTripsScreenStyles} from '../Stylesheets/GlobalStyles';
import {InputProps, SearchProps} from '../Models/FormControlProps';
import {Search} from 'lucide-react-native';
import {TextInput, ViewStyle} from 'react-native';
import COLORS from '../Const/colors';

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
        <FormControlLabel style={{marginBottom: 12}}>
          <FormControlLabelText style={FormStyles.customLabelFont}>
            {props.labelText}
          </FormControlLabelText>
        </FormControlLabel>
        <Input style={{borderRadius: 10, borderWidth: 0}}>
          <InputField
            style={{backgroundColor: '#f2f3f5'}}
            type={showInputText ? 'text' : 'password'}
            defaultValue={props.defaultValue}
            placeholder={props.placeHolder}
            onChangeText={props.onChangeText}
            onBlur={props.onBlur}
            value={props.value}
          />
          {props.type == 'password' ? (
            <InputSlot
              onPress={handleState}
              pr="$3"
              style={{backgroundColor: '#f2f3f5'}}>
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

export const CustomInputSearch = (props: SearchProps) => {
  const iconSize = 20;
  const iconStrokeWidth = 1;
  const iconColor = '#000000';

  return (
    <View style={ManageTripsScreenStyles.searchInputContainer}>
      <Search
        size={iconSize}
        strokeWidth={iconStrokeWidth}
        color={iconColor}
        style={{marginHorizontal: 15, marginTop: 11}}
      />
      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        autoCapitalize="none"
        autoCorrect={false}
        value={props.value}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

export const CustomFormControlInputTwo = (props: InputProps) => {
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
        <FormControlLabel style={{marginBottom: 12}}>
          <FormControlLabelText style={FormStyles.customLabelFont}>
            {props.labelText}
          </FormControlLabelText>
        </FormControlLabel>
        <Input style={{borderRadius: 10, borderWidth: 0}}>
          <InputField
            style={{backgroundColor: '#f2f3f5'}}
            type={showInputText ? 'text' : 'password'}
            defaultValue={props.defaultValue}
            placeholder={props.placeHolder}
            onChangeText={props.onChangeText}
            onBlur={props.onBlur}
            value={props.value}
          />
          {props.type == 'password' ? (
            <InputSlot onPress={handleState} pr="$3">
              {/* <InputIcon as={showInputText ? EyeIcon : EyeOffIcon} /> */}
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

export const CustomFormControlInputNumber = (props: InputProps) => {
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
        <FormControlLabel style={{marginBottom: 12}}>
          <FormControlLabelText style={FormStyles.customLabelFont}>
            {props.labelText}
          </FormControlLabelText>
        </FormControlLabel>
        <Input style={{borderRadius: 10, borderWidth: 0}}>
          <InputField
            style={{backgroundColor: '#f2f3f5'}}
            keyboardType={'numeric'}
            type={showInputText ? 'text' : 'password'}
            defaultValue={props.defaultValue}
            placeholder={props.placeHolder}
            onChangeText={props.onChangeText}
            onBlur={props.onBlur}
            value={props.value}
          />
          {props.type == 'password' ? (
            <InputSlot
              onPress={handleState}
              pr="$3"
              style={{backgroundColor: '#f2f3f5'}}>
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

export const CustomFormControlInputEmail = (props: InputProps) => {
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
        <FormControlLabel style={{marginBottom: 12}}>
          <FormControlLabelText style={FormStyles.customLabelFont}>
            {props.labelText}
          </FormControlLabelText>
        </FormControlLabel>
        <Input style={{borderRadius: 10, borderWidth: 0}}>
          <InputField
            style={{backgroundColor: '#f2f3f5'}}
            keyboardType={'email-address'}
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

export const CustomFormControlInputPhone = (props: InputProps) => {
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
        <FormControlLabel style={{marginBottom: 12}}>
          <FormControlLabelText style={FormStyles.customLabelFont}>
            {props.labelText}
          </FormControlLabelText>
        </FormControlLabel>
        <Input style={{borderRadius: 10, borderWidth: 0}}>
          <InputField
            style={{backgroundColor: '#f2f3f5'}}
            keyboardType={'phone-pad'}
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
