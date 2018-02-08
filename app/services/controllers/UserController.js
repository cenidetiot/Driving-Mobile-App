import {AsyncStorage ,ToastAndroid} from 'react-native'
import routes from '../../../config/routes'
import config from '../../../config/config'
import Requests from './HTTP/Requests';

import Actions from '../../redux/actions/Actions'
//var _ip = "http://10.0.0.7:4005/api"
var _ip = "https://smartsdk-web-service.herokuapp.com/api"

export default class User {

	constructor (token) {
		this.token = token
	}

	async signUp(body){
		let ip = config.ip
		let route = routes.user
		let promise = new Promise((resolve, reject) => {
			Requests.doPost(`${_ip}/user`, body )
			.then((data) => { 
				ToastAndroid.show( "Registrado correctamente", ToastAndroid.SHORT);
				resolve(true)
			})
			.catch((error)=>{
				reject(false)
				ToastAndroid.show( error, ToastAndroid.SHORT);
			})
		})
		return promise
	}

	async login(user , pass){
		let ip = config.ip
		let route = routes.login
		let promise = new Promise( async (resolve, reject) => {
			await Requests.doPost(`${_ip}/login`,{
				email: user,
				password: pass,
			})
			.then((data) => { 
				AsyncStorage.setItem('token', JSON.parse(data).token)
				//ToastAndroid.show(JSON.parse(data).token , ToastAndroid.SHORT);
				resolve({response : 200}) 
			})
			.catch((error)=>{
				reject({message : error.message})
				ToastAndroid.show( error.message, ToastAndroid.SHORT);
			})
		})
		return promise
	}


	async getUserData () {
	   	let t = this
	   	let ip = config.ip
		let route = routes.user
		let promise = new Promise((resolve, reject) => {
		    AsyncStorage.getItem('userid').then(async (value) =>{
		    	if (value !== null) {
					Requests.doGet(`${_ip}/user?email=${value}`)
					.then((data) => {
						AsyncStorage.setItem('userdata', data)
						//ToastAndroid.show(data , ToastAndroid.SHORT);
						resolve({response : 200}) 
					})
					.catch((error)=>{
						reject({message : error})
						ToastAndroid.show(error , ToastAndroid.SHORT);
					})
				}
		    })
		})
		return promise
	}

	async updateUserData(body, id){
		let ip = config.ip
		let route = routes.user
		let promise = new Promise((resolve, reject) => {
			Requests.doPut(`${_ip}/user?id=${id}`, body)
		    .then((response) => {
				ToastAndroid.show("Se ha actualizado correctamente" , ToastAndroid.SHORT);
				resolve({response : 200}) 
		    })
		    .catch((err) => {         
		        reject({message : err})
		    })
		})
		return promise
	}



}


