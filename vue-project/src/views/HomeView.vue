<template>

    <div class="homeview-header">
        <span class="homeview-welcome-title">欢迎，</span>
        <span class="homeview-welcome-username">{{store.userInfo.userName}}</span>
        <div style="flex-grow: 1;"></div>
        
    </div>

    <div class="homeview-level-show">
        <div style=" padding: 30px">
            <a-row :gutter="16">
                <a-col :span="8">
                    <a-card style="box-shadow: 2px 2px 5px rgb(201, 201, 201); border-radius: 12px;" >
                        <a-statistic title="我的权限" :value="getPremission()" 
                            :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
                        </a-statistic>
                    </a-card>
                </a-col>
                <a-col :span="12">
                    
                </a-col>
            </a-row>
        </div>
    </div>

    <div class="homeview-header" style="margin-top: 50px; ">
        <span class="homeview-info-title">系统信息</span>
        <div style="flex-grow: 1;"></div>
    </div>

    <div class="homeview-level-show">
        <div style=" padding: 30px">
            <a-row :gutter="16">
                <a-col :span="8">
                    <a-card style="box-shadow: 2px 2px 5px rgb(201, 201, 201); border-radius: 12px;" >
                        <a-statistic title="当前时间" :value="time" 
                            :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
                        </a-statistic>
                    </a-card>
                </a-col>
                <a-col :span="8">
                    <a-card style="box-shadow: 2px 2px 5px rgb(201, 201, 201);  border-radius: 12px;">
                        <a-statistic title="系统用户数" :value="userCount" 
                            :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
                        </a-statistic>
                    </a-card>
                </a-col>
            </a-row>
        </div>
    </div>

    <div class="homeview-level-show">
        <div style=" padding: 30px">
            <a-row :gutter="16">
                <a-col :span="8">
                    <a-card style="box-shadow: 2px 2px 5px rgb(201, 201, 201);  border-radius: 12px;">
                        <a-statistic title="档案数" :value="fileCount" 
                            :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
                        </a-statistic>
                    </a-card>
                </a-col>
                <a-col :span="8">
                    <a-card style="box-shadow: 2px 2px 5px rgb(201, 201, 201);  border-radius: 12px;">
                        <a-statistic title="待复核档案数" :value="uncheckFileCount" 
                            :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
                        </a-statistic>
                    </a-card>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script setup>
import { onMounted,ref } from 'vue';
import { useAdminStore } from '../stores';
import { getAllUserInfo } from '../request/api/user';
import { getFileInfo,getUncheckFileInfo } from '../request/api/file';



    const store = new useAdminStore();

    let time = ref('');

    let userCount = ref(0);
    let fileCount = ref(0);
    let uncheckFileCount = ref(0);


    //获取用户权限
    function getPremission(){
        switch (store.userInfo.userPermission){
            case 10: return("超级管理员")
            case 2: return("经理")
            case 1: return("专员")
            default: return("访客")
        }
    }

    //获取信息
    async function getMessage(){
        userCount.value = (await getAllUserInfo(store.token,{index: 0})).data.data.total;
        fileCount.value = (await getFileInfo(store.token,{index: 0})).data.data.total;
        uncheckFileCount.value = (await getUncheckFileInfo(store.token,{index: 0})).data.data.total;
    }

    onMounted(()=>{
        getMessage();
        getNowTime();
    })




function getNowTime() {
    let speed = 1000;
    let theNowTime = function () {
        time.value = timeNumber();
    }
    setInterval(theNowTime, speed);
}
function timeNumber() {
    let today = new Date()
    // let date = today.getFullYear() + '年' + this.twoDigits(today.getMonth() + 1) + '月' + this.twoDigits(today.getDate()) + '日';
    let time = twoDigits(today.getHours()) + ':' + twoDigits(today.getMinutes()) + ':' + twoDigits(today.getSeconds());
    return time;
}


function twoDigits(val) {
    if (val < 10) return '0' + val;
    return val;
}


</script>

<style>
/* 顶部容器设置为弹性布局 */
.homeview-header{
    width: 100%;
    display: flex;
    align-items: center;
}
/* 欢迎语 */
.homeview-welcome-title{
    font-size: 25px;
    font-weight: bold;
}
.homeview-welcome-username{
    font-size: 25px;
    font-weight: bold;
}
/* 权限展示 */
.homeview-level-show{
    margin-top: 50px;
}
/* 系统信息 */
.homeview-info-title{
    font-size: 25px;
    font-weight: bold;
}


</style>