import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('DrivingApp', () => App);
AppRegistry.registerHeadlessTask('FCMToken', () => require('./services/FCMToken'));