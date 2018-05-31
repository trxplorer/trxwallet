<template>
  <div>
    <h2 class="ui dividing header">Wallet settings</h2>
        <div class="ui info message">
          <div class="header">
            Edit your wallet settings
          </div>
        </div>
      <div class="ui raised segment" >
        <form class="ui big form" >
          <div class="field">
            <label>Wallet label</label>
            <input v-model="label" type="text" >
            <small style="color:red" v-show="!isValidLabel">The label must have at least 5 characters</small><br>
          </div>
          <div class="field">
            <label>Node address</label>
            <input v-model="nodeAddress" type="text" >
            <small>If empty default node will be used. Must be in the following format: host:port - for example: 47.254.146.147:50051 </small>
          </div>
          <a class="ui green button right floated" :class="{'disabled':!canEditWallet}" @click="updateWallet" >Update wallet</a>
          <br><br>
        </form>
      </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import TopMenuComponent from '../components/TopMenu'
  import TopInfoComponent from '../components/TopInfo'
  import WalletService from '../service/WalletService'

  export default {
    name: 'home',
    components:{
      TopMenuComponent,
      TopInfoComponent
    },
    data () {
      return{
        label:'',
        nodeAddress:''
      }
    },
    mounted () {
      this.label = this.wallet.label
      this.nodeAddress = this.wallet.node
    },
    methods:{
      updateWallet(){
        this.wallet.node = this.nodeAddress
        this.wallet.label = this.label
        
        WalletService.updateByAddress(this.wallet.address,this.wallet)

          this.$swal({
            title: "Wallet updated !",
            text: "Your wallet was successfully updated !",
            type: "success",
          });

          this.$router.go(-1)
      }
    },
    computed: {
      isValidLabel(){
        if (!this.label){
          return
        }
        return this.label.length>4
      },
      canEditWallet(){
        return this.isValidLabel
      },
      ...mapGetters([
        'wallet'
      ])
    },
    watch:{
      ['wallet'](wallet){
        this.label = wallet.label
        this.nodeAddress = wallet.node
      }
    }
  }
</script>

