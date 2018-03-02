import Vue from 'vue'
import Router from 'vue-router'
import shop from '@/views/shop.vue'
import details from '@/views/details.vue'
import payCar from '@/views/carDetail.vue'
import balance from '@/views/balance.vue'
import payment from '@/views/payment.vue'
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
    },
    {
      path: '/paycar',
      name: 'payCar',
      component: payCar
    },
    {
      path: '/balance',
      name: 'balance',
      component: balance
    },
    {
      path: '/payment',
      name: 'payment',
      component: payment
    }
  ]
})
