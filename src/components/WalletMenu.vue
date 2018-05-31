<template>
    <div>


  <div class="ui fluid card">
    <div class="fluid content">
                    <img class="mini ui image" :src="account.avatarUrl"> <strong >{{wallet.label}}</strong>
      <div class="header">
          
        <small>{{wallet.address}}</small>
      </div>

      <div class="meta">
        {{account.name}}
      </div>
      <div class="description" v-if="url">
        <i class="ui globe icon"></i> <a :href="url" target="blank">{{url}}</a>
      </div>
    </div>
    <div class="extra content">
      <div class="ui two buttons">
        <router-link :to="{name: 'editAccount'}" active-class="active" class="ui grey basic button" exact >Edit Account</router-link>
        <router-link :to="{name: 'settings'}" active-class="active" class="ui grey basic button" exact >Wallet settings</router-link>
      </div>
    </div>
  </div>

        <div class="ui large fluid  pointing vertical menu">

            <router-link :to="{name: 'walletHome'}" class="item" active-class="active" exact>
                
                Transactions
            </router-link>

            <router-link :to="{name: 'tokens'}" class="item" active-class="active" exact>
                
                Tokens
            </router-link>

            <router-link :to="{name: 'votes'}" class="item" active-class="active" exact>
                
                Votes
            </router-link>
            <router-link :to="{name: 'freezelist'}" class="item" active-class="active" exact>
                
                Freeze history
            </router-link>

        </div>

    </div>
</template>
<script>
  import { mapGetters } from 'vuex'
 
  export default {
    name: 'WalletMenu',
    mounted () {


    },
    computed:{
        url(){
            if (this.account && this.account.witness){
                return this.account.witness.url
            }
        },
        ...mapGetters([
        'account',
        'wallet'
        ])
    }
  }
</script>
<style>

</style>



