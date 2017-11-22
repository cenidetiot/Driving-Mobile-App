import React, {Component} from 'react';
import { Icon } from 'react-native-material-design';
import { FloatingAction } from 'react-native-floating-action';
import { Alert } from 'react-native';
import OCB from '../services/OCBConnection'

export default class MyFloatButton extends Component {

  constructor(props) {
    super(props);
    
    this.onPressFloat = this.onPressFloat.bind(this)
    this.sendAlert =  this.sendAlert.bind(this)
    this.state = {
      actions : [
        {
          text: 'Emergency',
          name: 'Emergency',
          icon : require('../images/icons/warning.png'),
          color: '#e74c3c',
          position: 1
        },
        {
          text: 'Car Accident',
          name: 'Car Accident',
          icon : require('../images/icons/car-collision.png'),
          color: '#e67e22',
          position: 2
        },
        {
          text: 'Traffic Jam',
          name: 'Traffic Jam',
          icon : require('../images/icons/traffic.png'),
          color: '#f1c40f',
          position: 3
        }
      ]
    }
  }

  sendAlert(){
    let t = this
    navigator.geolocation.getCurrentPosition((position) =>{
      let deviceId = "Device_01"
      AsyncStorage.getItem('device').then((device) =>{
        let alert = {
          id : `Alert:${deviceId}:${Date.now()}`,
          type: "Alert",
          category: "Security",
          location :{
            type : "geo:point",  
            value : `18.876420, -99.219536`
            //value : `${position.coords.latitude} ,${position.coords.longitude}`
          },
          dateObserved: new Date(),
          validFrom: new Date(),
          validTo: new Date(),
          description: "Emergency Alert",
          alertSource: device,
          severty : "high"
        }

        let newJson = OCB.sendAlert(alert)
        let backAction = NavigationActions.back()
        this.props.navigation.dispatch(backAction)
      })

    },
    (error) => {
        ToastAndroid.showWithGravity( error.message , ToastAndroid.SHORT, ToastAndroid.CENTER);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  onPressFloat(name){

      if (name  === 'Emergency'){
        Alert.alert(
          'Emergency Alert',
          'Do you want to send a Emergency Alert ?',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: this.sendAlert},
          ],
          { cancelable: true }
        )
      }else {
        this.props.navigate('MakeAlerts', {
          type : name
        })
      }
      
  }

  render() {
    return(
        <FloatingAction
            actions={this.state.actions}
            onPressItem={this.onPressFloat}
            buttonColor={'#e74c3c'}
            floatingIcon={<Icon style={{marginBottom:5}} name="drive-eta" color={'#ecf0f1'} />}
            style={{zIndex :5}}
            onPress={() => console.log("OK")}
        />
       
        
      ) 
  }
}
