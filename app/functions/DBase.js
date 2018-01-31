import {AsyncStorage,ToastAndroid} from 'react-native';

class DBase {

        constructor (models){
            this.models = models
        }

        save(model, body){
            ToastAndroid.show( this.models[model], ToastAndroid.SHORT);
            if (this.models[model] !== undefined){
                this.models[model] = body;
                AsyncStorage.setItem(model, body)
            }
                
        }

        getValue(model) {
            return this.models[model]
        }
        

}

module.exports = new DBase({
    "campuslist" : "",
    "subzones": "",
    "roads" : "",
    "roadSegments" : ""
})