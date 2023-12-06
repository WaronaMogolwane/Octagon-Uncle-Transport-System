import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../Services/AuthenticationService';

const AuthStack = () => {
  const {session}: any = useContext(AuthContext);
  console.log(session);
  return (
    <View>
      <Text>AuthStack</Text>
    </View>
  );
};

export default AuthStack;
