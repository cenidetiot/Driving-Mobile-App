import {AsyncStorage ,ToastAndroid} from 'react-native'
import routes from '../../../config/routes'
import config from '../../../config/config'

export default class Firebase {

	constructor () {
		let t = this
		AsyncStorage.getItem('token').then((token) =>{
			t.token = token
		})
	}

	async sendFcmToken(fcmtoken){
		let ip = config.ip
		let route = routes.fcm

		let promise = new Promise((resolve, reject) => {
			AsyncStorage.getItem('device').then((device) =>{
					
					//ToastAndroid.show( fcmtoken , ToastAndroid.SHORT);

					fetch(`http://${ip}${route}`, {
				        method: 'POST',
				        headers: {
				          'Accept': 'application/json',
				          'Content-Type': 'application/json',
				        },
				        body: JSON.stringify({
				          fcmToken : fcmtoken,
				          refDevice : device
				        })
				    })
				    .then((response) => {

				        if (response.status === 200){
				        	
		           			//ToastAndroid.show( fcmtoken , ToastAndroid.SHORT);
				          	resolve({response : 200}) 
						 
				        }else {
				           	reject({message : response["_bodyInit"]})
				        }
				       
				    })
				    .catch((err) => {         
				        reject({message : err})
				    })
				
			})
		})

		return promise
	}

	async updateFcmToken(fcmtoken){
		let ip = config.ip
		let route = routes.fcm

		let promise = new Promise((resolve, reject) => {
			AsyncStorage.getItem('device').then((device) =>{
					
					//ToastAndroid.show( fcmtoken , ToastAndroid.SHORT);

					fetch(`http://${ip}${route}${device}`, {
				        method: 'PUT',
				        headers: {
				          'Accept': 'application/json',
				          'Content-Type': 'application/json',
				        },
				        body: JSON.stringify({
				          fcmToken : fcmtoken,
				          refDevice : device
				        })
				    })
				    .then((response) => {

				        if (response.status === 200){
				        	
		           			//ToastAndroid.show( fcmtoken , ToastAndroid.SHORT);
				          	resolve({response : 200}) 
						 
				        }else {
				           	reject({message : response["_bodyInit"]})
				        }
				       
				    })
				    .catch((err) => {         
				        reject({message : err})
				    })
				
			})
		})

		return promise
	}





}



