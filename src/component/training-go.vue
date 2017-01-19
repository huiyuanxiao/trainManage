<template>
    <div>
        <div class="header"><h2>培训发起</h2></div>
        <div class="traingo">
            <div class="item train-type">
                <span>培训名称：</span><input type="text" placeholder="请填写（必填）" name="trainingtype" v-model="trainName">
            </div>
            <div class="item train-name">
                <span>培训内容：</span><input type="text" placeholder="请填写（必填）" name="trainname" v-model="trainContent">
            </div>
            <div class="item train-content">
                <span>培训时间：</span><input type="date" placeholder="请填写（必填）" name="traincontent" v-model="trainTime">
            </div>
            <div class="item train-address">
                <span>培训地点：</span><input type="text" placeholder="请填写（必填）" name="trainaddress" v-model="trainAddress">
            </div>
            <div class="item train-people">
                <span>参加人员：</span><input type="text" placeholder="请选择（必填）" name="trainpeople"  v-model="names" @click="trainPeople()">
            </div>
            <button type="submit" id="trainGoSave" @click="submitAll()">保存</button>
        </div>
    </div>
</template>
<style lang="sass" rel="stylesheet/scss" type="text/css">
    @import "./../css/traingo"
</style>
<script>
   export default{
        data(){
            return {
                names:'',
                trainName:'',
                trainContent:'',
                trainTime:'',
                trainAddress:'',
                userId:'',
                arrayUserid:[]
            }
        },
        ready: function () {
                let trainNameAll =JSON.parse(this.$route.params.nameList);
                console.log(trainNameAll);
                let arrayName=[];
            for(let item of trainNameAll){
               arrayName.push(item.username);
               this.arrayUserid.push(item.userid);
            }
            this.names = arrayName.join(',');
        },
        methods: {
          trainPeople:function(){
           this.$route.router.go({name: 'train-people'});
          },
          submitAll:function(){
              let trainName=this.trainName;
              let trainContent = this.trainContent;
              let trainTime = new Date((this.trainTime).replace(new RegExp("-","gm"),"/")).getTime();
              let trainAddress = this.trainAddress;
              let nameContent=sessionStorage.getItem('useridlist');
              let userId=sessionStorage.getItem('userid');
              jQuery.support.cors=true;
                $.ajax({
                    url: 'http://172.31.81.27:8080/trainingmanagement/train/sponsor',
                    data: JSON.stringify({"userid":userId,"content":trainContent,"useridlist":this.arrayUserid,"trainname":trainName,"trainlocation":trainAddress,"time":trainTime}),
                    type: "post",
                    dataType: "JSON",
                    headers: {
                           Accept: "application/json; charset=utf-8"
                   },
                    supportCors: true,
                    crossDomain: true,
                    success:(data)=>{
                      this.$route.router.go({name: 'training',params:{nameContent:this.names,trainName:this.trainName,trainContent:this.trainContent,trainTime:this.trainTime,trainAddress:this.trainAddress}});
                    },
                  });
          }

        }
    }
</script>
