import {AsyncStorage,ToastAndroid,Alert} from 'react-native';
import Functions from './functions/Functions'

import Actions from './redux/actions/Actions'
import store from './redux/reducers/index'

class UserContext {

    constructor () {
        this.campus = null
        Actions.outCampus();
    }

   async watchContext () {
        let t =  this 
        navigator.geolocation.watchPosition((position) =>{  
            location = [19.033347772359097 ,-98.31635484566372]
            if(t.campus === null) {
                t.searchCampus(location)
            } else {
                if (!Functions.PointOnCampus(location,t.campus.location)){  
                    t.searchCampus(location)
                } 
            }
        },
        (error) => {
            console.log(error.message)
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter:0.5 },
        );
    }

    searchCampus (location) {
        let t =  this 
        AsyncStorage.getItem('campuslist').then((campuslist) =>{
            let list = JSON.parse(JSON.parse("[" + campuslist + "]"))
            let campus = null
            list.map((camp) => {
                if (Functions.PointOnCampus(location,camp.location)){    
                    campus = camp  
                } 
            })
            if(campus !== null && t.campus !== campus){
                t.campus = campus
                Actions.inCampus(campus);
            }else{
                Actions.outCampus();
            }
        })
    }
}

module.exports = new UserContext()
