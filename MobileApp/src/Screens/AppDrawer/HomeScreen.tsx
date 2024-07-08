import React, {useContext, useEffect, useState} from 'react';
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {CustomButton1} from '../../Components/Buttons';
import {AuthContext} from '../../Services/AuthenticationService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Auth} from '../../Classes/Auth';

const HomeScreen = ({navigation}: any) => {
  const {signOut, session}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));

  return (
    <SafeAreaView style={ThemeStyles.container}>
      <CustomButton1
        title={'Sign Out'}
        onPress={async () => {
          await signOut();
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
