import React, { Component } from 'react';
import Mapbox, { MapView } from '@mapbox/react-native-mapbox-gl';
import {
  StyleSheet,
  Text, 
  View,
  ActivityIndicator ,
  DrawerLayoutAndroid,
  StatusBar,
  ToastAndroid,
  Alert,
  AsyncStorage
} from 'react-native';

import Nav from '../components/Nav.js'
import Toolbar from '../components/Toolbar.js'
import MyFloatButton from '../components/MyFloatButton'

import config from '../utils/config'
Mapbox.setAccessToken(config.mapboxToken);

export default class MapScreen extends Component {
  static navigationOptions = {
    title: 'Your Position'
  }
  constructor(props) {
    super(props);
    this.center
    let t = this
    
    this.showMap = this.showMap.bind(this)
    this.onPress = this.onPress.bind(this)
    this.state = {
      message : "",
      center:null,
      zoom: 50,
      annotations: [],
       alerts: 0,


    }
  }
  
   componentDidMount() {
    AsyncStorage.getItem('campuslist').then((list) =>{
        AsyncStorage.getItem('alerts').then((alerts) =>{
          let campuslist = JSON.parse(JSON.parse("[" + list + "]"))

          let alertslist = JSON.parse(JSON.parse("[" + alerts + "]"))
          //ToastAndroid.showWithGravity( alertslist.length.toString() , ToastAndroid.SHORT, ToastAndroid.CENTER);
          let annotations = []

          campuslist.map((camp) => {
            annotations.push({
              coordinates : camp.location,
              type: 'polyline',
              strokeColor: '#2980b9',
              strokeWidth: 4,
              strokeAlpha: .5,
              id: camp._id
            })
          })

          alertslist.map((alert) => {
            annotations.push({
              coordinates : JSON.parse("[" + alert.location + "]"),
              type: 'point',
              id: alert.id,
              title:alert.subCategory,
              subtitle: alert.description
            })
          })


        navigator.geolocation.getCurrentPosition(
          (position) => {
            let temp = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
              //latitude: 18.87649,
              //longitude: -99.21986
            }

            
            this.setState({center : temp, annotations : annotations})
          },
          (error) => {
            ToastAndroid.showWithGravity( error.message , ToastAndroid.SHORT, ToastAndroid.CENTER);
            this.setState({ message: error.message })
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );

      })      
    })
  }


  showMap(){
    if (this.state.center !== null){
      return (
        <MapView
          ref={map => { this._map = map; }}
          style={styles.map}
          initialCenterCoordinate={this.state.center}
          initialZoomLevel={18}
          annotations={this.state.annotations}
          initialDirection={0}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          styleURL={Mapbox.mapStyles.dark}
          showsUserLocation={true}
        />

      )
      //userTrackingMode={Mapbox.userTrackingMode.followWithHeading}
      ////showsUserLocation={true}styleURL={Mapbox.mapStyles.light}
    }else {

      return (
        <View style={styles.mapContainer}>
          <ActivityIndicator 
            animating={true}
            color={'blue'}
            size={50}
          />
          <Text>Loading...</Text>
        </View>
        )
    }
  }
  onPress (){
    this.refs['DRAWER'].openDrawer()
  }
  onClose(){
    this.refs['DRAWER'].closeDrawer()
  }

  render() {
    const { navigate } = this.props.navigation;
    StatusBar.setHidden(true);

    return (
      <DrawerLayoutAndroid
        ref={'DRAWER'}
        drawerWidth={250}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => (<Nav navigate={navigate} screen={'Map'} onClose={this.onClose.bind(this)}/>)}>
        <Toolbar title={'My Campus'} navigation={this.props.navigation} conter={0} onPress={this.onPress.bind(this)}/>
          <View style={styles.container}>
            
            {
              this.showMap()
            }
          </View>
          <MyFloatButton navigate={navigate}/>
      </DrawerLayoutAndroid>
    );
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginTop:50
  },
  mapContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  map: {
    flex: 4,
  },
  scrollView: {
    flex: 2
  },
  icon: {
    width: 30,
    height: 28,
  }
});