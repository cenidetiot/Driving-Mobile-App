import { AppRegistry } from 'react-native';
import App from  './app/App';

AppRegistry.registerComponent('DrivingApp', () => App);
AppRegistry.registerHeadlessTask('FCMToken', () => require('./app/services/FCMToken'));
AppRegistry.registerHeadlessTask('EntringAlert', () => require('./app/services/EntringAlert'));