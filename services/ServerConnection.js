
import {AsyncStorage ,ToastAndroid} from 'react-native'
import routes from '../utils/routes'
import config from '../utils/config'

class ServerConection {

	constructor () {
		let t = this
		AsyncStorage.getItem('token').then((token) =>{
			t.token = token
		})
	}

	
	async login(user , pass ){
		let ip = config.ip
		let port = config.port
		let route = routes.login

		let promise = new Promise((resolve, reject) => {
			fetch(`http://${ip}:${port}${route}`, {
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
		        	
           		//ToastAndroid.show(JSON.parse(response["_bodyInit"]).token , ToastAndroid.SHORT);
		        	
		         	AsyncStorage.setItem('token', JSON.parse(response["_bodyInit"]).token)
		          	AsyncStorage.setItem('userid', JSON.parse(response["_bodyInit"]).idUser)
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

	async updateUserData () {
	   	let t = this
	   	let ip = config.ip
		let port = config.port
		let route = routes.user
		let promise = new Promise((resolve, reject) => {
		    AsyncStorage.getItem('userid').then((value) =>{
		    	if (value !== null) {
		       	    fetch(`http://${ip}:${port}${route}${value}`, {
		         	   method: 'GET',
		            	headers: {
		               		'Accept': 'application/json',
		               		'Content-Type': 'application/json',
		            	   'x-access-token': this.token
		            	}
		          	})
		          	.then((response) => {
		            	if (response.status === 200){
           		//ToastAndroid.show(  response["_bodyInit"], ToastAndroid.SHORT);

		              		AsyncStorage.setItem('userdata', response["_bodyInit"] )
		              		resolve({response : 200}) 
		            	}else {
		            		reject({message : response["_bodyInit"]})
		            	}
		          	})
		        }else {reject({message : "idUser no encontrado"})}
		    })
		})
		return promise
	}

	
	updateCampusList () {
		let ip = config.ip
		let port = config.port
		let route = routes.campus
		
		fetch(`http://${ip}:${port}${route}`, {
     	   method: 'GET',
        	headers: {
           		'Accept': 'application/json',
           		'Content-Type': 'application/json',
        	   'x-access-token': this.token
        	}
      	})
      	.then((response) => {
        	if (response.status === 200){
          		AsyncStorage.setItem('campuslist', JSON.stringify(response["_bodyInit"]))
        	}else {
           		ToastAndroid.show("Error server" +response.status , ToastAndroid.SHORT);
        	}
      	})

	}

	async updateAlertArray () {
		let t = this
	   	let ip = config.ip
		let port = config.port
		let route = routes.alerts

		let promise = new Promise((resolve, reject) => {
	   		AsyncStorage.getItem('campus').then((campus) =>{
	   			let camp = JSON.parse(campus)._id
		        if (campus !== "{}"){
			        //ToastAndroid.show(`http://${ip}:${port}${route}${camp}` , ToastAndroid.SHORT);
		        	fetch(`http://${ip}:${port}${route}${camp}`, {
			     	   method: 'GET',
			        	headers: {
			           		'Accept': 'application/json',
			           		'Content-Type': 'application/json',
			        	   'x-access-token': t.token
			        	}
			      	})
			      	.then((response) => {
			        	if (response.status === 200){
			          	AsyncStorage.setItem('alerts', JSON.stringify(response["_bodyInit"]))
	              		resolve(response["_bodyInit"]) 

			        	}else {
			           		ToastAndroid.show("Error server" +response.status , ToastAndroid.SHORT);
			           		AsyncStorage.getItem('alerts').then((alerts) =>{
			           			resolve(alerts) 
			           		})
			        	}
			      	})
		        }else{
			        ToastAndroid.show("No se ecuentra en un campus" , ToastAndroid.SHORT);
		        	reject({message : "No se ecuentra en un campus"})
		        }      
		    })
		})
		return promise
	}

	async sendFcmToken(fcmtoken){
		let ip = config.ip
		let port = config.port
		let route = routes.fcm

		let promise = new Promise((resolve, reject) => {
			AsyncStorage.getItem('device').then((device) =>{
					
					//ToastAndroid.show( fcmtoken , ToastAndroid.SHORT);

					fetch(`http://${ip}:${port}${route}`, {
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
		let port = config.port
		let route = routes.fcm

		let promise = new Promise((resolve, reject) => {
			AsyncStorage.getItem('device').then((device) =>{
					
					//ToastAndroid.show( fcmtoken , ToastAndroid.SHORT);

					fetch(`http://${ip}:${port}${route}${device}`, {
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

	getCompaniesList() {
		let ip = config.ip
		let port = config.port
		let route = routes.company
        //ToastAndroid.show(`http://${ip}:${port}${route}` , ToastAndroid.SHORT);
		
		fetch(`http://${ip}:${port}${route}`, {
     	   method: 'GET',
        	headers: {
           		'Accept': 'application/json',
           		'Content-Type': 'application/json',
        	   'x-access-token': this.token
        	}
      	})
      	.then((response) => {
        	if (response.status === 200){
           		//ToastAndroid.show("Compañias cargadas" , ToastAndroid.SHORT);

          		AsyncStorage.setItem('companieslist', JSON.stringify(response["_bodyInit"]))
        	}else {
           		ToastAndroid.show("Error server" +response.status , ToastAndroid.SHORT);
        	}
      	})

	}

	async signUp(body ){
		let ip = config.ip
		let port = config.port
		let route = routes.user

		let promise = new Promise((resolve, reject) => {
			fetch(`http://${ip}:${port}${route}`, {
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

	async updateUserApi(body, id ){
		let ip = config.ip
		let port = config.port
		let route = routes.user

		let promise = new Promise((resolve, reject) => {
			fetch(`http://${ip}:${port}${route}${id}`, {
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

	async getUserContact(){
		let ip = config.ip
		let port = config.port
		let route = routes.userContact

		let promise = new Promise((resolve, reject) => {
			AsyncStorage.getItem('userid').then((value) =>{
				fetch(`http://${ip}:${port}${route}UserContact:${value}`, {
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

	async createUserContactApi(body){
		let ip = config.ip
		let port = config.port
		let route = routes.userContact

		let promise = new Promise((resolve, reject) => {

			fetch(`http://${ip}:${port}${route}`, {
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
	async updateUserContactApi(body, id ){
		let ip = config.ip
		let port = config.port
		let route = routes.userContact

		let promise = new Promise((resolve, reject) => {
			AsyncStorage.getItem('userid').then((value) =>{
				fetch(`http://${ip}:${port}${route}UserContact:${value}`, {
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

	async createUserContext(body ){
		let ip = config.ip
		let port = config.port
		let route = routes.userContext

		let promise = new Promise((resolve, reject) => {
			fetch(`http://${ip}:${port}${route}`, {
		        method: 'POST',
		        headers: {
		          'Accept': 'application/json',
		          'Content-Type': 'application/json',
		        },
		        body: JSON.stringify(body)
		    })
		    .then((response) => {

		        if (response.status === 200){

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

module.exports = new ServerConection()