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
  TouchableHighlight
} from 'react-native';
import {Avatar} from 'react-native-elements'

import UserContext  from '../UserContext'

import Toolbar from '../components/Toolbar'
import Nav from '../components/Nav'
import MyFloatButton from '../components/MyFloatButton'
import NgsiModule from '../../NativeModules/NgsiModule'

import store from '../redux/reducers/index'

import Functions from '../functions/Functions'
import style from '../styles/Home'
import User from '../services/controllers/UserController';

//import { SensorManager } from 'NativeModules';


export default class HomeScreen extends Component {
  
  constructor(props) {
    super(props);
    //Servicio para realizar el Backing...
    //NgsiModule.InitBackingService();

    this.onPress = this.onPress.bind(this)
    this.isInside = this.isInside.bind(this)
    this.isOutside = this.isOutside.bind(this)
    this.checkGPS = this.checkGPS.bind(this)
    this.startWatching = this.startWatching.bind(this)
    this.state = {
      message : "You are not in any campus",
      campus : null,
      data : "",
      gps : false
    }
  } 
  
  componentDidMount(){
    let t = this
    this.checkGPS()
    AsyncStorage.getItem('campuslist').then((data) =>{
      let camp = JSON.parse(data)

      t.setState({data: JSON.stringify(camp[1])})
    })
    AsyncStorage.getItem('userdata').then((data) =>{
      let user = JSON.parse(data)
      NgsiModule.InitDeviceModel();
      NgsiModule.InitDevice("User:" + user.id.toString());
    })
  }

  checkGPS(){
    let t = this
    navigator.geolocation.getCurrentPosition((position) =>{
      t.startWatching()
    },
    (error) => {
        t.setState({message : error.message})
        Alert.alert('GPS is disabled on the device.',"You must turn on GPS",
          [
            /*{
              text: 'Reload',
              onPress: () => this.checkGPS()
            },*/
            {
              text : "Reload",
              //onPress: () => NgsiModule.showGPSDisabledAlert()  
              onPress: () => t.checkGPS()
            }
          ],
          {
            cancelable: false 
          }
        )
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  startWatching() {
    let t = this
    UserContext.watchContext()
    setInterval(() => {
      t.setState({campus : UserContext.campus})
    }, 1000 );
    //store.subscribe(() => {
      
      //t.setState({campus : store.getState().campus.campus})
    //})
  }

  onPress (){
    this.refs['DRAWER'].openDrawer()
  }
  onClose(){
    this.refs['DRAWER'].closeDrawer()
  }

  isInside () {
    return(
      <View style={{flex:4, alignItems:'center', marginTop : '20%' ,transform: [{'translate':[0,0,1]}] }}>
        <Image
          style={{height : 200 , width : 200}}
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
        <Avatar
          xlarge
          rounded
          source={require('../images/outside.png')}
          onPress={() => this.checkGPS()}
          activeOpacity={0.7}
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
          
            { this.state.campus ? this.isInside(): this.isOutside() }
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
  //19.0323107, -98.31537019999999
