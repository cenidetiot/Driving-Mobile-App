import {AsyncStorage,ToastAndroid,Alert} from 'react-native';
import Functions from './functions/Functions'

import Actions from './redux/actions/Actions'

import OCBConnection from "./services/OCBConnection"


class UserContext {

    constructor () {
        
        this.context = {
            id : "",
            type : "",
            refUser : "",
            refZone : "",
            refDevice : "",
            refVehicle : "",
            isActive : "",
            dateTimeContext : new Date(),
            location : {
                type : "geo:point",  
                value : ""
            }
        };
        Actions.outCampus();
        this.watchContext ();

        
    }

    watchContext () {
        let t =  this

        navigator.geolocation.watchPosition((position) =>{ // Funcion que se ejecuta cuando cambia ubicacion  
            
            AsyncStorage.getItem('campuslist').then((campuslist) =>{

                let list = JSON.parse(JSON.parse("[" + campuslist + "]"))
    
                let campus = null
    
                list.map((camp) => {
                    if (Functions.PointOnCampus([18.879781, -99.221777],camp.location)){ // Apatzingan  
                     campus = camp  
                    }
                })
                if(campus !== null ){
                    Actions.inCampus(campus);
                }else{
                    Actions.outCampus();
                }
            })
        },
        (error) => {
        Alert.alert('Alert',error.message,
            [
            {text: 'ok', onPress: () => console.log('Ask me later pressed')}
            ],
            { cancelable: true }
        )
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter:0.5 },
        );

    }
       

    

}

module.exports = new UserContext()
