import React ,{ Component } from 'react'
import { StackNavigator, NavigationActions } from 'react-navigation'

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
import WebSignUpScreen from './screens/WebSignUpScreen'
import SettingScreen from './screens/SettingScreen'


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
  Speed : {screen : SpeedScreen},
  WebSignup : {screen : WebSignUpScreen},
  Setting: {screen: SettingScreen}
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










