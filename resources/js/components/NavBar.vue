<template>
    <aside
        v-show="isAsideVisible"
        class="aside is-placed-left is-expanded">
      <nav-tools :is-main-menu="true">
        <span slot="label">
          <b>Report Admin</b>
        </span>
      </nav-tools>
      <div class="menu is-menu-main">
        <template v-for="(menuGroup, index) in menu" >
          <p class="menu-label" v-if="typeof menuGroup === 'string'" :key="index">{{ menuGroup }}</p>
          <nav-bar-list
              v-else
              :key="index"
              @menu-click="menuClick"
              :menu="menuGroup"/>
        </template>
      </div>
      <div style="margin-top:100px; padding:0 0.75rem;">
        <span style="opecity: 0; transition: .2s; font-size: smaller;"> Nice Day for fishing aint it?</span>
      </div>
    </aside>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  import NavTools from './NavTools'
  import NavBarList from './NavBarList'
  
  export default {
    name: 'NavBar',
    components: { NavTools, NavBarList },
    props: {
      menu: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        
      }
    },
    computed: {
      ...mapState([
        'isAsideVisible'
      ])
    },
    methods: {
      menuClick (item) {
        //
      }
    },
    mounted: function() {
          
      }
  }
  </script>
  