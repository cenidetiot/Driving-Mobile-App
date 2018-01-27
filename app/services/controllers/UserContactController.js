import {AsyncStorage ,ToastAndroid} from 'react-native'
import routes from '../../../config/routes'
import config from '../../../config/config'

export default class UserContact {

	constructor () {
		let t = this
		AsyncStorage.getItem('token').then((token) =>{
			t.token = token
		})
	}

	async getUserContact(){
		let ip = config.ip
		let route = routes.userContact

		let promise = new Promise((resolve, reject) => {
			AsyncStorage.getItem('userid').then((value) =>{
				fetch(`http://${ip}${route}UserContact:${value}`, {
			        method: 'GET',
			        headers: {
			          'Accept': 'application/json',
			          'Content-Type': 'application/json',
			        }
			    })
			    .then((response) => {

			        if (response.status === 200){
			        	
	           			//ToastAndroid.show(  response["_bodyInit"], ToastAndroid.SHORT);
	    				AsyncStorage.setItem('usercontact', response["_bodyInit"])
					 
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

	async createUserContact(body){
		let ip = config.ip
		let route = routes.userContact

		let promise = new Promise((resolve, reject) => {

			fetch(`http://${ip}${route}`, {
		        method: 'POST',
		        headers: {
		          'Accept': 'application/json',
		          'Content-Type': 'application/json',
		        },
		        body: JSON.stringify(body)
		    })
		    .then((response) => {

		        if (response.status === 200){
		        	
           			ToastAndroid.show("Se ha actualizado correctamente" , ToastAndroid.SHORT);
		          	resolve({response : 200}) 

				 
		        }else {
		           	reject({message : response["_bodyInit"]})
		        }
		       
		    })
		    .catch((err) => {         
		        reject({message : err})
		    })
		})

		return promise
	}

	async updateUserContact(body, id ){
		let ip = config.ip
		let route = routes.userContact

		let promise = new Promise((resolve, reject) => {
			AsyncStorage.getItem('userid').then((value) =>{
				fetch(`http://${ip}${route}UserContact:${value}`, {
			        method: 'PUT',
			        headers: {
			          'Accept': 'application/json',
			          'Content-Type': 'application/json',
			        },
			        body: JSON.stringify(body)
			    })
			    .then((response) => {
			        if (response.status === 200){
	           			ToastAndroid.show("Se ha actualizado correctamente" , ToastAndroid.SHORT);
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



