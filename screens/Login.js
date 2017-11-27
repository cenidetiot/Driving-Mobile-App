import React from 'react';
import { 
  StyleSheet,
  Text,
  TextInput,
  Button,
  Image,
  ToolbarAndroid,
  Picker,
  ToastAndroid,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';
import ServerConnection from '../services/ServerConnection'



export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
  constructor(props) {
    super(props);
    this.state = {
      code : "",
      email : "",
      password : "",
      message:""
    }
   }
  updateEmail = (email) => {
      this.setState({ email: email })
   }
   updatePassword = (password) => {
      this.setState({ password: password })
   }
   componentDidMount(){
    ServerConnection.getCompaniesList()
    ServerConnection.updateCampusList()
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
      ServerConnection.login(this.state.email,this.state.password)
      .then(async () => {
        
        AsyncStorage.getItem('fcmtoken').then((value) =>{
          ServerConnection.sendFcmToken(value)
          ServerConnection.sendFcmTokenHeroku(value)
        })
        
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
                title='Login' 
                onPress={this.onLogin.bind(this)}
                color='#e74c3c'
                style={styles.button}
              />
                <Text 
                  onPress={() => navigate('Signup')}
                  style={{color:'#ecf0f1', fontWeight: 'bold', marginTop : 40,textDecorationLine:'underline'}}>
                  Create a new Account
                </Text>
              <Image 
                  style={{width : 150,
                  height: 28,
                  marginTop: 20
                  }}
                  source={require('../images/logo_smartSDK.png')}
              />  
        </Image>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   backgroundColor: '#34495e',
    alignItems: 'center',
    justifyContent: 'center',
    width : null,
    height: null

  },
  title : {
    fontSize : 20,
    fontWeight :"bold",
    color: "white"
  },
  imageLogo : {
    width : 100,
    height: 100,
    marginBottom : 1,
    
  },
  input :{
    marginBottom : 20,
    width : '80%',
    height: 60,
    fontWeight :"bold",
    color : 'white',
    borderBottomColor : 'white'
  }
});