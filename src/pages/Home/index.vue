<template>
<div>
  <section class="main-head">
        <div class="main-content">
         <div class="logo-head">
            <div><img src="../../assets/logo1.png" alt="无"></div>
            <div class="logo-right"><router-link to="/home" class="dlt_">全网比价，省时省钱</router-link></div>
        </div>
        <div class="search-head">
            <div class="search-head-secondline">
                <div><input type="text" name="search" class="search" v-model="keyword"></div>
                 <div><button @click="employ(keyword)" class="search-button">搜索</button></div>
            </div>
        </div>
        </div>
  </section>
  <!-- 中间栏 -->
  <Navigation/>
  <div class="main-goods">
    <div class="main-goods-leftandright">
      <!-- 左侧栏 -->
      <Nav/>
      <!-- 右侧栏 -->
      <Content/>
    </div>
  </div>
</div>
</template>

<script>
import Nav from '@/components/Nav'
import Navigation from '@/components/Navigation'
import Content from '@/components/Content'
import { eventBus } from '../../main'
export default {
  data(){
    return {
      name:'wo',
      keyword:'',
      lists:[]
      }
  },
  methods:{
    employ(title){
      this.$router.push({
        path:'/search',
        query:{title:title}
      })
    },
    },
  components:{
    Nav,
    Navigation,
    Content,
  },
  mounted:function(){
      let _this=this;
      this.axios({
                method: 'post',     
                url: "http://localhost:8080/bbj/user/getInformation",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'     
                },              
            }).then (function (response) {
                console.log(response.data);
                _this.name=response.data;
                // console.log('我是'+_this.name)
                eventBus.$emit("sisterSaid",_this.name);
            }).catch (function (error) {
                console.log(error.data);
                _this.message = error.data;
      });
  },
}
</script>

<style>
.main-head{width: 100%;height: 100px;}
.main-content{margin-right: auto;margin-left: auto;width: 1200px; height: 100px; display: flex;}
.logo-head{width: 340px;height: 100px;display: flex;}
.logo-right{font-size: 17px;font-weight: 200;height: 100px;line-height: 100px;}
.search-head{margin-top: 30px; width: 626px;height: 100px;display: flex;flex-direction: column;}
.search-head .search-head-secondline{width: 100%;height: 40px; display: flex;}
.search-head .search-head-secondline .search{margin-left: 15px;height: 40px;width: 500px;border: solid 1px rgb(35, 97, 168);  }
.search-head .search-head-secondline .search-button{font-size: 17px;line-height: 30px;height: 40px;width: 100px;border: none;background: rgb(2, 116, 151);color: floralwhite;}
.QR-code{width: 240px;height: 100px;}
.main-goods{background-color: rgba(47, 196, 151, 0.185);width: 100%;}
.main-goods-leftandright{display:flex; margin-left: auto;margin-right: auto;width: 1200px;justify-content: space-between;}
</style>