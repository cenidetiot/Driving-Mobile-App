import {AsyncStorage ,ToastAndroid} from 'react-native'
import routes from '../../../config/routes'
import config from '../../../config/config'

import Requests from './HTTP/Requests';


export default class UserContact {

	async getUserContact(){
		let ip = config.ip
		let route = routes.userContact

		let promise = new Promise((resolve, reject) => {
			AsyncStorage.getItem('userid').then((value) =>{

				Requests.doGet(`http://${ip}${route}UserContact:${value}`)
				.then((data) => {
					AsyncStorage.setItem('usercontact', JSON.stringify(data))
				})
				.catch((error)=>{
					ToastAndroid.show( error, ToastAndroid.SHORT);
				})
			})
		})

		return promise 
	}

	async createUserContact(body){
		let ip = config.ip
		let route = routes.userContact
		let promise = new Promise((resolve, reject) => {
			Requests.doPost(`http://${ip}${route}`, body )
			.then((data) => { 
				ToastAndroid.show("Se ha actualizado correctamente" , ToastAndroid.SHORT);
				AsyncStorage.setItem('usercontact', JSON.stringify(data))
				resolve({response : 200})
			})
			.catch((error)=>{
				reject({message : error})
				ToastAndroid.show( error, ToastAndroid.SHORT);
			})
		})
		return promise
	}

	async updateUserContact(body, id ){
		let ip = config.ip
		let route = routes.userContact
		let promise = new Promise((resolve, reject) => {
			AsyncStorage.getItem('userid').then((value) =>{
				Requests.doPut(`http://${ip}${route}UserContact:${value}`, body )
				.then((response) => {
					ToastAndroid.show("Se ha actualizado correctamente" , ToastAndroid.SHORT);
			        resolve({response : 200}) 
				})
				.catch((err) => {         
			        reject({message : err})
			    })
			})
		})

		return promise
	}




}



