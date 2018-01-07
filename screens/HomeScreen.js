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
  Modal
} from 'react-native';
import { Avatar, TYPO,COLOR,Button } from 'react-native-material-design';

import Toolbar from '../components/Toolbar'
import Nav from '../components/Nav'
import MyFloatButton from '../components/MyFloatButton'
import ServerConnection from '../services/ServerConnection'

import Functions from '../functions/Functions'



export default class HomeScreen extends Component {
  
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this)
    this.isInside = this.isInside.bind(this)
    this.isOutside = this.isOutside.bind(this)
    this.state = {
      message : "No te encuentras en ningun campus",
      campus : null,
      modalVisible: false,
      token : ""
    }
  } 
  
  componentDidMount(){
    let t = this
    AsyncStorage.getItem('fcmtoken').then((token) =>{
       t.setState({token : token})
    })
    AsyncStorage.getItem('token').then((token) =>{
      if (token !== null){
        AsyncStorage.removeItem('campus');

        navigator.geolocation.watchPosition((position) =>{
          AsyncStorage.getItem('campuslist').then((campuslist) =>{
            let list = JSON.parse(JSON.parse("[" + campuslist + "]"))
            let isInside = null
            list.map((camp) => {
              if (Functions.PointOnCampus([position.coords.latitude,position.coords.longitude],camp.location)){
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
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000,distanceFilter:0.5 },
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
      <View style={{flex:4, alignItems:'center', marginTop : '20%' }} >
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
      <View style={{flex:4, alignItems:'center', marginTop : '40%'}} >
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
            {this.state.campus ? this.isInside(): this.isOutside()}
          </View>
          <MyFloatButton navigate={navigate}/>
        </View>
	    </DrawerLayoutAndroid> 
    )
  }
  
}

const styles = StyleSheet.create({
	container: {
	    flex: 1,
	    marginTop:45,
	   alignItems: 'center',
     backgroundColor:'#e8eaf6'
	}, 
	  icon: { 
	    width: 30,
	    height: 25,
	},
	header: {
	    paddingTop: 16
	},
	text: {
	    marginTop: 20
	},
	imageLogo : {
    width : 400,
    height: 400
    
  },
  title : {
    fontSize : 20,
    fontWeight :"bold",
    color: "#2c3e50"
  },
  button: {
  	flex: 2
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  cardContainer:{
    alignItems:'center', 
    marginTop: 13,
    marginBottom :13,
  },
  cardAvatar:{
    flex:1,
    alignItems:'center', 
  }

});

// if (Functions.PointOnCampus([18.879781, -99.221777],camp.location)){ // Apatzingan           
//if (Functions.PointOnCampus([18.876438, -99.220000],camp.location)){ // PALMIRA
//if (Functions.PointOnCampus([position.coords.latitude,position.coords.longitude],camp.location)){
