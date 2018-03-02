<template>
<section class="container">
  <div class="panel panel-default">
    <div class="panel-heading">
      <h1 class="panel-title">购物清单</h1>
    </div>
    <div class="panel-body">
      <div class="row panel-tit">
        <span class="col-sm-7">商品信息</span>
        <span class="col-sm-1 text-center">单价</span>
        <span class="col-sm-2 text-center">数量</span>
        <span class="col-sm-1 text-center">小计</span>
        <span class="col-sm-1 text-center">操作</span>
      </div>
      <div class="row text-center" v-if="count<=0">
        <h2 class="text-center">您还没有选购商品</h2>
        <router-link to="/" class="btn btn-default" tag="button">现在去选购</router-link>
      </div>
      <div class="row ">
        <ul class="car-product">
          <li v-for="item,index in carlist">
            <span class="col-sm-1 text-center ver-mid"><b class="de-check" :class="{on:item.checked}" @click="doChecked(item.sku_id)"></b></span>
            <div class="col-sm-6">
              <div class="media">
                <div class="media-left media-middle">
                  <a href="#">
                    <img class="media-object" :src="item.ali_image+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'" alt="">
                  </a>
                </div>
                <div class="media-body">
                  <h4 class="media-heading">{{item.title}}</h4>
                  <span class="txt-grey">{{item.spec_json.show_name}}</span>
                </div>
              </div>
            </div>
            <span class="col-sm-1 ver-mid text-center">￥{{item.price}}</span>
            <span class="col-sm-2 ver-mid text-center">
              <span class="num-btn" @click="subNum(item.sku_id)">-</span>{{item.count}}<span class="num-btn" @click="plusNum(item.sku_id)">+</span>
            </span>
            <span class="col-sm-1 ver-mid text-center">￥{{item.count*item.price}}</span>
            <span class="col-sm-1 ver-mid text-center"><a class="text-danger" href="#" @click="removeList(item.sku_id)">删除</a></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="panel-footer clearfix" v-if="count>0">
      <div class="pull-left">
        <b class="de-check" :class="{on:allcheck}" @click="doCheckedall(allcheck)"></b><span>全选</span>
        <a href="#" class="text-danger remove-all" @click="delChecked()">删除选中的商品</a>
      </div>
      <div class="pull-right">
        <span>已选择<a class="text-danger">{{allcheckedcount}}</a>件商品</span>
        <span>共计<a class="text-danger">￥{{allcheckedprice}}元</a></span>&nbsp;&nbsp;&nbsp;
        <router-link type="button" class="btn btn-primary btn-sm" to="balance">现在结算</router-link>
      </div>
    </div>
  </div>
</section>
</template>

<script>
export default {
  computed: {
    carlist () {
      return this.$store.state.carPanel
    },
    count () {
      return this.$store.getters.totalCount
    },
    // 全选状态
    allcheck () {
      return this.$store.getters.checkAll
    },
    // 已选总件数和总价格
    allcheckedcount () {
      return this.$store.getters.allcheckedNum
    },
    allcheckedprice () {
      return this.$store.getters.allcheckedPrice
    }
  },
  methods: {
    // 购物车删除按钮功能
    removeList (id) {
      this.$store.commit('delCarData', id)
    },
    // 添加商品数量
    plusNum (id) {
      this.$store.commit('addproNum', id)
    },
    // 减少商品数量
    subNum (id) {
      this.$store.commit('subproNum', id)
    },
    // 选中功能
    doChecked (id) {
      this.$store.commit('doCheck', id)
    },
    // 全选功能
    doCheckedall (allchecked) {
      this.$store.commit('doCheckALL', allchecked)
    },
    // 删除选中的商品
    delChecked () {
      this.$store.commit('delchecked')
    }
  }
}
</script>

<style>
</style>
