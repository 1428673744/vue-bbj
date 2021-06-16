<template>
  <div class="main-collect-box">
        <div class="main-collect-content">
            <div class="main-collect-title">我的收藏</div>
            <div class="main-collect">
                <li v-for="(v,i) in lists" :key="i">
                    <router-link :to="{path: 'goods',query:{id:v.id}}"  class="dlt_ black-color main-right-size3">
                        <img :src="v.pictureLink" alt="" class="image-form">
                    </router-link>
                    <div class="collect-and-thumb">
                     <i class="iconfont iconfont-setting1" :class="icon1"  @click="decidecollect(v.id)" :style="collectList.indexOf(v.id)==-1?'color:grey;':'color:rgb(15, 145, 168);'"></i>
                     <div class="likes-number">{{v.likes}}</div>
                    </div>
                    <router-link :to="{path: 'goods',query:{id:v.id}}" class="dlt_ black-color main-right-size4">
                        <span>{{v.title}}</span>
                    </router-link>
                </li>
            </div>

        </div>
  </div>
</template>

<script>
import { eventBus } from '../../main'
export default {
    data(){
        return{
              lists:[
                {id:123,title:'超级小裙子',image:'https://img.alicdn.com/bao/uploaded/i2/138071847/TB2LUnplVXXXXc9XXXXXXXXXXXX_!!138071847.png_200x200q90.jpg_.webp'},
                {id:233,title:'超级小裙子',image:'https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/898090209/O1CN01w4glaa1DPlSo8Tn5q_!!0-item_pic.jpg_230x230.jpg_.webp'},
                {title:'超级小裙子',url:'/'},
                {title:'超级小裙子',url:'/'},
                {title:'超级小裙子',url:'/'},
                {title:'超级小裙子',url:'/'},
                {title:'超级小裙子',url:'/'},
                {title:'超级小裙子',url:'/'},
                {title:'超级小裙子',url:'/'},
            ],
             icon1:'icon-shoucang',
             collectList:[],//未登录用户为空
        }
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
                eventBus.$emit("sisterSaid",response.data.userAccount);
            }).catch (function (error) {
                console.log(error.data);
                _this.message = error.data;
      });
  },
}
</script>
    
<style>
li{list-style: none;}
.main-collect-box{width: 100%;height: 100%; background-color: rgba(40, 247, 130, 0.178);}
.main-collect-content{margin: 0 auto; width: 1000px;border: 1px solid rgba(178, 207, 203, 0.301);}
.main-collect-title{margin: 0 auto;font-size: 40px;color: rgba(17, 184, 170, 0.87);}
.main-collect{margin: 0 auto; width: 1000px; background-color: rgba(6, 109, 112, 0.13);border: 1px solid rgb(179, 179, 179);display: flex;flex-wrap: wrap;justify-content: space-between;}
.main-collect li{width: 240px;height:300px;border: 1px solid rgba(9, 153, 141, 0.329);display: flex;flex-wrap: wrap;justify-content: space-around;}
.main-search-size3{margin-top: 10px; width: 190px;height: 200px;}
.main-search-size3 .image-form{margin-top: 5px; width: 190px;height: 190px;margin-right: auto; margin-left: auto; border-radius: 10px;}
.main-search-size4{margin-top: 10px; width: 190px;height: 20px;}
</style>