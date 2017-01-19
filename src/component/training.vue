<template>
    <div>
        <div class="header"><h2>培训管理</h2></div>
        <div class="header_nav">
            <span id="train_start" @click="show(1,isActive)" v-bind :class="{active:isActive}">培训发起</span><span id="train_mag" @click="show(2,isActive)" v-bind:class="{active:!isActive}">培训管理</span>
        </div>
        <div class="train_center">
            <div class="train_mag" v-show="vShow" @click="trainingList()"><a href="javascript:;"><img src="./../img/train_go.png"><p>培训发起</p></a></div>
            <div class="train_go" v-show="!vShow">
                <div class="train-search">
                    <input type="search" id="serach-train" name="trainsearch" v-model="search" @click="searchTrain()">
                </div>
                <div class="train-sponsor">
                    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
                    <ul v-for="(index,item) in trainings" @click="showDetail($index)">
                         <mt-cell-swipe :left="[content:'删除'，style:{}, handler: () => listDelete($index)]" class="cellSwipe">
                            <div class="train-name">培训名称：<span>{{item.trainname}}</span></div>
                            <div class="train-address">培训地点：<span>{{item.trainlocation}}</span></div>
                             <div class="train-content">培训内容：<span>{{item.content}}</span></div>
                             <div class="train-date" style="display:none">培训时间：<span>{{item.time}}</span></div>
                             <div class="train-people" style="display:none">培训人员：<span>{{item.useridlist}}</span></div>
                             <div class="train-Id" style="display:none">培训编号：<span>{{item.trainId}}</span></div>
                        </mt-cell-swipe>
                    </ul>
                    </mt-loadmore>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="sass" rel="stylesheet/scss" type="text/css">
    @import "./../css/training"
</style>
<script>
import Vue from 'vue';
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
import { CellSwipe } from 'mint-ui';
Vue.component(CellSwipe.name, CellSwipe);
   export default{
        data(){
            return {
                vShow:'true',
                isActive:'true',
                search:'',
                bottomStatus:'',
                trainings:[]
            }
        },
        ready: function () {
           let userId=sessionStorage.getItem('userid');
           jQuery.support.cors=true;
                $.ajax({
                    url: 'http://172.31.81.27:8080/trainingmanagement/train/display',
                    type: "post",
                    data: JSON.stringify({"userid":userId}),
                    dataType: "JSON",
                    headers: {
                           Accept: "application/json; charset=utf-8"
                   },
                    supportCors: true,
                    crossDomain: true,
                    success:(data)=>{
                    this.trainings = data.trains;
                    },
                  });
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
          trainingList:function(){
             this.$route.router.go({name: 'training-go'});
          },
          showDetail:function(index){
          let indexList = index;
          let trainingList =this.trainings;
          for(let item in trainingList){
              Date.prototype.format = function (format) {
                var o = {
                    "M+": this.getMonth() + 1,
                    "d+": this.getDate(),
                    "h+": this.getHours(),
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "q+": Math.floor((this.getMonth() + 3) / 3),
                    "S": this.getMilliseconds()
                }
                if (/(y+)/.test(format)) {
                    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                    }
                }
                return format;
            }
            function getSmpFormatDate(date, isFull) {
                var pattern = "";
                if (isFull == true || isFull == undefined) {
                    pattern = "yyyy-MM-dd hh:mm:ss";
                } else {
                    pattern = "yyyy-MM-dd";
                }
                return getFormatDate(date, pattern);
            }
            function getSmpFormatNowDate(isFull) {
                return getSmpFormatDate(new Date(), isFull);
            }
            function getSmpFormatDateByLong(l, isFull) {
                return getSmpFormatDate(new Date(l), isFull);
            }
            function getFormatDateByLong(l, pattern) {
                return getFormatDate(new Date(l), pattern);
            }
            function getFormatDate(date, pattern) {
                if (date == undefined) {
                    date = new Date();
                }
                if (pattern == undefined) {
                    pattern = "yyyy-MM-dd hh:mm:ss";
                }
                return date.format(pattern);
            }
              if(indexList == item){
                let trainName = trainingList[item].trainname;
                let trainContent =trainingList[item].content;
                let trainAddress = trainingList[item].trainlocation;
                let trainTime = getSmpFormatDateByLong(trainingList[item].establishdata.time,false);
                let trainPeople =trainingList[item].useridlist;
                let trainId = trainingList[item].trainid;
                this.$route.router.go({name: 'trainmanage',params:{trainName:trainName,trainAddress:trainAddress,trainContent:trainContent,trainTime:trainTime,trainPeople:trainPeople,trainId:trainId}});
              }
            }
          },
          searchTrain:function(){
            jQuery.support.cors=true;
            let trainNameSearch = document.getElementById("serach-train").value;
                $.ajax({
                    url: 'http://172.31.81.27:8080/trainingmanagement/train/search',
                    type: "post",
                    data: JSON.stringify({"trainname":trainNameSearch}),
                    dataType: "JSON",
                    headers: {
                           Accept: "application/json; charset=utf-8"
                   },
                    supportCors: true,
                    crossDomain: true,
                    success:(data)=>{
                    this.trainings = data.trains;
                    },
                  });
          },
          listDelete:function(index){
           let userId=sessionStorage.getItem('userid');
           let indexList = index;
          let trainingList =this.trainings;
          for(let item in trainingList){
             if(indexList == item){
                let trainId = trainingList[item].trainid;
             }
          }
           jQuery.support.cors=true;
                $.ajax({
                    url: 'http://172.31.81.27:8080/trainingmanagement/train/delete',
                    type: "post",
                    data: JSON.stringify({"userid":userId,"trainid":trainId}),
                    dataType: "JSON",
                    headers: {
                           Accept: "application/json; charset=utf-8"
                   },
                    supportCors: true,
                    crossDomain: true,
                    success:(data)=>{

                    },
                  });
          }
        }
       }
</script>
