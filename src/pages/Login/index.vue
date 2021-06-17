<template>
    <section class="main-input-box">
        <div class="main-input-box-t"></div>
        <div class="main-input-content">
            <div class="main-input-title">用户登陆</div>
            <div id="login-input">
                    请输入账号：<input type="text" v-model="user.userAccount" v-on="check()"><span class="pointInformation">{{Amessage}}</span><br><br>
                    请输入密码：<input type="password" v-model="user.userPassword" ><span class="pointInformation">{{Pmessage}}</span><br><br>
                    <div class="compare-code">
                    <input type="text" v-model="code" auto-complete="off">
                    <div class="compare-code-image" @click="getVerifyCode"><img :src="codesrc"></div>
                    </div>
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
            userAccount:'',
            userPassword:'',
            userSex:'male',
            userAge:10,
            userTel:'',
            userPic:'',
            userAnswer:''
            },
            code:'',
            codesrc:'',
            Amessage:'',
            Pmessage:''
        }
    },
    methods:{
        ...mapMutations(['changeLogin']),
        login(){
            let _this=this;
            if(this.user.userAccount==''){
                this.Amessage='注:账号不能为空'
            }else if(this.user.userPassword==''){
                this.Pmessage='注:密码不能为空'
            }else if(this.user.userPassword.length<6){
                this.Pmessage='注:密码最短6位'
            }else{
                this.axios({
                    method:'post',
                    url:'http://localhost:8080/bbj/user/login',
                    headers: {
                    'Content-Type': 'application/json;charset=utf-8'     
                    }, 
                   data: JSON.stringify({user:_this.user,code:_this.code}),    
                }).then(function(res){
                    console.log(res.data)
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
        },
        getVerifyCode(){
           this.codesrc = "http://localhost:8080/bbj/user/getCode?time="+new Date().getTime();
        },
        userinit(){
                let _this=this;
                this.axios({
                method: 'post',     
                url: "http://localhost:8080/bbj/user/getInformation",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'     
                },              
            }).then (function (response) {
                eventBus.$emit("sisterSaid",response.data.userAccount);
            }).catch (function (error) {
                console.log(error.data);
                _this.message = error.data;
         });
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
        }
    },
    mounted(){
        this.getVerifyCode()
        this.userinit()
    }
}
</script>

<style>
input::-webkit-input-placeholder{font-size: 8px;color:#616161;}
.main-input-box{width: 100%;height: 600px;background-image: url(../../assets/background.jpg); background-size: 100% 100%;}
.main-input-box-t{ width: 500px;height: 40px;}
.main-input-content{margin: 0 auto; width: 500px;height: 400px;border: 1px solid rgb(250, 255, 184);background:rgba(4, 40, 46, 0.322);}
.main-input-title{margin: 0 auto; width:200px;height: 80px;color: rgb(255, 255, 255);font-size: 40px;line-height: 80px;text-align: left;}
#login-input{margin-left: 50px; margin-top: 50px;color:rgb(255, 255, 255);font-size: 20px;}
#login-input input{width: 200px;height: 30px;background:rgba(255, 255, 255, 0.39); outline:none; border:none;font-size:17px;color: rgb(255, 255, 255);}
.compare-code{margin: 0 auto; width: 240px;height: 50px;line-height: 80px;display: flex;justify-content: space-around;}
#login-input .compare-code input{margin-top: 8px; width: 110px;height:40px;color: white;}
.login-input-button{margin: 25px auto;width: 200px;height: 40px;display: flex;justify-content: space-around;}
#login-input button{width: 60px;height: 30px;background-color: rgba(255, 255, 255, 0.205);border:0;outline:none;color: white;}
#login-input .pointInformation{width: 50px; font-size: 13px;color: rgb(112, 20, 4);}
</style>