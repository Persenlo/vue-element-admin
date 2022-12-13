<template>

    <div class="homeview-header">
        <span class="homeview-welcome-title">欢迎，</span>
        <span class="homeview-welcome-username">{{store.userInfo.userName}}</span>
        <div style="flex-grow: 1;"></div>
        <a-button type="primary" shape="round" size="large">
            <i class="iconfont icon-edit"></i>
            编辑我的资料
        </a-button>
    </div>

    <div class="homeview-level-show">
        <div style=" padding: 30px">
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-card style="box-shadow: 2px 2px 5px rgb(201, 201, 201);">
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

    <div class="homeview-header" style="margin-top: 50px;">
        <span class="homeview-info-title">系统信息</span>
        <div style="flex-grow: 1;"></div>
    </div>

    <div class="homeview-level-show">
        <div style=" padding: 30px">
            <a-row :gutter="16">
                <a-col :span="12">
                    <a-card style="box-shadow: 2px 2px 5px rgb(201, 201, 201);">
                        <a-statistic title="档案数" :value="0" 
                            :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
                        </a-statistic>
                    </a-card>
                </a-col>
                <a-col :span="12">
                    <a-card style="box-shadow: 2px 2px 5px rgb(201, 201, 201);">
                        <a-statistic title="系统用户数" :value="0" 
                            :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
                        </a-statistic>
                    </a-card>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script setup>
import { useAdminStore } from '../stores';


    const store = new useAdminStore();


    //获取用户权限
    function getPremission(){
        switch (store.userInfo.userPermission){
            case 10: return("超级管理员")
            case 2: return("经理")
            case 1: return("专员")
            default: return("访客")
        }
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
/* 系统学习 */
.homeview-info-title{
    font-size: 25px;
    font-weight: bold;
}


</style>