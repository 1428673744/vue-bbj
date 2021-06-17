<template>
  <div class="main-pwdfind-box">
        <div class="main-pwdfind-box-t"></div>
        <div class="main-pwdfind-content">
            <div class="main-pwdfind-title">找回密码</div>
            <div class="main-pwdfind">
                请输入账号：<input type="text" v-model="pwd.userAccount"><br><br>
                请输入密保答案：<input type="text" v-model="pwd.userAnswer"><br><br>
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
            userAnswer:'',
            newPassword:'',
            scdPassword:''             
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
                data: JSON.stringify(_this.pwd),              
            }).then (function (res) {
                console.log(res.data);
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
}
}
</script>

<style>
.main-pwdfind-box{width: 100%;height: 600px;background-image: url(../../assets/background.jpg); background-size: 100% 100%;}
.main-pwdfind-box-t{ width: 500px;height: 40px;}
.main-pwdfind-content{margin: 0 auto; width: 500px;height: 450px;border: 1px solid rgb(250, 255, 184);background:rgba(4, 40, 46, 0.322);text-align: center;}
.main-pwdfind-title{margin: 0 auto; width:200px;height: 80px;color: rgb(255, 255, 255);font-size: 40px;line-height: 80px;text-align: center;}
.main-pwdfind{margin: 30px 0;color:rgb(255, 255, 255);font-size: 20px;}
.main-pwdfind input{width: 200px;height: 30px;background:rgba(255, 255, 255, 0.39); outline:none; border:none;font-size:15px;color: rgb(255, 255, 255);}
.main-pwdfind button{width: 70px;height: 40px;background-color: rgba(255, 255, 255, 0.205);border:0;outline:none;color: white;font-size: 16px;}
</style>