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
  DeviceEventEmitter
} from 'react-native';
import { Avatar, TYPO,COLOR,Button } from 'react-native-material-design';


import Toolbar from '../components/Toolbar'
import Nav from '../components/Nav'
import MyFloatButton from '../components/MyFloatButton'
import NgsiModule from '../../NativeModules/NgsiModule'

import Functions from '../functions/Functions'
import style from '../styles/Home'
import { SensorManager } from 'NativeModules';


export default class HomeScreen extends Component {
  
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this)
    this.isInside = this.isInside.bind(this)
    this.isOutside = this.isOutside.bind(this)
    this.state = {
      message : "No te encuentras en ningun campus",
      campus : null,
      speed: null,
      aceleration : null
    }
  } 
  
  componentDidMount(){
    let t = this

    AsyncStorage.getItem('userid').then((userid) =>{
      NgsiModule.InitDeviceModel();
      NgsiModule.InitDevice(userid);
    })

    

    AsyncStorage.getItem('token').then((token) =>{
      if (token !== null){
        AsyncStorage.removeItem('campus');

        navigator.geolocation.watchPosition((position) =>{ // Funcion que se ejecuta cuando cambia ubicacion  

          AsyncStorage.getItem('campuslist').then((campuslist) =>{
            let list = JSON.parse(JSON.parse("[" + campuslist + "]"))

            let isInside = null

            list.map((camp) => {
              if (Functions.PointOnCampus([18.879781, -99.221777],camp.location)){ // Apatzingan  
                isInside = camp  
              }
            })

            if(isInside !== null){
              t.setState({campus: isInside})
              AsyncStorage.setItem('campus',JSON.stringify(isInside));
            }else{
              t.setState({campus: null})
              AsyncStorage.removeItem('campus');
            }

          })
        },
        (error) => {
          Alert.alert('Alert',error.message,
            [
              {text: 'ok', onPress: () => console.log('Ask me later pressed')}
            ],
            { cancelable: true }
          )
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter:0.5 },
        );

      }else{
        
      }
    })
  
  }

  onPress (){
    this.refs['DRAWER'].openDrawer()
  }
  onClose(){
    this.refs['DRAWER'].closeDrawer()
  }

  isInside () {
    return(
      <View style={{flex:4, alignItems:'center', marginTop : '20%' ,transform: [{'translate':[0,0,1]}] }} >
        <Image
          source={require('../images/inside.png')}
        />
        <Text style={{fontWeight:'bold'}}>{this.state.campus.name}</Text>
        <Text style={{textAlign: 'center'}}>{this.state.campus.address}</Text>
      </View>
    )
  }
  isOutside(){
    return (
      <View style={{flex:4, alignItems:'center', marginTop : '40%',transform: [{'translate':[0,0,1]}] }} >
        <Image
          style={{width : 200, height: 200}}
          source={require('../images/outside.png')}
        />
        <Text style={{fontWeight:'bold'}}>{this.state.message}</Text>
      </View>
    )
  }
  render() { 
    const { navigate } = this.props.navigation;
    return (
    	<DrawerLayoutAndroid
    		ref={'DRAWER'}
		    drawerWidth={250}
		    drawerPosition={DrawerLayoutAndroid.positions.Left}
		    renderNavigationView={() => (<Nav navigate={navigate} screen={'Home'} onClose={this.onClose.bind(this)}/>)}>
        <Toolbar navigation={this.props.navigation} title={'      Driving App'} isHome={true} counter={this.state.conter} onPress={this.onPress.bind(this)}/>
	      <View style={styles.container}>
          <View style={styles.cardContainer}>
          <Text>{this.state.aceleration}</Text>
            {this.state.campus ? this.isInside(): this.isOutside()}
        
          </View>
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
