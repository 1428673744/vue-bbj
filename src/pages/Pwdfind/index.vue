<template>
  <div class="main-pwdfind-box">
        <div class="main-pwdfind-box-t"></div>
        <div class="main-pwdfind-content">
            <div class="main-pwdfind-title">找回密码</div>
            <div class="main-pwdfind">
                请输入账号：<input type="text" v-model="pwd.userAccount"><br><br>
                邮箱：<input type="text" v-model="pwd.userTel" class="Tel" v-on="email_blur()"><button @click="send" class="sendbutton">发送</button>{{message}}
                    <br><br>
                验证码：<input type="number" class="codesetting" v-model="pwd.emailCode"><br><br>
                请输入新密码：<input type="password" v-model="pwd.newPassword"><br><br>
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
            emailCode:0           
            },
            message:''
        }
    },
methods:{
    findpwd(){
         let _this=this;
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
                    _this.$router.push('/login')
                }else if(res.data.code==500){
                    alert(res.data.msg)
                }
            }).catch (function (error) {
                console.log(error.data);
                _this.message = error.data;
          });
         },
            send(){
             let _this=this;
            this.axios({
                    method:'post',
                    url:'http://localhost:8080/bbj/user/sendMail',
                    headers: {
                    'Content-Type': 'application/json;charset=utf-8'     
                    }, 
                    data: JSON.stringify({userAccount:_this.pwd.userAccount,userTel:_this.pwd.userTel}),     
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
         email_blur() {
                var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
                if (!verify.test(this.pwd.userTel)) {
                    this.message = '邮箱格式错误'
                } else {
                    this.message = '格式正确'

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
</style>