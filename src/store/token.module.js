import {FETCH_TOKENS} from './action.type'
import {SET_TOKENS,FETCH_START,FETCH_END} from './mutations.type'

import Router from '../router'
import WalletService from '../service/WalletService'
import TronService from '../service/TronService'



const state = {
  tokens:{}
}

const getters = {
  tokens (state){
    return state.tokens
  }
}

const actions = {
  [FETCH_TOKENS] ({commit},criteria) {
      
    commit(FETCH_START)      

    return TronService.account().getTokens(criteria).then((res)=>{

      commit(SET_TOKENS,res)

    }).catch((e)=>{

      this._vm.$swal({
        type:'error',
        title:'Oops',
        html:`Sorry we could not load the representatives <br> Try again later please ...`,
      }).then(()=>{
        Router.push({name:'home'})  
      })


    }).then(()=>{
      commit(FETCH_END)
    });

  }
}

const mutations = {
  [SET_TOKENS] (state,tokens) {
    state.tokens = tokens
  }
}




export default {
  state,
  getters,
  actions,
  mutations
}
