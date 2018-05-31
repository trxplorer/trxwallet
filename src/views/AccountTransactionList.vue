<template>
    <div>
    <h2 class="ui dividing header">Transactions</h2>
        <div class="ui info message">
          <div class="header">
            Transactions related to your account
          </div>
        </div>
      <div class="ui raised segment">
                <p v-show="transactions && transactions.totalCount==0">You don't have any transactions yet, you can participate to ICO to get new tokens</p>
                <table class="ui fixed striped table" v-show="transactions && transactions.totalCount>0">
                  <thead>
                    <tr>
                      <th class="center aligned">Tx</th>
                      <th class="center aligned">Age</th>
                      <th class="center aligned">Type</th>
                      <th class="center aligned">From</th>
                      <th class="center aligned">To</th>
                      <th class="center aligned">Amount</th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr class="center aligned" v-for="(transaction,index) in transactions.items" :key="index">
                      <td>{{transaction.hash}}</td>
                      <td>{{transaction.timestamp}}</td>
                      <td>{{transaction.type}}</td>
                      <td>{{transaction.from}}</td>
                      <td>{{transaction.to}}</td>
                      <td>{{filterAmount(transaction)}}</td>
                    </tr>

                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="5" v-show="totalPages>1">
                        <div class="ui left floated">
                            Page {{currentPage}} of {{totalPages}}
                        </div>
                        <div class="ui right floated pagination menu" >

                          <a class="icon item"  @click="previousPage" v-show="currentPage && currentPage!=1">
                            <i class="left chevron icon"></i>
                          </a>
                          <a class="icon item" @click="nextPage" v-show="currentPage!=totalPages">
                            <i class="right chevron icon"></i>
                          </a>

                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>


      </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import TopMenuComponent from '../components/TopMenu'
  import TopInfoComponent from '../components/TopInfo'
  import {FETCH_TRANSACTIONS} from '../store/action.type'
  import {TRX_SUN} from '../Constants'
  import TRXWalletConfig from 'TRXWalletConfig'


  export default {
    name: 'home',
    components:{
      TopMenuComponent,
      TopInfoComponent
    },
    data () {
      return{
      }
    },
    mounted () {

      this.$store.dispatch(FETCH_TRANSACTIONS,{address:this.wallet.address})
      
    },
    methods:{
      getAddressUrl(address){
          return `${TRXWalletConfig.trxplorer.url}/address/${address}`
      },
      previousPage(){
          this.$store.dispatch(FETCH_TRANSACTIONS,{address:this.wallet.address,page:this.currentPage-1})
          
      },
      nextPage(){
          this.$store.dispatch(FETCH_TRANSACTIONS,{address:this.wallet.address,page:this.currentPage+1})
      },
      filterAmount(transaction){
        if (transaction.token=='TRX'){
          return (transaction.amount / TRX_SUN) + ' ' + 'TRX'
        }else{
          return (transaction.amount) + ' ' + transaction.token
        }
      }
    },
    computed: {
      currentPage(){
        if (!this.transactions || !this.transactions.criteria){
          return 
        }
        return this.transactions.criteria.page
      },
      totalPages(){
        if (!this.transactions || !this.transactions.criteria){
          return 
        }
        return this.transactions.totalPages
      },
      ...mapGetters([
        'transactions',
        'account',
        'wallet'
      ])
    }
  }
</script>

