import React, {Component} from 'react';
import { 
 WebView
} from 'react-native';

export default class WebSignupScreen extends Component {
  
  render() { 
     
    return (
    	<WebView
              source={{uri: 'https://smartsdksecurity.com.mx/user/register?_next=%2Fmulti'}}
            />
      
    )
  }
  
}

