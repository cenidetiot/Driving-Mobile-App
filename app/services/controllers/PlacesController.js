import {AsyncStorage ,ToastAndroid} from 'react-native'
import routes from '../../../config/routes'
import config from '../../../config/config'
import Requests from './HTTP/Requests';
import DBase from '../../functions/DBase'


export default class Places {

	getCompaniesList() {
		let ip = config.ip
		let route = routes.company

		Requests.doGet(`http://${ip}${route}`)
		.then((data) => {
			AsyncStorage.setItem('companieslist', JSON.stringify(data))
		})
		.catch((error)=>{
			ToastAndroid.show( error, ToastAndroid.SHORT);
		})
	}

	getCampusList () {
		let ip = config.ip
		let route = routes.campus
		ToastAndroid.show( "Obteniendo campus", ToastAndroid.SHORT);
		Requests.doGet(`http://${ip}${route}`)
		.then((data) => {
			AsyncStorage.setItem('campuslist', JSON.stringify(data))
		})
		.catch((error)=>{
			ToastAndroid.show( error, ToastAndroid.SHORT);
		})
	}

	getZonesList () {
		let ip = config.ip
		let route = routes.zones

		Requests.doGet(`http://${ip}${route}`)
		.then((data) => {
			AsyncStorage.setItem('zoneslist', JSON.stringify(data));
		})
		.catch((error)=>{
			ToastAndroid.show( error, ToastAndroid.SHORT);
		})
	}

	getSegmentsList () {
		let ip = config.ip
		let route = routes.zones

		Requests.doGet(`https://smartsdk-web-service.herokuapp.com/api/roadSegment`)
		.then((data) => {			
			AsyncStorage.setItem('segmentslist', JSON.stringify(data));
		})
		.catch((error)=>{
			ToastAndroid.show( "Ocurrió un error", ToastAndroid.SHORT); 
		})
	}



}


