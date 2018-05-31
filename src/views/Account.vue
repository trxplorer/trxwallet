<template>
  <div >
    

      <div class="ui grid">
          <div class="five wide column"  v-show="showWalletMenu">
            <wallet-menu-component></wallet-menu-component>
          </div>
          <div :class="{'eleven wide column':showWalletMenu,'sixteen wide column':!showWalletMenu}">
              <div class="ui grid">

                  <div class="sixteen wide column ">

                      <!--WALLET ACTIONS-->
                      <div class="ui basic large buttons right floated" v-show="showWalletActions">
                          <router-link :to="{name: 'send'}" class="ui button" active-class="active" exact>Send</router-link>
                          <router-link  :to="{name: 'freeze'}" class="ui button" active-class="active" exact>Freeze</router-link>
                          <router-link v-show="this.account.frozenExpire" :to="{name: 'unfreeze'}" class="ui button" active-class="active" exact>Unfreeze</router-link>
                          <!--<router-link :to="{name: 'withdraw'}" class="ui button" active-class="active" v-show="account.witness" exact>Widthdraw</router-link>-->
                          <router-link :to="{name: 'applyRep'}" class="ui button" active-class="active" v-show="!account.witness" exact>Apply for representative</router-link>
                      </div>
                      <!--VOTE ACTIONS-->
                      <div class="ui basic large buttons right floated" v-show="showVoteActions">
                          <router-link :to="{name: 'applyRep'}" class="ui button" active-class="active" v-show="!account.witness" exact>Apply for representative</router-link>
                      </div>
                      <!--ICO ACTIONS-->
                      <div class="ui basic large buttons right floated" v-show="showICOActions">
                          <router-link :to="{name: 'applyRep'}" class="ui button" active-class="active" v-show="!account.witness" exact>Create a Token</router-link>
                      </div>
                  </div>

                  <div class="sixteen wide column ">
                      <router-view></router-view>

                  </div>
              </div>


            
            
          </div>
      </div>

    



 </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import WalletMenuComponent from '../components/WalletMenu'
  import { FETCH_ACCOUNT} from '../store/action.type'

  export default {
    name: 'home',
    props:['showWalletMenu','showWalletActions','showVoteActions','showICOActions'],
    components:{
      WalletMenuComponent
    },
    mounted () {


    },
    computed: {
      ...mapGetters([
        'wallet',
        'account'
      ])
    }
  }
</script>
