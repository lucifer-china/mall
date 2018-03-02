<template>
  <section class="container">
    <!--收货地址-->
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">收货信息</h3>
      </div>
      <div class="panel-body row">
        <section class="col-sm-3" v-for="item,index in userinfo">
          <div class="address-li" :class="{on:index == defaultIndex}" @click="chooseAdrs(index)">
            <P>{{item.name}}</P>
            <p class="text-gray">{{item.phone}}</p>
            <p class="text-gray">
              <span>{{item.province}}</span>&nbsp;&nbsp;
              <span>{{item.city}}</span>&nbsp;&nbsp;
              <span>{{item.county}}</span>
            </p>
            <p class="text-gray">{{item.add}}</p>
          </div>
        </section>
        <section class="col-sm-3" @click="adadress()">
          <div class="add-address text-center">
            <p class="mt30">+</p>
            <p>添加新地址</p>
          </div>
        </section>
      </div>
    </div>
    <!--发票信息-->
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">发票信息</h3>
      </div>
      <div class="panel-body">
        <P class="mt10">发票类型：<span>电子发票</span></P>
        <form class="form-inline mb10">
          <div class="form-group ticks-form">
            <span class="mr10">
              发票抬头：
              <label class="radio-inline" @click="changetikits()">
                <b class="de-check" :class="{on:tikits.personal}"></b> 个人
              </label>
              <label class="radio-inline" @click="changetikits()">
                <b class="de-check" :class="{on:!tikits.personal}"></b> 公司
              </label>
            </span>
            <input v-model="tikits.name" v-if="!tikits.personal" type="text" class="form-control" id="exampleInputName2" placeholder="填写公司发票抬头">
          </div>
        </form>
        <P>发票内容：<span>购买商品明细</span></P>
      </div>
    </div>
    <!--购物详单-->
    <div class="panel panel-default">
      <div class="panel-heading">
        <h1 class="panel-title">购物清单</h1>
      </div>
      <div class="panel-body">
        <div class="row panel-tit">
          <span class="col-sm-8">商品信息</span>
          <span class="col-sm-1 text-center">单价</span>
          <span class="col-sm-2 text-center">数量</span>
          <span class="col-sm-1 text-center">小计</span>
        </div>
        <div class="row ">
          <ul class="car-product">
            <li v-for="item,index in yourChoose">
              <div class="col-sm-8">
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
                {{item.count}}
              </span>
              <span class="col-sm-1 ver-mid text-center">￥{{item.count*item.price}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="panel-footer clearfix">
        <div class="pull-right">
          <span class="mr10">应付金额：<span class="text-danger">￥{{allcheckedprice}}</span></span>
          <!--<button type="button" class="btn btn-primary">提交订单</button>-->
          <router-link type="button" class="btn btn-primary" to="/payment">提交订单</router-link>
        </div>
      </div>
    </div>
    <!--增加收货地址弹窗-->
    <adAdress class="modal fade" tabindex="-1" role="dialog" id="addAdr"></adAdress>
  </section>
</template>

<script>
  import $ from 'jquery'
  import addAdress from './../components/addAdress.vue'
  export default {
    data () {
      return {
        defaultIndex: 0,
        tikits: {
          personal: false,
          name: 'GTA'
        }
      }
    },
    created () {
      this.$store.state.userInfo.forEach((item, index) => {
        if (item.detault) {
          this.defaultIndex = index
        }
        return false
      })
    },
    computed: {
      // 取到购物清单已选中的商品
      yourChoose () {
        return this.$store.getters.checkedGoods
      },
      allcheckedprice () {
        return this.$store.getters.allcheckedPrice
      },
      // 用户地址信息数组
      userinfo () {
        return this.$store.state.userInfo
      }
    },
    methods: {
      // 选择收货地址
      chooseAdrs (index) {
        this.defaultIndex = index
      },
      // 增加收货地址弹窗
      adadress () {
        $('#addAdr').modal()
      },
      // 点击改变发票类型
      changetikits () {
        this.tikits.personal = !this.tikits.personal
      }
    },
    components: {
      // 增加收货地址弹窗组件
      adAdress: addAdress
    }
  }
</script>

<style>
  .ticks-form{height:34px;line-height: 34px;vertical-align: middle}
</style>
