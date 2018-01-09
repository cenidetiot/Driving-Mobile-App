import {AsyncStorage ,ToastAndroid} from 'react-native'
import routes from '../../utils/routes'
import config from '../../utils/config'

export default class Places {

	constructor () {
		let t = this
		AsyncStorage.getItem('token').then((token) =>{
			t.token = token
		})
	}

	getCompaniesList() {
		let ip = config.ip
		let route = routes.company
        //ToastAndroid.show(`http://${ip}${route}` , ToastAndroid.SHORT);
		
		fetch(`http://${ip}${route}`, {
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

	getCampusList () {
		let ip = config.ip
		let route = routes.campus
		
		fetch(`http://${ip}${route}`, {
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

	getZonesList () {
		let ip = config.ip
		let route = routes.zones
		
		fetch(`http://${ip}${route}`, {
     	   method: 'GET',
        	headers: {
           		'Accept': 'application/json',
           		'Content-Type': 'application/json',
        	   'x-access-token': this.token
        	}
      	})
      	.then((response) => {
        	if (response.status === 200){
          		AsyncStorage.setItem('zoneslist', JSON.stringify(response["_bodyInit"]))
        	}else {
           		ToastAndroid.show("Error server" +response.status , ToastAndroid.SHORT);
        	}
      	})
	}




}


