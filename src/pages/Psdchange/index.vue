<template>
  <div class="password-input-box">
    <div class="password-input-box-t"></div>
    <div class="password-input"> 
      <div class="password-input-title">修改密码</div>
      <div class="password-input-content">请输入您的旧密码:<input type="password" v-model="pwd.oldPassword"></div>
      <div class="password-input-content">请输入您的新密码:<input type="password" v-model="pwd.newPassword" v-on="check()"></div>
      <div class="pointInformation">{{message}}</div>
      <div class="password-input-content">再次输入您的新密码:<input type="password" v-model="pwd.scdPassword"></div>
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
        oldPassword:'',
        newPassword:'',
        scdPassword:''
      },
      message:''
    }
  },
  methods:{
    changepwd(){
       let _this=this;
       if(this.pwd.newPassword!=this.pwd.scdPassword){
                this.message='注:两次密码不一致'
        }else if(this.pwd.newPassword.length<6||this.pwd.scdPassword.length<6){
                this.message='注:密码最短6位'
        }else{
      this.axios({
                method: 'post',     
                url: "http://120.79.130.29/user/changePassword",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'     
                },
                data: JSON.stringify(_this.pwd),         
            }).then (function (res) {
                  if(res.data.code==200)
                {
                    alert(res.data.msg)
                }else if(res.data.code==500){
                    alert(res.data.msg)
                }
            }).catch (function (error) {
                console.log(error.data);
                _this.message = error.data;
      });
    }
    },
    check(){
             if(this.pwd.newPassword.length<6&&this.pwd.scdPassword.length<6){
                this.message='注:密码最短6位'
            }else{
            if(this.pwd.newPassword==this.pwd.scdPassword){
                this.message=''
            }else{
                this.message='注:两次密码不一致'
            }
     }
   }
  },
  mounted:function(){
      let _this=this;
      this.axios({
                method: 'post',     
                url: "http://120.79.130.29/user/getInformation",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'     
                },
                data: JSON.stringify(_this.pwd),                           
            }).then (function (response) {
                eventBus.$emit("sisterSaid",response.data.userAccount);
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
.password-input-content button:hover{background-color: rgb(29, 157, 173);}
.password-input .pointInformation{width: 370px; margin: 0 auto;}
</style>