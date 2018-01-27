
export default class DBase {

    constructor (models){
        this.models = models
    }
    getModelsList(){
        return this.models
    }

    verifyModel( modelName, model ) {
        for( let attr in this.models[modelName].properties ){
            console.log(attr)
        }
    }

    

}
