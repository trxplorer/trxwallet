<template>
  <div>
    <div class="container">
        
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
import router from './router'
import store from './store'
import VueClipboard from 'vue-clipboard2'
import Notifications from 'vue-notification'
import VueSweetalert2 from 'vue-sweetalert2'
import Router from 'vue-router'
import { FETCH_ACCOUNT,CHECK_AUTH} from './store/action.type'  
import 'semantic-ui/dist/semantic.css'
import { TRX_SUN } from './Constants';

Vue.use(VueClipboard)
Vue.use(Notifications)
Vue.use(VueSweetalert2)
Vue.use(Router)

let sunFilter = Vue.filter('sun', function (value) {
  return value/TRX_SUN
})

router.beforeEach(
  (to, from, next) => {
    return Promise
      .all([store.dispatch(CHECK_AUTH)])
      .then(next)
  }
)

export default {
  name: 'MainApp',
  router,
  store,
  filters: {sunFilter},
  mounted(){
      setInterval(()=>{
        if (this.wallet && this.wallet.address){
          this.$store.dispatch(FETCH_ACCOUNT,{address:this.wallet.address,silent:true})
        }
      },5000)
  },
  computed:{
      ...mapGetters([
        'wallet'
      ])
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Exo+2:400,700);
h1{
    font-family: 'Exo 2';
}
</style>
