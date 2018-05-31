<template>
  <div >
    <h1>New wallet</h1>
    <notifications group="notif" position="top center"/>
    <div class="ui warning message">
      <div class="header">
        Confidential informations
      </div>
      <p>You are about to create a new wallet. These informations are strictly confidential and you are the only one responsible for keeping them safe.</p>
    </div>
    <div class="ui raised segment">
    <div class="ui fluid ordered steps">
      <div :class="{active:step==1,completed:step>1}" class="step">
        
        <div class="content">
          <div class="title">Wallet info</div>
          <div class="description">New wallet informations</div>
        </div>
      </div>
      <div :class="{active:step==2,completed:step>2}" class="step">
        <div  class="content">
          <div class="title">Credentials</div>
          <div class="description">Private key and wallet password</div>
        </div>
      </div>
      <div :class="{active:step==3,completed:step>3}" class="step">
        <div class="content">
          <div class="title">Confirm</div>
          <div class="description">Validate your new wallet informations</div>
        </div>
      </div>
    </div>
    <!--STEP 0-->
    <div class="ui grid centered" v-show="step==0">
        <div class="row">
            <h1 class="ui header dividing"><small>Already got a TRON address ?</small></h1>
            <br><br>
        </div> 
        <div class="row">
            <button class="ui basic blue large button" @click="selectType(2)">I don't have a TRON address yet, I want to create a new one</button>
        </div>
        <div class="row">
            <button class="ui basic blue large button" @click="selectType(1)">Yes, I would like to create a wallet with my existing address</button>
        </div>
    </div>
    <br>
    <!--STEP 1-->
    <form class="ui big form" v-show="step==1">
      <div class="wide field">
        <label>Address <i class="icon copy" v-clipboard:copy="account.address" v-clipboard:success="onCopy"></i></label>
        <input type="text" v-model="account.address" :disabled="type==2">
        <small style="color:red" v-show="!isValidAddress">This is not a valid TRON address</small><br>
        <small>This is the address associated to your private key. You must use this address when you want to send or receive TRX or any other tokens</small>
      </div>
      <div class="wide field">
        <label>Label</label>
        <input type="text" name="first-name" v-model="label" placeholder="Wallet label">
        <small style="color:red" v-show="!isValidLabel">The label must have at least 5 characters</small><br>
        <small style="color:red" v-show="labelExists">This label already exists</small><br>
        <small>This label is reserved for your TRXWallet only. It is not Tron's official account name. It is used only to retrieve your wallets in a simple way</small>
      </div>
    </form>
    <!--STEP 2-->
    <form class="ui big form" v-show="step==2">
      <div class="wide field">
        <label>Private key <i class="icon copy" v-clipboard:copy="account.pkey" v-clipboard:success="onCopy"></i></label>
        <input type="text" v-model="account.pkey" :disabled="type==2">
        <small style="color:red" v-show="!privateKeyMatchAddress">This private key doesn't match the address you entered</small><br>
        <small>This is your TRON's private key that will allow you to sign transactions (like sending TRX, voting etc..) when required. </small><br>
        <small>TRXWallet will never ask you to enter this private key directly when signing a transaction. Only your password will be prompted</small><br>
        <small>This private key will be encrypted and stored locally on this computer. </small><br>

      </div>
      <div class="field">
        <label>Password <span class="ui label" :class="{red:scoreLabel=='Weak',orange:scoreLabel=='Medium',green:scoreLabel=='Strong'}" v-show="pwdScore>0">{{scoreLabel}}</span></label>
        <input type="password" v-model="password">
        <small style="color:red" v-show="pwdEqualsPKey">Please do not use your private key as password</small><br>
        <small style="color:red" v-show="!isValidPwd">Password must contain at least 8 characters with mixed digits and letters. </small><br>
        <small>TRXWallet will ask you this password each time you will do a transaction. </small><br>
        <small>This password is not stored by TRXWallet and is only valid for TRXWallet and no other wallet</small>
      </div>
    </form>
    <!--STEP 3-->
    <form class="ui big form" v-show="step==3">
      <div class="wide field">
        <label>Confirm your password</label>
        <input v-model="confirmPwd" type="password" >
        <small>Please confirm your password, this is the last step before you can use your wallet !</small><br>
      </div>
    </form>



    <br>

    <button class="ui red large button right floated" @click="cancel">Cancel</button>
    <button class="ui large button right floated" :class="{'disabled':!canGoNext}" @click="next" v-if="step<3">Next</button>
    <button class="ui large green button right floated" :class="{'disabled':!canGoNext}" @click="confirm" v-if="step==3">Create new wallet</button>
    <button class="ui large basic button right floated" @click="back" v-if="step>1">Previous</button>
    <br><br>
    </div>
    
 </div>
