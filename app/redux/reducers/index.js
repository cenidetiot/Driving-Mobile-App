import { createStore } from 'redux';
import {AsyncStorage,ToastAndroid} from 'react-native';

var initialState = {
  id : "",
  refDevice : "",
  location : "",
  alerts : [],
  //Places
  campus : null,
  subzone : {},
  road : {},
  roadSegment : {},
  //PLACES LISTS
  campuslist : [],
  subzones: [],
  roads : [],
  roadSegments : []
}

var reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ASIGN_ID':
      return {
        user : action.id
      };
    case 'CHANGE_LOCATION':
      return {
        location : action.location
      };
    case 'LOAD_REFDEVICE':
      return {
        refDevice : action.refDevice
      };
    case 'IN_CAMPUS':
      
      AsyncStorage.setItem('campus',JSON.stringify(action.campus));
      return {
        campus: action.campus
      };
    case 'OUT_CAMPUS':
      AsyncStorage.removeItem('campus');
      return {
          campus : null, 
      };
    case 'IN_SUBZONE':
      return {
        subzone: action.subzone,
      };
    case 'OUT_SUBZONE':
      return {
          subzone : null, 
      };
    case 'IN_ROAD':
      return {
        road: action.road,
      };
    case 'OUT_ROAD':
      return {
          road : null, 
      };
    case 'IN_ROADSEGMENT':
      return {
        roadSegment: action.roadSegment,
      };
    case 'OUT_ROADSEGMENT':
      return {
          roadSegment : null, 
      };
    case 'LOAD_ALERTS':
      return {
        alerts : action.alerts,
      };
    //LOAD PLACES
    case 'LOAD_CAMPUSLIST': 
      return {
        campuslist : action.campuslist
      }
    case 'LOAD_SUBZONES': 
      return {
        subzones : action.subzones
      }
    case 'LOAD_ROADS': 
      return {
        roads : action.roads
      }
      case 'LOAD_ROADSEGMENTS': 
      return {
        roadSegments : action.roadSegments
      }
    default : 
      return state
  }

}



export default createStore(reducer);

