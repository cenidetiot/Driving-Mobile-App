import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  Dimensions,
  ToastAndroid,
  AsyncStorage,
  ScrollView,
  Switch
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Avatar, TYPO, COLOR, Button, Toolbar as MaterialToolbar } from 'react-native-material-design';
import Nav from '../components/Nav';
import style from '../styles/Setting';
import NgsiModule from '../../NativeModules/NgsiModule'

export default class SettingScreen extends Component {
	constructor() {
       	super();
      
      	this.state = {
	         switchOfflineValue: false,
	         switchMobileData: false
      	}

      	NgsiModule.getValuePreferenceOffline((status) => {
       		let statusOffline;
       		statusOffline = status;
          	this.setState({switchOfflineValue: statusOffline});
          	//ToastAndroid.show("Status: "+statusOffline, ToastAndroid.SHORT);
        },
        (err) => {
          ToastAndroid.show("Status Error: "+statusOffline, ToastAndroid.SHORT);
        });

   }
   /*async componentDidMount() {

	}	*/
   	toggleSwitchOffline = (value) => {
	   	NgsiModule.saveValuePreferenceOffline(value);
		this.setState({switchOfflineValue: value});
		ToastAndroid.show("Switch 1 is: "+value, ToastAndroid.SHORT);
   	}

	onBackPress(){
	    let backAction = NavigationActions.back()
	    this.props.navigation.dispatch(backAction)
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
		        renderNavigationView={() => (<Nav navigate={navigate} screen={'Home'} onClose={this.onClose.bind(this)}/> )}>
		         <MaterialToolbar
		            style={{flex:1,backgroundColor:'#2d5f73'}}
		            title={'Settings'}
		            icon={'arrow-back'}
		            onIconPress={this.onBackPress.bind(this)}
		            rightIconStyle={{
		                margin: 10
		          }}		          		         
		        />
		        <ScrollView style={styles.container}>
		        	<View style={[styles.row, styles.lineStyle]}>
			        	<View style={[styles.box, styles.colums]}>
			        		<Text style={styles.textTitle}> Offline mode</Text>
			        		<Text> When you go offline, you can only store information on the phone.</Text>
			        	</View>
			        	<View style={[styles.box, styles.switchStyle]}>
	 						<Switch onValueChange={this.toggleSwitchOffline} value = {this.state.switchOfflineValue}/>
			        	</View>
		        	</View>       	
		        </ScrollView>
			</DrawerLayoutAndroid>

		);
	}
}

const styles = StyleSheet.create(style);