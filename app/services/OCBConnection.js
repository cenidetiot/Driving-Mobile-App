
import {AsyncStorage,ToastAndroid} from 'react-native'
import OCB from 'ocb-sender';
import NGSI from 'ngsi-parser'
import NgsiModule from '../../NativeModules/NgsiModule';
import config from '../../config/OCBconfig'

class OCBConnection {

	constructor () {
		OCB.config(`http://${config.ip}`,config.port,config.version)
	}

	create (entity, message = "Enviado Exitosamente") {
		
	    let newJson = NGSI.parseEntity(entity)
		OCB.createEntity(newJson)
		.then((result) =>{
			ToastAndroid.showWithGravity( message, ToastAndroid.SHORT, ToastAndroid.CENTER);
		})
		.catch((err) => {
			ToastAndroid.showWithGravity( JSON.stringify(err) , ToastAndroid.SHORT, ToastAndroid.CENTER);
		})
		return newJson
	}

	update() {

	}

	
}

module.exports = new OCBConnection()