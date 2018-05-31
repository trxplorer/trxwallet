<template>
    <div>
    <h2 class="ui dividing header">Votes</h2>
        <div class="ui info message">
          <div class="header">
            All the votes you made and received
          </div>
        </div>
      <div class="ui raised segment">
                <p v-show="votes && votes.totalCount==0">You didn't made or received any vote yet</p>
                <table class="ui fixed striped table" v-show="votes && votes.totalCount>0">
                  <thead>
                    <tr>
                      <th class="center aligned">FROM</th>
                      <th class="center aligned">TO</th>
                      <th class="center aligned">Count</th>
                      <th class="center aligned">Age</th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr class="center aligned" v-for="(vote,index) in votes.items" :key="index">
                      <td><span v-show="vote.from==wallet.address">{{vote.from}}</span> <a v-show="vote.from!=wallet.address" :href="getAddressUrl(vote.from)" target="blank">{{vote.from}}</a></td>
                      <td><span v-show="vote.to==wallet.address">{{vote.to}}</span> <a v-show="vote.to!=wallet.address" :href="getAddressUrl(vote.to)" target="blank">{{vote.to}}</a></td>
                      <td>{{vote.voteCount}}</td>
                      <td>{{vote.timestamp}}</td>
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
  import {FETCH_VOTES} from '../store/action.type'
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

      this.$store.dispatch(FETCH_VOTES,{address:this.wallet.address})
      
    },
    methods:{
      getAddressUrl(address){
          return `${TRXWalletConfig.trxplorer.url}/address/${address}`
      },
      previousPage(){
          this.$store.dispatch(FETCH_VOTES,{address:this.wallet.address,page:this.currentPage-1})
          
      },
      nextPage(){
          this.$store.dispatch(FETCH_VOTES,{address:this.wallet.address,page:this.currentPage+1})
      },

    },
    computed: {
      currentPage(){
        if (!this.votes || !this.votes.criteria){
          return 
        }
        return this.votes.criteria.page
      },
      totalPages(){
        if (!this.votes || !this.votes.criteria){
          return 
        }
        return this.votes.totalPages
      },
      ...mapGetters([
        'votes',
        'account',
        'wallet'
      ])
    }
  }
</script>

