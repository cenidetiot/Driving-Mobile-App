
import {AsyncStorage,ToastAndroid} from 'react-native'

import NGSI from 'ngsi-parser'
import NgsiModule from '../../NativeModules/NgsiModule';
import config from '../../config/OCBconfig'

class OCBConnection {


	create (entity, message = false) {
		
		let newJson = NGSI.parseEntity(entity)
		
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newJson)
		};
		
		fetch('http://207.249.127.132:1026/v2/entities', options)
		.then(function(res) {                    
			if(res.status === 201){
				//ToastAndroid.showWithGravity( "enviada", ToastAndroid.SHORT, ToastAndroid.CENTER);
			}else{
				//ToastAndroid.showWithGravity( JSON.stringify(newJson), ToastAndroid.SHORT, ToastAndroid.CENTER);
			}
			
		})
		.catch(function(err){
			//ToastAndroid.showWithGravity( "error promesa", ToastAndroid.SHORT, ToastAndroid.CENTER);
		});
		console.log("Enviada")
	}

	update(entity, attr) {
		var attribute = NGSI.parseAttrs(attr)
		// Send to ContextBroker 
		OCB.updateEntityAttrs(entity, attribute)
		.then((result) => console.log(result))
		.catch((err) => console.log(err))
	}

	
}

module.exports = new OCBConnection()