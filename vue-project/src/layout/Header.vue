<template>
    
    <div class="header">

        <div :style="store.navOn ? 'width: 225px;':'width: 80px;'" class="header-logo">
            Logo
        </div>

        <div style="margin-left: 30px;" @click="changeNav()">
            <ExpandButtonVue 
                :iconurl='store.navOn ? "../../assets/icon/arrow-left-bold.png":"../../assets/icon/arrow-right-bold.png"' 
                :text='store.navOn? "关闭":"展开"'
            />
        </div>

        <div style="flex-grow: 1;"></div>
        
        <div style="margin-right: 20px;">
            <ExpandButtonVue iconurl='../../assets/icon/sign-out.png' text='退出' @click="logout()"/>
        </div>

        <div>
            <UserVue/>
        </div>

    </div>

</template>

<script setup>

import UserVue from '@/components/user/User.vue'
import ExpandButtonVue from '../components/button/ExpandButton.vue';

import {useAdminStore} from '@/stores/index.js'

    const store  = useAdminStore();

    function changeNav(){
        store.navOn = !store.navOn;
    }

    function logout(){
        store.token = null;
		store.userInfo = {uid: -1, userName: "未登录", userNo: "-1", userPermission: 0};
        store.isLogin = false;
		localStorage.removeItem("token");
		localStorage.removeItem("userInfo");
    }

</script>

<style>
/* Header布局 */
.header{
    width: 100%;
    height: 100px;
    padding: 0 50px 0 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}
/* Logo */
.header-logo{
    /* 外观设计 */
    width: 225px;
    height: 60px;
    padding: 0 20px 0 20px;
    border-radius: 12px;
    background-color: white;
    box-shadow: 2px 2px 2px rgb(201, 201, 201);
    /* flex布局 */
    display: flex;
    justify-content: center;
    align-items: center;

    transition: 0.2s;
}
.header-logo:hover{
    box-shadow: 5px 5px 10px rgb(201, 201, 201);
    transition: 0.3s;
}

</style>