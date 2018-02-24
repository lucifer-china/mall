import Vue from 'vue'
import Router from 'vue-router'
import shop from '@/views/shop.vue'
import details from '@/views/details.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'prolist',
      component: shop
    },
    {
      path: '/details',
      name: 'details',
      component: details
    }
  ]
})
