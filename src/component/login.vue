<template>
        <div class="header"><h2>登录</h2></div>
        <div id="login_wrapper">
            <div class="login_center">
                <form id="login" method="post" action="">
                    <div class="item2 login_user">
                        <input id="login_user" type="text" placeholder="请输入手机号/邮箱" name="username" v-model="username" required>
                    </div>
                    <div class="item2 register_password">
                        <input id="mobile_password" type="password" placeholder="请输入密码" v-model="password" name="password" required>
                    </div>
                    <div class="item2 register_password_again">
                        <input id="mobile_password_again" type="password" placeholder="请再次输入密码" v-model="password1" name="password" required>
                    </div>
                    <div class="login_btn"><a href="javascript:;" id="login_in" @click="training()">登录</a></div>
                </form>
                <div class="login_register" @click="quickRegister()">快速注册</div>
            </div>
        </div>
</template>
<style lang="sass" rel="stylesheet/scss" type="text/css">
    @import "./../css/login"
</style>
<script>
    export default{
        data(){
            return {
            username:'',
            password:'',
            password1:'',
            userid:''

            }
        },
        ready: function () {

        },
        methods: {
        training:function(){
           if(!(/^1[34578]\d{9}$/.test(this.username))&&!( /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(this.username)){
              alert("用户名错误");
              return false;
           }
           if((this.password!==this.password1)||(this.password=='') || (this.password==null) || (this.password1 == null) || (this.password1 =='')){
                 alert("密码填写不一致");
                 return false;
            }else{
                let username = this.username;
                let password = this.password;
                jQuery.support.cors=true;
                $.ajax({
                    url: 'http://172.31.81.27:8080/trainingmanagement/user/signin',
                    data: JSON.stringify({"username":username,"password":password}),
                    type: "post",
                    dataType: "JSON",
                    headers: {
                           Accept: "application/json; charset=utf-8"
                   },
                    supportCors: true,
                    crossDomain: true,
                    success:(data)=>{
                     sessionStorage.setItem('userid',data.userid);
                       this.$route.router.go({name: 'training'});
                    },
                  });
            }
        },
        quickRegister:function(){
        this.$route.router.go({name: 'register'});
        }
        }
    }
</script>
