import {REQUEST_SIGNATURE} from './store/action.type'
import store from './store'

export default{
    install(Vue, options){
        Vue.prototype.$trxwallet = {
            requestSignature(type,options){
                    // TODO validate possible tx types
                    options._type = type
                    store.dispatch(REQUEST_SIGNATURE,options)
                    //this.onSignatureRequest(context.store)

            }
        }
    } 
}