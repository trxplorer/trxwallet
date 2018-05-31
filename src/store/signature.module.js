import {REQUEST_SIGNATURE,VALIDATE_SIGNATURE} from './action.type'

import Router from '../router'
import {SET_TRANSACTION} from './mutations.type'
import WalletService from '../service/WalletService'
import TronCli from 'tron-api-cli';


let tronCli = new TronCli({endpoint:"http://localhost:8383"})


const state = {
  transaction:{}
}

const getters = {
  transaction(state){
    return state.transaction
  }
}

const actions = {
  [REQUEST_SIGNATURE] (context, options) {
    console.log(options)
    context.commit(SET_TRANSACTION,options)
    Router.push({name:'authorization'})
  }
}

const mutations = {
  [SET_TRANSACTION] (state,tx){
    state.transaction = tx
  }
}




export default {
  state,
  getters,
  actions,
  mutations
}
