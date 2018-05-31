<template>
  <div style="margin-top:10px;">
    <h1 ><i class="ui icon lock"></i>Authorization required</h1>
    <notifications group="notif" position="top center"/>
    <div class="ui warning message">
      <div class="header">
        Validate a transaction
      </div>
      <p>Your signature was requested to authorize a transaction. Please, review the following informations carefully before validating</p>
    </div>
    <div class="ui raised segment">
    <div class="ui fluid ordered steps">
      <div :class="{active:step==1,completed:step>1}" class="step">
        
        <div class="content">
          <div class="title">Transaction informations</div>
          <div class="description">Review the transaction informations</div>
        </div>
      </div>
      <div :class="{active:step==2,completed:step>2}" class="step">
        <div  class="content">
          <div class="title">Validate transaction</div>
          <div class="description">Sign the transaction</div>
        </div>
      </div>
      <div :class="{active:step==3,completed:step==3}" class="step">
        <div  class="content">
          <div class="title">Send transaction</div>
          <div class="description">Send transaction to TRON blockchain</div>
        </div>
      </div>
    </div>
    <!--STEP 1-->

    <table class="ui definition table" v-show="step==1">
      <tbody>
        <tr>
          <td>Authorization request issuer</td>
          <td>{{transaction.issuer}}</td>
        </tr>
        <tr>
          <td>Transaction type</td>
          <td>{{type.label}}</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>{{type.description}}</td>
        </tr>
        <tr>
          <td>Owner address</td>
          <td><a :href="fromAccountUrl" target="blank">{{transaction.owner}}</a></td>
        </tr>
        <tr v-show="transaction.to">
          <td>To address</td>
          <td><a :href="toAccountUrl" target="blank">{{transaction.to}}</a></td>
        </tr>
        <tr v-show="transaction.amount>0">
          <td>Amount</td>
          <td>{{transaction.amount}} <span v-show="transaction.token">{{transaction.token}}</span></td>
        </tr>
        <tr v-show="transaction.url">
          <td>Url</td>
          <td>{{transaction.url}}</td>
        </tr>
        <tr v-show="transaction.votes">
          <td>Votes</td>
          <td>
                <ul class="ui bulleted list">
                  <li v-for="(vote,index) in transaction.votes" :key="index"><a :href="getAddressUrl(vote.address)">{{vote.address}}</a> with <strong>{{vote.votes}}</strong> votes</li>

                </ul>

          </td>
        </tr>






        <tr>
          <td>Transaction cost</td>
          <td>{{type.fee}}</td>
        </tr>
      </tbody>
    </table>

    <!--STEP 2-->
    <div class="ui info message" v-show="step==2">
      <div class="header">
        How safe is it ?
      </div>
      <ul>
        <li>TRXWallet will never ask for your private key to validate a transaction (only your wallet password that is unique to TRXWallet and current device)</li>
        <li>Your private key is never revealed by TRXWallet, it is safely encrypted, only you can decrypt your private key by using your wallet password</li>
        <li>Your password is stored offline on current device and will never leave it</li>
        <li>No information is transmitted to the authorization request issuer</li>
      </ul>
    </div>
    <form class="ui big form" v-show="step==2">

      <div class="wide field">
        
        <label>TRXWallet password</label>
        <input v-model="pwd" type="password" >
        <small>Please enter your TRXWallet password for current wallet (not the private key)</small><br>
      </div>
    </form>

    <!-- STEP 3-->
    <div v-show="step==3" class="ui grid centered">

          <div class="row">
              <h3 v-show="!success">Your transaction is being emitted to TRON network, please wait a moment ...</h3>
              <h3 class="ui header dividing" v-show="success" style="color:green">Your transaction was successfully emitted to TRON network !</h3>
          </div>
          <div class="row">
              <p v-show="success" ><strong>You can check your transaction here: </strong><br><a :href="txUrl+'?w=1'" target="blank">{{txUrl}}</a></p>
          </div>
          <div class="row" >
              <scale-loader :loading="true" v-show="!success" ></scale-loader>
              <div class="check_mark" v-if="success">
                <div class="sa-icon sa-success animate">
                  <span class="sa-line sa-tip animateSuccessTip"></span>
                  <span class="sa-line sa-long animateSuccessLong"></span>
                  <div class="sa-placeholder"></div>
                  <div class="sa-fix"></div>
              </div>
            </div>

          </div>
    </div>


    <br>

    <button class="ui red large button right floated" v-show="!success" @click="cancel">Cancel</button>
    <button class="ui green large button right floated" v-show="success" @click="cancel">Ok</button>
    <button class="ui large green button right floated" :class="{'disabled':!canGoNext}" @click="next" v-if="step<2">I want to validate this transaction</button>
    <button class="ui large green button right floated" :class="{'disabled':!canGoNext}" @click="next" v-if="step==2">Validate</button>
    <button class="ui large basic button right floated" @click="back" v-if="step>1 && step!=3">Previous</button>
    <br><br>
    </div>
    
 </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import WalletService from '../service/WalletService'
  import ScaleLoader from 'vue-spinner/src/ScaleLoader'
  import TransactionService from '../service/TransactionService'
  import moment from 'moment'
  import {TRX_SUN,TX_TYPE} from '../Constants'
  import TRXWalletConfig from 'TRXWalletConfig'


  export default {
    name: 'signatureAuthorization',
    components:{
      ScaleLoader
    },
    data () {
      return {
        step:0,
        pwd:'',
        showSpinner: false,
        success:false,
        txId:''
      }
    },
    mounted () {

      this.init()
      
    },
    methods: {
      next (){
        this.step++;
        if (this.step==3){
          this.showSpinner = true
            this.sendTransaction()
        }else{
          this.showSpinner = false
        }
      },
      back (){
        this.step--;
      },
      cancel () {
        this.$router.go(-1)
      },
      confirm () {
          this.init()
      },
      init () {
        this.pwd = ''
        if (!this.type){
            this.$swal({
              title: "Invalid transaction",
              text: "The transaction is not supported or invalid, please try again",
              type: "error",
            })
            this.$router.go(-1)
        }

        this.step = 1
        this.transaction.owner = this.wallet.address

      },
      getAddressUrl(address){
          return `${TRXWalletConfig.trxplorer.url}/address/${address}`
      },
      sendTransaction(){

          const pkey = WalletService.getPkey(this.wallet.address,this.pwd)

          if (pkey){
              
              TransactionService.send(this.wallet.address,this.transaction,pkey,this.wallet.node).then((result)=>{
                if (result.success){
                    this.success = true
                    this.txId = result.txId
                }else{
                  this.$swal({
                    title: "Couldn't send your transaction to TRON network",
                    html: `Something went wrong while trying to send your transaction: <br> ${result.errorMsg}`,
                    type: "error",
                  })                      
                  
                }

              }).catch((e)=>{
                console.error(e.stack)
                  this.$swal({
                    title: "Something went wrong ...",
                    html: `Sorry, something went wrong while trying to broadcast your transaction to TRON network. Please try again in a moment ...`,
                    type: "error",
                  })                      
              }).then(()=>{
                this.showSpinner = false
                if (this.success==false){
                  this.init()
                }
              })

          }else{

              this.$swal({
                title: "Invalid password",
                html: `You didn't provide the correct password for the wallet: ${this.wallet.label} (${this.wallet.address})`,
                type: "error",
              })

            this.step--
          }
      },

    },
    computed:{
      txUrl(){
        return `${TRXWalletConfig.trxplorer.url}/tx/${this.txId}`
      },
      fromAccountUrl(){
        return `${TRXWalletConfig.trxplorer.url}/address/${this.wallet.address}`
      },
      toAccountUrl(){
        return `${TRXWalletConfig.trxplorer.url}/address/${this.transaction.to}`
      },
      canGoNext(){
        if (this.step==2){
          return this.isPasswordValid
        }else{
          return true
        }
      },
      type(){

        if (!this.transaction){
          return null
        }

        return TX_TYPE[this.transaction._type]
      },
      isPasswordValid(){
        return this.pwd && this.pwd.length>=8
      },
      showAmount(){
        return 'amount' in this.transaction;
      },
      ...mapGetters([
        'transaction',
        'wallet'
      ])
    }


  }
