<template>
    <div id="layout-body" class="home">
        <router-view></router-view>
        <back-top></back-top>
    </div>
</template>

<script>
    import backTop from '@/components/back-top'
    export default {
        name: "layout-body",
        data(){
          return{
              minHeight: 600
          }
        },
        components: { backTop }
    }
</script>

<style scoped>
#layout-body{
    /* header = 80px */
    min-height: -moz-calc(100vh - 80px);
    min-height: -webkit-calc(100vh - 80px);
    min-height: calc(100vh - 80px);
}
.home{
  width: 100%;
  height: 100%;
  background: whitesmoke center center no-repeat;
  background-size: 100% 100%;
}
</style>
