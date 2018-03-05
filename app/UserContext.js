import {AsyncStorage,ToastAndroid,Alert} from 'react-native';
import Functions from './functions/Functions'
import ServerConnection from '../app/services/ServerConnection'

import Actions from './redux/actions/Actions'
import store from './redux/reducers/index'

class UserContext {

    constructor () {
        this.campus = null
        //Actions.outCampus();
    }

   async watchContext () {
        let t =  this 
        setInterval(() => {
            navigator.geolocation.getCurrentPosition((position) =>{  
                //ToastAndroid.show("I check your position", ToastAndroid.SHORT);
                //location = [ position.coords.latitude, position.coords.longitude ]
                location = [ 18.87977439, -99.22162518  ]
    
                if(t.campus === null) {
                    //ToastAndroid.show("First check", ToastAndroid.SHORT);
                    t.searchCampus(location)
                } else {
                    //ToastAndroid.show("Second check", ToastAndroid.SHORT);
                    if (!Functions.PointOnCampus(location,t.campus.location)){  
                        t.searchCampus(location)
                    }  
                }
    
            },
            (error) => {
                console.log(error.message)
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            //{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter:0.3 },
            );
        }, 1000);
        
    }

    async searchCampus (location) {
        let t =  this 
        AsyncStorage.getItem('campuslist').then(async (campuslist) =>{

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

                ServerConnection.alerts.getAlerts()
                .then((array ) => {
                    //ToastAndroid.show("Update the alerts", ToastAndroid.SHORT);
                    Actions.setAlerts(JSON.parse(array))                 
                })
                .catch((err) =>{
                    Actions.setAlerts([])   
                    ToastAndroid.show("Error loading alerts", ToastAndroid.SHORT);            
                })
            }else{
                t.campus = null;
                Actions.outCampus();
            }
        })
    }
}

module.exports = new UserContext()
