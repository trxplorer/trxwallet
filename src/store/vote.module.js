import {FETCH_VOTES} from './action.type'
import {SET_VOTES,FETCH_START,FETCH_END} from './mutations.type'

import Router from '../router'
import WalletService from '../service/WalletService'
import TronService from '../service/TronService'



const state = {
  votes:{}
}

const getters = {
  votes (state){
    return state.votes
  }
}

const actions = {
  [FETCH_VOTES] ({commit},criteria) {
      
    commit(FETCH_START)      

    return TronService.account().getAllVotes(criteria).then((res)=>{

      commit(SET_VOTES,res)

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
  [SET_VOTES] (state,votes) {
    state.votes = votes
  }
}




export default {
  state,
  getters,
  actions,
  mutations
}
