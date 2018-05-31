import {FETCH_WITNESSES} from './action.type'
import {SET_WITNESSES,FETCH_START,FETCH_END} from './mutations.type'

import Router from '../router'
import WalletService from '../service/WalletService'
import TronService from '../service/TronService'



const state = {
  witnesses:{}
}

const getters = {
  witnesses (state){
    return state.witnesses
  }
}

const actions = {
  [FETCH_WITNESSES] ({commit},criteria) {
      
    commit(FETCH_START)      

    return TronService.witness().getAll(criteria).then((res)=>{

      commit(SET_WITNESSES,res)

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
  [SET_WITNESSES] (state,witnesses) {
    state.witnesses = witnesses
  }
}




export default {
  state,
  getters,
  actions,
  mutations
}
