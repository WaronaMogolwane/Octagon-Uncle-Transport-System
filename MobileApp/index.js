/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { ConfigurePushNotifications } from './src/Handlers/PushNotificationHandler'
ConfigurePushNotifications();

AppRegistry.registerComponent(appName, () => App);
