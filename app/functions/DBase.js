import {AsyncStorage,ToastAndroid} from 'react-native';

class DBase {

        constructor (){
            this.models = {}
        }

        save(model, body){
            if (this.models[model] !== undefined){
                this.models[model] = body;
                AsyncStorage.setItem(model, this.convertToString(body))
                AsyncStorage.setItem(`type${model}`, detectType(body))
            }   
        }

        

        getContextValue(model, obj) {
            value = this.models[model]
            if (obj)
                value = JSON.stringify(value)
            return value
        }

        detectType(){
            let val = arguments[0]
            let type = ""
            if (typeof val == 'object') {
                if (val === null)
                    type = "null"	
                else{
                    if (val.toString() === '[object Object]') {
                        type = "json"
                    }else{
                        try {
                            val.toISOString()
                            typeData = "dateTime"
                        }catch(e){
                            typeData = "array" 
                        }
                        
                    }
                } 		
            }else {
                type = typeof val
            }
            return type
        }
        
        convertToString(val) {
            if (typeof val === 'string')
                return val
            else if (typeof val === 'number' || typeof val === 'boolean')
                return val.toString()
            else if (typeof val === 'object') {
                if (val === null)
                    return ""	
                else{
                    if (val.toString() === '[object Object]') {
                        return JSON.stringify(val)
                    }else{
                        try {
                            return val.toISOString()
                        }catch(e){
                            return JSON.stringify(val)
                        }
                        
                    }
                } 		
            }             
        }



}

module.exports = new DBase()