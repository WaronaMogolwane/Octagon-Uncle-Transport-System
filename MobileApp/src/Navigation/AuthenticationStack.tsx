import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../Screens/AuthenticationStack/SignInScreen';
import SignUpPage from '../Screens/AuthenticationStack/SignUpScreen';
import ForgotPasswordScreen from '../Screens/AuthenticationStack/ForgotPasswordScreen';
import SelectUserRoleScreen from '../Screens/AuthenticationStack/SelectUserRoleScreen';
import SignUpScreen from '../Screens/AuthenticationStack/SignUpScreen';
import PersonalDetailsScreen from '../Screens/AuthenticationStack/PersonalDetailsScreen';
import BusinessDetailsScreen from '../Screens/AuthenticationStack/BusinessDetailsScreen';
import {getHeaderTitle} from '@react-navigation/elements';
import {AuthenticationStackStyles} from '../Stylesheets/GlobalStyles';
import {Pressable, Text, View} from 'react-native';
import {AlignLeft, ArrowLeft, Bell} from 'lucide-react-native';

const AuthenticationStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#e8f0f3',
        headerTitleStyle: {fontWeight: 'bold'},
        header: ({navigation, route, options}) => {
          const title = getHeaderTitle(options, route.name);

          const iconSeletor = () => {
            if (
              title == 'User Role' ||
              title == 'Sign Up' ||
              title == 'Business Information'
            ) {
              return <ArrowLeft size={25} strokeWidth={2} color={'black'} />;
            } else {
              return null;
            }
          };

          const titleSelector = () => {
            if (title == 'Sign In' || title == 'User Role') {
              return '';
            } else {
              return title;
            }
          };

          return (
            <View style={AuthenticationStackStyles.toolbarContainer}>
              <View style={{width: '20%'}}>
                <Pressable
                  style={AuthenticationStackStyles.toolbarLeftContainer}
                  onPress={() => {
                    if (title == 'User Role') {
                      navigation.navigate('Sign In');
                    } else if (title == 'Assign Passenger') {
                      navigation.navigate('Manage Trip');
                    }
                  }}>
                  {iconSeletor()}
                </Pressable>
              </View>
              <View style={{width: '60%', justifyContent: 'center'}}>
                <Text style={AuthenticationStackStyles.toolbarText}>
                  {titleSelector()}
                </Text>
              </View>
            </View>
          );
        },
      }}>
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="User Role" component={SelectUserRoleScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
      <Stack.Screen name="Personal Details" component={PersonalDetailsScreen} />
      <Stack.Screen name="Business Details" component={BusinessDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
