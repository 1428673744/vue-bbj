<template>
  <div class="specific-goods">
        <img :src="image" alt="" class="img-size">
        <span>{{goodId}}</span>
  </div>
</template>

<script>
import { eventBus } from '../../main'
export default {
    data(){
        return{
            goodId:0,
            image:'https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/898090209/O1CN01w4glaa1DPlSo8Tn5q_!!0-item_pic.jpg_230x230.jpg_.webp'
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
                        _this.Newlists=response.data.result.data;
                        console.log(response.data)
                    }).catch (function (error) {
                        console.log(error.data);
                        _this.message = error.data;
            });
      }
    },
    mounted(){
        init(),
        initgoods()     
    }
}
</script>

<style>
.specific-goods{margin: 0 auto; width: 1200px;background-color: rgb(203, 227, 255);}
.specific-goods .img-size{width: 500px;}
</style>