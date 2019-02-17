<template>
  <div id="app">
    <Header/>
    <keep-alive>
      <router-view class="page"/>
    </keep-alive>
    <Footer ref="footer"/>
  </div>
</template>
<script>
import Vue from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
  created(){
    //前端处理404重定向
    const key = 'cache404'
    const cache404 = localStorage.getItem(key)
    if(cache404){
      localStorage.removeItem(key)
      this.$router.replace(cache404.split(location.host+'/')[1])
    }

    window.Bus = new Vue()
    Bus.$on('relocateFooter', this.relocateFooter)
    window.onresize = ()=>{
      Bus.$emit('relocateFooter')
    }
  },
  methods:{
    relocateFooter(){
      this.$refs.footer.relocate()
    }
  }
}
</script>

<style lang="less">
html{
  height: 100%;
}
body{
  margin: 0;
  min-height: 100%;
}
a {
  text-decoration: none;
}
ul{
  margin: 0;
  padding: 0;
  list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.page{
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 1020px;
}
</style>
