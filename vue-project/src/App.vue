<template>

  <a-layout>
    <a-layout-header style="padding: 0; background-color: #f0f2f5;">
      <HeaderVue/>
    </a-layout-header>

    <a-layout>

      <a-layout-sider style="padding: 0; background-color: #f0f2f5;">
        <SiderVue/>
      </a-layout-sider>

      <a-layout-content style="padding: 0; background-color: #f0f2f5;">
        <MainVue/>
      </a-layout-content>

    </a-layout>

    <a-layout-footer style="padding: 0; background-color: #f0f2f5;">
      <FooterVue/>
    </a-layout-footer>

  </a-layout>


</template>

  

<script setup>

import HeaderVue from './layout/Header.vue';
import SiderVue from './layout/Sider.vue'
import MainVue from './layout/Main.vue';
import FooterVue from './layout/Footer.vue';

</script>

<style>

</style>