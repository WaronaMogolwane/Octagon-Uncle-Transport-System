import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, useColorScheme} from 'react-native';
import 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SessionProvider} from './src/Services/AuthenticationService';
import AppNav from './src/Navigation/AppNavigation';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {Camera} from 'react-native-vision-camera';
function App(): JSX.Element {
  //const [cameraPermission, setCameraPermission] = useState<any>();
  const [pushNotificationsPermission, setPushNotificationsPermission] =
    useState<any>();

  useEffect(() => {
    (async () => {
      const cameraPermissionStatus = await Camera.requestCameraPermission();
      const pushNotificationsPermissionStatus =
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      setPushNotificationsPermission(pushNotificationsPermissionStatus);
      // setCameraPermission(cameraPermissionStatus);
    })();
  });
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SessionProvider>
      <GluestackUIProvider config={config}>
        <AppNav />
      </GluestackUIProvider>
    </SessionProvider>
  );
}
export default App;
