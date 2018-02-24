import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    // 购物车列表数组
    carPanel: [],
    // 动画状态设置
    ball: {
      show: false,
      el: null,
      img: ''
    }
  },
  getters: {
    // 计算总件数
    totalCount (state) {
      let count = 0
      state.carPanel.forEach((goods) => {
        count += goods.count
      })
      return count
    },
    // 计算总价
    totalPrice (state) {
      let price = 0
      state.carPanel.forEach((goods) => {
        price += goods.count * goods.price
      })
      return price
    }
  },
  mutations: {
    // 添加到购物车
    addCarData (state, data) {
      let key = true
      state.carPanel.forEach((goods) => {
        if (goods.sku_id === data.sku_id) {
          goods.count++
          key = false
          // 超过最大件数出现弹窗提示
          if (goods.count > 5) {
            goods.count--
            $('#maxPrice').modal()
            return false
          }
          // 添加到购物车动画效果
          state.ball.show = true
          state.ball.img = data.ali_image
          // 获取当前点击的按钮
          state.ball.el = event.path[0]
        }
      })
      if (key) {
        let goodsData = data
        Vue.set(goodsData, 'count', 1)
        state.carPanel.push(goodsData)
        // 添加到购物车动画效果
        state.ball.show = true
        state.ball.img = data.ali_image
        // 获取当前点击的按钮
        state.ball.el = event.path[0]
      }
    },
    // 购物车删除数据
    delCarData (state, id) {
      state.carPanel.forEach((goods, index) => {
        if (goods.sku_id === id) {
          state.carPanel.splice(index, 1)
          return false
        }
      })
    }
  }
})

export default store
