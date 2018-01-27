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

import style from '../styles/Profile'

export default class ProfileScreen extends Component {
  
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this)
    this.state = {
      id:"",
      refaffiliation:"",
      phonenumber:"",
      first_name:"",
      last_name:"",
      email:"",
      address:"",
      aliasuser:"",
      password:"",
      companies:[],
      message : ""
    }
  }   
  componentDidMount(){ 
    let t = this
    AsyncStorage.getItem('companieslist').then((companies) =>{
      t.setState( { companies : JSON.parse(JSON.parse(companies))})
    })

    AsyncStorage.getItem('userdata').then((userdata) =>{
      let data  = JSON.parse(userdata)
      let newState = {
        id : data.id,
        refaffiliation : data.refaffiliation,
        phonenumber:data.phonenumber,
        first_name:data.first_name,
        last_name:data.last_name,
        email:data.email,
        address:data.address,
        aliasuser:data.aliasuser,
        password: "*******"
      }
      t.setState( newState )
    })
    //ServerConnection.contact.getUserContact()

  }

  onBackPress(){
    let backAction = NavigationActions.back()
    this.props.navigation.dispatch(backAction)
  }

  async onUpdateUserData(){
    let me = {
      refaffiliation :this.state.refaffiliation ,
      phonenumber: this.state.phonenumber,
      first_name: this.state.first_name,
      last_name:this.state.last_name,
      email:this.state.email,
      address:this.state.address,
      aliasuser: this.state.aliasuser,
      password: this.state.password,
    } 
    //this.setState({message : JSON.stringify(me)})
    await ServerConnection.user.updateUserData(me,this.state.id )
    ServerConnection.user.getUserData()
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
            title={'Profile Settings'}
            icon={'arrow-back'}
            onIconPress={this.onBackPress.bind(this)}
            rightIconStyle={{
                margin: 10
          }}
        />
        <ScrollView style={styles.container}>
           <Text style={styles.text}>Company</Text>
            <Picker
              selectedValue={this.state.company}
              onValueChange={(itemValue, itemIndex) => this.setState({company: itemValue})}>
              {this.state.companies.map((comp) => (
                  <Picker.Item key={comp._id} label={comp.name} value={comp.name} />
                ))}
            </Picker> 
           <Text style={styles.text}>First Name</Text>
           <TextInput value={this.state.first_name} onChangeText={(text) => this.setState({first_name:text})}/> 
           <Text style={styles.text}>Last name</Text>
           <TextInput value={this.state.last_name} onChangeText={(text) => this.setState({last_name:text})}/>   
           <Text style={styles.text}>Email</Text>
           <TextInput value={this.state.email} keyboardType="email-address" onChangeText={(text) => this.setState({email:text})}/>  
           <Text style={styles.text}>Phone Number</Text>
           <TextInput value={this.state.phonenumber} keyboardType="numeric" onChangeText={(text) => this.setState({phonenumber:text})}/>   
           <Text style={styles.text}>Address</Text>
           <TextInput value={this.state.address} onChangeText={(text) => this.setState({address:text})}/>
           <Text style={styles.text}>Alias User</Text>
           <TextInput value={this.state.aliasuser} onChangeText={(text) => this.setState({aliasuser:text})}/>
           <Text style={styles.text}>Password</Text>
           <TextInput 
                secureTextEntry={true} value={this.state.password} onChangeText={(text) => this.setState({password:text})}/>

            <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center',}}>
              <Button title="Update Profile " style={{flex: 1}} onPress={this.onUpdateUserData.bind(this)}/>
              {/*<Button title="Update Contact" style={{flex: 1}} onPress={() => navigate('UserContact', {id : this.state.id})}/>*/}
            </View>
           <Text>{this.state.message}</Text>
        </ScrollView>
      </DrawerLayoutAndroid> 
      
    )
  }
  
}

const styles = StyleSheet.create(style);