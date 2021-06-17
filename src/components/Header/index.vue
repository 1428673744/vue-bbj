<template>
     <header class="header_head">
        <div class="bid">
           <div class="head_welcome">
            <div><router-link to="/home" class="dlt_ grey-color">欢迎来到比比价首页</router-link></div>
            <div :style="name!=null&&name!=''?'display:none;':'display:block;'"><router-link to="/login" class="dlt_ grey-color" >亲，请登录</router-link></div>
            <div class="little-person-on" :style="name==null||name==''?'display:none;':'display:block;'">
              <div class="little-person-s">
                <router-link to="/person" class="dlt_ grey-color">用户:{{name}}</router-link>
              </div>
              <div class="little-person" >
                <router-link to="/home" @click.native="up()"  class="dlt_ grey-color">退出</router-link>
                <br>
                <router-link to="/psdchange" class="dlt_ grey-color downline">修改密码</router-link>
              </div>
            </div> 
            <div  :style="name!=null&&name!=''?'display:none;':'display:block;'"><router-link to="/register" class="dlt_ grey-color">免费注册</router-link></div>
          </div>
          <div class="head_personal">
            <div><router-link to="/collect" class="dlt_ grey-color">我的收藏</router-link></div>
          </div>
        </div>
    </header>
</template>

<script>
import { eventBus } from '../../main'
import { mapMutations } from 'vuex'
export default {
  data(){
      return{
      name:null,
       }
  },
  created(){
    eventBus.$on("sisterSaid",message=>{
      this.name = message;
      console.log(this.name)
    })
  },
  methods:{
    ...mapMutations(['changeLogin']),
    up(){
      this.changeLogin({Authorization:'nologin'});
      this.$router.go(0)
    }
  }
}
</script>

<style>
*{ margin: 0;padding: 0;}
.dlt_{text-decoration: none;}
/* 去掉下划线 */
body{height: 100%;width: 100%;}
.header_head{width: 100%;height: 28px;  background: rgb(15, 145, 168);border: 1px solid rgb(6, 121, 141);}
.header_head .bid{margin-left: auto;margin-right: auto;width: 1200px;   display: flex;justify-content: space-between; }
.head_welcome{line-height: 28px;width: 340px; font-size: 14px;display: flex;justify-content: space-between;}
.head_personal{margin-right: 80px;width: 150px;line-height: 28px; font-size: 14px;display: flex; justify-content: space-between;}
.grey-color{color:rgb(220, 221, 221)}
.little-person-on{width: 90px;height: 28px; }
.little-person-on .little-person-s{width: 90px;height: 28px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;color: white;}
.little-person{ position: relative;width: 80px;height:60px;background-color: rgba(6, 71, 83, 0.829);border:1px solid rgba(0, 66, 66, 0.699);display: none;}
.little-person-on:hover .little-person{display: block;}
</style>