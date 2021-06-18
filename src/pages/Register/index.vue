<template>
   <section class="main-register-box">
        <div class="main-input-box-t1"></div>
        <div class="main-register-content">
            <div class="main-register-title">
                用户注册
            </div>
            <div id="register-input">
                    账号：<input type="text" v-model="user.userAccount" v-on="check()"><span class="pointInformation">{{Amessage}}</span><br><br>
                    密码：<input type="password" v-model="user.userPassword"><span class="pointInformation">{{Pmessage}}</span><br><br>
                    性别：男<input type="radio" name="userSex" v-model="user.userSex" value="male">
                    女<input type="radio" name="userSex" v-model="user.userSex" value="female">
                    <br><br>
                    年龄：<input type="number" v-model="user.userAge" min='0' max='200'><span class="pointInformation">{{Cmessage}}</span><br><br>
                    邮箱：<input type="text" v-model="user.userTel" class="Tel"><button @click="send" v-if="isTimes==false">发送</button>
                    <button v-if="isTimes==true">{{times}}</button>
                    <span class="pointInformation">{{Tmessage}}</span>
                    <br><br>
                    验证码：<input type="number" class="codesetting" v-model="code"><br><br>
                    <button @click="submit">提交</button>
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
            userAccount:'',
            userPassword:'',
            userSex:'male',
            userAge:10,
            userTel:'',
            userPic:'',
            userAnswer:''
            },
            code:'',
            Amessage:'',
            Pmessage:'',
            Tmessage:'',
            Cmessage:'',//年龄提示
            times:60,
            isTimes:false
        }
    },
    methods:{
        submit(){
            let _this=this;
            var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
             if(this.user.userAccount==''){
                this.Amessage='注:账号不能为空'
            }else if(this.user.userPassword==''){
                this.Pmessage='注:密码不能为空'
            }else if(this.user.userPassword.length<6){
                this.Pmessage='注:密码最短6位'
            }else if (!verify.test(this.user.userTel)) {
                this.Tmessage = '注:邮箱格式错误'
            }else if(this.user.userAge<0){
                this.Cmessage = '不能为负值'
            }else{
                this.axios({
                    method:'post',
                    url:'http://120.79.130.29/user/register',
                    headers: {
                    'Content-Type': 'application/json;charset=utf-8'     
                    }, 
                    data: JSON.stringify({user:_this.user,emailCode:_this.code}),     
                }).then(function(res){
                    if(res.data.code==200){
                        alert(res.data.msg);//用户成功注册
                        _this.$router.push('/login');
                    }else{
                        alert(res.data.msg);//用户已经存在
                    }
                }).catch(error=>{
                    console.log(error);
                })

            console.log(JSON.stringify(_this.user))
            }
        },
        send(){
             let _this=this;
              this.isTimes = true
              this.timer = setInterval(()=>{
                this.times--
                if(this.times===0){
              this.isTimes = false
             clearInterval(this.timer)
              }
            },1000)
            this.axios({
                    method:'post',
                    url:'http://120.79.130.29/user/sendMail',
                    headers: {
                    'Content-Type': 'application/json;charset=utf-8'     
                    }, 
                    data: JSON.stringify({userTel:_this.user.userTel}),     
                }).then(function(res){
                    if(res.data.code==200){
                        alert(res.data.msg);//验证码成功发送
                    }else{
                        alert(res.data.msg);//发送失败
                    }
                }).catch(error=>{
                    console.log(error);
            })
        },
        check(){
            if(this.user.userAccount==''){
                this.Amessage='注:账号不能为空'
            }else{
                this.Amessage=''
            }
            if(this.user.userPassword==''){
                this.Pmessage='注:密码不能为空'
            }else if(this.user.userPassword.length<6){
                this.Pmessage='注:密码最短6位'
            }else{
                this.Pmessage=''
            }
            var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
            if (!verify.test(this.user.userTel)) {
                this.Tmessage = '注:邮箱格式错误'
            }else{
                this.Tmessage = ''
            }
            if(this.user.userAge<0){
                this.Cmessage = '不能为负值'
            }else{
                this.Cmessage = ''
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
            }).then (function (response) {
                eventBus.$emit("sisterSaid",response.data);
            }).catch (function (error) {
                console.log(error.data);
                _this.message = error.data;
      });
    }
}
</script>

<style>
input::-webkit-input-placeholder{font-size: 8px;color:#616161;}
.main-register-box{width: 100%;height: 600px;background-image: url(../../assets/background1.jpg);background-size: 100% 100%;}
.main-input-box-t1{height: 40px;}
.main-register-content{margin: 0 auto;  width: 400px;height: 500px;border: 1px solid rgb(252, 215, 215);background:rgba(2, 102, 95, 0.212);}
.main-register-title{margin: 0 auto; width:200px;height: 70px;color: rgb(255, 255, 255);font-size: 40px;line-height: 80px;text-align: center;}
#register-input{margin: 20px auto 0;width:380px;text-align: left;color: rgb(255, 255, 255);}
#register-input .pointInformation{width: 50px; font-size: 13px;color: rgb(112, 20, 4);}
#register-input input{background:rgba(255, 255, 255, 0.39); outline:none; border:none;font-size:15px;color: white;}
#register-input button{width: 50px;height: 30px;background-color: rgba(255, 255, 255, 0.315);border:0;outline:none;color: white;}
#register-input button:hover{background-color: rgb(29, 157, 173);}
#register-input .Tel{width: 150px;height: 30px;}
#register-input .codesetting{width: 100px;height: 20px;}
#register-input input::-webkit-inner-spin-button {-webkit-appearance: none; appearance: none; margin: 0;}
</style>