/*
Importaciones de Modulos
*/
import React from 'react';
import { 
  StyleSheet,
  Text,
  TextInput,
  Image,
  ToolbarAndroid,
  Picker,
  ToastAndroid,
  AsyncStorage,
  TouchableHighlight,
  View
} from 'react-native';

import { Button,Icon } from 'react-native-elements'
import ServerConnection from '../services/ServerConnection'
import style from '../styles/Login'


export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.showForm = this.showForm.bind(this)
    this.state = {
      code : "",
      //email : "mkpalacio@gmail.com",
      email: "pancho@gmail.com",
      //password : "Inaoe2017",
      password : "pancho",
      message:"",
      form : false
    }
   }

  updateEmail = (email) => {
      this.setState({ email: email })
  }

  updatePassword = (password) => {
      this.setState({ password: password })
  }

  showForm() {
    let { navigate } = this.props.navigation;
    if (!this.state.form){
      return (
        <View style={{marginTop : 30, marginBottom : 30}}>
          <Button
            title=' I have an account ' 
            onPress={() => this.setState({form : true})}
            icon={{name: 'account-circle'}}
            buttonStyle={{width: 200}}
            backgroundColor='#c0392b'
          />
          <Button
            small
            icon={{name: 'accessibility'}}
            onPress={() =>{
              navigate('Signup')
            }}
            title='Create a new account' 
            buttonStyle={{marginTop : 15,width: 200}}
            backgroundColor='#2980b9'
            />
          <Button
            small
            icon={{name: 'verified-user'}}
            onPress={() =>{
              navigate('WebSignup')
            }}
            title='Smart Security Signup' 
            buttonStyle={{marginTop : 15, width: 200}}
            backgroundColor='#2c3e50'
            />
        </View>
      )
    }else {
      return (
      <View style={{alignItems: 'center',
	    justifyContent: 'center', width: 250}} >
        <Icon
          reverse
          onPress={() => this.setState({form : false})}
          name='arrow-back'
          color='#c0392b'
        />
        <TextInput
          ref={'Email'}
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor="white"
          selectionColor="#3498db"
          onChangeText={this.updateEmail}
          value={this.state.email}
        />

        <TextInput
          ref={'password'}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="white"
          onChangeText={this.updatePassword}
          secureTextEntry={true}
          value={this.state.password}
        />

        <Text style={{
          color : 'red',
          fontWeight:'bold',
          borderColor : 'red'
        }}>{this.state.message}</Text>
          <Button
            small
              title='Login' 
              onPress={this.onLogin.bind(this)}
              backgroundColor='#c0392b'
          />
      </View>
      )
    }
  }
   
  async onLogin () { 
    let t =  this
    let errParams =false
    if (this.state.email === ""){
      errParams = true    
       t.setState({message : "The email you've entered doesn't match any account"})
    }
    if (this.state.password === "") {
      errParams = true
       t.setState({message : "The password you've entered is incorrect"})
    }
    if (!errParams){

      ServerConnection.user.login(this.state.email,this.state.password)
      .then(async () => {
        AsyncStorage.getItem('fcmtoken').then((value) =>{
          ServerConnection.fire.sendFcmToken(value)
        })
        AsyncStorage.setItem('userid', t.state.email)
        await ServerConnection.user.getUserData()
        t.props.navigation.navigate('Loading')
      })
      .catch((err) => {
        t.setState({message : err.message})
      }) 

    }
  } 

  render() { 
    let { navigate } = this.props.navigation;
    return (
      <Image source={require('../images/drive1.jpg')} style={styles.container}>
              <Text style={styles.title}>Driving App</Text>
              <Image 
                  style={{width : 80,
                  height: 80,
                  marginTop: 10,
                  marginBottom : 25

                  }}
                  source={require('../images/logoCircle.png')}
                />

              {/**/}
              {this.showForm()}
              
              <Image 
                style={styles.backImage}
                  source={require('../images/logo_smartSDK.png')}
              />  
        </Image>
    )
  }
  
}

const styles = StyleSheet.create(style);