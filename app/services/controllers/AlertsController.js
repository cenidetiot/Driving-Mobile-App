import {AsyncStorage ,ToastAndroid} from 'react-native'
import routes from '../../../config/routes'
import config from '../../../config/config'

import Requests from './HTTP/Requests';

export default class Alerts {

	async getAlerts() {
		let t = this
	   	let ip = config.ip
		let route = routes.alerts
		let promise = new Promise((resolve, reject) => {
	   		AsyncStorage.getItem('campus').then((campus) =>{
		        if (campus !== "{}" && campus !== null){
					let camp = JSON.parse(campus)._id
					Requests.doGet(`http://${ip}${route}${camp}`)
					.then((data) => {
						AsyncStorage.setItem('alerts', JSON.stringify(data))
						resolve(data) 
					})
					.catch((error)=>{
						reject({message : "Error "+ response.status })
						ToastAndroid.show( error, ToastAndroid.SHORT);
					})
		        }else{
		        	reject({message : "No se ecuentra en un campus"})
		        }      
		    })
		})
		return promise
	}




}


