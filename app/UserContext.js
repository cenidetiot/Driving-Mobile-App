import {AsyncStorage,ToastAndroid,Alert} from 'react-native';
import Functions from './functions/Functions'

import Actions from './redux/actions/Actions'
import store from './redux/reducers/index'

import OCBConnection from "./services/OCBConnection"
import DBase from './functions/DBase'


class UserContext {

   async watchContext () {
        
        let t =  this 
        this.location= ""
        t.campus = null
        Actions.outCampus();
        navigator.geolocation.watchPosition((position) =>{  
        
            AsyncStorage.getItem('campuslist').then((campuslist) =>{

                let list = JSON.parse(JSON.parse("[" + campuslist + "]"))
                let campus = null
                list.map((camp) => {
                    if (Functions.PointOnCampus([19.033347772359097 ,-98.31635484566372],camp.location)){ // Apatzingan    
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
            let location = `${position.coords.latitude} ,${position.coords.longitude}`
            t.location = location
            
        },
        (error) => {
            console.log(error.message)
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter:0.5 },
        );


    }
       

    

}

module.exports = new UserContext()
