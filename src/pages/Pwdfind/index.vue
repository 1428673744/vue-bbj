<template>
  <div class="main-pwdfind-box">
        <div class="main-pwdfind-box-t"></div>
        <div class="main-pwdfind-content">
            <div class="main-pwdfind-title">找回密码</div>
            <div class="main-pwdfind">
                请输入账号：<input type="text" v-model="pwd.userAccount" v-on="check()"><span class="pointInformation">{{Amessage}}</span><br><br>
                邮箱：<input type="text" v-model="pwd.userTel" class="Tel"><button @click="send" class="sendbutton">发送</button><span class="pointInformation">{{Tmessage}}</span>
                    <br><br>
                验证码：<input type="number" class="codesetting" v-model="pwd.emailCode"><br><br>
                请输入新密码：<input type="password" v-model="pwd.newPassword"><span class="pointInformation">{{message}}</span><br><br>
                再次输入新密码：<input type="password" v-model="pwd.scdPassword"><br><br>
                 <button @click="findpwd">找回密码</button>
            </div>
        </div>
  </div>
</template>

<script>
export default {
 data(){
        return {
            pwd:{
            userAccount:'',
            userTel:'',
            newPassword:'',
            scdPassword:'',
            emailCode:''         
            },
            Amessage:'',
            Tmessage:'',
            message:''
        }
    },
methods:{
    findpwd(){
             let _this=this;  
            var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
            if(this.pwd.userAccount==''){
                this.Amessage='注:账号不能为空'
            }else if (!verify.test(this.pwd.userTel)) {
                this.Tmessage='注:邮箱格式错误'
            }else if(this.pwd.newPassword!=this.pwd.scdPassword){
                this.message='注:两次密码不一致'
            }else if(this.pwd.newPassword.length<6||this.pwd.scdPassword.length<6){
                this.message='注:密码最短6位'
            }else{
                this.axios({
                    method: 'post',     
                    url: "http://localhost:8080/bbj/user/find",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'     
                    },  
                    data: JSON.stringify(_this.pwd),              
                }).then (function (res) {
                    console.log(res.data);
                    if(res.data.code==200)
                    {
                        alert(res.data.msg)
                        _this.$router.push('/login');
                    }else if(res.data.code==500){
                        alert(res.data.msg)
                    }
                }).catch (function (error) {
                    console.log(error.data);
                    _this.message = error.data;
                });
            }
           
         },
            send(){
             let _this=this;
            this.axios({
                    method:'post',
                    url:'http://localhost:8080/bbj/user/sendMail',
                    headers: {
                    'Content-Type': 'application/json;charset=utf-8'     
                    }, 
                    data: JSON.stringify({userTel:_this.pwd.userTel}),     
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
            if(this.pwd.userAccount==''){
                this.Amessage='注:账号不能为空'
            }else{
                this.Amessage=''
            }
            var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
            if (!verify.test(this.pwd.userTel)) {
                this.Tmessage = '注:邮箱格式错误'
            }else{
                this.Tmessage = ''
            }
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
}
}
</script>

<style>
.main-pwdfind-box{width: 100%;height: 600px;background-image: url(../../assets/background.jpg); background-size: 100% 100%;}
.main-pwdfind-box-t{ width: 500px;height: 40px;}
.main-pwdfind-content{margin: 0 auto; width: 500px;height: 450px;border: 1px solid rgb(250, 255, 184);background:rgba(4, 40, 46, 0.322);}
.main-pwdfind-title{margin: 0 auto; width:200px;height: 80px;color: rgb(255, 255, 255);font-size: 40px;line-height: 80px;text-align: center;}
.main-pwdfind{margin-left: 20px; width: 450px; color:rgb(255, 255, 255);font-size: 20px;}
.main-pwdfind input{width: 200px;height: 30px;background:rgba(255, 255, 255, 0.39); outline:none; border:none;font-size:15px;color: rgb(255, 255, 255);}
.main-pwdfind button{width: 70px;height: 40px;background-color: rgba(255, 255, 255, 0.205);border:0;outline:none;color: white;font-size: 16px;}
.main-pwdfind input::-webkit-inner-spin-button {-webkit-appearance: none; appearance: none; margin: 0;}
.main-pwdfind .Tel{width: 200px;}
.main-pwdfind .codesetting{width: 100px;}
.main-pwdfind .sendbutton{ height: 32px;}
.main-pwdfind .pointInformation{width: 50px; font-size: 13px;color: rgb(112, 20, 4);}
</style>