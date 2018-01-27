
class Requests {
    
    constructor() {
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    setToken( token ){
        this.headers["X-Auth-Token"] = token;
    }

    doGet ( url ) {
        let t = this
        let promise = new Promise((resolve, reject) => {

            fetch(url, {
                method: 'GET',
                headers: t.headers
            })
            .then((response) => {
                if (response.status === 200){
                    resolve(response["_bodyInit"]) 
                }else {
                    reject(response["_bodyInit"])
                }
            })
            
        })
        return promise
    }
    
    doPost( url , body ){
        let t = this
        let promise = new Promise((resolve, reject) => {

            fetch(url, {
                method: 'POST',
                headers: t.headers,
                body : JSON.stringify(body)
            })
            .then((response) => {
                if (response.status === 200){
                    resolve(response["_bodyInit"]) 
                }else {
                    reject({message : response["_bodyInit"]})
                }
            })
            
        })
        return promise
    }

    doPut ( url, body ){
        let t = this
        let promise = new Promise((resolve, reject) => {
            fetch(url, {
                method: 'PUT',
                headers: t.headers,
                body : JSON.stringify(body)
            })
            .then((response) => {
                if (response.status === 200){
                    resolve({response : response["_bodyInit"]}) 
                }else {
                    reject({message : response["_bodyInit"]})
                }
            })
            
        })
        return promise
    }

}

module.exports = new Requests()
