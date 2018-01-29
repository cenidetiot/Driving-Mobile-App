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
  TextInput,
  Button,
  Slider
} from 'react-native';
import { NavigationActions } from 'react-navigation'

import OCBConnection from '../services/OCBConnection'

import Toolbar from '../components/Toolbar'
import Nav from '../components/Nav'

import style from '../styles/MakeAlert'

export default class MakeAlertsScreen extends Component {
  
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this)
    this.checkType = this.checkType.bind(this)
    this.chageEvent = this.chageEvent.bind(this)
    this.chageDescription = this.chageDescription.bind(this)
    this.sendAlert = this.sendAlert.bind(this)
    this.severityChange = this.severityChange.bind(this)
    this.state = {
    	userid : "",
      typeAlert : "",
      event:"",
      description: "",
      message : "",
      severityNumber:0,
      sliderColor: '#3498db',
      severityText:'informational',
      sliderColors: {
        informational: '#3498db',
        low: '#2c3e50',
        medium: '#f1c40f',
        high: '#e67e22',
        critical: '#c0392b' 
      }
    }
  } 

  componentDidMount() {

    let t = this
    AsyncStorage.getItem('userid').then((user) =>{
      t.setState({userid: user})
    })
    this.setState({typeAlert : this.props.navigation.state.params.type })
     
  }


  
  checkType (){
    if (this.props.navigation.state.params.type === 'Traffic Jam'){
      return (
          <Image style={styles.imageLogo} source={require('../images/icons/009-traffic-light.png')}/>
        )
    }else if(this.props.navigation.state.params.type === 'Speeding'){
       return (
          <Image style={styles.imageLogo} source={require('../images/icons/010-cone.png')}/>
        )
    }else{
       return (
          <Image style={styles.imageLogo} source={require('../images/icons/007-warning.png')}/>
        )
    }
  }


  sendAlert(){
    let t = this
    navigator.geolocation.getCurrentPosition((position) =>{
    
      AsyncStorage.getItem('device').then((device) =>{

        let alert = {
          id : `Alert:${device}:${Date.now()}`,
          type: "Alert",
          category: "Traffic",
          subCategory : t.state.typeAlert,
          location :{
            type : "geo:point",  
            value : `${position.coords.latitude} ,${position.coords.longitude}`
          },
          dateObserved: new Date(),
          validFrom: new Date(),
          validTo: new Date(),
          description: t.state.description,
          alertSource: device,
          severity : t.state.severityText
        }
        ToastAndroid.showWithGravity( "Enviando Alerta ..." , ToastAndroid.SHORT, ToastAndroid.CENTER);
        let newJson = OCBConnection.create(alert, "Enviada exitosamente")
        
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
  severityChange(value){
    if(value === 0)
      this.setState({sliderColor : this.state.sliderColors.informational, severityText: 'informational'})
    else if(value === 25)
      this.setState({sliderColor : this.state.sliderColors.low, severityText: 'low'})
    else if (value === 50)
      this.setState({sliderColor : this.state.sliderColors.medium, severityText: 'medium'})
    else if(value === 75)
      this.setState({sliderColor : this.state.sliderColors.high, severityText: 'high'})
    else if (value === 100)
      this.setState({sliderColor : this.state.sliderColors.critical, severityText: 'critical'}) 
  }
  chageEvent (text) { 
    this.setState({event : text})
  } 

  chageDescription (text) { 
    this.setState({description : text})
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
        <Toolbar navigation={this.props.navigation} title={'Make Alert'}  counter={this.state.conter} onPress={this.onPress.bind(this)}/>
        <ScrollView style={styles.container}> 
          <View style={{alignItems : 'center'}}> 
            <Text style={styles.title}>{this.props.navigation.state.params.type}</Text>
            {this.checkType()}
          </View>
          <View style={{backgroundColor : 'white', marginBottom : 10}}>
            <Text style={{fontWeight:'bold',color: this.state.sliderColor,textAlign:'left',marginLeft:10}}>Severity: {this.state.severityText}</Text>
            <Slider
              minimumValue={0}
              maximumValue={100}
              value={this.state.severityNumber}
              step={25}
              thumbTintColor={this.state.sliderColor}
              maximumTrackTintColor={this.state.sliderColor}
              minimumTrackTintColor={'black'}
              onValueChange={this.severityChange}
            />
          </View>
          <View style={{backgroundColor : 'white', marginBottom : 10}}>
            <TextInput onChangeText={this.chageDescription} placeholder={'Description'} style={styles.input} />
          </View>
          <Button title='Send Alert' style={styles.button} onPress={this.sendAlert}/>
        </ScrollView>
	    </DrawerLayoutAndroid> 
      
    )
  }
  
}



const styles = StyleSheet.create(style);


            //value : `18.879781, -99.221777` //Apatzingan
            //value : `18.876438, -99.220000` //Palmira