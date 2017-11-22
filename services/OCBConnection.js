
import {AsyncStorage,ToastAndroid} from 'react-native'
import OCB from 'ocb-sender';
import NGSI from 'ngsi-parser'
import NgsiModule from '../NativeModules/NgsiModule';
import routes from '../utils/routes'
import config from '../utils/OCBconfig'

class OCBConnection {
	constructor () {
		OCB.config(`http://${config.ip}`,config.port,config.version)
		AsyncStorage.getItem('token').then((value) =>{
			if (typeof value === 'string') {
				AsyncStorage.getItem('userdata').then((userdata) =>{
					let data  = JSON.parse(userdata)
			        NgsiModule.InitDevice(data.idUser);
			    })
			}
		   
	    })
	}
	sendAlert(alert) {
	    ToastAndroid.showWithGravity( "Enviando Alerta ..." , ToastAndroid.SHORT, ToastAndroid.CENTER);
	    let newJson = NGSI.parseEntity(alert)
		OCB.createEntity(newJson)
		.then((result) =>{
	        ToastAndroid.showWithGravity( "Alerta enviada correctamente" , ToastAndroid.SHORT, ToastAndroid.CENTER);
		})
		.catch((err) => {
	        ToastAndroid.showWithGravity( JSON.stringify(err) , ToastAndroid.SHORT, ToastAndroid.CENTER);
		})
		return newJson
	}
}

module.exports = new OCBConnection()