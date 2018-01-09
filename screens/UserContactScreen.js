import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  ScrollView,
  Image,
  ToastAndroid,
  TextInput,
  Button,
  AsyncStorage,
  Picker
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { Card,Icon,Avatar,TYPO,COLOR,Toolbar as MaterialToolbar  } from 'react-native-material-design';
import Toolbar from '../components/Toolbar.js'
import Nav from '../components/Nav.js'

import ServerConnection from '../services/ServerConnection'

export default class UserContactScreen extends Component {
  
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this)
    this.state = {
      userid: "",
      id: "",
      phonenumber: "",
      name: "",
      lastName:"",
      address : "",
      message : "",
      exist:false
    }
  } 
  
  componentDidMount(){ 
    let t = this
    this.setState({userid : this.props.navigation.state.params.id })

    AsyncStorage.getItem('usercontact').then((usercontact) =>{
      usercontact = JSON.parse(usercontact)

      if(usercontact !== null){
         let newState = {
          id : usercontact.id,
          name: usercontact.name,
          lastname: usercontact.lastName,
          phonenumber: usercontact.phoneNumber[0],
          address : usercontact.address,
          exist : true
         }
         t.setState(newState)
      }

    })

  }

  onBackPress(){
    let backAction = NavigationActions.back()
    this.props.navigation.dispatch(backAction)

  }

  async onButtonPress(){

    if (this.state.exist){
        let me = {
          id : `UserContact:${this.state.userid}`,
          phoneNumber: [this.state.phonenumber],
          name: this.state.name,
          lastName:this.state.lastname,
          address : this.state.address
        } 
        //ToastAndroid.show(  JSON.stringify(me), ToastAndroid.SHORT);
        //this.setState({message : JSON.stringify(me)}) 
        await ServerConnection.contact.updateUserContact(me,this.state.id )
        
    }else{
        let me = {
          id : `UserContact:${this.state.userid}`,
          refUser : `${this.state.userid}`,
          phoneNumber: [this.state.phonenumber],
          name: this.state.name,
          lastName:this.state.lastname,
          address : this.state.address
        } 
        //ToastAndroid.show(  JSON.stringify(me), ToastAndroid.SHORT);
        // this.setState({message : JSON.stringify(me)})
        await ServerConnection.contact.createUserContactApi(me)

    }
    ServerConnection.contact.getUserContact()
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
            title={'Contact user'}
            icon={'arrow-back'}
            onIconPress={this.onBackPress.bind(this)}
            rightIconStyle={{
                margin: 10
          }}
        />
        <ScrollView style={styles.container}>
           <Text style={styles.text}>Contact Name</Text>
           <TextInput value={this.state.name} onChangeText={(text) => this.setState({name:text})}/> 
           <Text style={styles.text}>Last name</Text>
           <TextInput value={this.state.lastname} onChangeText={(text) => this.setState({lastname:text})}/>   
           <Text style={styles.text}>Address </Text>
           <TextInput value={this.state.address} keyboardType="email-address" onChangeText={(text) => this.setState({address:text})}/>  
           <Text style={styles.text}>Phone Number</Text>
           <TextInput value={this.state.phonenumber} keyboardType="numeric" onChangeText={(text) => this.setState({phonenumber:text})}/>   
            
            <Button title="Update Contact " style={{flex: 1}} onPress={this.onButtonPress.bind(this)}/>
            
           <Text>{this.state.message}</Text>
        </ScrollView>
      </DrawerLayoutAndroid> 
      
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginTop:55,
      margin:5
  }, 
    icon: { 
      width: 30,
      height: 25,
  },
  header: {
      paddingTop: 16
  },
  text: {
      marginTop: 20,
      fontWeight:'bold'
  },
  textinput : {
    color: "#e74c3c"
  }
});