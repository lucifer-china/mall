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
    // 存储的用户信息
    userInfo: [
      {
        'name': 'lucifer',
        'phone': '18656002323',
        'areaCode': '010',
        'landLine': '656556',
        'provinceId': '110000',
        'province': '安徽省',
        'cityId': '12112',
        'city': '合肥市',
        'countyId': '1231231',
        'county': '蜀山区',
        'add': '蜀南庭院121212',
        'default': true
      },
      {
        'name': 'Alan',
        'phone': '15123232345',
        'areaCode': '010',
        'landLine': '65653456',
        'provinceId': '110232000',
        'province': '安徽省',
        'cityId': '12112',
        'city': '淮北市',
        'countyId': '1231231',
        'county': '烈山区',
        'add': '蜀南庭院121212',
        'default': false
      }
    ],
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
    },
    // 购物车详情页全选功能
    checkAll (state) {
      let allChecked = true
      state.carPanel.forEach((goods) => {
        if (!goods.checked) {
          allChecked = false
          return false
        }
      })
      return allChecked
    },
    // 计算购物车详情选中的总数
    allcheckedNum (state) {
      let checkNum = 0
      state.carPanel.forEach((goods) => {
        if (goods.checked) {
          checkNum += goods.count
        }
      })
      return checkNum
    },
    // 计算购物车详情选中的总价格
    allcheckedPrice (state) {
      let Price = 0
      state.carPanel.forEach((goods) => {
        if (goods.checked) {
          Price += goods.count * goods.price
        }
      })
      return Price
    },
    // 计算购物车清单中已选中的商品
    checkedGoods (state) {
      let checkedgoods = []
      state.carPanel.forEach((goods) => {
        if (goods.checked) {
          checkedgoods.push(goods)
        }
      })
      return checkedgoods
    }
  },
  mutations: {
    // 添加到购物车
    addCarData (state, data) {
      let key = true
      state.carPanel.forEach((goods) => {
        if (goods.sku_id === data.info.sku_id) {
          goods.count += data.count
          key = false
          // 超过最大件数出现弹窗提示
          if (goods.count > 5) {
            goods.count -= data.count
            $('#maxPrice').modal()
            return false
          }
          // 添加到购物车动画效果
          state.ball.show = true
          state.ball.img = data.info.ali_image
          // 获取当前点击的按钮
          state.ball.el = event.path[0]
        }
      })
      if (key) {
        let goodsData = data.info
        Vue.set(goodsData, 'count', data.count)
        Vue.set(goodsData, 'checked', true)
        state.carPanel.push(goodsData)
        // 添加到购物车动画效果
        state.ball.show = true
        state.ball.img = data.info.ali_image
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
    },
    // 购物车详情页添加商品数量
    addproNum (state, id) {
      state.carPanel.forEach((goods, index) => {
        if (goods.sku_id === id) {
          if (goods.count > 5) return
          goods.count ++
        }
      })
    },
    // 购物车详情页减少商品数量
    subproNum (state, id) {
      state.carPanel.forEach((goods, index) => {
        if (goods.sku_id === id) {
          if (goods.count <= 1) return false
          goods.count --
          return false
        }
      })
    },
    // 商品选中和取消功能
    doCheck (state, id) {
      state.carPanel.forEach((goods, index) => {
        if (goods.sku_id === id) {
          goods.checked = !goods.checked
          return false
        }
      })
    },
    // 商品全选功能
    doCheckALL (state, allChecked) {
      state.carPanel.forEach((goods, index) => {
        goods.checked = !allChecked
      })
    },
    // 删除选中的商品
    delchecked (state) {
      let i = state.carPanel.length
      while (i--) {
        if (state.carPanel[i].checked) {
          state.carPanel.splice(i, 1)
        }
      }
    },
    // 保存用户新增地址
    submitUser (state, data) {
      if (data.default) {
        state.userInfo.forEach((item, index) => {
          item.default = false
        })
      }
      state.userInfo.push(data)
    }
  }
})

export default store
