<template>
  <div class="main-collect-box">
        <div class="main-collect-content">
            <div class="main-collect-title">我的收藏</div>
            <div class="main-collect">
                <div v-if="collectList.length==0" class="no-collect">暂未收藏</div>
                <li v-for="(v,i) in collectList" :key="i">
                    <router-link :to="{path: 'goods',query:{goodId:v.id}}"  class="dlt_ black-color main-search-size3">
                        <img :src="v.pictureLink" alt="" class="image-form">
                    </router-link>
                    <div class="collect-and-thumb">
                    <router-link :to="{path: 'collect'}" class="dlt_">
                     <div class="iconfont-setting" :style="idList.indexOf(v.id)==-1?'color:grey;':'color:rgb(15, 145, 168);'">
                            <i class="iconfont" :class="icon1" @click="decidecollect(v.id)"></i>  
                    </div>
                    </router-link>
                     <div class="collect-number">{{v.likes}}</div>
                     <div class="collect-number1">{{v.price}}元</div>
                    </div>
                    <router-link :to="{path: 'goods',query:{goodId:v.id}}" class="dlt_ black-color main-search-size4">
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
            icon1:'icon-shoucang',
            collectList:[],//未登录用户为空
            idList:[],
            iscollect:0
        }
    },
    mounted(){
   this.collectinit()
   this.userinit()
     },
    methods:{
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
                url: "http://120.79.130.29/home/changNumber",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'     
                },  
                data:JSON.stringify({index:index,iscollect:_this.iscollect})           
            }).then (function (response) {
                console.log(response.data)
                if(response.data.code==200)
                {
                   alert(response.data.msg)  
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
                url: "http://120.79.130.29/user/getCollect",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'     
                },              
            }).then (function (response) {
                _this.collectList=response.data.data
                _this.idList=[]
                for (let index = 0; index < _this.collectList.length; index++) {
                _this.idList.push(_this.collectList[index].id)
                }
                console.log(_this.idList)
            }).catch (function (error) {
                console.log(error.data);
                _this.message = error.data;
             });  
        },
        userinit(){
            let _this=this;
            this.axios({
                method: 'post',     
                url: "http://120.79.130.29/user/getInformation",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'     
                },              
            }).then (function (response) {
                eventBus.$emit("sisterSaid",response.data.userAccount);
            }).catch (function (error) {
                console.log(error.data);
                _this.message = error.data;
      });
        }
    },
}
</script>
    
<style>
li{list-style: none;}
.main-collect-box{width: 100%;min-height: 600px; background-color: rgba(40, 247, 130, 0.178);}
.main-collect-content{margin: 0 auto; width: 1000px;border: 1px solid rgba(178, 207, 203, 0.301);}
.main-collect-title{margin: 0 auto;font-size: 40px;color: rgba(17, 184, 170, 0.87);}
.main-collect{margin: 0 auto; width: 1000px;min-height: 50px; background-color: rgba(6, 109, 112, 0.13);border: 5px solid rgba(10, 113, 117, 0.349);display: flex;flex-wrap: wrap;}
.main-collect .no-collect{color: teal;}
.main-collect li{width: 240px;height:320px;border: 5px solid rgba(9, 153, 141, 0.329);display: flex;flex-wrap: wrap;justify-content: center;}
.main-collect li .collect-and-thumb{width:200px;height: 30px;display: flex;line-height: 30px;color: #000;}
.collect-and-thumb .iconfont-setting{width: 30px;height: 30px;}
.main-collect .collect-number{margin-top: 4px; width: 70px;height: 25px;color: teal;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
.main-collect .collect-number1{width: 100px;height: 30px;color: teal;font-size: 20px;text-align: right;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
.main-search-size3{margin-top: 10px; width: 210px;height: 210px;}
.main-search-size3 .image-form{width: 210px;height: 210px;margin-right: auto; margin-left: auto; border-radius: 10px;}
.main-search-size4{ margin-top: 10px; width: 210px;height: 70px;color: rgb(1, 95, 133);}
.main-search-size4 span{text-overflow:ellipsis;overflow:hidden;display:-webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:2;}
</style>