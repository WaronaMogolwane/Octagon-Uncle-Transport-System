import {useEffect, useState} from 'react';
import {PermissionsAndroid, useColorScheme} from 'react-native';
import 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SessionProvider} from './src/Services/AuthenticationService';
import AppNav from './src/Navigation/AppNavigation';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {Camera} from 'react-native-vision-camera';
import * as Sentry from '@sentry/react-native'; // Correct Sentry import for React Native

Sentry.init({
  dsn: 'https://e5b90a0e97e12c4a3ded6972b0e831bb@o4509321995616256.ingest.de.sentry.io/4509322002235472',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  //replaysSessionSampleRate: 0.1,
  //replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.reactNativeTracingIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});
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
export default Sentry.wrap(App);
