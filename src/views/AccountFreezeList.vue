<template>
    <div>
    <h2 class="ui dividing header">Freeze</h2>
        <div class="ui info message">
          <div class="header">
            All the freeze / unfreeze history related to your account
          </div>
        </div>
      <div class="ui raised segment">
                <p v-show="freezeHistory && freezeHistory.totalCount==0">You didn't made or received any vote yet</p>
                <table class="ui fixed striped table" v-show="freezeHistory && freezeHistory.totalCount>0">
                  <thead>
                    <tr>
                      <th class="center aligned">Frozen Balance</th>
                      <th class="center aligned">Freeze expiration date</th>
                      <th class="center aligned">Unfreeze date</th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr class="center aligned" v-for="(vote,index) in freezeHistory.items" :key="index">
                      <td>{{vote.balance|sun}}</td>
                      <td>{{vote.expireTime}}</td>
                      <td>{{vote.unfreezeTime}}</td>
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
  import {FETCH_FREEZE_HISTORY} from '../store/action.type'
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

      this.$store.dispatch(FETCH_FREEZE_HISTORY,{address:this.wallet.address})
      
    },
    methods:{
      getBalance(balance){
        if (!balance){
          return
        }
        return (balance / TRX_SUN).toLocaleString()
      },
      getAddressUrl(address){
          return `${TRXWalletConfig.trxplorer.url}/address/${address}`
      },
      previousPage(){
          this.$store.dispatch(FETCH_FREEZE_HISTORY,{address:this.wallet.address,page:this.currentPage-1})
          
      },
      nextPage(){
          this.$store.dispatch(FETCH_FREEZE_HISTORY,{address:this.wallet.address,page:this.currentPage+1})
      },

    },
    computed: {
      currentPage(){
        if (!this.freezeHistory || !this.freezeHistory.criteria){
          return 
        }
        return this.freezeHistory.criteria.page
      },
      totalPages(){
        if (!this.freezeHistory || !this.freezeHistory.criteria){
          return 
        }
        return this.freezeHistory.totalPages
      },
      ...mapGetters([
        'freezeHistory',
        'account',
        'wallet'
      ])
    }
  }
</script>

