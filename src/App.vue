<template>
  <div id="app">
    <head-nav></head-nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import headNav from '@/components/headnav.vue'
export default {
    name: 'app',
    components: {
      headNav: headNav
    }
}
</script>

