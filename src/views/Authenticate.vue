<template>
  <div >
    <h1> <i class="ui icon lock"></i>Authenticate</h1>
    <notifications group="notif" position="top center"/>
    <div class="ui warning message">
      <div class="header">
        Login required
      </div>
      <p>Your password is required to access the wallet</p>
    </div>
    <div class="ui raised segment">
    <!--STEP 3-->
    <form class="ui big form" >
      <div class="wide field">
        <label>Password</label>
        <input type="password" >
        <small>Please confirm your wallet password</small><br>
      </div>
    </form>



    <br>

    <button class="ui red large button right floated" @click="cancel">Cancel</button>
    <button class="ui large blue button right floated" :class="{'disabled':false}" @click="auth" >Validate</button>

    <br><br>
    </div>
    
 </div>
</template>

<script>
  import Vue from 'vue'
  import WalletService from '../service/WalletService'
  import { LOGIN } from '../store/action.type';

  export default {
    name: 'createNewAccount',
    data () {
      return {
        password:'',

      }
    },
    mounted () {


      

      
    },
    methods: {
      auth(){
      },
      cancel () {
        this.$router.go(-1)
      },

    },




  }
</script>
