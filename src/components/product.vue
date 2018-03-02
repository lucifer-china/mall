<template>
  <div>
    <div class="thumbnail pruduct-list">
      <img :src="item.sku_info[itemIndex].ali_image">
      <div class="caption">
        <h4>{{item.name}}</h4>
        <p class="description">{{item.name_title}}</p>
        <ul class="color-choose">
          <li v-for="sku,index in item.sku_info">
            <a :class="{'active':index==itemIndex}" href="javascript:;" @click="tableData(index)" :data-index="index" :title="sku.spec_json.show_name">
              <img :src="'http://img01.smartisanos.cn/'+ sku.spec_json.image +'/20X20.jpg'">
            </a>
          </li>
        </ul>
        <p class="txt-red price">￥{{item.price}}元</p>
        <p class="btn-box">
          <button  class="btn btn-primary" role="button" @click="addPayCar(item.sku_info[itemIndex])">加入购物车</button>
          <router-link  class="btn btn-default" role="button" :to="{name:'details',query:{productId:item.sku_info[itemIndex].sku_id}}">查看详情</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          itemIndex: 0
        }
      },
      props: {
        item: {
          type: Object
        }
      },
      methods: {
        // 切换颜色选择方法
        tableData (index) {
          this.itemIndex = index
        },
        // 加入购物车方法
        addPayCar (data) {
          let productData = {
            info: data,
            count: 1
          }
          this.$store.commit('addCarData', productData)
        }
      }
    }
</script>

<style>

</style>
