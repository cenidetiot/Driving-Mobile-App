import {AsyncStorage ,ToastAndroid} from 'react-native'
import routes from '../../../config/routes'
import config from '../../../config/config'
import Requests from './HTTP/Requests';

export default class UserContext {

	async createUserContext( body ){
		let ip = config.ip
		let route = routes.userContext
		let promise = new Promise((resolve, reject) => {
			Requests.doPost(`http://${ip}${route}`, body)
			.then((data) => {
				resolve(true)
			})
			.catch((error)=>{
				ToastAndroid.show( error, ToastAndroid.SHORT);
				reject(false)
			})
		})
		return promise
	}
}


