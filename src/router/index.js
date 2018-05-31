import Vue from 'vue'
import Router from 'vue-router'

import LayoutComponent from '../views/Layout'
import AccountComponent from '../views/Account'
import NewAccountComponent from '../views/NewAccount'
import WalletListComponent from '../views/WalletList'
import AccountFreezeComponent from '../views/AccountFreeze'
import AccountUnfreezeComponent from '../views/AccountUnfreeze'
import SignatureAuthorization from '../views/SignatureAuthorization'
import AccountCreateWitness from '../views/AccountCreateWitness'
import AccountEdit from '../views/AccountEdit'
import WalletSettings from '../views/WalletSettings'
import AccountSend from '../views/AccountSend'
import WitnessList from '../views/WitnessList'
import AccountTokenList from '../views/AccountTokenList'
import AccountTransactionList from '../views/AccountTransactionList'
import AccountVoteList from '../views/AccountVoteList'
import AccountFreezeList from '../views/AccountFreezeList'
import Authenticate from '../views/Authenticate'

export default new Router({
  routes: [
    {
      path: '/',
      component: LayoutComponent,
      props:{showTopInfo:false,showTopInfo:false},
      children: [
        {
          name:'home',
          path: '/',
          component: WalletListComponent
        }
      ]
    },
    {
      path: '/wallet',
      component: LayoutComponent,
      props:{showTopInfo:true,showTopMenu:true},
      children: [
        {
          name:'',
          path: '',
          component: AccountComponent,
          props:{showWalletMenu:true,showWalletActions:true},
          children:[
            {
              name:'walletHome',
              path: '',
              component: AccountTransactionList
            },
            {
              name:'tokens',
              path: 'tokens',
              component: AccountTokenList
            },
            {
              name:'votes',
              path: 'votes',
              component: AccountVoteList
            },
            {
              name:'freezelist',
              path: 'freezelist',
              component: AccountFreezeList
            },
            {
              name:'send',
              path: 'send',
              component: AccountSend
            },
            {
              name:'freeze',
              path: 'freeze',
              component: AccountFreezeComponent
            },
            {
              name:'unfreeze',
              path: 'unfreeze',
              component: AccountUnfreezeComponent
            },                
            {
              name:'applyRep',
              path: 'applyRep',
              component: AccountCreateWitness
            },
            {
              name:'editAccount',
              path: 'editAccount',
              component: AccountEdit
            },
            {
              name:'settings',
              path: 'settings',
              component: WalletSettings
            },
            {
              name:'icos',
              path: 'icos',
              component: AccountComponent
            },
            {
              name:'signatures',
              path: 'signatures',
              component: AccountComponent
            }
          ]
        },

      ]
    },
    {
      path: '/new',
      component: LayoutComponent,
      props:{showTopInfo:false},
      children: [
        {
          path: '',
          name: 'new',
          component: NewAccountComponent,
          
        }
      ]
    },
    {
      path: '/auth',
      component: LayoutComponent,
      props:{showTopInfo:false},
      children: [
        {
          path: '',
          name: 'auth',
          component: Authenticate,
          
        }
      ]
    },
    {
      path: '/vote',
      component: LayoutComponent,
      props:{showTopInfo:true,showTopMenu:true},
      children: [
        {
          path: '',
          component: AccountComponent,
          props:{showWalletMenu:false,showVoteActions:true},
          children:[
            {
              path: '',
              name: 'vote',
              component: WitnessList
            }
          ]
        }
      ]
    },
    {
      path: '/authorization',
      component: LayoutComponent,
      props:{showTopInfo:false,showTopInfo:false},
      children: [
        {
          path: '',
          name: 'authorization',
          component: SignatureAuthorization
        }
      ]
    }
    

  ]
})