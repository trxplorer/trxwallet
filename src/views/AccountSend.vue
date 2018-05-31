<template>
  <div>
    <h2 class="ui dividing header">Send</h2>
        <div class="ui info message">
          <div class="header">
            Send TRX / Token
          </div>
          <ul class="list">
            <li >You can send TRX or tokens to another account without any fee</li>
          </ul>
        </div>
      <div class="ui raised segment" >
        <form class="ui large form" >
           <h3 class="ui dividing header">Send TRX</h3>
          <div class="field">
            <label>Send to address</label>
            <input v-model="trxToAddress"  type="text" >
            <small v-show="!isValidTRXAddress" style="color:red">This address is not valid</small><br>
            <small v-show="isSelfTRXAddress" style="color:red">Sending TRX to yourself ? Maybe not a good idea ;)</small><br>
          </div>
          <div class="field">
            <label>Amount</label>
            <input v-model="trxAmount" type="number" :step="step">
            <small style="color:red" v-show="!trxToAddressExists">This address does not exists yet, the minimum amount you can send is 1 TRX</small><br>
          </div>
          <a class="ui green button right floated" :class="{'disabled':!isValidTRXAddress,'loading':sendTRXLoading}"  @click="sendTRX" >Send TRX</a>
          <br><br>
        </form>
      </div>
      <div class="ui raised segment" >
        <form class="ui large form" >
           <h3 class="ui dividing header">Send Token</h3>
          <div class="field">
            <label>Send to address</label>
            <input  type="text" v-model="tokenToAddress">
            <small v-show="!isValidTokenAddress" style="color:red">This address is not valid</small><br>
            <small v-show="isSelfTokenAddress" style="color:red">Sending token to yourself ? Maybe not a good idea ;)</small><br>
          </div>
          <div class="field">
            <label>Token</label>
            <select class="ui token search dropdown" v-model="tokenName" >
              <option :value="token.assetName"  v-for="(token,index) in accountTokens" :key="index">{{token.assetName}} - ({{token.balance}} {{token.assetName}}) </option>
            </select>
          </div>
          <div class="field">
            <label>Amount</label>
            <input v-model="tokenAmount" type="number" :step="1">
            
            <small style="color:red" v-show="!trxToAddressExists">This address does not exists yet, the minimum amount you can send is 1 TRX</small><br>
          </div>
          <a class="ui blue button right floated" :class="{'disabled':!isValidTokenAddress}" @click="sendToken" >Send token</a>
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
  import WalletService from '../service/WalletService'
  import TronService from '../service/TronService'
  import {TRX_SUN} from '../Constants'
  import $ from "jquery";
  import 'semantic-ui/dist/components/dropdown'

  export default {
    name: 'home',
    components:{
      TopMenuComponent,
      TopInfoComponent
    },
    props: ['showTopInfo','showTopMenu'],
    data () {
      return{
        accountTokens:[],
        trxToAddress:'',
        trxToAddressExists:true,
        tokenToAddress:'',
        tokenAmount:1,
        tokenName:'',
        trxAmount:1/TRX_SUN,
        step:1/TRX_SUN,
        sendTRXLoading:false
      }
    },
    mounted () {

      $('.ui.token.dropdown').dropdown()
      TronService.account().getTokens({address:this.account.address,limit:-1}).then((tokens)=>{
        this.accountTokens = tokens.items
      })

    },
    methods:{
      sendTRX(){
          this.sendTRXLoading = true
        TronService.accountExists({address:this.trxToAddress}).then((exists)=>{
          this.trxToAddressExists = exists
          if (this.canSendTRX){
            this.$trxwallet.requestSignature('sendTRX',{issuer:'TRXWallet',to:this.trxToAddress,amount:this.trxAmount})
          }

        }).catch((e)=>{
          console.error(e.stack)
        }).then(()=>{
            this.sendTRXLoading = false
        })

      },
      sendToken(){
        this.$trxwallet.requestSignature('sendToken',{issuer:'TRXWallet',to:this.tokenToAddress,token:this.tokenName,amount:this.tokenAmount})
      }
    },
    computed: {
      canSendTRX(){
        
        if (this.trxToAddress.length>0 && this.isValidTRXAddress){
          // account does not exists yet: have to send 1 TRX min

          if (!this.trxToAddressExists && this.trxAmount<1){

            return false
          }
        }

        return true
      },
      canSendToken(){
        
        return this.tokenName.length>0 && this.isValidTokenAddress
      },
      isValidTRXAddress(){
          return WalletService.isValidAddress(this.trxToAddress)
      },
      
      isSelfTRXAddress(){
        return this.trxToAddress===this.account.address
      },
      isValidTokenAddress(){
          return WalletService.isValidAddress(this.tokenToAddress)
      },
      
      isSelfTokenAddress(){
        return this.tokenToAddress===this.account.address
      },
      ...mapGetters([
        'account'
      ])
    },
    watch:{
      ['trxAmount'](val){
        if (val<1/TRX_SUN){
          this.trxAmount = 1/TRX_SUN
        }  
      },
      ['tokenAmount'](val){
        if (val<1){
          this.tokenAmount = 1
        }  
      },
      ['account.name'](val){
        this.name = val
      },
      ['account.witness.url'](val){
        this.url = val
      },
    }
  }
</script>

