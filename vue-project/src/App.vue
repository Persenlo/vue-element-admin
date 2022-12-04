<template>

  <a-layout>
    <a-layout-header>
      <HeaderVue/>
    </a-layout-header>

    <a-layout>

      <a-layout-sider>
        <SiderVue/>
      </a-layout-sider>

      <a-layout-content>
        <MainVue/>
      </a-layout-content>

    </a-layout>

    <a-layout-footer>
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