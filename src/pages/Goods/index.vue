<template>
    <div class="specific-goods-box">
        <div class="specific-goods-box-t"></div>
        <div class="specific-goods">
            <div class="specific-goods-left">
                <a :href="webLink" class="dlt_"><div class="specific-goods-title"> {{goodtitile}}</div></a>
                <div class="goods-price">价格:{{price}}元</div>   
                 <a :href="webLink" class="dlt_"><img :src="pictureLink" alt="" class="img-size"></a>    
            </div>
            <div class="specific-goods-right">
                <div class="specific-goods-compare">产品比价</div>
                <div class="specific-compare-title">
                    <li v-for="(v,i) in newList" :key="i">
                        <div class="little-title"><a :href="v.webLink" class="dlt_">{{v.title}}</a></div>
                        <div class="little-shop">店铺:{{v.shop}}</div>
                        <div class="little-price">价格:{{v.price}}元</div>
                    </li>
                </div>
            </div>

    </div>
    </div>
</template>

<script>
import { eventBus } from '../../main'
export default {
    data(){
        return{
            goodId:0,
            pictureLink:'',
            goodtitile:'',
            webLink:'',
            newList:[],
            price:0
        }
    },
     created() {//钩子函数，初始化数据
     this.goodId = this.$route.query.goodId;
     },
     methods:{
         init(){
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
      });},
      initgoods(){
            let _this=this;
            this.axios({
                        method: 'get',     
                        url: "http://localhost:8080/bbj/goods/getCompare",        
                        params:{
                            goodId:_this.goodId
                        }  
                    }).then (function (response) {
                        console.log(response.data)
                        _this.pictureLink=response.data.goods.pictureLink
                        _this.goodtitile=response.data.goods.title
                        _this.webLink=response.data.goods.webLink
                        _this.price=response.data.goods.price
                        _this.newList=response.data.result.data
                    }).catch (function (error) {
                        console.log(error.data);
                        _this.message = error.data;
            });
      }
    },
    mounted(){
        this.init(),
        this.initgoods()     
    }
}
</script>

<style>
.specific-goods-box{width: 100%;height: 600px;background-color: rgba(125, 255, 255, 0.151);}
.specific-goods-box-t{width: 100%;height:20px;}
.specific-goods{margin: 0 auto; width: 1200px;height: 550px; background-color: rgb(70, 146, 156);display: flex;justify-content: space-around;border: 1px dashed rgb(10, 138, 138);}
.specific-goods-left{margin-top: 20px; width: 450px;height:500px;}
.specific-goods-title{width: 400px; height: 60px;color: rgb(255, 255, 255);}
.specific-goods-left .goods-price{width: 400px;height: 40px;font-size: 25px;color: rgb(100, 25, 25);}
.specific-goods .img-size{width: 400px;}
.specific-goods-right{margin-top: 20px; width: 600px;height: 500px;background-color: rgb(48, 136, 121);border-radius: 10px;}
.specific-goods-compare{margin-top: 10px; width: 600px;height: 50px;font-size: 30px;color: white;text-align: center;}
.specific-compare-title{width: 600px; height: 80px;color: rgb(255, 255, 255);}
.specific-compare-title li{margin:0 auto; width: 500px;height: 80px;border:1px dashed rgb(201, 201, 201);list-style: none;}
.specific-compare-title .little-title{width: 500px;height: 25px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
.specific-compare-title .little-shop{width: 400px;height: 25px;color: rgb(216, 216, 216);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
.specific-compare-title .little-price{width: 400px;height: 25px;font-size: 20px;color: rgb(95, 3, 3);}
.specific-compare-title li a{color: white;}

</style>