import store from '../reducers/index'


class Actions {


    loadID (id) {
        store.dispatch({
            type : 'ASIGN_ID',
            id
        })
        return 
    }

    loadRefDevice (refDevice) {
        store.dispatch({
            type : 'LOAD_REFDEVICE',
            refDevice
        })
        return 
    }

    changeLocation (location) {
        store.dispatch({
            type : 'CHANGE_LOCATION',
            location
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
    // LOAD PLACES LISTS 
    loadCampusList (campuslist) {
        store.dispatch({
            type : 'LOAD_CAMPUSLIST',
            campuslist
        })
    }

    loadSubzones (subzones) {
        store.dispatch({
            type : 'LOAD_SUBZONES',
            subzones
        })
    }

    loadRoads (roads) {
        store.dispatch({
            type : 'LOAD_ROADS',
            subzones
        })
    }

    loadRoadSegments (roadSegments) {
        store.dispatch({
            type : 'LOAD_ROADSEGMENTS',
            roadSegments
        })
    }
}

module.exports = new Actions();