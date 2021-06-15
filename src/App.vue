<template>
  <div class="quanju">
    <Header/>
    <router-view></router-view>
    <Footer/>
    
  </div>
</template>

<script>
//引入APP外壳组件
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
    data(){
    return{
      name:''
    }
  },
  components:{
    Header,
    Footer
    },
    
}

</script>

<style>
.quanju{overflow-x:hidden}
</style>