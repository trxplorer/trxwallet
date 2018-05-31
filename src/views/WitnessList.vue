<template>
  <div>
    <div class="ui grid">

      <div id="witnesses" class="eleven wide column">

            <h2 class="ui dividing header">Vote</h2>
                <div class="ui info message">
                  <div class="header">
                    Vote for your super representative
                  </div>
                </div>
              <div class="ui raised segment">

                <table class="ui fixed striped table">
                  <thead>
                    <tr>
                      <th class="center aligned">Address</th>
                      <th class="center aligned">URL</th>
                      <th class="center aligned">Total votes</th>
                      <th class="center aligned">Your votes</th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr class="center aligned" v-for="(witness,index) in witnesses.items" :key="index">
                      <td><a :href="getAddressUrl(witness.address)">{{witness.address}}</a></td>
                      <td><a :href="witness.url" target="blank">{{witness.url}}</a></td>
                      <td>{{witness.voteCount.toLocaleString()}}</td>
                      <td><div class="ui mini input"><input v-model="witness.userVote" type="number" value="0" min="0" :max="maxVotes" @input="computeVotes(witness)"></div></td>
                    </tr>

                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="4">
                        <div class="ui left floated">
                            Page {{currentPage}} of {{totalPages}}
                        </div>
                        <div class="ui right floated pagination menu">

                          <a class="icon item"  @click="previousPage" v-show="currentPage!=1">
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

      <div class="five wide column right rail" >

        <div class="ui sticky segments">
          <div class="ui fluid segment ">
              <strong>Next elections:</strong>

          </div>
          <div class="ui fluid yellow segment ">
               <strong>Remaining votes: {{remainingVotes}}</strong>

          </div>
          <div class="ui fluid orange segment ">
               <strong>Your votes:</strong>
                <table class="ui small compact fixed very basic table" v-show="votes.length>0">
                    <thead>
                    <tr>
                      <th class="center aligned">URL</th>
                      <th class="center aligned">Your votes</th>
                      <th class="center aligned"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="center aligned" v-for="(vote,index) in votes" :key="index" >
                      <td :title="vote.url">{{vote.url}}</td>
                      <td>{{vote.userVote.toLocaleString()}}</td>
                      <td><a title="Remove vote" class="ui mini red button" @click="removeVote(vote,index)">X</a></td>
                    </tr>

                  </tbody>
                </table>
                <button class="ui mini fluid blue button" v-show="votes.length>0" @click="submitVotes">Vote</button>
          </div>

        </div>




      </div>




      </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import TopMenuComponent from '../components/TopMenu'
  import TopInfoComponent from '../components/TopInfo'
  import {FETCH_WITNESSES} from '../store/action.type'
  import {TRX_SUN} from '../Constants'
  import TRXWalletConfig from '../config'
  import $ from "jquery";
  import 'semantic-ui/dist/components/sticky'
import { setTimeout } from 'timers';


  export default {
    name: 'home',
    components:{
      TopMenuComponent,
      TopInfoComponent
    },
    props: ['showTopInfo','showTopMenu'],
    data () {
      return{
        votes:[],
        maxVotes:0
      }
    },
    mounted () {
      this.maxVotes = this.account.frozenBalance/TRX_SUN
      this.$store.dispatch(FETCH_WITNESSES).then(()=>{

        setTimeout(() => {
          $(".sticky").sticky({
            context:"#witnesses"
          })
        }, 1000);


      })

      


    },
    methods:{
      getAddressUrl(address){
          return `${TRXWalletConfig.trxplorer.url}/address/${address}`
      },
      previousPage(){
          this.$store.dispatch(FETCH_WITNESSES,{page:this.currentPage-1})
          
      },
      nextPage(){
          this.$store.dispatch(FETCH_WITNESSES,{page:this.currentPage+1})
      },

      computeVotes(witness){

        if (witness.userVote<0){
          witness.userVote=0
          return 
        }
        if (witness.userVote>this.remainingVotes){
          witness.userVote = 0
        }
        if (this.remainingVotes==-1){
          witness.userVote = witness.userVote-1
          return
        }



        let existingVote = this.findUserVoteByAddress(witness.address)

        if (existingVote){
          existingVote.userVote = witness.userVote
        }else{
          if (witness.userVote>0){
            this.votes.push({address:witness.address,userVote:witness.userVote,url:witness.url})
          }
        }

          this.votes.forEach((v,i)=>{
            if (v.userVote==0){
              this.votes.splice(i,1)
            }
          })
      },
      findUserVoteByAddress(address){
        let result = null
        
        for (let index = 0; index < this.votes.length; index++) {
          let vote = this.votes[index];
            if (vote.address==address){
              result = vote
              break
            }          
        }

        return result
      },
      findWitnessByAddress(address){
        let result = null
        
        for (let index = 0; index < this.witnesses.items.length; index++) {
          let w = this.witnesses.items[index];
            if (w.address==address){
              result = w
              break
            }          
        }

        return result
      },
      applyVotesToWitnesses(){

        this.votes.forEach((v)=>{
           let w = this.findWitnessByAddress(v.address)
           if (w){
             w.userVote = parseInt(v.userVote)
           }
        })

      },
      removeVote(vote,index){
        vote.userVote = 0
        this.votes.splice(index,1)
        let witness = this.findWitnessByAddress(vote.address)
        if (witness){
          witness.userVote=0
        }
      },
      submitVotes(){
        let votes = []
        this.votes.forEach((vote)=>{
          votes.push({address:vote.address,votes:vote.userVote})
        })
        this.$trxwallet.requestSignature('vote',{issuer:'TRXWallet',votes:votes})
      }
    },
    watch:{
      witnesses(){
         this.applyVotesToWitnesses()
      }
    },
    computed: {
      currentPage(){
        if (!this.witnesses || !this.witnesses.criteria){
          return 
        }
        return this.witnesses.criteria.page
      },
      totalPages(){
        if (!this.witnesses || !this.witnesses.criteria){
          return 
        }
        return this.witnesses.totalPages
      },
      remainingVotes(){
        let remaining = this.maxVotes
        if (this.votes){
          this.votes.forEach((vote)=>{
              if (vote.userVote && vote.userVote>0){
                remaining = remaining - vote.userVote
              }
          })
        }

        return remaining
      },
      ...mapGetters([
        'witnesses',
        'account'
      ])
    }
  }
</script>

