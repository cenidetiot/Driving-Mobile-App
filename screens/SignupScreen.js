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

import ServerConnection from '../services/ServerConnection'

import style from '../styles/styles'

export default class SignupScreen extends Component {
  
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this)
    this.state = {
      id:"",
    	company:"",
      phonenumber:"",
      name:"",
      lastname:"",
      email:"",
      username:"",
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
  }

  onBackPress(){
    let backAction = NavigationActions.back()
    this.props.navigation.dispatch(backAction)
  }

  onButtonPress(){
    let me = {
      id: `${this.state.id}`,
      refCompany:this.state.company,
      phoneNumber: [this.state.phonenumber],
      name: this.state.name,
      lastName:this.state.lastname,
      email:this.state.email,
      userName:this.state.username,
      aliasUser: this.state.aliasuser,
      password: this.state.password,
    } 
    //this.setState({message : JSON.stringify(me)})
    ServerConnection.user.signUp(me)
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
    	<View>
        <MaterialToolbar
            style={{flex:1,backgroundColor:'#2d5f73'}}
            title={'Sign Up'}
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
            <Text style={styles.text}>ID</Text>
           <TextInput value={this.state.id} onChangeText={(text) => this.setState({id:text})}/>  
           <Text style={styles.text}>Name</Text>
           <TextInput value={this.state.name} onChangeText={(text) => this.setState({name:text})}/> 
           <Text style={styles.text}>Last name</Text>
           <TextInput value={this.state.lastname} onChangeText={(text) => this.setState({lastname:text})}/>   
           <Text style={styles.text}>Email</Text>
           <TextInput value={this.state.email} keyboardType="email-address" onChangeText={(text) => this.setState({email:text})}/>  
           <Text style={styles.text}>Phone Number</Text>
           <TextInput value={this.state.phonenumber} keyboardType="numeric" onChangeText={(text) => this.setState({phonenumber:text})}/>   
           <Text style={styles.text}>User Name</Text>
           <TextInput value={this.state.username} onChangeText={(text) => this.setState({username:text})}/>
           <Text style={styles.text}>Alias User</Text>
           <TextInput value={this.state.aliasuser} onChangeText={(text) => this.setState({aliasuser:text})}/>
           <Text style={styles.text}>Password</Text>
           <TextInput 
                secureTextEntry={true} value={this.state.password} onChangeText={(text) => this.setState({password:text})}/>

           <Button title="Sign Up" onPress={this.onButtonPress.bind(this)}/>
           <Text>{this.state.message}</Text>
        </ScrollView>
	    </View> 
      
    )
  }
  
}

const styles = StyleSheet.create(style.signUpScreen);