import { createStore , combineReducers} from 'redux';
import {AsyncStorage,ToastAndroid} from 'react-native';

var initialState = {
  location : "",
  campus : null,

}

var campus = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_LOCATION':
      return {
        location : action.location
      };
    case 'IN_CAMPUS':
      AsyncStorage.setItem('campus',JSON.stringify(action.campus));
      return {
        campus: action.campus,
        alerts : action.alerts
      };
    case 'OUT_CAMPUS':
      AsyncStorage.removeItem('campus');
      return {
          campus : null, 
      };
    default : 
      return state
  }
}

var alerts = (state = {alerts : []}, action) => {
  switch (action.type) {
    case 'SET_ALERTS':
      return {
          alerts : action.alerts, 
      };
    default : 
      return state
  }
}



export default createStore(combineReducers({ campus, alerts }));

