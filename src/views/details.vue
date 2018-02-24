<template>
  <section class="container">
    <ol class="breadcrumb">
      <li><a href="#"><span class="glyphicon glyphicon-home"></span> 主页</a></li>
      <li class="active">商品詳情頁</li>
    </ol>
    <div class="show-detail">
      <div class="show-img">
        <div class="left-box pull-left">
          <div class="thumble">
            <ul class="small-list">
              <li @click="changeCur(index)" :class="{'cur':index == imgCur}"  v-for="img,index in productId.ali_images">
                <img :src="img+'?x-oss-process=image/resize,w_54/quality,Q_90/format,webp'">
              </li>
            </ul>
          </div>
          <div class="big-list">
            <dl>
              <dd :class="{'on':index == imgCur}"  v-for="img,index in productId.ali_images">
                <img :src="img+'?x-oss-process=image/resize,w_440/quality,Q_90/format,webp'">
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="descripe-box">
        <div class="title-box">
          <div class="decrip-title">
            <h3>{{productId.title}}</h3>
            <p>{{productId.sub_title}}</p>
          </div>
          <span class="price-tag">￥{{productId.price}}</span>
        </div>
        <div class="your-choose">
          <label>颜色</label>
          <ul class="choose-color">
            <li  v-for="color,index in productId.sku_list" :class="{'cur':color.id==$route.query.productId}">
              <router-link :to="{name:'details',query:{productId:color.id}}" :title="color.color">
                <img :src="'http://img01.smartisanos.cn/'+color.image+'20X20.jpg'">
              </router-link>
            </li>
          </ul>
        </div>
        <div class="your-choose">
          <label>数量</label>
          <span class="num-btn">-</span>
          <span>1</span>
          <span class="num-btn">+</span>
        </div>
        <div class="btn-wrap">
          <button class="btn btn-primary">加入购物车</button>
          <button class="btn btn-default">现在购买</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import itemsData from './../lib/newItemsData'
export default {
  data () {
    return {
      itemsData,
      proId: this.$route.query.productId,
      imgCur: 0
    }
  },
  // 监控颜色的变化，重新赋值
  watch: {
    '$route.query.productId' () {
      this.proId = this.$route.query.productId
      this.imgCur = 0
    }
  },
  computed: {
    // 接受列表页传过来的参数
    productId () {
      let id = this.itemsData.filter((item) => {
        return Number(item.sku_id) === Number(this.proId)
      })[0]
      return id
    }
  },
  methods: {
    // 点击切换选中的图片
    changeCur (index) {
      this.imgCur = index
    }
  }
}
</script>

<style>
  .show-detail{border:1px solid #DEDADA;background:white;padding:50px;display: table;width:100%;}
  .show-img,.big-list,.show-img{display:table-cell;}
  .thumble{display:table-cell;vertical-align:middle}
  .left-box{width:540px;}
  .descripe-box{display: table-cell;width:450px;vertical-align: middle;}
  .small-list{display: block;}
  .small-list li{width:80px;height:80px;border:1px solid #DEDADA;margin-top:10px;border-radius: 5px;cursor:pointer}
  .small-list li.cur{border:3px solid #DEDADA;}
  .small-list li img{width:50px;height:50px;display:block;margin:15px auto;}
  .big-list dl{display: block;position:relative;width:440px;height:440px;}
  .big-list dl dd{position: absolute;top:0px;left:0px;opacity:0;z-index:1;}
  .big-list dl dd.on{opacity:1;z-index:2;}
  .title-box{position: relative;border-bottom:1px solid #dedada;}
  .decrip-title{width:370px;}
  .decrip-title p{color:#999999;}
  .price-tag{position:absolute;right: 0px;bottom:0px;font-size:20px;color:red;}
  .your-choose{height:30px;margin: 20px 0 0px;}
  .your-choose label{color:#999999;font-size:16px;font-family: "Microsoft Yahei";font-family: normal;line-height: 30px;margin:0 20px 0 0;}
  .choose-color{display: inline-block;}
  .choose-color li{display: inline-block;vertical-align: middle;border:3px solid #EBEBEB;width:30px;height:30px;border-radius:50%;margin:0px 5px;padding:2px;overflow: hidden;cursor: pointer;}
  .choose-color li.cur{border-color:#525252;}
  .choose-color li img{display:block;border-radius:50%;}
  .num-btn{display: inline-block;vert-align: middle;width:30px;height:30px;line-height:28px;text-align:center;border:1px solid #DEDADA;border-radius: 50%;font-size:20px;color:#999999;box-shadow: 0 0 4px 0px #DEDADA;margin:0 5px;cursor: pointer }
  .btn-wrap{border-top:1px solid #dedada;margin-top:25px;padding-top:15px;}
  .btn-wrap button{margin:0 10px 0 0;}
</style>
