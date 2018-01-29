import {AsyncStorage ,ToastAndroid} from 'react-native'
import routes from '../../../config/routes'
import config from '../../../config/config'
import Requests from './HTTP/Requests';

export default class Firebase {

	async sendFcmToken(fcmtoken){
		let ip = config.ip
		let route = routes.fcm
		AsyncStorage.getItem('device').then((device) =>{
			Requests.doPost(`http://${ip}${route}`,{
				fcmToken : fcmtoken,
				refDevice : device
			})
		})
	}

	async updateFcmToken(fcmtoken){
		let ip = config.ip
		let route = routes.fcm
		AsyncStorage.getItem('device').then((device) =>{
			Requests.doPut(`http://${ip}${route}${device}`, {
				fcmToken : fcmtoken,
				refDevice : device
			})			
		})

	}





}



