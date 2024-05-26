import React, {useContext} from 'react';
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {CustomButton1} from '../../Components/Buttons';
import {AuthContext} from '../../Services/AuthenticationService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Auth} from '../../Classes/Auth';
import {setGlobalState} from '../../State';

const HomeScreen = ({navigation}: any) => {
  const {signOut, session}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  useEffect(() => {
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
    } else {
      setGlobalState('userId', '9a7fc15e-a31a-44a5-8d1d-0a9509f7f916');
      setGlobalState('role', 3);
      setGlobalState('businessId', 'w8728321-394f-466b-833e-ea9dd60ba000');
    }
  }, [auth]);
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
function GetClients(arg0: string) {
  throw new Error('Function not implemented.');
}
