<template>
    <div class="ui container">
      
 <div id="menu" class="ui massive secondary menu">
 

      
      <router-link :to="{name: 'walletHome'}" class="item" active-class="active" exact>Wallet</router-link>
      <router-link :to="{name: 'vote'}" class="item" active-class="active" exact>Vote</router-link>
      <!--<router-link :to="{name: 'icos'}" class="item" active-class="active" exact>ICOs</router-link>-->


      <div class="item right floated">
            
            <div class="ui floating dropdown blue labeled icon button">
              <i class=" icon"></i>
              <span class="text">{{wallet.label}}</span>
              <div class="menu">
                <div class="ui icon search input">
                  <i class="search icon"></i>
                  <input type="text" placeholder="Search accounts...">
                </div>
                <div class="divider"></div>
                <div class="header">
                  <i class="icon"></i>
                  Other wallets
                </div>
                <div class="scrolling menu">
                  <div class="item" v-for="(wallet,index) in wallets" :key="index">
                    
                    {{wallet.label}}
                  </div>
                </div>
                <div class="divider"></div>
                <div class="header">
                  <router-link :to="{name: 'new'}" class="ui fluid green button" >Create new wallet</router-link>
                </div>
              </div>
            </div>


      </div>

    
  </div>

    </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import WalletService from '../service/WalletService'
  import {LOGIN} from '../store/action.type'
  import $ from "jquery";
  import 'semantic-ui/dist/components/dropdown'
  import 'semantic-ui/dist/components/transition'

  export default {
    name: 'TopMenu',
    data () {
      return {
        wallets:[]
      }
    },
    mounted () {
      
      $('.ui.dropdown').dropdown({
        onChange: (value,text)=>{
          this.$store.dispatch(LOGIN,WalletService.getWalletByLabel(text))
          .catch(()=>{

             $('.ui.dropdown').dropdown('set selected',this.wallet.label)
          })
        }
      });
      this.wallets = WalletService.getWallets()

    },
    watch:{
      ['wallet.label'](val){
        $('.ui.dropdown').dropdown('set selected',val)
      }
    },
    computed: {
        ...mapGetters([
        'wallet'
      ])
    }
  }
</script>
<style>

</style>



