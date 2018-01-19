
export default

class Requests {
    
    constructor() {
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    doGet (url) {
        let t = this
        let promise = new Promise((resolve, reject) => {

            fetch(url, {
                method: 'GET',
                headers: t.headers
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
    
    doPost(){

    }

    doPut (){

    }

    doDelete()

}