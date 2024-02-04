import React from 'react';
import {useColorScheme} from 'react-native';
import 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SessionProvider} from './src/Services/AuthenticationService';
import AppNav from './src/Navigation/AppNavigation';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
function App(): JSX.Element {
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
