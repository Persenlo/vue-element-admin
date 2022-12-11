<template>
    <div class="salary-header">
        <span class="salary-title">薪酬管理</span>
        <div style="flex-grow: 1;"></div>
        <!-- 搜索 -->
        <a-button type="primary" shape="circle" style="margin-right: 10px;" size="large">
            <template #icon><SearchOutlined /></template>
        </a-button>
        <!-- 添加机构 -->
        <a-button type="primary" shape="round" size="large" @click="addsalaryClicked">
            <i class="iconfont icon-add"></i>
            添加薪酬标准
        </a-button>
    </div>
</template>

<script setup>

import { SearchOutlined } from '@ant-design/icons-vue';


</script>

<style scoped>
/* 顶部容器设置为弹性布局 */
.salary-header{
    width: 100%;
    display: flex;
    align-items: center;
}
.salary-title{
    /* 标题样式 */
    font-size: 25px;
    font-weight: bold;
}
/* 机构表 */
.salary-table-contain{
    /* 容器样式 */
    width: 100%;
    display: flex;
    margin-top: 50px;
}
.salary-table-table{
    width: 100%;
}
</style>