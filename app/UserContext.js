import {AsyncStorage,ToastAndroid,Alert} from 'react-native';
import Functions from './functions/Functions'

import Actions from './redux/actions/Actions'
import store from './redux/reducers/index'

import OCBConnection from "./services/OCBConnection"
import DBase from './functions/DBase'


class UserContext {

    /*constructor () {
        
        this.context = {
            id : "",
            type : "UserContext",
            refUser : "",
            isActive : true,


            refZone : "",
            refDevice : "",
            refVehicle : "",
            
            dateTimeContext : new Date(),
            location : {
                type : "geo:point",  
                value : ""
            }
        };
        this.watchContext();
        
        
        
    }*/




    createUserContext(){
        let t = this

        navigator.geolocation.getCurrentPosition((position) =>{

            AsyncStorage.getItem('userdata').then((user) =>{
                let userdata = JSON.parse(user);
                AsyncStorage.getItem('device').then((device) =>{
                    t.context = `UserContext:User_${userdata.id}`;
                    OCBConnection.create({
                        id : `UserContext:User_${userdata.id}`,
                        type : "UserContext",
                        refUser : `User_${userdata.id}`,
                        refDevice : device,
                        refVehicle : "",
                        isActive : true,
                        dateCreated : new Date(),
                        dateModified : new Date(),
                        location : {
                            type : "geo:point",  
                            value : `${position.coords.latitude} ,${position.coords.longitude}`
                        }
                    })
                })
            })

        },(error) => {
            ToastAndroid.showWithGravity( error.message , ToastAndroid.SHORT, ToastAndroid.CENTER);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }


   async watchContext () {
        
        let t =  this 
        this.location= ""
        t.campus = null
        Actions.outCampus();

        navigator.geolocation.watchPosition((position) =>{ // Funcion que se ejecuta cuando cambia ubicacion  
        
            AsyncStorage.getItem('campuslist').then((campuslist) =>{

                //CALCULO DE CAMPUS
                let list = JSON.parse(JSON.parse("[" + campuslist + "]"))
                let campus = null
                list.map((camp) => {
                    if (Functions.PointOnCampus([18.879781, -99.221777],camp.location)){ // Apatzingan  
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
            //OCBConnection.update(t.context,)
            let location = `${position.coords.latitude} ,${position.coords.longitude}`

            OCBConnection.update(t.context, {
                location : {
                    type : "geo:point",  
                    value : location
                },
                dateModified : new Date()
            })
            //Actions.changeLocation(location)
            
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
