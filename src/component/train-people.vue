<template>
    <div>
        <div class="header"><h2>培训人员</h2></div>
        <div class="train-peopleAllList">
            <div class="item1" v-for="item in items">
                <input type="checkbox" v-model="checkNames" value="{{item.userid}}">
                <label>{{item.username}}</label>
            </div>
        </div>
        <div class="submit-people"><input id="submit-all" type="submit" name="submit" value="提交" @click="submit()">
        </div>
    </div>
</template>
<style lang="sass" rel="stylesheet/scss" type="text/css">
    @import "../css/train-people"
</style>
<script>
   export default{
        data(){
            return {
            items:[],
            checkNames:[]
            }
        },
        ready: function () {
             jQuery.support.cors=true;
            $.ajax({
                url: 'http://172.31.81.27:8080/trainingmanagement/user/getusers',
                type: "post",
                dataType: "JSON",
                headers: {
                       Accept: "application/json; charset=utf-8"
               },
                supportCors: true,
                crossDomain: true,
                success:(data)=>{
                  this.items=data.users;
                },
              });
        },
        methods: {
            submit:function(){
                let array=[];
                for(let item of this.items){
                       for(let check of this.checkNames){
                            if(check==item.userid){
                                array.push(item)
                            }
                       }
                }
              this.$route.router.go({name: 'training-go',params:{nameList:JSON.stringify(array)}});
            }
        }
    }








</script>
'