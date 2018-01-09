
import {AsyncStorage ,ToastAndroid} from 'react-native'
import routes from '../utils/routes'
import config from '../utils/config'

import User from './controllers/UserController'
import Places from './controllers/PlacesController' 
import Firebase from './controllers/FirebaseController' 
import Alerts from './controllers/AlertsController'
import UserContact from './controllers/UserContactController'
import UserContext from './controllers/UserContextController'

class ServerConection {

	constructor () {

		let t = this
		AsyncStorage.getItem('token').then((token) =>{
			t.token = token
		})

		this.user = new User()
		this.places = new Places()
		this.fire = new Firebase()
		this.alerts = new Alerts()
		this.contact = new UserContact()
		this.context = new UserContext()

	}

}

module.exports = new ServerConection()