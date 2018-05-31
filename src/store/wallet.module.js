import {FETCH_WALLETS,FETCH_ACCOUNT,LOGIN,CHECK_AUTH} from './action.type'

import {SET_WALLET,SET_WALLETS,FETCH_START,FETCH_END} from './mutations.type'
import WalletService from '../service/WalletService'
import Router from '../router'

const state = {
  isLoading: false,
  showTopInfo: true,
  wallets:[],
  wallet:{},

}

const getters = {
  wallets (state){
    return state.wallets
  },
  isLoading (state){
    return state.isLoading
  },
  wallet (state){
    return state.wallet
  }
}

const actions = {
  [FETCH_WALLETS] ({commit}, params) {
      commit(FETCH_START)
      commit(SET_WALLETS,WalletService.getWallets())
      commit(FETCH_END)
  },
  [CHECK_AUTH] (context){
      let loggedUser = WalletService.getLoggedUser()
      if (!loggedUser){
          return
      }
      if (!(state.wallet && state.wallet.address)){

       // context.dispatch(LOGIN,loggedUser)
      }
  },
  [LOGIN] (context,wallet){  
    let isLogged  = WalletService.isLogged(wallet.address)

    if (isLogged){
      context.dispatch(SET_WALLET,wallet)
      return
    }

    return this._vm.$swal({
      title:`Password required for wallet ${wallet.label}`,
      html:'Please, enter wallet your password to login',
      input: 'password',
      showCancelButton: true,
    }).then((result)=>{
      if ("dismiss" in result){

        throw new Error('Auth canceled')

        return
      }
      let logged = WalletService.login(wallet.address,result.value)
      if (logged){

          return context.dispatch(SET_WALLET,wallet)
        
      }else{
          this._vm.$notify({
              type:'error',
              group:'notif',
              title: 'Invalid password, couldn\'t login',
              duration: 2000
          });
          throw new Error('Invalid password')
      }
    })


  },
  [SET_WALLET] (context,wallet){

      context.commit(SET_WALLET,wallet)
      
      return context.dispatch(FETCH_ACCOUNT,{address:wallet.address}).then(()=>{
          
        Router.push({name:'walletHome'})
      });
  },
  [SET_WALLETS] ({commit,dispatch},wallets){

    commit(SET_WALLETS,wallets)

  }
}

const mutations = {
  [FETCH_START] (state){
    state.isLoading = true
  },
  [FETCH_END] (state){
    state.isLoading = false
  },
  [SET_WALLET] (state,wallet) {
    state.wallet = wallet
  },
  [SET_WALLETS] (state,data) {
    state.wallets = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
