import React, {useContext, useEffect, useState} from 'react';
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {CustomButton1} from '../../Components/Buttons';
import {AuthContext} from '../../Services/AuthenticationService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Auth} from '../../Classes/Auth';
import {useStorageState} from '../../Services/StorageStateService';
import {setGlobalState} from '../../State';

const HomeScreen = ({navigation}: any) => {
  const {signOut, session}: any = useContext(AuthContext);

  const [[tokenIsLoading, authToken], setAuthToken] =
    useStorageState('authToken');
  const {SetSession}: any = useContext(AuthContext);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    new Auth().SetAuthentication(authToken!, auth, setAuth);
    if (auth !== null) {
      //setGlobalState('userId', 'c7728615-394f-466b-833e-ea9dd60ba836');
      setGlobalState('userId', '9a7fc15e-a31a-44a5-8d1d-0a9509f7f916');
      setGlobalState('role', 3);
      setGlobalState('businessId', 'w8728321-394f-466b-833e-ea9dd60ba000');

      // setGlobalState(
      //   'userId',
      //   `${auth.GetAuth(authToken!)?.GetSession(authToken!).UserId}`,
      // );
      // setGlobalState(
      //   'role',
      //   Number(`${auth.GetAuth(authToken!)?.GetSession(authToken!).UserRole}`),
      // );
      // setGlobalState(
      //   'businessId',
      //   `${auth.GetAuth(authToken!)?.GetSession(authToken!).BusinessId}`,
      // );
    }
  }, [authToken, auth]);
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
