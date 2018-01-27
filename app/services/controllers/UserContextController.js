import {AsyncStorage ,ToastAndroid} from 'react-native'
import routes from '../../../config/routes'
import config from '../../../config/config'

export default class UserContext {

	constructor () {
		let t = this
		AsyncStorage.getItem('token').then((token) =>{
			t.token = token
		})
	}

	async createUserContext(body ){
		let ip = config.ip
		let route = routes.userContext

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


