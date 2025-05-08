import React, {useContext} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import AuthenticationStack from './AuthenticationStack';
import AppDrawer from './AppDrawer';
import AppNavigationStack from './AppNavigationStack';
import {AuthContext} from '../Services/AuthenticationService';
import {ThemeStyles} from '../Stylesheets/GlobalStyles';

const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ['octagonunclemobileapp://', 'https://app.octagonuncle.com'],
  config: {
    screens: {
      AppDrawer: {
        screens: {
          Payments: {
            path: 'payments',
            parse: {
              trxref: (trxref: string) => `${trxref}`,
              reference: (reference: string) => `${reference}`,
            },
          },
        },
      },
    },
  },
};

const AppNav = () => {
  const {session, isLoading}: any = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={[ThemeStyles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <NavigationContainer linking={linking}>
      {session ? <AppNavigationStack /> : <AuthenticationStack />}
    </NavigationContainer>
  );
};

export default AppNav;
