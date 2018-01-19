import {AsyncStorage ,ToastAndroid} from 'react-native'
import routes from '../../utils/routes'
import config from '../../utils/config'

export default class User {

	constructor (token) {
		this.token = token
	}

	async signUp(body){
		let ip = config.ip
		let route = routes.user

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
		        	
           		ToastAndroid.show("Se ha registrado correctamente" , ToastAndroid.SHORT);
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

	async login(user , pass){
		let ip = config.ip
		let route = routes.login
		let promise = new Promise((resolve, reject) => {
			fetch(`http://${ip}${route}`, {
		        method: 'POST',
		        headers: {
		          'Accept': 'application/json',
		          'Content-Type': 'application/json',
		        },
		        body: JSON.stringify({
		          email: user,
		          password: pass,
		        })
		    })
		    .then((response) => {
		        if (response.status === 200){
		         	AsyncStorage.setItem('token', JSON.parse(response["_bodyInit"]).token)
		          	AsyncStorage.setItem('userid', JSON.parse(response["_bodyInit"]).id)
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


	async getUserData () {
	   	let t = this
	   	let ip = config.ip
		let route = routes.user
		let promise = new Promise((resolve, reject) => {
		    AsyncStorage.getItem('userid').then((value) =>{
		    	if (value !== null) {
		       	    fetch(`http://${ip}${route}${value}`, {
		         	   method: 'GET',
		            	headers: {
		               		'Accept': 'application/json',
		               		'Content-Type': 'application/json',
		            	   'x-access-token': this.token
		            	}
		          	})
		          	.then((response) => {
		            	if (response.status === 200){
		              		AsyncStorage.setItem('userdata', response["_bodyInit"] )
		              		resolve({response : 200}) 
		            	}else {
		            		reject({message : response["_bodyInit"]})
		            	}
		          	})
		        }else {reject({message : "id no encontrado"})}
		    })
		})
		return promise
	}

	async updateUserData(body, id ){
		let ip = config.ip
		let route = routes.user
		let promise = new Promise((resolve, reject) => {
			fetch(`http://${ip}${route}${id}`, {
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
		return promise
	}



}


