<template>
   <section class="main-register-box">
        <div class="main-input-box-t1"></div>
        <div class="main-register-content">
            <div class="main-register-title">
                用户注册
            </div>
            <div id="register-input">
                <form  @submit.prevent="submit">
                    账号：<input type="text" v-model="user.userAccount"><br><br>
                    密码：<input type="password" v-model="user.userPassword"><br><br>
                    性别：男<input type="radio" name="userSex" v-model="user.userSex" value="male">
                    女<input type="radio" name="userSex" v-model="user.userSex" value="female">
                    <br><br>
                    年龄：<input type="number" name="" id="" v-model="user.userAge"><br><br>
                    手机号：<input type="text" v-model="user.userTel"><br><br>
                    您的密保问题:请问您的妈妈是谁?<br>
                    密保回答：<input type="text" v-model="user.userAnswer"><br><br>
                    <button>提交</button>
                </form>
            </div>
        </div>
       
    </section>
</template>

<script>
import { eventBus } from '../../main'
export default {
    data(){
        return {
            user:{
            userAccount:'小明兄弟',
            userPassword:'123',
            userSex:'male',
            userAge:0,
            userTel:'',
            userPic:'',
            userAnswer:''
            }
        }
    },
    methods:{
        submit(){
               let _this=this;
            if(this.user.username === ''|| this.user.password === ''){
                alert('账号和密码不能为空！')
            }else{
                this.axios({
                    method:'post',
                    url:'http://localhost:8080/bbj/user/register',
                    headers: {
                    'Content-Type': 'application/json;charset=utf-8'     
                    }, 
                    data: JSON.stringify(_this.user),     
                }).then(function(res){
                    console.log(res.data);
                }).catch(error=>{
                    console.log(error);
                })

            console.log(JSON.stringify(_this.user))
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

.main-register-box{width: 100%;height: 600px;background-image: url(../../assets/background1.jpg);background-size: 100% 100%;}
.main-input-box-t1{height: 40px;}
.main-register-content{margin: 0 auto;  width: 400px;height: 500px;border: 1px solid rgb(252, 215, 215);background:rgba(2, 102, 95, 0.212);text-align:center;}
.main-register-title{margin: 0 auto; width:200px;height: 70px;color: rgb(255, 255, 255);font-size: 40px;line-height: 80px;text-align: center;}
#register-input{margin: 20px auto 0;width:300px;text-align: left;color: rgb(255, 255, 255);}
#register-input input{background:rgba(255, 255, 255, 0.39); outline:none; border:none;font-size:15px;}
#register-input button{width: 50px;height: 30px;background-color: rgba(255, 255, 255, 0.315);border:0;outline:none;color: white;}
</style>