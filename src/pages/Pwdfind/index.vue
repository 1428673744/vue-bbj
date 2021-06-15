<template>
  <div class="main-pwdfind-box">
        <div class="main-pwdfind-box-t"></div>
        <div class="main-pwdfind-content">
            <div class="main-pwdfind-title">找回密码</div>
            <div class="main-pwdfind">
                请输入账号：<input type="text" v-model="user.userAccount"><br><br>
                请输入密保答案：<input type="password" v-model="user.userAnswer"><br><br>
                 <button @click="findpwd">找回密码</button>
            </div>
        </div>
  </div>
</template>

<script>
export default {
 data(){
        return {
            user:{
            userAccount:'默认',
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
    findpwd(){
         let _this=this;
            this.axios({
                method: 'post',     
                url: "http://localhost:8080/bbj/user/find",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'     
                },  
                data: JSON.stringify(_this.user),              
            }).then (function (res) {
                console.log(res.data);
            }).catch (function (error) {
                console.log(error.data);
                _this.message = error.data;
      });
    }
}
}
</script>

<style>
.main-pwdfind-box{width: 100%;height: 600px;background-image: url(../../assets/background.jpg); background-size: 100% 100%;}
.main-pwdfind-box-t{ width: 500px;height: 40px;}
.main-pwdfind-content{margin: 0 auto; width: 500px;height: 400px;border: 1px solid rgb(250, 255, 184);background:rgba(4, 40, 46, 0.322);text-align: center;}
.main-pwdfind-title{margin: 0 auto; width:200px;height: 80px;color: rgb(255, 255, 255);font-size: 40px;line-height: 80px;text-align: center;}
.main-pwdfind{margin: 50px 0;color:rgb(255, 255, 255);font-size: 20px;}
.main-pwdfind input{width: 200px;height: 30px;background:rgba(255, 255, 255, 0.39); outline:none; border:none;font-size:15px;}
.main-pwdfind button{width: 60px;height: 30px;background-color: rgba(255, 255, 255, 0.205);border:0;outline:none;color: white;}
</style>