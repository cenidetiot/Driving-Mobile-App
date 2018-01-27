import {AsyncStorage ,ToastAndroid} from 'react-native'
import ServerConnection from './ServerConnection'

module.exports = async (token) => {

    AsyncStorage.setItem('fcmtoken', token.FCMToken);
	AsyncStorage.getItem('token').then((value) =>{
        if (typeof value === 'string') {
			ServerConnection.fire.updateFcmToken(token.FCMToken)
        }
    })
	
}