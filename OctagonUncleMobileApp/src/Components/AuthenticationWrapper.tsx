import React, {useContext} from 'react';
import {
  AuthContext,
  SessionProvider,
  useSession,
} from '../Services/AuthenticationService';
import AppNav from '../Navigation/AppNav';

const AuthenticationWrapper = (props: any) => {
  return;
  <SessionProvider>
    <AppNav />
  </SessionProvider>;
};

export default AuthenticationWrapper;
