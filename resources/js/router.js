import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('./views/Products.vue')
    },
    {
      path: '/customers',
      name: 'customers',
      component: () => import('./views/Customers.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: () => import('./views/Invoices/Invoices.vue')
    },
    {
      path: '/invoices/new',
      name: 'invoices.new',
      component: () => import('./views/Invoices/Invoice_Form.vue')
    },
    {
      path: '/Sales',
      name: 'sales',
      component: () => import('./views/Sales/Sales.vue')
    },
    {
      path: '/Sales/new',
      name: 'sales.new',
      component: () => import('./views/Sales/Sale_Form.vue')
    },
    {
      path: '/Sales/edit/:id',
      name: 'sales.edit',
      component: () => import('./views/Sales/Sale_Form.vue'),
      props: true
    },
    {
      path: '/Cash',
      name: 'cash',
      component: () => import('./views/Cash/Cash.vue')
    },
    {
      path: '/Cash/new',
      name: 'cash.new',
      component: () => import('./views/Cash/Cash_Form.vue')
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
