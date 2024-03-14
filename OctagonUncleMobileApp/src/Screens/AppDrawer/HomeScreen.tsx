import React, {useContext} from 'react';
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {CustomButton1} from '../../Components/Buttons';
import {AuthContext} from '../../Services/AuthenticationService';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = ({navigation}: any) => {
  const {signOut, session}: any = useContext(AuthContext);

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
