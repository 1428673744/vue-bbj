<template>
    <div class="all-search">
        <div class="head-search">
            <div class="searchandfind">
                <div><input type="text" name="search" class="search" v-model="title"  @keyup.enter="search(1),employ()"></div>
                 <div><button @click="search(1)" class="search-button">搜索</button></div>
             </div>
         </div>
         <div class="showGoods-sort">
            <div class="showGoods">
                <span>排序:</span>
                <div @click="search(1)"  class="box">
                    <div @click="pricechange" >价格
                    <span v-if="pnumber=='0'">-</span>
                    <span v-if="pnumber=='1'">⬆</span>
                    <span v-if="pnumber=='2'">⬇</span>                    
                    </div>
                    </div>
                <div @click="search(1)" class="box">
                    <div @click="collectchange">收藏
                    <span v-if="cnumber=='0'">-</span>
                    <span v-if="cnumber=='1'">⬆</span>
                    <span v-if="cnumber=='2'">⬇</span>
                    </div></div>
            </div>
         </div>
        <div class="main-search">
            <li v-for="(v,i) in Newlists" :key="i">
                <router-link :to="{path: 'goods',query:{goodId:v.id}}" class="dlt_ black-color main-search-size1">
                    <img :src="v.pictureLink" alt="" class="image-form">
                </router-link>
                <div class="collect-and-thumb1">
                <i class="iconfont iconfont-setting1" :class="icon1" @click="decidecollect(v.id)" :style="collectList.indexOf(v.id)==-1?'color:black;':'color:red;'"></i>
                <div class="likes-number">{{v.likes}}</div>
                <!-- <i class="iconfont iconfont-setting2" :class="icon2"></i>{{v.tnumber}} -->
                <div class="price-number">
                    {{v.price}}元
                </div>
                </div>
                <router-link :to="{path: 'goods',query:{goodId:v.id}}" class="dlt_ black-color main-search-size2">
                    <span>{{v.title}}</span>
                </router-link>
            </li>
        </div>
        <div class="page-b">
                    <div class="page" v-if="pages !== 1">
                        <span @click="search(1)">
                            <router-link :to="{path: 'search',query:{title:title}}" class="dlt_ grey-color"><div class="page-littlebox">1</div></router-link></span>
                        <span class="white-box"  v-if="pages>1"></span>
                        <span v-for="(page,i) in pageArr" :key=i v-bind:class="[{active : page == currentPage},{point : page == '...'}]"  @click="search(page)">
                                <router-link :to="{path: 'search',query:{title:title}}" class="dlt_ grey-color"><div class="page-littlebox">{{page}}</div></router-link>
                        </span>
                        <span class="white-box"  v-if="pages>1"></span>
                        <span @click="search(pages)" v-if="pages>1">
                             <router-link :to="{path: 'search',query:{title:title}}" class="dlt_ grey-color"><div class="page-littlebox">{{pages}}</div></router-link></span>
                    </div>
                    <div class="gopage">
                        <input type="number" v-model="currentPage" @keyup.enter="search(currentPage)">
                        <button @click="search(currentPage)">前往</button>
                    </div>
        </div>
    </div>
</template>

