<template>

  <a-layout v-if="store.isLogin">
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

  <LoginVue v-if="!store.isLogin" />


</template>

  

<script setup>

import HeaderVue from './layout/Header.vue';
import SiderVue from './layout/Sider.vue'
import MainVue from './layout/Main.vue';
import FooterVue from './layout/Footer.vue';

import LoginVue from './views/LoginVue.vue';

import { useAdminStore } from './stores';


  const store = useAdminStore();


</script>

<style>

</style>