import Vue from 'vue'
import Vuex from 'vuex'

import WalletList from  './wallet.module'
import Account from './account.module'
import Signature from './signature.module'
import Witness from './witness.module'
import Token from './token.module'
import Transaction from './transaction.module'
import VoteList from './vote.module'
import FreezeList from './freeze.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    WalletList,
    Account,
    Signature,
    Witness,
    Token,
    Transaction,
    VoteList,
    FreezeList
  }
})