<template>
    <div class="all-search">
        <div class="head-search">
            <div class="searchandfind">
                <div><input type="text" name="search" class="search" v-model="title"></div>
                 <div><button @click="search" class="search-button">搜索</button></div>
             </div>
         </div>

        <div class="main-search">
            <li v-for="(v,i) in Newlists" :key="i">
                <router-link to="v-url" class="dlt_ black-color main-search-size1">
                    <img :src="v.image" alt="" class="image-form">
                </router-link>
                <router-link to="v-url" class="dlt_ black-color main-search-size2">
                    <span>{{v.name}}</span>
                </router-link>
            </li>
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
            ],
            Newlists:[]
        }
    },
    created() {
    this.title = this.$route.query.title;
    },
    methods:{
        search(){
            let title=this.title
            let Newlists = [];
            this.lists.map(function(list){
             if(list.name.search(title)!=-1){
                Newlists.push(list)
            }   
            })
            this.Newlists=Newlists;
            return Newlists;
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
                eventBus.$emit("sisterSaid",response.data);
            }).catch (function (error) {
                console.log(error.data);
                _this.message = error.data;
      });
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
.main-search li{margin-left:6px; width: 290px;height:350px;border: 1px solid rgb(179, 179, 179);display: flex;flex-wrap: wrap;justify-content: space-around;}
.black-color{color: black;}
.main-search-size1{margin-top: 10px; width: 250px;height: 200px;}
.main-search-size1 .image-form{width: 250px;height: 250px;margin-right: auto; margin-left: auto; border-radius: 10px;}
.main-search-size2{margin-top: 10px; width: 250px;height: 20px;}
</style>