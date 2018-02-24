<template>
  <div class="container">
    <ol class="breadcrumb">
      <li><a href="#"><span class="glyphicon glyphicon-home"></span> 主页</a></li>
      <li class="active">商品列表页</li>
    </ol>
    <ul class="nav nav-pills">
      <li role="presentation" class="active"><a href="#">综合排序</a></li>
      <li role="presentation"><a href="#">按价格</a></li>
      <li role="presentation"><a href="#">按销量</a></li>
    </ul>
    <div class="row mt30">
      <product-li  v-for="itemcm,index in products" :key="index"   class="col-sm-6 col-md-3"  :item="itemcm"></product-li>
    </div>
    <popmaxprice class="modal fade" tabindex="-1" role="dialog" id="maxPrice"></popmaxprice>
  </div>
</template>

<script>
    import productLi from './../components/product.vue'
    import product from './../lib/newGoodsData'
    import popMaxprice from './../components/popMaxPrice.vue'
    export default {
      data () {
        return {
          products: product
        }
      },
      components: {
        productLi: productLi,
        popmaxprice: popMaxprice
      }
    }
</script>