<script>
import { eventBus } from '../../main'
export default {
    data(){
        return {
            title:'饼干',
            Newlists:[],
            icon1:'icon-shoucang',
            icon2:'icon-dianzan',
          
            pages:1,//总页数
            currentPage:1,//当前页
            lastpage:1,//是否显示最后一页
            pnumber:'0',//价格排序,0不排，1从低到高，2从高到低
            cnumber:'0',
            value:0,
            collectList:[123,237,3936]
        } 
    },
    created() {
    this.title = this.$route.query.title;
    this.search()
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
  computed:{ pageArr:function () {
            var arr = [];
            let cp=parseInt(this.currentPage)
            if(this.currentPage == undefined){
                cp=1
            }
            console.log("我是"+cp)
            console.log("pages是"+this.pages)
            if(this.pages <= 9){//页数小于9全部显示
                for (var i = 2; i <= this.pages -1; i++){
                    console.log(i);
                    arr.push(i);
                }
                return arr;
            } else {
                if(cp < 6){//小于6页时
                    for(var z = 2; z <= 8; z++){
                        arr.push(z)
                    }
                    return arr;
                } else {//当前页大于6页
                    if(cp + 3 < this.pages){//五条中显示前两页和后两页
                        arr = [
                            cp -3,
                            cp -2,
                            cp -1,
                            cp,
                            cp +1,
                            cp +2,
                            cp +3,
                        ];
                        return arr
                    } else {
                        arr = [
                            this.pages -7,
                            this.pages -6,
                            this.pages -5,
                            this.pages -4,
                            this.pages -3,
                            this.pages -2,
                            this.pages -1,
                        ];
                        return arr
                    }

                }
            }
        },
    },
    methods:{
        employ(){
         this.$router.push({path:'/search', query: { title: this.title}})
        },
        search(index){
            console.log("价格"+this.pnumber)
            console.log("收藏 "+this.cnumber)
            let currentPage;
            if(index<=1){
                this.currentPage = 1;
                currentPage=1;
            }else if(index==this.pages){
                this.currentPage = this.pages;
                currentPage=this.pages;
            }else if(index>this.pages){
                this.currentPage =this.pages
                currentPage=this.pages;
            }else{
                this.currentPage = index;  
                currentPage=index;
            }
            if(this.currentPage==null){
                currentPage=1
            }
            //  this.$set(this.currentPage,index)
            console.log(this.currentPage)
            let _this=this;
            this.axios({
                        method: 'get',     
                        url: "http://localhost:8080/bbj/goods/getAll",        
                        params:{
                            title:decodeURIComponent(_this.title),
                            page:currentPage,
                            pnumber:_this.pnumber,
                            cnumber:_this.cnumber
                        },   
                    }).then (function (response) {
                        _this.Newlists=response.data.result.data;
                        _this.pages=response.data.result.count;
                        console.log(response.data)
                    }).catch (function (error) {
                        console.log(error.data);
                        _this.message = error.data;
            });
        },
        pricechange(){
            if(this.pnumber=='0')
            {
                this.pnumber = '1';
                this.cnumber = '0';
            }else if(this.pnumber=='1'){
                this.pnumber = '2';
                this.cnumber = '0';
            }else{
                this.pnumber = '0';
            }
        },
        collectchange(){
            if(this.cnumber=='0')
            {
                this.cnumber = '1';
                this.pnumber = '0';
            }else if(this.cnumber=='1'){
                this.cnumber = '2';
                this.pnumber = '0';
            }else{
                this.cnumber = '0';
            }
        },
        decidecollect(index){
             let _this=this;
             this.axios({
                method: 'post',     
                url: "http://localhost:8080/bbj/user/changNumber",
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
}
</script>

<style>
.all-search{width: 100%;}
.head-search{margin: 0 auto; width: 900px;height: 200px;display: flex;flex-direction: column;}
.head-search .searchandfind{margin: 50px auto 0; width: 600px;height: 40px; display: flex;}
.head-search .searchandfind .search{margin-left: 15px;height: 40px;width: 500px;border: solid 1px rgb(0, 143, 169);  }
.head-search .searchandfind .search-button{font-size: 17px;line-height: 30px;height: 40px;width: 100px;border: none;background: rgb(0, 143, 169);color: floralwhite;}
li{list-style: none;}
.showGoods-sort{margin: 0 auto;width: 1200px;height: 50px;background-color: rgb(0, 143, 169);color: white;border: 1px solid rgb(0, 133, 143);}
.showGoods{margin-left: 10px; width:200px;height: 50px;display: flex;line-height: 50px;}
.showGoods .box{margin-left: 5px;margin-top: auto;margin-bottom: auto; width:50px;height: 35px;border: 0.5px solid rgba(7, 104, 86, 0.603);background-color: rgb(9, 117, 136); color: rgb(248, 248, 248);line-height: 35px;text-align: center;}
.main-search{margin: 20px auto; width: 1200px; background-color: rgb(255, 255, 255);border: 1px solid rgb(179, 179, 179);display: flex;flex-wrap: wrap;}
.main-search li{margin-top: 5px; margin-left:6px; width: 290px;height:400px;border: 1px solid rgb(179, 179, 179);display: flex;flex-wrap: wrap;justify-content: space-around;}
.black-color{color: black;}
.main-search-size1{margin-top: 10px; width: 250px;height: 270px;}
.main-search-size1 .image-form{width: 250px;height: 250px;margin-right: auto; margin-left: auto; border-radius: 10px;}
.main-search-size2{margin-top: 10px; width: 250px;height: 70px;color: rgb(102, 102, 102);}
.main-search-size2 span{text-overflow:ellipsis;overflow:hidden;display:-webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:2; }
.collect-and-thumb1{width:200px;height: 30px;display: flex;line-height: 30px;}
.likes-number{width: 20px;height: 30px; color: rgb(128, 128, 128);}
.price-number{width: 155px;height: 30px; color: rgb(165, 165, 165);text-align: right;}
.page-b{margin-top: 10px; width: 100%;height: 50px; display: flex;justify-content: center;}
.page-b .page{width: 500px;height: 40px;display: flex;justify-content: center;}
.page-littlebox{width: 40px;height: 40px;line-height: 40px;text-align: center; background-color: rgba(0, 144, 169, 0.678);border: 1px solid rgb(22, 63, 54);}
.page-b .gopage{width: 200px;height: 50px;}
.page-b .gopage input{width: 60px;height: 40px;border: 0.5px solid rgb(156, 156, 156);}
.page-b .gopage button{width: 40px;height: 40px;background-color: rgb(72, 135, 139);border:0;outline:none;color: white;}
.white-box{width: 40px;height: 40px;}
</style>