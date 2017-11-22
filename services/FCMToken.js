import {AsyncStorage ,ToastAndroid} from 'react-native'
import ServerConnection from './ServerConnection'

module.exports = async (token) => {

    AsyncStorage.setItem('fcmtoken', token.FCMToken);
	AsyncStorage.getItem('token').then((value) =>{
        if (typeof value === 'string') {
        	ToastAndroid.show(value , ToastAndroid.SHORT);
			ServerConnection.updateFcmToken(token.FCMToken)
			.then((result) => console.log(result))
			.catch((err) => console.log(err))
        }
    })
	
    //ToastAndroid.show(`Se actualizó FCM TOken ${JSON.stringify(token)}` , ToastAndroid.SHORT);
}