<template>
  <li class="car-li">
    <a href="#" class="">
      <span class="glyphicon glyphicon-shopping-cart"></span>
      <span class="pay-car">{{totleCount}}</span>
    </a>
    <section class="car-wrap">
      <div class="nothing" v-show="!payCarData.length">屌丝的购物车都是空的</div>
      <div class="product-list">
        <div class="media" v-for="item,index in payCarData">
          <div class="media-left media-bottom">
            <a href="#">
              <img class="media-object" :src="item.ali_image+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'"  alt="...">
            </a>
          </div>
          <div class="media-body  media-bottom">
            <h5 class="media-heading">{{item.title}}</h5>
            <p>{{item.spec_json.show_name}}</p>
            <p>￥<span>{{item.price}}</span> x <span>{{item.count}}</span></p>
          </div>
          <a class="dele-btn" @click="removeList(item.sku_id)"><span class="glyphicon glyphicon-remove-circle"></span></a>
        </div>
      </div>
      <div class="goto-pay">
        <section class="clearfix">
          <div class="pull-left">
            <p class="txt-grey">共{{totleCount}}件商品</p>
            <p>合计：<span class="txt-red">￥ {{totlePrice}} 元</span></p>
          </div>
          <button type="button" class="btn btn-primary pull-right">去结算</button>
        </section>
      </div>
    </section>
    <transition
      name="ball"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-bind:css="true"
    >
      <div class="animate-ball-wap" v-show="ball.show">
        <img class="ball-animate">
      </div>
    </transition>
  </li>
</template>

<script>
 export default {
   computed: {
     payCarData () {
       return this.$store.state.carPanel
     },
     totleCount () {
       return this.$store.getters.totalCount
     },
     totlePrice () {
       return this.$store.getters.totalPrice
     },
     ball () {
       return this.$store.state.ball
     }
   },
   methods: {
     // 购物车删除按钮功能
     removeList (id) {
       this.$store.commit('delCarData', id)
     },
     // 购物车动画效果
     beforeEnter (el) {
       console.log(el)
       let rect = this.ball.el.getBoundingClientRect()
       let rectEl = document.getElementsByClassName('pay-car')[0].getBoundingClientRect()
       let balls = document.getElementsByClassName('ball-animate')[0]
       let x = (rect.left + rect.width / 2) - (rectEl.left + 16)
       let y = (rect.top + rect.height / 2) - (rectEl.top + 16)
       el.style.transform = 'translate3d(0,' + y + 'px,0)'
       balls.style.transform = 'translate3d( ' + x + 'px,0,0)'
       balls.src = this.ball.img
     },
     enter (el) {
       let aa = el.offsetHeight
       el.aa = aa
       el.style.transform = 'translate3d(0,0,0)'
       document.getElementsByClassName('ball-animate')[0].style.transform = 'translate3d(0,0,0)'
     },
     afterEnter () {
       this.ball.show = false
     }
   }
 }
</script>

<style>
  .animate-ball-wap{
    position: absolute;
    left: 0;
    top: -5px;
    padding: 0;
    width: 32px;
    height: 32px;
    pointer-events: none;
    z-index: 240;
    transform: translate3d(0,0,0);
  }
  .animate-ball-wap .ball-animate{
    pointer-events: none;
    width: 32px;
    height: 32px;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 0 1px rgba(0,0,0,.05), 0 3px 8px rgba(0,0,0,.1);
    background-size: contain;
    transform: translate3d(0,0,0);
  }
  .ball-enter-active{
    transition: .5s cubic-bezier(.17,.67,.53,1.11);
  }
  .ball-enter-active .ball-animate{
    transition: .5s cubic-bezier(0,0,1,1);
  }
</style>
