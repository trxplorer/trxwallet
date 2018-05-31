import {FETCH_TRANSACTIONS} from './action.type'
import {SET_TRANSACTIONS,FETCH_START,FETCH_END} from './mutations.type'

import Router from '../router'
import WalletService from '../service/WalletService'
import TronService from '../service/TronService'



const state = {
  transactions:{}
}

const getters = {
  transactions (state){
    return state.transactions
  }
}

const actions = {
  [FETCH_TRANSACTIONS] ({commit},criteria) {
      
    commit(FETCH_START)      

    return TronService.account().getTransactions(criteria).then((res)=>{

      commit(SET_TRANSACTIONS,res)

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
  [SET_TRANSACTIONS] (state,transactions) {
    state.transactions = transactions
  }
}




export default {
  state,
  getters,
  actions,
  mutations
}
