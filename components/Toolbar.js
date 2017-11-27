import React, { Component } from 'react';
import { PropTypes, Text, View, AsyncStorage,ToastAndroid } from 'react-native';
import { Toolbar as MaterialToolbar } from 'react-native-material-design';
import SocketIOClient from 'socket.io-client'
import { NavigationActions } from 'react-navigation'

import config from '../utils/config'

export default class Toolbar extends Component {

    constructor(props) {  
        super(props);
        this.state = {
            counter: 0,
            alerts : []
        }   
        this.watchAlerts = this.watchAlerts.bind(this)
        //this.socket = SocketIOClient(`http://${config.ip}:${config.port}`, { transports: ['websocket'] });
    }

    componentDidMount() {
        let t = this

        AsyncStorage.getItem('campus').then((campus) =>{
            if (campus === "{}"){
              t.setState({campus: null})
            }else{
              let camp = JSON.parse(campus)
            }       
          })
        
    }

    watchAlerts = () => {
      this.props.navigation.navigate('Alerts')  
    };

    onBack(){
        //this.socket.disconnect();
        let backAction = NavigationActions.back()
        this.props.navigation.dispatch(backAction)
    }
//Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ANDROID_ID)
    isHome(){
        if (this.props.isHome !== undefined) {
           return (
                <MaterialToolbar
                    style={{flex:1,backgroundColor:'#1565c0'}}
                    title={this.props.title}
                    icon={'menu'}
                    onIconPress={this.props.onPress}
                    actions={[{
                        icon: 'warning',
                        //badge: { value: this.state.counter, animate: true },
                        onPress: this.watchAlerts
                    }]}
                    rightIconStyle={{
                        margin: 10
                    }}
                />
            ); 
       }else {
            return (
                <MaterialToolbar
                    style={{flex:1,backgroundColor:'#3498db'}}
                    title={this.props.title}
                    icon={'arrow-back'}
                    onIconPress={this.onBack.bind(this)}
                    actions={[{
                        icon: 'warning',
                        //badge: { value: this.state.counter, animate: true },
                        onPress: this.watchAlerts,
                        color:'#3498db'
                    }]}
                    rightIconStyle={{
                        margin: 10
                    }}
                />
            );
       }
    }

    render() {
        return(this.isHome())
    }
}