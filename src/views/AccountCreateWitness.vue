<template>
  <div>
    <h2 class="ui dividing header">Apply for representative</h2>
        <div class="ui info message">
          <div class="header">
            You are about to apply to become a representative
          </div>
          <ul class="list">
            <li>Applying as a representative will give you the ability to participate to TRON's ecosystem.</li>
            <li>Every 24h a super representative is choosen by TRON users among all the representative candidates</li>
            <li>If you are elected as a super representative and have successfully deployed a node, you will be rewarded</li>
            <li>A one time fee of TRX is required to become representative</li>
          </ul>
        </div>
      <div class="ui raised segment">
        <form class="ui big form" >
          <div class="field">
            <label>Representative URL</label>
            <input v-model="url" type="url" >
            <small>Use a url where users can get information about why they shoul vote for you</small><br>
          </div>
          <a class="ui large green button right floated" :class="{'disabled':false}" @click="apply" >Apply</a>
          <br><br>
        </form>
      </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import TopMenuComponent from '../components/TopMenu'
  import TopInfoComponent from '../components/TopInfo'
  import {REQUEST_SIGNATURE} from '../store/action.type'
  
  export default {
    name: 'home',
    components:{
      TopMenuComponent,
      TopInfoComponent
    },
    props: ['showTopInfo','showTopMenu'],
    data () {
      return{
        url:''
      }
    },
    mounted () {

    },
    methods:{
      apply(){
        this.$trxwallet.requestSignature('createWitness',{issuer:'TRXWallet',url:this.url})
      }
    },
    computed: {
      estimatedTronPower(){
        return this.account.frozenBalance +  this.freezeAmount
      },
      ...mapGetters([
        'account'
      ])
    },
    watch:{
      ['account.witness.url'](val){
        this.url = val
      },
    },
  }
</script>

