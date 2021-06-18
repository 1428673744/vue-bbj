<template>
<div class="person-all">
    <div class="person-information">
    <div class="person-information-title">用户个人信息</div>
    <div class="person-information-box">
        <div>
        用户账号:{{user.userAccount}}
        </div>
        <form  @submit.prevent="changeif">
        <div>
             性别：男<input type="radio" name="userSex" v-model="user.userSex" value="male">
            女<input type="radio" name="userSex" v-model="user.userSex" value="female"><br><br>
        </div>
        <div>年龄：<input type="number" name="" id="" v-model="user.userAge" class="changeinput" min='0' max='200'> <span class="pointInformation">{{Cmessage}}</span></div>
        <div> 邮箱：<input type="text" v-model="user.userTel" class="changeinput"  v-on="check()"><span class="pointInformation">{{Tmessage}}</span></div>
        <div><button>修改</button></div>
        </form>
    </div>
    </div>
</div>
</template>

<script>
import { eventBus } from '../../main'
export default {
 data(){
        return{
            user:{
            userAccount:'',
            userSex:'male',
            userAge:10,
            userTel:'ddd',
            userPic:'',
            userAnswer:''
            },
            Tmessage:'',
            Cmessage:''
        }
     },
     methods:{
         changeif(){
           let _this=this;
            var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
           if(!verify.test(this.user.userTel)) {
                this.Tmessage = '邮箱格式错误'
            }else if(this.user.userAge<0){
                this.Cmessage = '不能为负值'
            }else{
            this.axios({
                method: 'post',     
                url: "http://localhost:8080/bbj/user/changeInformation",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'     
                }, 
                data: JSON.stringify(_this.user),              
            }).then (function (res) {
                if(res.data.code==200){
                    alert(res.data.msg)
                }else{
                    alert(res.data.msg)
                }
            }).catch (function (error) {
                console.log(error.data);
                _this.message = error.data;
            });   
         }
         },
          check(){
            var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
            if (!verify.test(this.user.userTel)) {
                this.Tmessage = '邮箱格式错误'
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
                url: "http://localhost:8080/bbj/user/getInformation",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'     
                },              
            }).then (function (response) {
                console.log(response.data)
                 _this.user.userAccount=response.data.userAccount
                 _this.user.userSex=response.data.userSex
                 _this.user.userAge=response.data.userAge
                 _this.user.userTel=response.data.userTel
                 _this.user.userAnswer=response.data.userAnswer
                eventBus.$emit("sisterSaid",response.data.userAccount);
            }).catch (function (error) {
                console.log(error.data);
                _this.message = error.data;
      });
  },
}
</script>

<style>
.person-all{width: 100%;height: 600px;display: flex;justify-content: space-around;background-color: rgba(122, 219, 171, 0.308);}
.person-information{margin-top: 20px; width: 700px;height: 550px;background-color: rgba(100, 221, 237, 0.479);border-radius: 30px;}
.person-information-title{margin: 0 auto; width: 200px;height: 40px; font-size: 30px;line-height: 40px;text-align: center;color: rgb(0, 168, 168);}
.person-information-box{margin: 0 auto; width: 600px;height: 450px;background-color: rgba(3, 68, 49, 0.336);color: white;font-size: 20px;}
.person-collect{width: 400px;height: 400px; background-color: rgba(153, 205, 50, 0.356);}
.person-information-box div{margin: 0 auto; width: 500px;height: 60px;line-height: 60px;}
.person-information-box .changeinput{width: 300px;height: 20px; background-color: rgba(0, 0, 0, 0);border:1px solid rgba(0, 0, 0, 0.479) ;outline:none;}
.person-information-box .changeinput::-webkit-inner-spin-button {-webkit-appearance: none; appearance: none; margin: 0;}
.person-information-box div button{margin-left: 200px; width: 50px;height: 30px;background-color: rgba(255, 255, 255, 0.315);border:0;outline:none;color: white;font-size: 18px;}
.person-information-box div button:hover{background-color: rgb(29, 157, 173);}
.person-information-image{margin-top: 40px; width: 400px;height: 400px;background-color: rgba(184, 184, 184, 0.363);}
</style>