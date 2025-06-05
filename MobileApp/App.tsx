import {useEffect, useState, memo} from 'react';
import {PermissionsAndroid, useColorScheme} from 'react-native';
import 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SessionProvider} from './src/Services/AuthenticationService';
import AppNav from './src/Navigation/AppNavigation';
import {GluestackUIProvider, Box, Text} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {Camera} from 'react-native-vision-camera';
import NetworkProvider from './src/Services/NetworkContext';
import {SafeAreaView} from 'react-native-safe-area-context';

const App: React.FC = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [pushNotificationsPermission, setPushNotificationsPermission] =
    useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        await Camera.requestCameraPermission();
        const pushNotificationsPermissionStatus =
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
        setPushNotificationsPermission(pushNotificationsPermissionStatus);
      } catch (error) {
        console.error('Error requesting permissions:', error);
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView
        style={{flex: 1, backgroundColor: backgroundStyle.backgroundColor}}>
        {isReady ? (
          <NetworkProvider>
            <SessionProvider>
              <AppNav />
            </SessionProvider>
          </NetworkProvider>
        ) : (
          <Box
            flex={1}
            justifyContent="center"
            alignItems="center"
            bg={backgroundStyle.backgroundColor}>
            <Text color={isDarkMode ? '$white' : '$black'}>Loading...</Text>
          </Box>
        )}
      </SafeAreaView>
    </GluestackUIProvider>
  );
};

export default memo(App);
