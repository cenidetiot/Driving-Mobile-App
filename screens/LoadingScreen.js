import React, {Component} from 'react'
import { View, ActivityIndicator, Text, ToastAndroid, AsyncStorage,StyleSheet} from 'react-native';
import { NavigationActions } from 'react-navigation'

import ServerConnection from '../services/ServerConnection'
import NgsiModule from '../NativeModules/NgsiModule';

export default class LoadingScreen extends Component {
  async componentDidMount() {
      let t = this
       AsyncStorage.getItem('token').then((value) =>{
        if (value === null) {
            let resetAction = NavigationActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Login' })],
            });
          this.props.navigation.dispatch(resetAction);
        }else{

        	ServerConnection.updateUserData()
          ServerConnection.getUserContact()
          ServerConnection.updateCampusList()
          AsyncStorage.getItem('userdata').then((userdata) =>{
          let data  = JSON.parse(userdata)
            //NgsiModule.InitDevice(data.idUser);
          })	
          let resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
          });

          this.props.navigation.dispatch(resetAction);
        }
        
      })
       
       NgsiModule.deviceId((id) => {
          AsyncStorage.setItem('device', id)
        },
        (err) => {
          ToastAndroid.show("Ocurrió un error", ToastAndroid.SHORT);
        });
       
  }
  render() {
    return (
        <View style={styles.container}>
        	 <ActivityIndicator 
	            animating={true}
	            color={'blue'}
	            size={100}
	          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
	    flex: 1,
	    marginTop: '60%',
	   	alignItems: 'center'
	}
});