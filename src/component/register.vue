<template>
    <div>
        <div class="header"><h2>注册</h2></div>
        <div class="register_logo">
            <span id="phone_register" @click="show(1,isActive)" v-bind:class="{active:isActive}">手机注册</span><span
                id="email_register" @click="show(2,isActive)" v-bind:class="{active:!isActive}">邮箱注册</span>
        </div>
        <div id="register_wrapper">
            <div class="register_center">
                <!--手机注册-->
                <div class="main_phone" v-show="vShow">
                    <form id="mobile_register" method="post" action="">
                        <div class="item3 register_user">
                            <input id="mobile_user" type="tel" v-model="phone" placeholder="请输入手机号" name="phone"
                                   required="required">
                        </div>
                        <div class="item3 register_password">
                            <input id="mobile_password" type="password" v-model="passw1" placeholder="请输入密码"
                                   name="password" required="required">
                        </div>
                        <div class="item3 register_password_again">
                            <input id="mobile_password_again" type="password" v-model="passw2" placeholder="请再次输入密码"
                                   name="password" required="required">
                        </div>
                        <div class="item3 register_code">
                            <input id="valid_code" type="text" placeholder="输入验证码" name="valid_code">
                            <span id="get_code"><a href="javascript:;">获取验证码</a></span>
                        </div>
                        <div class="register_btn"><a href="javascript:;" id="phone_reg" @click='goLogin()'>用户注册</a>
                        </div>
                    </form>
                    <div class="quickLogin" @click="quickLogin()">快速登录</div>
                </div>
                <!--邮箱注册-->
                <div class="email_register" v-show="!vShow">
                    <form id="email0_register" method="post" action="">
                        <div class="item3 register_user">
                            <input id="email_user" type="email" v-model="email" placeholder="请输入邮箱"
                                   name="email_username" required="required">
                        </div>
                        <div class="item3 register_password">
                            <input id="email_password" type="password" v-model="passw3" placeholder="请输入密码"
                                   name="password" required="required">
                        </div>
                        <div class="item3 register_password_again">
                            <input id="email_password_again" type="password" v-model="passw4" placeholder="请再次输入密码"
                                   name="password" required="required">
                        </div>
                        <div class="register_btn"><a href="javascript:;" id="email_reg" @click='goLogin1()'>用户注册</a>
                        </div>
                    </form>
                    <div class="quickLogin" @click="quickLogin()">快速登录</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="sass" rel="stylesheet/scss" type="text/css">
    @import "./../css/register"
</style>
<script>
import { Toast } from 'mint-ui';
 export default{
        data(){
            return {
                vShow:'true',
                isActive:'true',
                phone:'',
                passw1:'',
                passw2:'',
                email:'',
                passw3:'',
                passw4:''

            }
        },
        ready: function () {
        },
        methods: {
          show:function(type,isActive){
             if(type=='2'){
                this.vShow=false;
             }else{
                 this.vShow =true
             }
             if(isActive){
                this.isActive=false;
             }else{
              this.isActive=true;
             }
          },
          goLogin:function(){
            if(!(/^1[34578]\d{9}$/.test(this.phone))){
                alert("手机号码有误，请重填");
                return false;
            }
            if((this.passw1!==this.passw2)||(this.passw1=='') || (this.passw1==null) || (this.passw2 == null) || (this.passw2 =='')){
                 alert("密码填写不一致");
                 return false;
            }else{
                let phone=this.phone;
                let password = this.passw1;
                jQuery.support.cors=true;
                    $.ajax({
                        url: 'http://172.31.81.27:8080/trainingmanagement/user/signup',
                        data: JSON.stringify({"username":phone,"password":password}),
                        type: "post",
                        dataType: "JSON",
                        headers: {
                               Accept: "application/json; charset=utf-8"
                       },
                        supportCors: true,
                        crossDomain: true,
                        success:(data)=>{
                           this.$route.router.go({name:'login'});
                        },
                      });
            }
          },
          goLogin1:function(){
            if(!( /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(this.email)){
                alert("邮箱号码有误，请重填");
            }
            if(!(this.passw3===this.passw4) || (this.passw3=='') || (this.passw3==null) || (this.passw4 == null) || (this.passw4 =='')){
             alert("密码填写不一致");
             }else{
                let email=this.email;
                let password = this.passw3;
                jQuery.support.cors=true;
                    $.ajax({
                        url: 'http://172.31.81.27:8080/trainingmanagement/user/signup',
                        data: JSON.stringify({"username":email,"password":password}),
                        type: "post",
                        dataType: "JSON",
                        headers: {
                               Accept: "application/json; charset=utf-8"
                       },
                        supportCors: true,
                        crossDomain: true,
                        success:function(data){
                              this.$route.router.go({name: 'login'});
                        },
                      });
             }
          },
          quickLogin:function(){
          this.$route.router.go({name: 'login'});
          },
        }
    }






</script>
