import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Image,
  DrawerLayoutAndroid,
  AsyncStorage,
  ToastAndroid
} from 'react-native';
import {Avatar} from 'react-native-elements'
import { Drawer,COLOR,TYPO,Divider } from 'react-native-material-design';
import Toolbar from '../components/Toolbar.js'
import store from '../redux/reducers/index'

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this)
    this.state = {
    user : "",
    sig : "",
    campus : null
    }
  }
  componentDidMount() {
    let t  = this
    AsyncStorage.getItem('userdata').then((value) =>{
      let data = JSON.parse(value)
      let sig = data.first_name[0]+ data.first_name[1]
      sig = sig.toUpperCase()
      t.setState({user : `${data.first_name} ${data.last_name}`,  sig : sig})
    })
  }

  logOut () {
    AsyncStorage.removeItem('token', () => {
      ToastAndroid.showWithGravity('Se cerró sesión', ToastAndroid.SHORT, ToastAndroid.CENTER);
      this.props.navigate('Login')
      },(error) => {
        ToastAndroid.showWithGravity(error, ToastAndroid.SHORT, ToastAndroid.CENTER);
      }
    )
  }
	render() {
		return (
			<Drawer theme='dark'>
        <Drawer.Header color={'#8e44ad'} image={<Image width={250} heigth={200} source={require('./../images/fiware.jpg')}/>} >
            <View style={styles.header} >
            <Avatar
              large
              rounded
              title={this.state.sig}
              onPress={() => console.log("Works!")}
              overlayContainerStyle={{backgroundColor: '#2c3e50'}}
            />
                <Text style={styles.text}>{this.state.user}</Text>
            </View>
        </Drawer.Header>
        <Drawer.Section
            items={[
            {
                icon: 'transfer-within-a-station',
                value: 'My Speed',
                active: this.props.screen === 'Speed',
                onPress: () => {this.props.navigate('Speed')
                this.props.onClose()},
                onLongPress: () => console.log("OK")
            },
            {
                icon: 'map',
                value: 'Campus Map',
                active: this.props.screen === 'Map',
                onPress: () => {this.props.navigate('Map')
              this.props.onClose()},
                onLongPress: () => console.log("OK")
            },
            {
              icon: 'announcement',
              value: 'My Alerts',
              active: this.props.screen === 'MyAlerts',
              onPress: () => {this.props.navigate('MyAlerts')
              this.props.onClose()},
                onLongPress: () => console.log("OK")
            },
            {
                icon: 'face',
                value: 'My Profile',
                active: this.props.screen === 'Settings',
                onPress: () => {
                  this.props.navigate('Settings') 
                  this.props.onClose()
                },
                onLongPress: () => console.log("OK")
            },
            {
                icon: 'settings',
                value: 'Settings',
                active: this.props.screen === 'Setting',
                onPress: () => {
                  this.props.navigate('Setting') 
                  this.props.onClose()
                },
                onLongPress: () => console.log("OK")
            },
            {
                icon: 'close',
                value: 'Logout',
                onPress: () => {
                  this.props.navigate('Loading') 
                  AsyncStorage.removeItem('token')
                  AsyncStorage.removeItem('userid')
                  AsyncStorage.removeItem('userdata')
                  this.props.onClose()
                },
                onLongPress: () => console.log("OK")
            }
            ]}
        />                
   </Drawer>
		)
	}
}


const styles = StyleSheet.create({
		header: {
	    paddingTop: 16
	},
	text: {
	    marginTop: 5,
      fontWeight :"bold",
      color: "#2c3e50"
	}
});