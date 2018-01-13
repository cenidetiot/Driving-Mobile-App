import React, {Component} from 'react';
import { 
 WebView
} from 'react-native';

export default class WebSignupScreen extends Component {
  
  render() { 
     
    return (
    	<WebView
              source={{uri: 'https://account.lab.fiware.org/sign_up/'}}
            />
      
    )
  }
  
}