</template>

<script>
  import Vue from 'vue'
  import WalletService from '../service/WalletService'
  import PwdValidator from 'password-validator'
  import { SET_WALLETS } from '../store/mutations.type';

  export default {
    name: 'createNewAccount',
    data () {
      return {
        step:0,
        type:0,
        account:{
          address:'',
          pkey:'',
        },
        label:'',
        password:'',
        confirmPwd:''
      }
    },
    mounted () {

      this.init()
      
      this.pwdValidator = new PwdValidator().is().min(8).has().digits().has().letters()
      
    },
    methods: {
      selectType(type){
        this.type = type
        this.step++;
        if (type==1){
          this.account.address=''
          this.account.pkey=''
        }

      },
      next (){
        this.step++;
      },
      back (){
        if (this.step==3){
          this.confirmPwd=''
        }
        this.step--;
      },
      cancel () {
        this.$router.go(-1)
      },
      onCopy (type){
        this.$notify({
          group:'notif',
          title: 'Copied to clipboad',
          duration: 300
        });
      },
      confirm () {

        let added = WalletService.addWallet({pkey:this.account.pkey,password:this.password,label:this.label,address:this.account.address})

        if (this.canGoNext && this.isValidPwd && this.isValidLabel && added){

          this.$swal({
            title: "Wallet created !",
            text: "Your new wallet was successfully created !",
            type: "success",
          });

          this.$router.push({name:'home'})

        }else{

          this.$swal({
            title: "Oops",
            text: "Something went wrong, please try again",
            type: "error",
          })


        }

          this.init()

      },
      init () {
        
        this.step = 0
        this.label = 'Wallet '+(WalletService.getWallets().length+1)
        this.password = ''
        this.confirmPwd = ''

        let account = WalletService.generate()
        this.account.address = account.address
        this.account.pkey = account.privateKey

      }
    },
    computed:{
      canGoNext(){
        if (this.step==1){
          return this.label.length>4 && !this.labelExists && this.isValidAddress
        }else if(this.step==2){
          if (this.isValidPwd && !this.pwdEqualsPKey){
            return true
          }
        }else if (this.step==3){
          return this.confirmPwd.length>0 && this.password.length>0 && this.confirmPwd===this.password
        }
      },
      pwdScore() {
          return WalletService.getPwdScore(this.password)
      },
      isValidPwd() {
          return this.pwdScore==4 && this.password && this.pwdValidator.validate(this.password)
      },
      isValidAddress(){
          return WalletService.isValidAddress(this.account.address)
      },
      pwdEqualsPKey(){
          return this.password==this.account.pkey
      },
      privateKeyMatchAddress(){
          return WalletService.privateKeyMatchAddress(this.account.pkey,this.account.address)
      },
      isValidLabel(){
        return this.label.length>4
      },
      labelExists(){
        return WalletService.getWalletByLabel(this.label)!=null
      },
      scoreLabel(){
        if (this.pwdScore<3){
          return 'Weak';
        }else if (this.pwdScore==3){
          return 'Medium';
        }else if (this.pwdScore==4){
          return 'Strong';
        }
      }
    }


  }
</script>
