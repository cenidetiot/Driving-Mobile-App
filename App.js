
import React, {Component} from 'react'
import { StackNavigator, NavigationActions } from 'react-navigation'
import {AsyncStorage,ToastAndroid} from 'react-native';

import LoginScreen from './screens/Login'
import MapScreen from './screens/MapScreen'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import AlertsScreen from './screens/AlertsScreen'
import MakeAlertsScreen from './screens/MakeAlertsScreen'
import LoadingScreen from './screens/LoadingScreen'
import SignupScreen from './screens/SignupScreen'
import UserContactScreen from './screens/UserContactScreen'

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
},
{
  headerMode : 'none',
  initialRouteName : 'Loading'
})


export default class App extends Component {
  

  componentDidMount(){
    let t = this
    AsyncStorage.getItem('token').then((token) =>{
      if (token !== null){
        AsyncStorage.removeItem('campus');
        navigator.geolocation.watchPosition((position) =>{
          AsyncStorage.getItem('campuslist').then((campuslist) =>{
            let list = JSON.parse(JSON.parse("[" + campuslist + "]"))
            let isInside = {}
            list.map((camp) => {
              if (Functions.PointOnCampus([18.87649,-99.21986],camp.location)){
              //if (Functions.PointOnCampus([position.coords.latitude,position.coords.longitude],camp.location)){
                isInside = camp           
              }
            })
            if(isInside != {}){
              AsyncStorage.setItem('campus', JSON.stringify(isInside));
            }else{
              AsyncStorage.removeItem('campus');
            }
          })
        },
        (error) => {
          console.log("Error")
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000,distanceFilter:0.5 },
        );
      }else{
        ServerConnection.updateCampusList()
      }
    })
  }

  render() {
    return (
        <StackApp  ref={nav => { this.navigator = nav; }} />
    );
  }
}










