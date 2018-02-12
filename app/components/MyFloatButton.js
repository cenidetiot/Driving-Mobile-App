import React, {Component} from 'react';
import { Icon } from 'react-native-material-design';
import { FloatingAction } from 'react-native-floating-action';
import { Alert, AsyncStorage } from 'react-native';
import OCBConnection from '../services/OCBConnection'
import ServerConnection from '../services/ServerConnection'

export default class MyFloatButton extends Component {

  constructor(props) {
    super(props);
    
    this.onPressFloat = this.onPressFloat.bind(this)
    this.sendAlert =  this.sendAlert.bind(this)
    this.state = {
      actions : [
        {
          text: 'Unknown emergency',
          name: 'Unknown emergency',
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
      AsyncStorage.getItem('device').then((device) =>{
        let alert = {
          id : `Alert:${device}:${Date.now()}`,
          type: "Alert",
          category: "Security",
          subCategory:"Unknown",
          location :{
            type : "geo:point",  
            value : `18.876438, -99.220000` //Palmira
            //value : `${position.coords.latitude} ,${position.coords.longitude}`
          },
          dateObserved: new Date(),
          validFrom: new Date(),
          validTo: new Date(),
          description: "Unknown emergency Alert",
          alertSource: device,
          severity : "high"
        }
        ServerConnection.alerts.addNewAlert(alert);
        let newJson = OCBConnection.create(alert, "The Alert has been sent")
      })

    },
    (error) => {
        ToastAndroid.showWithGravity( error.message , ToastAndroid.SHORT, ToastAndroid.CENTER);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  onPressFloat(name){

      if (name  === 'Unknown emergency'){
        Alert.alert(
          'Unknown emergency Alert',
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
            buttonColor={'#d50000'}
            floatingIcon={<Icon style={{marginBottom:0}} name="announcement" color={'#ecf0f1'} />}
            style={{zIndex :5}}
            onPress={() => console.log("OK")}
        />
       
        
      ) 
  }
}
