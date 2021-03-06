import React, {Component} from 'react'
import { StackNavigator, NavigationActions } from 'react-navigation'
import {AsyncStorage,ToastAndroid,Alert} from 'react-native';

import LoginScreen from './screens/Login'
import MapScreen from './screens/MapScreen'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import AlertsScreen from './screens/AlertsScreen'
import MakeAlertsScreen from './screens/MakeAlertsScreen'
import LoadingScreen from './screens/LoadingScreen'
import SignupScreen from './screens/SignupScreen'
import UserContactScreen from './screens/UserContactScreen'
import SpeedScreen from './screens/SpeedScreen'

import Functions from './functions/Functions'

import ServerConnection from './services/ServerConnection'

const StackApp = StackNavigator({
  Map: { screen: MapScreen },
  Home: { screen: HomeScreen },
  Login: { screen: LoginScreen },
  Settings: { screen: ProfileScreen },
  Loading: {screen : LoadingScreen},
  Alerts : {screen : AlertsScreen},
  MakeAlerts : {screen : MakeAlertsScreen},
  Signup :{screen : SignupScreen},
  UserContact :{screen : UserContactScreen},
  Speed : {screen : SpeedScreen}
},
{
  headerMode : 'none',
  initialRouteName : 'Loading'
})


export default class App extends Component {
  
  render() {
    return (
        <StackApp  ref={nav => { this.navigator = nav; }} />
    );
  }
}










