import store from '../reducers/index'


class Actions {

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