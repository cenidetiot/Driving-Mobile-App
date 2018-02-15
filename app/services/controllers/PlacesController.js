import {AsyncStorage ,ToastAndroid} from 'react-native'
import routes from '../../../config/routes'
import config from '../../../config/config'
import Requests from './HTTP/Requests';
import DBase from '../../functions/DBase'


export default class Places {

	async getCompaniesList() {
		let ip = config.ip
		let route = routes.company
		await Requests.doGet(`http://${ip}${route}`)
		.then((data) => {
			AsyncStorage.setItem('companieslist', JSON.stringify(data))
		})
	}

	getCampusList () {
		let ip = config.ip
		let route = routes.campus
		Requests.doGet(`http://${ip}${route}`)
		.then((data) => {
			AsyncStorage.setItem('campuslist', JSON.stringify(data))
		})
	}

	getZonesList () {
		let ip = config.ip
		let route = routes.zones

		Requests.doGet(`http://${ip}${route}`)
		.then((data) => {
			AsyncStorage.setItem('zoneslist', JSON.stringify(data));
		})
	}

	getSegmentsList () {
		let ip = config.ip
		let route = routes.zones
		Requests.doGet(`https://smartsdk-web-service.herokuapp.com/api/roadSegment`)
		.then((data) => {		
			
			AsyncStorage.setItem('segmentslist', JSON.stringify(data));
			
		}).catch((err) => {

			//ToastAndroid.showWithGravity( JSON.stringify(err) , ToastAndroid.SHORT, ToastAndroid.CENTER);
			
		})
	}



}


