<template>
  <div>
    <nav class="navbar navbar-inverse">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Lucifer</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li><router-link href="#" :to="{name:'prolist'}">商品列表 <span class="sr-only">(current)</span></router-link></li>

          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <a href="#"><span class="glyphicon glyphicon-user"></span></a>
            </li>
            <!--购物车组件-->
            <pay-car></pay-car>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import payCar from './payCar.vue'
  export default {
    components: {
      payCar
    }
  }
</script>


