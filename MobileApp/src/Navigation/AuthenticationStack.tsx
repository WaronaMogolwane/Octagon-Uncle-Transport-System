import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getHeaderTitle} from '@react-navigation/elements';
import {Pressable, Text, View} from 'react-native';

// Screens
import SignInScreen from '../Screens/AuthenticationStack/SignInScreen';
import SignUpPage from '../Screens/AuthenticationStack/SignUpScreen';
import ForgotPasswordScreen from '../Screens/AuthenticationStack/ForgotPasswordScreen';
import SelectUserRoleScreen from '../Screens/AuthenticationStack/SelectUserRoleScreen';
import SignUpScreen from '../Screens/AuthenticationStack/SignUpScreen';
import PersonalDetailsScreen from '../Screens/AuthenticationStack/PersonalDetailsScreen';
import BusinessDetailsScreen from '../Screens/AuthenticationStack/BusinessDetailsScreen';

// Styles
import {AuthenticationStackStyles} from '../Stylesheets/GlobalStyles';

// Icons
import {ArrowLeft} from 'lucide-react-native';

type AuthStackParamList = {
  'Sign In': undefined;
  'User Role': undefined;
  'Sign Up': undefined;
  'Forgot Password': undefined;
  'Personal Details': undefined;
  'Business Details': undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const iconMapping: Record<string, JSX.Element> = {
  'User Role': <ArrowLeft size={25} strokeWidth={2} color={'black'} />,
  'Sign Up': <ArrowLeft size={25} strokeWidth={2} color={'black'} />,
  'Business Information': (
    <ArrowLeft size={25} strokeWidth={2} color={'black'} />
  ),
  'Forgot Password': <ArrowLeft size={25} strokeWidth={2} color={'black'} />,
};

const iconSelector = (title: string): JSX.Element | null =>
  iconMapping[title] || null;

const titleSelector = (title: string): string =>
  title === 'Sign In' ? '' : title;

const CustomHeader: React.FC<{title: string; navigation: any}> = ({
  title,
  navigation,
}) => (
  <View style={AuthenticationStackStyles.toolbarContainer}>
    <View style={{width: '20%'}}>
      <Pressable
        style={AuthenticationStackStyles.toolbarLeftContainer}
        onPress={() => {
          if (title === 'User Role' || title === 'Forgot Password') {
            navigation.navigate('Sign In');
          } else if (title === 'Sign Up') {
            navigation.navigate('User Role');
          }
        }}>
        {iconSelector(title)}
      </Pressable>
    </View>
    <View style={{width: '60%', justifyContent: 'center'}}>
      <Text style={AuthenticationStackStyles.toolbarText}>
        {titleSelector(title)}
      </Text>
    </View>
  </View>
);

const AuthenticationStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#e8f0f3',
        headerTitleStyle: {fontWeight: 'bold'},
        header: ({navigation, route, options}) => {
          const title = getHeaderTitle(options, route.name);
          return <CustomHeader title={title} navigation={navigation} />;
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
