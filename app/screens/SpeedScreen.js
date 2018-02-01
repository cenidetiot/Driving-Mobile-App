import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  Alert,
  Dimensions,
  ToastAndroid,
  AsyncStorage,
  Animated
} from 'react-native';
import { Avatar, TYPO,COLOR,Button } from 'react-native-material-design';

import Toolbar from '../components/Toolbar'
import Nav from '../components/Nav'
import MyFloatButton from '../components/MyFloatButton'
import NgsiModule from '../../NativeModules/NgsiModule'
import OCBConnection from '../services/OCBConnection'
import Functions from '../functions/Functions'
import style from '../styles/Speed'

const dim = Dimensions.get('screen')['height'];


export default class SpeedScreen extends Component {
  
  constructor(props) {
    super(props);
    this.getAceleration = this.getAceleration.bind(this)
    this.spring = this.spring.bind(this)
    this.state = {

      speedMs: 0, //Variable de velocidad en metros
      speedKs : 0, // Variabñe de velocidad en Kilometros,
      circleColor : '#2c3e50',
      circleColors : {
        informational: '#3498db',
        low: '#2c3e50',
        medium: '#f1c40f',
        high: '#e67e22',
        critical: '#c0392b' 
      },
      maximumAllowedSpeed :0,
      minimumAllowedSpeed :0,
      latitude : 0,
      longitude: 0,
      message : "You're driving well",
      exceeded : false,
      vi : 0,
      aceleration : 0,
      timeNotAllowed : 0,
      alertSended : "",
      id :""
    }
    this.springValue = new Animated.Value(.8)
  } 

  spring () {
    this.springValue.setValue(1)
    Animated.spring(
      this.springValue,
      {
        toValue: .8,
        friction: 1
      }
    ).start()
  }

  
  getAceleration(speed){
    let aceleration = (speed - this.state.vi) / 1;
    this.setState({vi : speed, aceleration : aceleration})
  }

