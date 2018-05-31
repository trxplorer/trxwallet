<template>
  <div>

        <h1 class="header">TRXWallet</h1>
        <router-link :to="{name: 'new'}" class="ui large right floated blue button" >Create a new wallet</router-link>
        <div class="ui centered grid">

            <div class="row">
                <div class="ui link cards">
                    <a  class="card" v-for="(wallet,index) in wallets" :key="index" @click="setWallet(wallet)">
                        <div class="image">
                        
                        </div>
                        <div class="content">
                        <div class="header">{{wallet.label}}</div>
                        <div class="meta">
                            <a>{{wallet.address}}</a>
                        </div>
                        <div class="description">
                            {{wallet.description}}
                        </div>
                        </div>
                        <div class="extra content">
                        <span class="right floated">
                            <i class="ui icon trash" @click.stop="removeWallet(wallet)"></i>
                        </span>

                        </div>
                    </a>
                </div>
            </div>
            <div class="row">
                
            </div>
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import WalletService from '../service/WalletService'
  import { FETCH_WALLETS} from '../store/action.type'
  import {LOGIN} from '../store/action.type'

  export default {
    name: 'WalletList',
    mounted () {
        this.$store.dispatch(FETCH_WALLETS)
    },
    methods:{
        setWallet (wallet) {
            
            this.$store.dispatch(LOGIN,wallet)
        },
        removeWallet(wallet){
            //TODO move to wallet.module
            this.$swal({
                title:`Remove wallet ${wallet.label} ?`,
                html:'Are you sure you want to remove this wallet ?<br> Enter wallet password to confirm',
                input: 'password',
                showCancelButton: true,
            }).then((result)=>{
                if ("dismiss" in result){
                    return
                }
                let pkey = WalletService.getPkey(wallet.address,result.value)
                if (pkey ){

                    if (WalletService.removeWalletByAddress(wallet.address)){

                        this.$notify({
                            type: 'success',
                            group:'notif',
                            title: 'Wallet successfully removed',
                            duration: 2000
                        });
                        
                        this.$store.dispatch(FETCH_WALLETS)

                    }else{
                        this.$notify({
                            type:'error',
                            group:'notif',
                            title: 'Couldn\'t remove wallet ...',
                            duration: 2000
                        });
                    }


                }else{
                    this.$notify({
                        type:'error',
                        group:'notif',
                        title: 'Invalid password, couldn\'t remove wallet',
                        duration: 2000
                    });
                }
            })
        }
    },
    computed: {
        ...mapGetters([
        'wallets',
      ])
    }
  }
</script>

<style>
body{
   background-color:  #f5f5f5;
   font-family: 'Exo 2';
}

</style>

