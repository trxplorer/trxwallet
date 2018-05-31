import {FETCH_ACCOUNT} from './action.type'
import {SET_ACCOUNT,FETCH_START,FETCH_END} from './mutations.type'

import Router from '../router'
import WalletService from '../service/WalletService'
import TronService from '../service/TronService'





const state = {
  account:{}
}

const getters = {
  account (state){
    return state.account
  }
}

const actions = {
  [FETCH_ACCOUNT] ({commit}, {address,silent}) {
      
      if (!WalletService.isValidAddress(address) && !silent){
        this._vm.$swal({
          type:'error',
          title:'Oops',
          html:`Sorry we could not load the account with address:<br><strong>${address}</strong><br> Try again later please ...`,
        }).then(()=>{
          Router.push({name:'home'})  
        })
        return
      }

      if (!silent){
        commit(FETCH_START)
      }

      return TronService.account(address).getInfo().then((res)=>{

          commit(SET_ACCOUNT,res)
          commit(FETCH_END)
          
      }).catch((e)=>{
        console.error(e.stack)
        commit(FETCH_END)
        if (!silent){
          this._vm.$swal({
            type:'error',
            title:'Oops',
            html:`Sorry we could not load the account with address:<br><strong>${address}</strong><br> Try again later please ...`,
          }).then(()=>{
            Router.push({name:'home'})  
          })
        }

      });

  },
  [SET_ACCOUNT] ({commit},data){
    commit(SET_ACCOUNT,data)
  }
}

const mutations = {
  [SET_ACCOUNT] (state,account) {
    state.account = account
  }
}




export default {
  state,
  getters,
  actions,
  mutations
}
