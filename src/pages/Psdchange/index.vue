<template>
  <div class="password-input-box">
    <div class="password-input-box-t"></div>
    <div class="password-input"> 
      <div class="password-input-title">修改密码</div>
      <div class="password-input-content">请输入您的旧密码:<input type="password" v-model="pwd.oldpassword"></div>
      <div class="password-input-content">请输入您的新密码:<input type="password" v-model="pwd.newpassword"></div>
      <div class="password-input-content">再次输入您的新密码:<input type="password" v-model="pwd.scdpassword"></div>
      <div class="password-input-content">
          <button @click="changepwd">提交</button>
      </div>
    </div>  
  </div>
</template>

<script>
import { eventBus } from '../../main'
export default {
  data(){
    return{
      pwd:{
        oldpassword:'',
        newpassword:'',
        scdpassword:''
      }
    }
  },
  methods:{
    changepwd(){
       let _this=this;
      this.axios({
                method: 'post',     
                url: "http://localhost:8080/bbj/user/change",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'     
                },
                data: JSON.stringify(_this.pwd),         
            }).then (function (res) {
              console.log(res.data)
            }).catch (function (error) {
                console.log(error.data);
                _this.message = error.data;
      });
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
                data:{
                  
                }              
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
.password-input-box{width: 100%;height: 600px;background-color: rgba(107, 184, 184, 0.308);}
.password-input-box-t{width: 100%;height: 40px;}
.password-input{margin: 0 auto; width: 500px;height: 400px;background-color: teal;border-radius: 10px;}
.password-input-title{margin: 0 auto; width: 400px;height: 50px;line-height: 50px;font-size: 30px;color: white;text-align: center;}
.password-input-content{margin: 40px auto 0; width: 400px;height: 40px;font-size: 20px;color: white;text-align: center;}
.password-input-content input{width: 200px;height: 20px;background:rgba(255, 255, 255, 0.39); outline:none; border:none;font-size:15px;}
.password-input-content button{width: 50px;height: 30px;background-color: rgba(255, 255, 255, 0.315);border:0;outline:none;color: white;}
</style>