  componentDidMount(){
    let t = this
    // Obtiene los datos de velocidad maxima y minima
    AsyncStorage.getItem('segmentslist').then((value) =>{
      if (value !== null) {
        list = JSON.parse(JSON.parse(value))
        road = list[0]
        t.setState({maximumAllowedSpeed: road.maximumAllowedSpeed,
           minimumAllowedSpeed: road.minimumAllowedSpeed})
      }
    })


    setInterval(() =>{
      NgsiModule.deviceSpeed((speedMs,speedKs) => {  //Funcion nativa que recibe los parametros de velocidad

        if ((speedKs > t.state.maximumAllowedSpeed || t.state.speedKs < t.state.minimumAllowedSpeed )){
          let timeNotAllowed = t.state.timeNotAllowed + 1;
          if (!t.state.exceeded){
            t.spring()
          }

          if (timeNotAllowed === 5){
            t.createAlert()
          }

          if (timeNotAllowed % 5 === 0 && timeNotAllowed > 5){
            t.updateAlert()
          }

          t.setState({ 
            circleColor : t.state.circleColors.critical,
            message: 'You exceeded the limit.',
            exceeded : true,
            timeNotAllowed : timeNotAllowed
          })
          t.getAceleration(speedMs)
          
        }
        else {
          t.setState({
            circleColor : t.state.circleColors.low,
            timeNotAllowed : 0, 
            message: "You're driving well",
            exceeded : false,
            alertSended : ""
          })
        }
        t.setState({speedMs: speedMs, speedKs:speedKs}) // alamacena en el state de la vista
      },
      (err) => {
        ToastAndroid.show("Ocurrió un error speed", ToastAndroid.SHORT);
      });  
    }, 1000);
  
  }
  updateAlert(){
    ToastAndroid.show("actualizando", ToastAndroid.SHORT);
    let t = this
    navigator.geolocation.getCurrentPosition((position) =>{
      
        let alert = {
          location :{
            type : "geo:point",  
            value : `${position.coords.latitude} ,${position.coords.longitude}`
          },
          validTo: new Date()
        }
        let newJson = OCBConnection.update(t.state.alertSended,alert)
      
    },
    (error) => {
        ToastAndroid.showWithGravity( error.message , ToastAndroid.SHORT, ToastAndroid.CENTER);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  createAlert(){
    ToastAndroid.show("creada", ToastAndroid.SHORT);
    let t = this
    
    
    navigator.geolocation.getCurrentPosition((position) =>{
      AsyncStorage.getItem('device').then((device) =>{
        let alertSended = `Alert:${device}:${Date.now()}`;
        t.setState({alertSended : alertSended})
        let alert = {
          id : alertSended,
          type: "Alert",
          category: "traffic",
          subCategory : "UnauthorizedSpeedDetection",
          location :{
            type : "geo:point",  
            value : `${position.coords.latitude} ,${position.coords.longitude}`
          },
          dateObserved: new Date(),
          validFrom: new Date(),
          validTo: new Date(),
          description: "Alertas de prueba de velocidad",
          alertSource: device,
          severity : 'high'
        }
        let newJson = OCBConnection.create(alert)
      })
    },
    (error) => {
        ToastAndroid.showWithGravity( error.message , ToastAndroid.SHORT, ToastAndroid.CENTER);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  onPress (){
    this.refs['DRAWER'].openDrawer()
  }
  onClose(){
    this.refs['DRAWER'].closeDrawer()
  }

  render() { 
    const { navigate } = this.props.navigation;
    return (
    	<DrawerLayoutAndroid
    		ref={'DRAWER'}
		    drawerWidth={250}
		    drawerPosition={DrawerLayoutAndroid.positions.Left}
		    renderNavigationView={() => (<Nav navigate={navigate} screen={'Home'} onClose={this.onClose.bind(this)}/>)}>
        <Toolbar navigation={this.props.navigation} title={'Your Speed'} counter={this.state.conter} onPress={this.onPress.bind(this)}/>
	       
        <View style={[styles.container, {backgroundColor : this.state.circleColor}]}>
        <Text style={styles.message}>{this.state.message}</Text>

        
          <Animated.View style={[complement.circle, {transform: [{scale: this.springValue}]}]}>
            <Text style={[styles.speedKm, {color: this.state.circleColor} ]} >{this.state.speedKs.toPrecision(2)} Km/h</Text>
            <Text style={styles.speedm} >{this.state.speedMs.toPrecision(2)} m/s</Text>
          </Animated.View>

          <Text style={{color: 'white'}}>Minimum Allowed Speed {this.state.minimumAllowedSpeed}</Text>
          <Text style={{color: 'white'}}>Maximum Allowed Speed {this.state.maximumAllowedSpeed}</Text>
          <Text style={{color: 'white', fontWeight:'bold'}} >{this.state.aceleration}</Text>
      
          <Text>  {this.state.alertSended} </Text>
          <Text>  {this.state.timeNotAllowed} </Text>

          <MyFloatButton navigate={navigate}/>
        </View>

	    </DrawerLayoutAndroid> 
    )
  }
  
}

const styles = StyleSheet.create(style);

const complement = StyleSheet.create({
  circleContainer :{
    height : dim / 2,
    width : dim / 2,
    alignItems: 'center',
    justifyContent: 'center' 
  },
  circle :{
    height : dim / 2,
    width : dim / 2,
    alignItems:'center', 
    justifyContent: 'center',
    borderRadius: dim/ 2.7,
    backgroundColor : 'white'
  }
})

// if (Functions.PointOnCampus([18.879781, -99.221777],camp.location)){ // Apatzingan           
//if (Functions.PointOnCampus([18.876438, -99.220000],camp.location)){ // PALMIRA
//if (Functions.PointOnCampus([position.coords.latitude,position.coords.longitude],camp.location)){
