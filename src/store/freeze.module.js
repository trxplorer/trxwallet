import {FETCH_FREEZE_HISTORY} from './action.type'
import {SET_FREEZE_HISTORY,FETCH_START,FETCH_END} from './mutations.type'

import Router from '../router'
import WalletService from '../service/WalletService'
import TronService from '../service/TronService'



const state = {
  freezeHistory:{}
}

const getters = {
  freezeHistory (state){
    return state.freezeHistory
  }
}

const actions = {
  [FETCH_FREEZE_HISTORY] ({commit},criteria) {
      
    commit(FETCH_START)      

    return TronService.account().getAllFreeze(criteria).then((res)=>{

      commit(SET_FREEZE_HISTORY,res)

    }).catch((e)=>{

      this._vm.$swal({
        type:'error',
        title:'Oops',
        html:`Sorry we could not load some data <br> Try again later please ...`,
      }).then(()=>{
        
      })


    }).then(()=>{
      commit(FETCH_END)
    });

  }
}

const mutations = {
  [SET_FREEZE_HISTORY] (state,freezeHistory) {
    state.freezeHistory = freezeHistory
  }
}




export default {
  state,
  getters,
  actions,
  mutations
}
