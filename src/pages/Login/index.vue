<template>
    <section class="main-input-box">
        <div class="main-input-box-t"></div>
        <div class="main-input-content">
            <div class="main-input-title">用户登陆</div>
            <div id="login-input">
                    请输入账号：<input type="text" v-model="user.userAccount"><br><br>
                    请输入密码：<input type="password" v-model="user.userPassword"><br><br>
                    <div class="login-input-button">
                        <button @click="login">登陆</button>
                        <button @click="gofind">忘记密码</button>
                    </div>
            </div>
        </div>
       
    </section>
</template>

<script>
import { mapMutations } from 'vuex'
import { eventBus } from '../../main'
export default{
    data(){
        return{
            user:{
            userAccount:'小明兄弟',
            userPassword:'123',
            userSex:'male',
            userAge:10,
            userTel:'',
            userPic:'',
            userAnswer:''
            }
        }
    },
    methods:{
        ...mapMutations(['changeLogin']),
        login(){
            let _this=this;
            if(this.user.username === ''|| this.user.password === ''){
                alert('账号和密码不能为空！')
            }else{
                this.axios({
                    method:'post',
                    url:'http://localhost:8080/bbj/user/login',
                    headers: {
                    'Content-Type': 'application/json;charset=utf-8'     
                    }, 
                    data: JSON.stringify(_this.user),     
                }).then(function(res){
                    if(res.data.result.code==200){
                    _this.userToken = res.data.data.token;//前端拿到token，将token存储到localStorage和vuex中，并跳转路由页面
                    // 将用户token保存到vuex中
                    _this.changeLogin({Authorization:_this.userToken});
                    _this.$router.push('/home');
                    alert(res.data.result.msg);
                    }
                    else{
                    alert(res.data.result.msg);
                    }
                }).catch(error=>{
                    console.log(error);
                })

            console.log(JSON.stringify(_this.user))
            }
            
        },
        gofind(){
            this.$router.push('/pwdfind');
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
    }
}
</script>

<style>
.main-input-box{width: 100%;height: 600px;background-image: url(../../assets/background.jpg); background-size: 100% 100%;}
.main-input-box-t{ width: 500px;height: 40px;}
.main-input-content{margin: 0 auto; width: 500px;height: 400px;border: 1px solid rgb(250, 255, 184);background:rgba(4, 40, 46, 0.322);text-align: center;}
.main-input-title{margin: 0 auto; width:200px;height: 80px;color: rgb(255, 255, 255);font-size: 40px;line-height: 80px;text-align: center;}
#login-input{margin: 50px auto 0;color:rgb(255, 255, 255);font-size: 20px;}
#login-input input{width: 200px;height: 30px;background:rgba(255, 255, 255, 0.39); outline:none; border:none;font-size:17px;color: rgb(255, 255, 255);}
.login-input-button{margin: 25px auto;width: 200px;height: 40px;display: flex;justify-content: space-around;}
#login-input button{width: 60px;height: 30px;background-color: rgba(255, 255, 255, 0.205);border:0;outline:none;color: white;}
</style>