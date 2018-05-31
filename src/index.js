// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import MainApp from './MainApp'
import Plugin from './plugin'

import SignatureAuthotization from './views/SignatureAuthorization'


Vue.use(Plugin)



Vue.config.productionTip = false


Vue.component('my-component', SignatureAuthotization)


const run = (el) => {

/* eslint-disable no-new */
const vue = new Vue({
    el: el,
  
    template: '<MainApp/>',
    components: { MainApp },
    mounted(){
/*  
      this.$trxwallet.onSignatureRequest = (context)=>{
        console.log(context)
        this.$swal({
          showConfirmButton: false,
          html: "<my-component/>"
        })
        
        new Vue({
          el: this.$swal.getContent(),
          store:context.store
        })  
      }
  */
    }
  })  

 return vue
}

export default run;
