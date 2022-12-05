<template>
    <div :style="store.navOn ? 'width: 225px;':'width: 80px;'" class="sider">
        
    </div>
</template>

<script setup>
import {useAdminStore} from '@/stores/index.js'
import { onMounted, ref } from 'vue';

    const store = useAdminStore();

</script>

<style>
.sider{
    width: 225px;
    height: auto;
    min-height: 850px;
    /* 外观设计 */
    padding: 0 20px 0 20px;
    margin-left:  50px;
    border-radius: 12px;
    background-color: white;
    box-shadow: 2px 2px 5px rgb(201, 201, 201);
    /* flex布局 */
    display: flex;
    justify-content: center;
    align-items: center;

    transition: 0.3s;
}
.sider:hover{
    box-shadow: 5px 5px 10px rgb(201, 201, 201);
    transition: 0.3s;
}

</style>