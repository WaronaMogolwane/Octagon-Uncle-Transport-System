import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../Screens/AuthenticationStack/SignInScreen';
import SignUpPage from '../Screens/AuthenticationStack/SignUpScreen';
import ForgotPasswordScreen from '../Screens/AuthenticationStack/ForgotPasswordScreen';
import SelectUserRoleScreen from '../Screens/AuthenticationStack/SelectUserRoleScreen';
import SignUpScreen from '../Screens/AuthenticationStack/SignUpScreen';
import UserDetailsSignUp from '../Screens/SignUpStack/UserDetailsSignUp';
import PersonalDetailsScreen from '../Screens/AuthenticationStack/PersonalDetailsScreen';

const AuthenticationStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="User Role" component={SelectUserRoleScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
      <Stack.Screen name="Personal Details" component={PersonalDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
