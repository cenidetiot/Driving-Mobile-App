import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  ScrollView, 
  Image,
  ToastAndroid,
  Alert,
  AsyncStorage,
  TouchableHighlight,
  Modal,
  Dimensions
} from 'react-native';
import { Avatar, TYPO,COLOR,Button } from 'react-native-material-design';

import Toolbar from '../components/Toolbar'
import Nav from '../components/Nav'
import MyFloatButton from '../components/MyFloatButton'
import NgsiModule from '../NativeModules/NgsiModule'

import Functions from '../functions/Functions'
import style from '../styles/Speed'


export default class SpeedScreen extends Component {
  
  constructor(props) {
    super(props);
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
      maximumAllowedSpeed :2,
      minimumAllowedSpeed :.5,
      latitude : 0,
      longitude:0


    }
  } 
  
  componentDidMount(){
    let t = this
    navigator.geolocation.watchPosition((position) =>{
      NgsiModule.deviceSpeed((speedMs,speedKs) => {  //Funcion nativa que recibe los parametros de velocidad
        if (speedKs > t.state.maximumAllowedSpeed || t.state.speedKs < t.state.minimumAllowedSpeed ){
          t.setState({circleColor : t.state.circleColors.critical})
        }
        else {
          t.setState({circleColor : t.state.circleColors.low})
        }
        t.setState({speedMs: speedMs, speedKs:speedKs, latitude : position.coords.latitude,longitude :position.coords.longitude}) // alamacena en el state de la vista
      },
      (err) => {
        ToastAndroid.show("Ocurrió un error", ToastAndroid.SHORT);
      });  
    },
        (error) => {
          Alert.alert('Alert',error.message,
            [
              {text: 'ok', onPress: () => console.log('Ask me later pressed')}
            ],
            { cancelable: true }
          )
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter:0.1 },
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
	      
        <View style={styles.container}>
          <View style={[complement.first, styles.circleContainer, { backgroundColor : this.state.circleColor }]}>
            <View style={[styles.circleContainer, complement.second]}>
              {/* Muestra   la velocidad en un text */}
              <Text style={[styles.speedKm, {color: this.state.circleColor} ]} >{this.state.speedKs.toPrecision(2)} Km/h</Text>
              <Text style={styles.speedm} >{this.state.speedMs.toPrecision(2)} m/s</Text>
            </View>
          </View>

          <Text>Minimum Allowed Speed {this.state.minimumAllowedSpeed}</Text>
          <Text>Maximum Allowed Speed {this.state.maximumAllowedSpeed}</Text>
          <Text>{this.state.latitude} {this.state.longitude}</Text>

          <MyFloatButton navigate={navigate}/>
        </View>

	    </DrawerLayoutAndroid> 
    )
  }
  
}

const styles = StyleSheet.create(style);

const complement = StyleSheet.create({
  first :{
    marginTop: '35%',
    width: Dimensions.get('screen')['height'] / 2.5 ,
    height: Dimensions.get('screen')['height'] / 2.5,
    borderRadius: Dimensions.get('screen')['height'] / 2.5,
    
  },
  second :{
    width: Dimensions.get('screen')['height'] / 2.7,
    height: Dimensions.get('screen')['height'] / 2.7,
    borderRadius: Dimensions.get('screen')['height'] / 2.7,
    backgroundColor : 'white'
  }
})

// if (Functions.PointOnCampus([18.879781, -99.221777],camp.location)){ // Apatzingan           
//if (Functions.PointOnCampus([18.876438, -99.220000],camp.location)){ // PALMIRA
//if (Functions.PointOnCampus([position.coords.latitude,position.coords.longitude],camp.location)){
