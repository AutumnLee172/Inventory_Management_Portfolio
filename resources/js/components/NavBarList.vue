<template>
    <ul :class="{'menu-list':!isSubmenuList}">
      <nav-bar-items v-for="(item,index) in menu"
        @menu-click="menuClick"
        :item="item"
        :key="index"/>
    </ul>
  </template>
  
  <script>
  import NavBarItems from './NavBarItems'
  
  export default {
    name: 'NavBarList',
    components: {
        NavBarItems
    },
    props: {
      isSubmenuList: {
        type: Boolean,
        default: false
      },
      menu: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      menuClick (item) {
        this.$emit('menu-click', item)
      }
    }
  }
  </script>
  