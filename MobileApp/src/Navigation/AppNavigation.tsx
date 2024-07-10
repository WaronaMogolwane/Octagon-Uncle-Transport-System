import {View, Text, ActivityIndicator} from 'react-native';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthenticationStack from './AuthenticationStack';
import AppDrawer from './AppDrawer';
import {AuthContext} from '../Services/AuthenticationService';
import {ThemeStyles} from '../Stylesheets/GlobalStyles';
import AppNavigationStack from './AppNavigationStack';

const AppNav = () => {
  const {session, isLoading}: any = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={ThemeStyles.container}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {session ? <AppNavigationStack /> : <AuthenticationStack />}
    </NavigationContainer>
  );
};

export default AppNav;
