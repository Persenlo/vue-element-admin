<template>

  <LoginVue v-if="!store.isLogin" />

  <a-layout v-else>
    <a-layout-header style="height: 100px; padding: 0; background-color: #f0f2f5;">
      <HeaderVue/>
    </a-layout-header>

    <div style="width: 100%; display: flex;">

      <div>
        <SiderVue/>
      </div>

      <div style="flex-grow: 1;">
        <MainVue/>
      </div>

    </div>

    <a-layout-footer style="margin-top: 30px; background-color: #f0f2f5;">
      <FooterVue/>
    </a-layout-footer>

  </a-layout>

  


</template>

  

<script setup>

import HeaderVue from './layout/Header.vue';
import SiderVue from './layout/Sider.vue'
import MainVue from './layout/Main.vue';
import FooterVue from './layout/Footer.vue';
import { getUserInfo } from './request/api/user';
import LoginVue from './views/LoginVue.vue';

import { useAdminStore } from './stores';
import { onMounted } from 'vue';
import { message } from 'ant-design-vue';


  const store = useAdminStore();

  onMounted(async()=>{
    let res =  await getUserInfo(store.token)
    if(res.data.success == false){
      message.error("登录已过期");
      store.token = null;
		  store.userInfo = {uid: -1, userName: "未登录", userNo: "-1", userPermission: 0};
      store.isLogin = false;
		  localStorage.removeItem("token");
		  localStorage.removeItem("userInfo");
    }
  })


</script>

<style>

</style>