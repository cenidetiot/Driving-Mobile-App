import store from '../reducers/index'
import {AsyncStorage,ToastAndroid} from 'react-native';

class Actions {

    changeLocation (location) {
        store.dispatch({
            type : 'CHANGE_LOCATION',
            location: location
        })
        return 
    }

    setAlerts (alerts) {
        
        store.dispatch({
            type : 'SET_ALERTS',
            alerts : alerts
        })
        return 
    }

    inCampus (campus) {

        store.dispatch({
            type : 'IN_CAMPUS',
            campus : campus
        })
        return 
    }

    outCampus () {
        store.dispatch({
            type : 'OUT_CAMPUS',
            campus : null
        })
        return 
    }
}

module.exports = new Actions();