</script>
<style>
.check_mark {
  width: 80px;
  height: 130px;
  margin: 0 auto;
}

button {
  cursor: pointer;
  margin-left: 15px;
}

.hide{
  display:none;
}

.sa-icon {
  width: 80px;
  height: 80px;
  border: 4px solid gray;
  -webkit-border-radius: 40px;
  border-radius: 40px;
  border-radius: 50%;
  margin: 20px auto;
  padding: 0;
  position: relative;
  box-sizing: content-box;
}

.sa-icon.sa-success {
  border-color: #4CAF50;
}

.sa-icon.sa-success::before, .sa-icon.sa-success::after {
  content: '';
  -webkit-border-radius: 40px;
  border-radius: 40px;
  border-radius: 50%;
  position: absolute;
  width: 60px;
  height: 120px;
  background: white;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.sa-icon.sa-success::before {
  -webkit-border-radius: 120px 0 0 120px;
  border-radius: 120px 0 0 120px;
  top: -7px;
  left: -33px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-transform-origin: 60px 60px;
  transform-origin: 60px 60px;
}

.sa-icon.sa-success::after {
  -webkit-border-radius: 0 120px 120px 0;
  border-radius: 0 120px 120px 0;
  top: -11px;
  left: 30px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-transform-origin: 0px 60px;
  transform-origin: 0px 60px;
}

.sa-icon.sa-success .sa-placeholder {
  width: 80px;
  height: 80px;
  border: 4px solid rgba(76, 175, 80, .5);
  -webkit-border-radius: 40px;
  border-radius: 40px;
  border-radius: 50%;
  box-sizing: content-box;
  position: absolute;
  left: -4px;
  top: -4px;
  z-index: 2;
}

.sa-icon.sa-success .sa-fix {
  width: 5px;
  height: 90px;
  background-color: white;
  position: absolute;
  left: 28px;
  top: 8px;
  z-index: 1;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.sa-icon.sa-success.animate::after {
  -webkit-animation: rotatePlaceholder 4.25s ease-in;
  animation: rotatePlaceholder 4.25s ease-in;
}

.sa-icon.sa-success {
  border-color: transparent\9;
}
.sa-icon.sa-success .sa-line.sa-tip {
  -ms-transform: rotate(45deg) \9;
}
.sa-icon.sa-success .sa-line.sa-long {
  -ms-transform: rotate(-45deg) \9;
}

.animateSuccessTip {
  -webkit-animation: animateSuccessTip 0.75s;
  animation: animateSuccessTip 0.75s;
}

.animateSuccessLong {
  -webkit-animation: animateSuccessLong 0.75s;
  animation: animateSuccessLong 0.75s;
}

@-webkit-keyframes animateSuccessLong {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}
@-webkit-keyframes animateSuccessTip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}
@keyframes animateSuccessTip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}

@keyframes animateSuccessLong {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}

.sa-icon.sa-success .sa-line {
  height: 5px;
  background-color: #4CAF50;
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 2;
}

.sa-icon.sa-success .sa-line.sa-tip {
  width: 25px;
  left: 14px;
  top: 46px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.sa-icon.sa-success .sa-line.sa-long {
  width: 47px;
  right: 8px;
  top: 38px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

@-webkit-keyframes rotatePlaceholder {
  0% {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  5% {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  12% {
    transform: rotate(-405deg);
    -webkit-transform: rotate(-405deg);
  }
  100% {
    transform: rotate(-405deg);
    -webkit-transform: rotate(-405deg);
  }
}
@keyframes rotatePlaceholder {
  0% {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  5% {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  12% {
    transform: rotate(-405deg);
    -webkit-transform: rotate(-405deg);
  }
  100% {
    transform: rotate(-405deg);
    -webkit-transform: rotate(-405deg);
  }
}

</style>
