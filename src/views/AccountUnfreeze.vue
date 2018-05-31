<template>
  <div>
    <h2 class="ui dividing header">Unfreeze</h2>
        <div class="ui info message">
          <div class="header">
            Unfreeze your locked/frozen TRX
          </div>
        </div>
      <div class="ui raised segment">
          <p v-show="this.account.frozenExpire">You currently have a frozen balance of <strong>{{frozenBalance}}</strong> TRX that will expire on <strong>{{fronzenExpire}}</strong></p>
          <p v-show="!delayPassed" style="color:red">You can't unfreeze your locked token yet, you will have to wait until this date.</p>
          <button class="ui green button fluid " :class="{'disabled':!delayPassed||!this.account.frozenExpire}" @click="unfreeze">Unfreeze</button>
      </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import TopMenuComponent from '../components/TopMenu'
  import TopInfoComponent from '../components/TopInfo'
  import {REQUEST_SIGNATURE} from '../store/action.type'
  import { TRX_SUN } from '../Constants';
  import moment from 'moment'

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
      unfreeze(){
        this.$trxwallet.requestSignature('unfreeze',{issuer:'TRXWallet'})
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
      frozenBalance(){
        if (!this.account || !this.account.frozenBalance){
          return 0
        }
        return this.account.frozenBalance/TRX_SUN
      },
      fronzenExpire(){
        if (!this.account){
          return
        }
        return moment.unix(this.account.frozenExpire).format("MM/DD/YYYY");
      },
      delayPassed(){
        if (!this.account){
          return false
        }
        return moment.unix(this.account.frozenExpire).isBefore(new Date());
      },
      ...mapGetters([
        'account'
      ])
    }
  }
</script>

