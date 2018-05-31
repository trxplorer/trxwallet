<template>
<div>
<div  >
  <div class="ui container ">

    <div class="ui grid">

      <div class="column right floated">

          <div  style="margin-top:30px;float:right">
            <div class="ui large red labeled button" tabindex="0">
              <div class="ui red large button">
                TRX Balance
              </div>
              <a class="ui basic red left pointing label">
                {{balance}}
              </a>
            </div>
            <div class="ui large labeled button" tabindex="0">
              <div class="ui yellow large button">
                Power
              </div>
              <a class="ui yellow basic left pointing label">
                {{power}}
              </a>
            </div>
            <div class="ui large labeled button" tabindex="0">
              <div class="ui green large button">
                Bandwidth
              </div>
              <a class="ui green basic left pointing label">
                {{bandwidth}}
              </a>
            </div>

          </div>
          <div>
      

    </div>


      </div>
    </div>

    

  </div>

</div>

</div>
</template>
<script>
import { mapGetters } from 'vuex'
import {TRX_SUN} from '../Constants'

  export default {
    name: 'TopMenu',
    mounted(){

    },
    computed: {
        balance(){
          if (!this.account.balance){
            return 0
          }
          return (this.account.balance / TRX_SUN).toLocaleString()
        },
        bandwidth(){
          if (!this.account.bandwidth){
            return 0
          }
          return this.account.bandwidth.toLocaleString()
        },
        power(){
          if (!this.account.frozenBalance){
            return 0
          }
          return (this.account.frozenBalance / TRX_SUN).toLocaleString()
        },
        ...mapGetters([
        'wallet',
        'account'
      ])
    }
  }
</script>
<style>
.info{
  
  background-color: #655c5c;
}
</style>



