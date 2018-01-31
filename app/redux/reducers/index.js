import { createStore } from 'redux';
import {AsyncStorage} from 'react-native';
import ServerConnection from '../../services/ServerConnection'

var initialState = {
  campus : null,
  subzone : {},
  road : {},
  roadSegment : {},
  userContext : {},
  alerts : [],
  //PLACES LISTS
  campuslist : [],
  subzones: [],
  roads : [],
  roadSegments : []
}

var reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_PLACES' : 
      //ServerConnection.places.getCompaniesList();
      //ServerConnection.places.getCampusList();
      return
    case 'IN_CAMPUS':
      AsyncStorage.setItem('campus',JSON.stringify(action.campus));
      return {
        campus: action.campus,
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
  }

}

export default createStore(reducer);

