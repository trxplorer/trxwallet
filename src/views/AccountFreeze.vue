<template>
  <div>
    <h2 class="ui dividing header">Freeze</h2>
        <div class="ui info message">
          <div class="header">
            You are about to freeze some TRX
          </div>
          <ul class="list">
            <li>You can freeze a certain amount of TRX in order to get some Tron Power.</li>
            <li>Those frozen TRX will not be available to trade for a period of 3 days</li>
            <li>If you already have some frozen TRX the freezing period on this previous amount will be reinitialized</li>
            <li>Once exeeded the period of 3 days you can unfreeze your TRX</li>
          </ul>
        </div>
      <div class="ui raised segment">
        <form class="ui big form" >
          <div class="field">
            <label>Freezing amount</label>
            <input v-model="freezeAmount" type="number" min="1">
            <small>The minimum amount you can freeze is 1 TRX</small><br>
          </div>
          <div class="field">
            <label>Get Tron power !</label>
            <small>By freezing {{freezeAmount}} TRX, you will get a total of <b>{{estimatedTronPower}} Tron power</b>. You will be able to use this amount to vote for your super representatives !</small><br>
          </div>
          <a class="ui large green button right floated" :class="{'disabled':false}" @click="freeze" >Freeze</a>
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
import { TRX_SUN } from '../Constants';

  export default {
    name: 'home',
    components:{
      TopMenuComponent,
      TopInfoComponent
    },
    props: ['showTopInfo','showTopMenu'],
    data () {
      return{
        freezeAmount:1
      }
    },
    mounted () {

    },
    methods:{
      freeze(){
        this.$trxwallet.requestSignature('freeze',{issuer:'TRXWallet',amount:this.freezeAmount})
      }
    },
    watch:{
      freezeAmount(val){
        if (val<=0){
          this.freezeAmount = 1
        }
      }
    },
    computed: {
      estimatedTronPower(){
        if (!this.account || !this.account.frozenBalance){
          return this.freezeAmount
        }
        return parseInt((this.account.frozenBalance/TRX_SUN) +  parseInt(this.freezeAmount))
      },
      ...mapGetters([
        'account'
      ])
    }
  }
</script>

