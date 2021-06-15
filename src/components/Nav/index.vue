<template>
    <div class="main-nav">
        <ul>
        <li class="category-one" v-for="(v,i) in navData" :key="i">
            <router-link :to="{path: 'search',query:{title:v.title}}" class="dlt_ white-color">
            <i class="iconfont" :class="v.icon"></i>
            <span>{{v.title}}</span>
            </router-link>
            <ul>
                <li v-for="(v,i) in v.two_lists" :key="i">
                     <span class="theme">{{v.title}}</span><br>
                     <div class="category-three">
                      <router-link :to="{path: 'search',query:{title:v.title}}"  v-for="(v,i) in v.three_lists" :key="i" class="dlt_ white-color formatting">
                      <span>{{v.title}}</span>
                      </router-link>                      
                     </div>
                </li>
            </ul>
        </li>
        </ul>
     </div>
</template>

<script>
import navData from '@/utils/navData'
export default {
 data(){
    return {
      navData
  }
}
}
</script>

<style>
*{margin: 0;	padding: 0;	}
.category-one{width:200px;height:50px;background: rgb(12, 12, 12); border: 0.5px solid rgb(54, 54, 54);list-style: none;}
.main-nav{width: 200px;line-height: 50px;}
.category-one:hover ul{display: block;}
.category-one ul{width:300px; position: relative; background: #000000;display:none;left: 200px;top: -55px;border: 1px solid rgb(143, 143, 143);border-radius:10px;}
.category-one ul li div{display: flex;word-wrap:normal;flex-wrap: wrap;}
.theme{font-size: 20px;color: white;}
.formatting{margin-left: 10px;}
.formatting span{ color: rgb(134, 134, 134);}
</style>