import {AsyncStorage ,ToastAndroid} from 'react-native'
import ServerConnection from './ServerConnection'

module.exports = async (token) => {

    AsyncStorage.setItem('fcmtoken', token.FCMToken);
	AsyncStorage.getItem('token').then((value) =>{
        if (typeof value === 'string') {
			ServerConnection.updateFcmToken(token.FCMToken)
			.then((result) => console.log(result))
			.catch((err) => console.log(err))
            
            ServerConnection.updateFcmTokenHeroku(token.FCMToken)
            .then((result) => console.log(result))
            .catch((err) => console.log(err))
        }
    })
	
    //ToastAndroid.show(`Se actualizó FCM TOken ${JSON.stringify(token)}` , ToastAndroid.SHORT);
}