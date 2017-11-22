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
import { Card,Avatar,TYPO,COLOR,Button } from 'react-native-material-design';


import ServerConnection from '../services/ServerConnection'

import Toolbar from '../components/Toolbar'
import Nav from '../components/Nav'
import MyFloatButton from '../components/MyFloatButton'
  



export default class AlertsScreen extends Component {
  
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this)
    this.state = {
    	alerts : [
      ],
    	conter : 0,
      message : ""
    }
  } 
  componentDidMount(){
    let t = this
    ServerConnection.updateAlertArray()
      .then((response) =>{
        t.setState({alerts :  JSON.parse(response)})
      })
      .catch((err) => {
        t.setState({message : err.message})
      }) 
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
        <Toolbar navigation={this.props.navigation} title={'Alerts List'}  counter={this.state.conter} onPress={this.onPress.bind(this)}/>
	      <View style={styles.container}>  
        <Text>{this.state.message}</Text>
        <ScrollView>  
        {
          this.state.alerts.map((item)=>(
            
                <TouchableHighlight style={styles.card} underlayColor="#ecf0f1" 
                onPress={() => {
                  Alert.alert(
                        item.subCategory,
                        'Do you want to see it on the map?',
                        [
                          {text: 'YES', onPress: () => navigate('Map')},
                          {text: 'CANCEL', onPress: () => console.log("CANCEL")},
                        ],
                        { cancelable: false }
                      )
                }} key={Date.now()}>
                  <View style={styles.cardContainer}>
                    <View style={styles.cardAvatar}>
                    <Avatar  icon={'warning'} backgroundColor={'#e74c3c'}/> 
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

        <MyFloatButton navigate={navigate}/>
          
        </View>
	    </DrawerLayoutAndroid> 
      
    )
  }
  
}

const styles = StyleSheet.create({
	container: {
	    flex: 1,
	    marginTop:55,
	   //alignItems: 'flex-end'
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
    width : 100,
    height: 100,
    marginBottom : 1,
    
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
  card : {
    backgroundColor: "white",
    margin : 3
  },
  cardContainer:{
    flexDirection: 'row',
    alignItems:'center', 
    marginTop: 13,
    marginBottom :13
  },
  cardAvatar:{
    flex:1,
    alignItems:'center', 
  }

});