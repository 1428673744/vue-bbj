<template>
    <div class="all-search">
        <div class="head-search">
            <div class="searchandfind">
                <div><input type="text" name="search" class="search" v-model="title"  @keyup.enter="search"></div>
                 <div><button @click="search" class="search-button">搜索</button></div>
             </div>
         </div>

        <div class="main-search">
            <li v-for="(v,i) in Newlists" :key="i">
                <router-link to="v-url" class="dlt_ black-color main-search-size1">
                    <img :src="v.image" alt="" class="image-form">
                </router-link>
                <div class="collect-and-thumb1">
                <i class="iconfont iconfont-setting1" :class="icon1" @click="addcollect(i)" :style="v.cselect==0?'color:black;':'color:red;'"></i>{{v.cnumber}}
                <i class="iconfont iconfont-setting2" :class="icon2"></i>{{v.tnumber}}
                </div>
                <router-link to="v-url" class="dlt_ black-color main-search-size2">
                    <span>{{v.name}}</span>
                </router-link>
            </li>
        </div>
        <div class="page-b">
                    <div class="page" v-if="pages !== 1">
                        <span @click="first" v-if="firstPage == true"
                              v-bind:class="{active : 1 == currentPage}"><div class="page-littlebox">1</div></span>
                        <span v-if="pointN == true">...</span>
                        <span v-for="(page,i) in pageArr" :key=i v-bind:class="[{active : page == currentPage},{point : page == '...'}]"  @click="goTo(page)">
                            <div class="page-littlebox">{{page}}</div>
                        </span>
                        <span v-if="pointL == true">...</span>
                        <span @click="last" v-if="lastPage == true"
                              v-bind:class="{active : pages == currentPage}"><div class="page-littlebox">{{pages}}</div></span>
                    </div>
        </div>
    </div>

</template>

<script>
import { eventBus } from '../../main'
export default {
    data(){
        return {
            title:'dcd',
            lists:[
                {name:'饼干',url:'/',image:'https://img.alicdn.com/bao/uploaded/i2/138071847/TB2LUnplVXXXXc9XXXXXXXXXXXX_!!138071847.png_200x200q90.jpg_.webp'},
                {name:'超级小裙子',url:'/',image:'https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/898090209/O1CN01w4glaa1DPlSo8Tn5q_!!0-item_pic.jpg_230x230.jpg_.webp'},
                {name:'漂亮上衣',url:'/',image:'https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/898090209/O1CN01w4glaa1DPlSo8Tn5q_!!0-item_pic.jpg_230x230.jpg_.webp'},
            ],
            Newlists:[],
            icon1:'icon-shoucang',
            icon2:'icon-dianzan',
          
            pages:20,//总页数
            currentPage:1,//当前页
            firstPage:'',//是否显示第一页
            lastPage:'',//是否显示最后一页
            pointN:true,//省略号前部
            pointL:true,//省略号后部
        } 
    },
    created() {
    this.title = this.$route.query.title;
    this.search()
    },
    methods:{
        search(){
            let _this=this;
            this.axios({
                        method: 'get',     
                        url: "http://localhost:8080/bbj/goods/getAll",        
                        params:{
                            title:_this.title,
                            page:_this.currentPage
                        }      
                    }).then (function (response) {
                        console.log(response.data)
                    }).catch (function (error) {
                        console.log(error.data);
                        _this.message = error.data;
            });
            let title=this.title
            let Newlists = [];
            this.lists.map(function(list){
             if(list.name.search(title)!=-1){
                Newlists.push(list)
            }   
            })
            this.Newlists=Newlists;
            return Newlists;
        },
        first() {
            this.currentPage = 1;
            console.log(this.currentPage)
        },
        prev:function () {
            this.currentPage = this.currentPage - 1;
        },
        next:function () {
            this.currentPage = this.currentPage + 1;
        },
        last() {
            this.currentPage = this.pages;
            console.log(this.currentPage)
        },
        goTo(index) {
            this.currentPage = index;
            console.log(this.currentPage)
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
       if(this.pages <= 9){//页数小于9全部显示
                this.firstPage = true;
                this.lastPage = true;
        }else {
            if(this.currentPage < 9){//小于6页时
                this.firstPage = true;
                this.lastPage = true;
            } 
            if(this.currentPage >=6){//当前页大于6页
                if(this.currentPage + 2 < this.pages){//五条中显示前两页和后两页
                if(this.currentPage < this.pages){
                    this.lastPage = true;
                    }
                } else {
             }
            }
        }
    
  },
  computed:{   pageArr:function () {
            var arr = [];
            if(this.pages <= 9){//页数小于9全部显示
                for (var i = 2; i <= this.pages -1; i++){
                    console.log(i);
                    arr.push(i);
                }
                return arr;
            } else {
                if(this.currentPage < 6){//小于6页时
                    for(var z = 2; z <= 8; z++){
                        arr.push(z)
                    }
                    return arr;
                } else {//当前页大于6页
                    if(this.currentPage + 3 < this.pages){//五条中显示前两页和后两页
                        arr = [
                            this.currentPage -3,
                            this.currentPage -2,
                            this.currentPage -1,
                            this.currentPage,
                            this.currentPage +1,
                            this.currentPage +2,
                            this.currentPage +3,
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
}
</script>

<style>
.all-search{width: 100%;}
.head-search{margin: 0 auto; width: 900px;height: 200px;display: flex;flex-direction: column;}
.head-search .searchandfind{margin: 50px auto 0; width: 600px;height: 40px; display: flex;}
.head-search .searchandfind .search{margin-left: 15px;height: 40px;width: 500px;border: solid 1px rgb(0, 143, 169);  }
.head-search .searchandfind .search-button{font-size: 17px;line-height: 30px;height: 40px;width: 100px;border: none;background: rgb(0, 143, 169);color: floralwhite;}
li{list-style: none;}
.main-search{margin: 0 auto; width: 1200px; background-color: rgb(255, 255, 255);border: 1px solid rgb(179, 179, 179);display: flex;flex-wrap: wrap;}
.main-search li{margin-left:6px; width: 290px;height:400px;border: 1px solid rgb(179, 179, 179);display: flex;flex-wrap: wrap;justify-content: space-around;}
.black-color{color: black;}
.main-search-size1{margin-top: 10px; width: 250px;height: 300px;}
.main-search-size1 .image-form{width: 250px;height: 250px;margin-right: auto; margin-left: auto; border-radius: 10px;}
.main-search-size2{margin-top: 10px; width: 250px;height: 20px;}
.collect-and-thumb1{width:200px;height: 30px;}
.page-b{margin-top: 10px; width: 100%;height: 50px;}
.page-b .page{margin: 0 auto; width: 500px;height: 40px;display: flex;}
.page-littlebox{width: 40px;height: 40px;line-height: 40px;text-align: center; background-color: rgb(209, 209, 209);border: 1px solid rgb(199, 199, 199);}
</style>