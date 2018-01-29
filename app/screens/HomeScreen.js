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
  AsyncStorage
} from 'react-native';
import { Avatar, TYPO, COLOR, Button } from 'react-native-material-design';

import UserContext from '../UserContext'

import Toolbar from '../components/Toolbar'
import Nav from '../components/Nav'
import MyFloatButton from '../components/MyFloatButton'
import NgsiModule from '../../NativeModules/NgsiModule'

import store from '../redux/reducers/index'

import Functions from '../functions/Functions'
import style from '../styles/Home'

//import { SensorManager } from 'NativeModules';


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
      aceleration : null,
      data : ""
    }
  } 
  
  componentDidMount(){
    let t = this

    AsyncStorage.getItem('userdata').then((data) =>{
      let user = JSON.parse(data)
      NgsiModule.InitDeviceModel();
      NgsiModule.InitDevice(user.id.toString());
    })

    store.subscribe(() => {
      t.setState({campus : store.getState().campus})
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
            <Text>{this.state.data}</Text>
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
