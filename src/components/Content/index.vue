<template>
    <div class="main-right">
        <li v-for="(v,i) in newLists" :key="i">
            <router-link :to="{path: 'goods',query:{goodId:v.id}}"  class="dlt_ black-color main-right-size1">
                <img :src="v.pictureLink" alt="" class="image-form">
            </router-link>
            <div class="collect-and-thumb">
                <router-link :to="{path: 'home'}" class="dlt_" :style="idList.indexOf(v.id)==-1?'color:grey;':'color:rgb(15, 145, 168);'">
                <i class="iconfont iconfont-setting1" :class="icon1"  @click="decidecollect(v.id)" :style="collectList.indexOf(v.id)==-1?'color:grey;':'color:rgb(15, 145, 168);'"></i>
                </router-link>
                <div class="likes-number">{{v.likes}}</div>
            </div>
            <router-link :to="{path: 'goods',query:{goodId:v.id}}" class="dlt_ black-color main-right-size2">
                <span>{{v.title}}</span>
            </router-link>
        </li>
    </div>
</template>

<script>
import { eventBus } from '../../main'
export default {
    data(){
        return {
            icon1:'icon-shoucang',
            collectList:[],//未登录用户为空，用户的收藏列表
            newLists:[],//全部的推荐商品列表
            idList:[],//收藏的商品id列表
            name:''
        }
    },
    methods:{
        addcollect(i){
            console.log(this.lists[i])
            if(i==0){
                console.log("进行收藏");
                this.lists[i].cselect=1
            }else{
                console.log("取消收藏");
                this.lists[i].cselect=0
            }
            console.log(this.lists[i])
        },
        decidecollect(index){
            let arr=[];
            for (let index = 0; index < this.collectList.length; index++) {
                  arr.push(this.collectList[index].id)
            }
            console.log(arr)
            if(this.idList.indexOf(index)==-1)
            {
                this.iscollect=0//未收藏
            }else{
                this.iscollect=1//已收藏
            }
             let _this=this;
             this.axios({
                method: 'post',     
                url: "http://localhost:8080/bbj/home/changNumber",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'     
                },  
                data:JSON.stringify({index:index,iscollect:_this.iscollect})           
            }).then (function (response) {
                console.log(response.data)
                if(response.data.code==200)
                {
                   alert(response.data.msg)  
                   _this.$router.go(0)
                }              
            }).catch (function (error) {
                console.log(error.data);
                _this.message = error.data;
        });  
        },
        initRecommend(){
            let _this=this;
            this.axios({
            method: 'post',     
            url: "http://localhost:8080/bbj/home/getRecommendation",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'     
            },              
         }).then (function (response) {
          console.log(response.data);
          _this.newLists=response.data.data
          if(_this.name!=null){
              _this.collectinit()
          }
        }).catch (function (error) {
          console.log(error.data);
           _this.message = error.data;
        });
       },
       collectinit(){
            let _this=this;
            this.axios({
                method: 'post',     
                url: "http://localhost:8080/bbj/user/getCollect",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'     
                },              
            }).then (function (response) {
                _this.collectList=response.data.data;
                _this.idList=[];
                for (let index = 0; index < _this.collectList.length; index++) {
                _this.idList.push(_this.collectList[index].id)
                }
                console.log(_this.idList)
            }).catch (function (error) {
                console.log(error.data);
                _this.message = error.data;
            })
        },
    },
    watch:{
        cselect:function(i){
            console.log(this.lists[i].cselect)
        }
    },
    mounted(){
        this.initRecommend()
    },
    created(){
    eventBus.$on("sisterSaid",message=>{
      this.name = message;
      console.log(this.name)
    })
  },

}
</script>

<style>
li{list-style: none;}
.main-right{width: 950px; background-color: rgba(209, 246, 255, 0.397);display: flex;flex-wrap: wrap;justify-content: space-between;}
.main-right li{margin-top: 10px; width: 230px;height:350px;display: flex;flex-wrap: wrap;justify-content: space-around;background-color: white;border-radius: 2px; }
.black-color{color: rgb(0, 0, 0);}
.main-right-size1{margin-top: 5px; width: 200px;height: 200px;}
.collect-and-thumb{width:200px;height: 30px;display: flex;}
.collect-and-thumb .likes-number{margin-top: 5px; margin-left: 5px; width: 100px;height: 20px; color: rgb(128, 128, 128);}
.main-right-size2{width: 200px;height: 50px;}
.main-right-size2 span{text-overflow:ellipsis;overflow:hidden;display:-webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:2;color: rgb(124, 124, 124);}
.image-form{width: 200px;height: 200px;margin-right: auto; margin-left: auto; border-radius: 20px;}
.iconfont-setting1{font-size: 24px;color: rgb(170, 165, 165);}
.iconfont-setting2{margin-left: 20px; font-size: 24px;color: rgb(170, 165, 165);}
</style>