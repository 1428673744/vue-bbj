<template>
<div class="person-all">
    <div class="person-information">
    <div class="person-information-title">用户个人信息</div>
    <div class="person-information-box">
      <div class="person-information-content">
        用户账号:{{user.userAccount}}<br>
        用户姓名:{{user.userName}}
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
            user:{
            userId:233,
            userName:'默认',
            userAccount:'小明',
            userPassword:'123',
            userSex:'',
            isManager:'',
            company:'',
            userTel:''
            }
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
.person-all{margin: 30px auto; width: 1200px;height: 500px;display: flex;justify-content: space-around;}
.person-information{width: 100%;height: 500px;background-color: rgba(100, 221, 237, 0.479);border-radius: 30px;}
.person-information-title{margin: 0 auto; width: 200px;height: 40px; font-size: 30px;line-height: 40px;text-align: center;color: rgb(0, 168, 168);}
.person-information-box{margin: 20px auto 0; width: 500px;height: 300px;background-color: rgba(3, 68, 49, 0.336);color: white;font-size: 20px;}
.person-collect{width: 400px;height: 400px; background-color: rgba(153, 205, 50, 0.356);}
</style>