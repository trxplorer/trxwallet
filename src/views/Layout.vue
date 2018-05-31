<template>
  <div class="home-page">
      <notifications group="notif" position="top center"/>
    <div id="loader" class="ui dimmer" :class="{active:isLoading}">
      <div class="ui text loader" ></div>
    </div> 
      <top-menu-component v-show="showTopMenu"></top-menu-component>
      <top-info-component v-show="showTopInfo"/>

    <div class="ui container">

      <router-view></router-view>

    </div>


 </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import TopMenuComponent from '../components/TopMenu'
  import TopInfoComponent from '../components/TopInfo'


  export default {
    name: 'home',
    components:{
      TopMenuComponent,
      TopInfoComponent
    },
    props: ['showTopInfo','showTopMenu'],
    data () {
      return{
        show: false
      }
    },
    mounted () {

    },
    computed: {
      ...mapGetters([
        'isLoading'
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

