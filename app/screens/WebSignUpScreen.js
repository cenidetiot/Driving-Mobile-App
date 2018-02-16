import React, {Component} from 'react';
import { 
 WebView
} from 'react-native';

export default class WebSignupScreen extends Component {
  
  render() { 
     
    return (
    	<WebView
              source={{uri: 'https://smartsdksecurity.duckdns.org/user/register'}}
            />
      
    )
  }
  
}

