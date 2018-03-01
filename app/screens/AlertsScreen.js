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
import { Card,Avatar,TYPO,COLOR,Button,Toolbar as MaterialToolbar } from 'react-native-material-design';

import { NavigationActions } from 'react-navigation'
import Nav from '../components/Nav'
import MyFloatButton from '../components/MyFloatButton'

import ServerConnection from '../services/ServerConnection'
import store from '../redux/reducers/index'
import Actions from '../redux/actions/Actions'

import style from '../styles/Alerts'
  
export default class AlertsScreen extends Component {
  
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this)
    this.hasAlerts = this.hasAlerts.bind(this)
    this.state = {
    	alerts : [
      ],
    	counter : 0,
      message : "",
      colors: {
        informational: '#3498db',
        low: '#2c3e50',
        medium: '#f1c40f',
        high: '#e67e22',
        critical: '#c0392b' 
      }

    }
  } 
  async componentDidMount(){
    let t = this
    await ServerConnection.alerts.getAlerts()
    .then(async (array ) => {
        //ToastAndroid.show("Update the alerts", ToastAndroid.SHORT);
        await Actions.setAlerts(JSON.parse(array))                 
    })
    .catch((err) =>{
        Actions.setAlerts([])   
        ToastAndroid.show("Error loading alerts", ToastAndroid.SHORT);            
    })
    /*ServerConnection.alerts.getAlerts()
      .then((response) =>{
        t.setState({alerts :  JSON.parse(response),
          counter : JSON.parse(JSON.parse("["+ alerts + "]")).length,
          message : response
        })
          
      })
      .catch((err) => {
        AsyncStorage.getItem('alerts').then((alerts) =>{
          AsyncStorage.getItem('campus').then((campus) =>{

            if (campus !== "{}" && campus !== null){
              if(alerts !== '{}' && alerts !== null){
                t.setState({
                  alerts : JSON.parse(JSON.parse("["+ alerts + "]")),
                  counter : JSON.parse(JSON.parse("["+ alerts + "]")).length
                })
              } 
            }

          })
        })
      }) */
    t.setState({ alerts : store.getState().alerts.alerts, counter : store.getState().alerts.alerts.length})
    store.subscribe(() => {
        try {
            t.setState({ alerts : store.getState().alerts.alerts})
        }catch(err){}
    })

  }
  onPress (){
    this.refs['DRAWER'].openDrawer()
  }
  onClose(){
    this.refs['DRAWER'].closeDrawer()
  }

  onBackPress(){
    let backAction = NavigationActions.back()
    this.props.navigation.dispatch(backAction)
  }

  hasAlerts(){

    if (this.state.alerts.length >= 1 ){
      return(
        <ScrollView>  
          
          {
            this.state.alerts.map((item)=>(
              <TouchableHighlight style={styles.card} underlayColor="#ecf0f1" 
                onPress={() => {
                  Alert.alert(
                    item.subCategory,
                    'Do you want to see it on the map?',
                    [
                      {text: 'YES', onPress: () =>{ 
                        this.props.navigation.navigate('Map', item)
                      }},
                      {text: 'CANCEL', onPress: () => console.log("CANCEL")},
                    ],
                    { cancelable: false }
                  )
                }} key={item.id}>
                  <View style={styles.cardContainer}>
                    <View style={styles.cardAvatar}>
                    <Avatar  icon={'warning'} backgroundColor={this.state.colors[item.severity]}/> 
                    </View>
                    <View style={{flex:4}} >
                      <Text style={{flex:1}} style={{fontWeight:'bold'}}>{item.subCategory}</Text>
                      <Text style={{textAlign : 'auto'}}>{item.description}</Text>
                    </View>
                  </View>
              </TouchableHighlight>
            ))
          }
          </ScrollView>
        )
    }else{
      return (
        <TouchableHighlight style={styles.card} underlayColor="#ecf0f1" >
            <View style={styles.cardContainer}>
              <View style={{flex:4}} >
                <Text style={{flex:1}} style={{fontWeight:'bold', textAlign:'center'}}>
                  No alerts to show
                </Text>
              </View>
            </View>
        </TouchableHighlight>
        )
    }
  }

  render() { 
    const { navigate } = this.props.navigation;
     
    return (
    	<DrawerLayoutAndroid
    		ref={'DRAWER'}
		    drawerWidth={250}
		    drawerPosition={DrawerLayoutAndroid.positions.Left}
		    renderNavigationView={() => (<Nav navigate={navigate} screen={'Home'} onClose={this.onClose.bind(this)}/>)}>
        <MaterialToolbar
            style={{flex:1,backgroundColor:'#2d5f73'}}
            title={'Alerts on your Campus'}
            icon={'arrow-back'}
            onIconPress={this.onBackPress.bind(this)}
            rightIconStyle={{
                margin: 10
          }}
        />
        <View style={styles.container}>  
          {this.hasAlerts()}
          <MyFloatButton navigate={navigate}/>
          
          
        </View>
	    </DrawerLayoutAndroid> 
      
    )
  }
  
}

const styles = StyleSheet.create(style);