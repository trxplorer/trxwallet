<template>
    <div>
    <h2 class="ui dividing header">Tokens</h2>
        <div class="ui info message">
          <div class="header">
            Your tokens balance
          </div>
        </div>
      <div class="ui raised segment">
                <p v-show="tokens && tokens.totalCount==0">You don't have any token yet, you can participate to ICO to get new tokens</p>
                <table class="ui fixed striped table" v-show="tokens && tokens.totalCount>0">
                  <thead>
                    <tr>
                      <th class="center aligned">Token</th>
                      <th class="center aligned">Balance</th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr class="center aligned" v-for="(token,index) in tokens.items" :key="index">
                      <td><a :href="getAddressUrl(token.assetName)">{{token.assetName}}</a></td>
                      <td>{{token.balance}}</td>
                    </tr>

                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="2" v-show="totalPages>1">
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
  import {FETCH_TOKENS} from '../store/action.type'
  import {TRX_SUN} from '../Constants'
  import TRXWalletConfig from '../config'


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

      this.$store.dispatch(FETCH_TOKENS,{address:this.wallet.address})
      
    },
    methods:{
      getAddressUrl(address){
          return `${TRXWalletConfig.trxplorer.url}/address/${address}`
      },
      previousPage(){
          this.$store.dispatch(FETCH_TOKENS,{address:this.wallet.address,page:this.currentPage-1})
          
      },
      nextPage(){
          this.$store.dispatch(FETCH_TOKENS,{address:this.wallet.address,page:this.currentPage+1})
      },

    },
    computed: {
      currentPage(){
        if (!this.tokens || !this.tokens.criteria){
          return 
        }
        return this.tokens.criteria.page
      },
      totalPages(){
        if (!this.tokens || !this.tokens.criteria){
          return 
        }
        return this.tokens.totalPages
      },
      ...mapGetters([
        'tokens',
        'account',
        'wallet'
      ])
    }
  }
</script>

