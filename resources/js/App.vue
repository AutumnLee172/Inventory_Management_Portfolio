<template>
  <div id="app">

    <header class="app-header">
      
    </header>
    <nav-bar></nav-bar>
    <main class="main-content position-relative border-radius-lg ps">
      <router-view />
    </main>
    
  </div>
</template>

<script>

import NavBar from './components/NavBar'

export default {
  name: 'home',
  components: {
    NavBar,
  },
  computed: {
    menu() {
      return [
        'General',
        [
          {
            to: '/',
            icon: 'desktop-mac',
            label: 'Dashboard'
          }
        ],
        'Resource',
        [
          {
            to: '/sites/index',
            label: 'Sites',
            icon: 'account-multiple',
          },
          {
            to: '/statementhistory/index',
            label: 'Statement History',
            icon: 'table',
          }, {
            to: '/pageacceesslog/index',
            label: 'Log History',
            icon: 'table'
          },
        ],
        'Users',
        [
          // {
          //   to: '/tables',
          //   label: 'Tables',
          //   icon: 'table'
          // },
          // {
          //   to: '/forms',
          //   label: 'Forms',
          //   icon: 'square-edit-outline'
          // },
          {
            to: '/profile',
            label: 'Profile',
            icon: 'account-circle'
          },
          // {
          //   label: 'Submenus',
          //   subLabel: 'Submenus Example',
          //   icon: 'view-list',
          //   menu: [
          //     {
          //       href: '#void',
          //       label: 'Sub-item One'
          //     },
          //     {
          //       href: '#void',
          //       label: 'Sub-item Two'
          //     }
          //   ]
          // }
        ],
        // 'About',
        // [
        //   {
        //     href: 'https://admin-one-laravel.justboil.me',
        //     label: 'Premium Demo',
        //     icon: 'credit-card'
        //   },
        //   {
        //     href: 'https://justboil.me/bulma-admin-template/one',
        //     label: 'About',
        //     icon: 'help-circle'
        //   }
        // ]
      ]
    }
  },
  created() {
    axios
      .get('/user')
      .then(r => {
        this.$store.commit('user', r.data.data)
      })
      .catch(err => {
        this.$bvToast.toast('Error fetching data', {
          title: `Error`,
          variant: 'danger'
        })
      })
  }
}
</script>
