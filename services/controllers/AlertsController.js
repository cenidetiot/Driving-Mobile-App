import {AsyncStorage ,ToastAndroid} from 'react-native'
import routes from '../../utils/routes'
import config from '../../utils/config'

export default class Alerts {

	constructor () {
		let t = this
		AsyncStorage.getItem('token').then((token) =>{
			t.token = token
		})
	}

	async getAlerts() {
		let t = this
	   	let ip = config.ip
		let route = routes.alerts
		let promise = new Promise((resolve, reject) => {
	   		AsyncStorage.getItem('campus').then((campus) =>{
		        if (campus !== "{}" && campus !== null){
		        	let camp = JSON.parse(campus)._id
		        	fetch(`http://${ip}${route}${camp}`, {
			     	   method: 'GET',
			        	headers: {
			           		'Accept': 'application/json',
			           		'Content-Type': 'application/json',
			        	   'x-access-token': t.token
			        	}
			      	})
			      	.then((response) => {
			        	if (response.status === 200){
			        		AsyncStorage.setItem('alerts',response["_bodyInit"])
	              			resolve(response["_bodyInit"]) 
			        	}else {
			           		reject({message : "Error "+ response.status })
			        	}
			      	})
		        }else{
		        	reject({message : "No se ecuentra en un campus"})
		        }      
		    })
		})
		return promise
	}




}


