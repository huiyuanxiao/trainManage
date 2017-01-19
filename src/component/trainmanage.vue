<template>
    <div>
        <div class="headerAll"><h2>个人培训管理详情页</h2></div>
        <div class="train-selfAll">
            <div class="train-editAll"><h2>培训详情</h2><div class="editImg" @click="editEnable()"><img src="./../img/edit.png"></div></div>
            <div class="train-detailAll">
                <ul class="trainDetailList1">
                    <li>
                        <div class="train-name1">培训名称：<input class="detailList" type="text" v-model="trainNameList" v-bind:readonly="isReadOnly"></div>
                        <div class="train-address1">培训地点：<input class="detailList" type="text" v-model="trainAddressList" v-bind:readonly="isReadOnly"></div>
                        <div class="train-type1">培训时间：<input class="detailList" type="text" v-model="trainTimeList" v-bind:readonly="isReadOnly"></div>
                        <div class="train-content1">培训内容：<input class="detailList" type="text" v-model="trainContentList" v-bind:readonly="isReadOnly"></div>
                        <div class="train-patr-people1" style="display:none">
                            <p>参与人员：<input type="text" v-model="nameAll" readonly></p>
                        </div>
                        <div class="train-patr-people1" style="display:none;">
                            <p>培训ID：<input type="text" v-model="trainIdList" readonly></p>
                        </div>
                    </li>
                </ul>

            </div>
        </div>
        <div class="listSaveAll1" @click="listSave()">保存</div>
    </div>
</template>
<style lang="sass" rel="stylesheet/scss" type="text/css">
    @import "../css/trainmanage"
</style>
<script>
   export default{
        data(){
            return {
            trainTimeList:'',
            trainNameList:'',
            trainContentList:'',
            trainAddressList:'',
            nameAll:'',
            trainIdList:'',
            isReadOnly:''

            }
        },
        ready: function () {
           this.nameAll=this.$route.params.trainPeople;
           this.trainTimeList=this.$route.params.trainTime;
           this.trainNameList=this.$route.params.trainName;
           this.trainContentList=this.$route.params.trainContent;
           this.trainAddressList=this.$route.params.trainAddress;
           this.trainIdList = this.$route.params.trainId;
        },
        methods: {
           editEnable:function(){
           if(this.isReadOnly==true){
               this.isReadOnly =false;
           }else{
               this.isReadOnly =true;
               }
           },
           listSave:function(){
             jQuery.support.cors=true;
             let userId=sessionStorage.getItem('userid');
             let trainIdAll = this.trainIdList;
             let content = this.trainContentList;
             let useridlist = this.nameAll.split(",");
             let userIdAll=[];
             for(let i in useridlist){
                 userIdAll.push(useridlist[i]);
             }
             let time = new Date((this.trainTimeList).replace(new RegExp("-","gm"),"/")).getTime();
             let trainname = this.trainNameList;
             let trainlocation = this.trainAddressList;
                $.ajax({
                    url: 'http://172.31.81.27:8080/trainingmanagement/train/modify',
                    data: JSON.stringify({"userid":userId,"trainid":trainIdAll,"content":content,"useridlist":userIdAll,"time":time,"trainname":trainname,"trainlocation":trainlocation}),
                    type: "post",
                    dataType: "JSON",
                    headers: {
                           Accept: "application/json; charset=utf-8"
                   },
                    supportCors: true,
                    crossDomain: true,
                    success:(data)=>{
                       this.$route.router.go({name: 'training',params:{trainName:this.trainNameList,trainAddress:this.trainAddressList}});
                    },
                  });

           }
        }
    }
</script>
