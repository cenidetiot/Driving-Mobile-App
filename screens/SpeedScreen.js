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
      minimumAllowedSpeed :0
    }
  } 
  
  componentDidMount(){
    let t = this
    setInterval(() =>{
      NgsiModule.deviceSpeed((speedMs,speedKs) => {  //Funcion nativa que recibe los parametros de velocidad

        if (speedKs > t.state.maximumAllowedSpeed || t.state.speedKs < t.state.minimumAllowedSpeed ){
          t.setState({circleColor : t.state.circleColors.critical})
        }
        else {
          t.setState({circleColor : t.state.circleColors.low})
        }
        t.setState({speedMs: speedMs, speedKs:speedKs}) // alamacena en el state de la vista
      },
      (err) => {
        ToastAndroid.show("Ocurrió un error", ToastAndroid.SHORT);
      });  
    }, 1000);


  
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
          <View style={{
              alignItems:'center', 
              justifyContent: 'center',
              marginTop: '35%',
              width: Dimensions.get('screen')['height'] / 2.5 ,
              height: Dimensions.get('screen')['height'] / 2.5,
              borderRadius: Dimensions.get('screen')['height'] / 2.5,
              backgroundColor : this.state.circleColor
          }}>
            
            {/* Muestra   la velocidad en un text */}
            <Text style={styles.speedKm} >{this.state.speedKs.toPrecision(2)} Km/h</Text>
            <Text style={styles.speedm} >{this.state.speedMs.toPrecision(2)} m/s</Text>

          </View>
          <Text>Minimum Allowed Speed {this.state.minimumAllowedSpeed}</Text>
          <Text>Maximum Allowed Speed {this.state.maximumAllowedSpeed}</Text>

          <MyFloatButton navigate={navigate}/>
        </View>
	    </DrawerLayoutAndroid> 
    )
  }
  
}

const styles = StyleSheet.create(style);


// if (Functions.PointOnCampus([18.879781, -99.221777],camp.location)){ // Apatzingan           
//if (Functions.PointOnCampus([18.876438, -99.220000],camp.location)){ // PALMIRA
//if (Functions.PointOnCampus([position.coords.latitude,position.coords.longitude],camp.location)){
