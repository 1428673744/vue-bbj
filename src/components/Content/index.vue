<template>
    <div class="main-right">
        <li v-for="(v,i) in lists" :key="i">
            <router-link :to="{path: 'goods',query:{goodId:v.id}}"  class="dlt_ black-color main-right-size1">
                <img :src="v.pictureLink" alt="" class="image-form">
            </router-link>
            <div class="collect-and-thumb">
                <i class="iconfont iconfont-setting1" :class="icon1"  @click="decidecollect(v.id)" :style="collectList.indexOf(v.id)==-1?'color:grey;':'color:rgb(15, 145, 168);'"></i>
                <div class="likes-number">{{v.likes}}</div>
            </div>
            <router-link :to="{path: 'goods',query:{goodId:v.id}}" class="dlt_ black-color main-right-size2">
                <span>{{v.title}}</span>
            </router-link>
        </li>
    </div>
</template>

<script>
export default {
    data(){
        return {
            lists:[
                {id:123,title:'超级小裙子',image:'https://img.alicdn.com/bao/uploaded/i2/138071847/TB2LUnplVXXXXc9XXXXXXXXXXXX_!!138071847.png_200x200q90.jpg_.webp',cselect:0, tselect:1,cnumber:12,tnumber:2},
                {id:233,title:'超级小裙子',likes:10,image:'https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/898090209/O1CN01w4glaa1DPlSo8Tn5q_!!0-item_pic.jpg_230x230.jpg_.webp'},
                {title:'饼干',url:'/'},
                {title:'超级小裙子',url:'/'},
                {title:'超级小裙子',url:'/'},
                {title:'超级小裙子',url:'/'},
                {title:'超级小裙子',url:'/'},
                {title:'超级小裙子',url:'/'},
                {title:'超级小裙子',url:'/'},
            ],
            icon1:'icon-shoucang',
            icon2:'icon-dianzan',
             collectList:[123,237,3936]
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
            let _this=this;
            this.axios({
            method: 'post',     
            url: "http://localhost:8080/bbj/home/changNumber",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'     
            },  
            data:JSON.stringify(index)           
        }).then (function (response) {
            console.log(response.data)
        }).catch (function (error) {
            console.log(error.data);
            _this.message = error.data;
        });        
        }
    },
    watch:{
        cselect:function(i){
            console.log(this.lists[i].cselect)
        }
    }

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