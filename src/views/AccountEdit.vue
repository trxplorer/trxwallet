<template>
  <div>
    <h2 class="ui dividing header">Edit account</h2>
        <div class="ui info message">
          <div class="header">
            Edit Tron account info
          </div>
          <ul class="list">
            <li v-show="canEditName">You don't have an account name yet (you can edit your account name only once, choose it carefully)</li>
            <li v-show="canEditUrl">You can edit your representative url as many time as you want</li>
          </ul>
        </div>
      <div class="ui raised segment" >
        <form class="ui big form" >
          <div class="field">
            <label>Account name</label>
            <input v-model="name" type="text" :disabled="!canEditName">
            <small>Your account name can be edited only once</small><br>
            <small v-show="isInvalidName" style="color:red">Account name must contain at least 8 characters</small>
            <br>
          </div>
          <a class="ui green button right floated" :class="{'disabled':!canEditName||isInvalidName}" @click="changeAccountName" >Update account name</a>
          <br><br>
        </form>
      </div>
      <div class="ui raised segment" v-if="canEditUrl">
        <form class="ui big form" >
          <div class="field">
            <label>Representative URL</label>
            <input v-model="url" type="url" >
            <small>Use a url to describe why users should vote for you</small><br>
          </div>
          <a class="ui green button right floated" :class="{'disabled':!canEditUrl}" @click="changeUrl" >Update url</a>
          <br><br>
        </form>
      </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import TopMenuComponent from '../components/TopMenu'
  import TopInfoComponent from '../components/TopInfo'
  import {REQUEST_SIGNATURE} from '../store/action.type'

  export default {
    name: 'home',
    components:{
      TopMenuComponent,
      TopInfoComponent
    },
    props: ['showTopInfo','showTopMenu'],
    data () {
      return{
        url:'',
        name:''
      }
    },
    mounted () {
      if (this.account && this.account.witness){
        this.url = this.account.witness.url
      }
      if (this.account){
        this.name = this.account.name
      }
    },
    methods:{
      changeUrl(){
        this.$trxwallet.requestSignature('updateWitness',{issuer:'TRXWallet',url:this.url})
      },
      changeAccountName(){
        this.$trxwallet.requestSignature('updateAccount',{issuer:'TRXWallet',name:this.name})
      }
    },
    computed: {
      isInvalidName(){
        return this.name.length<8
      },
      canEditName(){
        return !(this.account && this.account.name && this.account.name.length>0)
      },
      canEditUrl(){
        return (this.account && this.account.witness)
      },
      ...mapGetters([
        'account'
      ])
    },
    watch:{
      ['account.name'](val){
        this.name = val
      },
      ['account.witness.url'](val){
        this.url = val
      },
    }
  }
</script>

