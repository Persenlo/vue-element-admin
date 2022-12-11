<template>
    <div class="organization-header">
        <span class="organization-title">机构管理</span>
        <div style="flex-grow: 1;"></div>
        <!-- 搜索 -->
        <a-button type="primary" shape="circle" style="margin-right: 10px;" size="large">
            <template #icon><SearchOutlined /></template>
        </a-button>
        <!-- 添加机构 -->
        <a-button type="primary" shape="round" size="large" @click="addorganizationClicked">
            <i class="iconfont icon-add"></i>
            添加机构
        </a-button>
    </div>
</template>

<script setup>

import { SearchOutlined } from '@ant-design/icons-vue';


</script>

<style scoped>
/* 顶部容器设置为弹性布局 */
.organization-header{
    width: 100%;
    display: flex;
    align-items: center;
}
.organization-title{
    /* 标题样式 */
    font-size: 25px;
    font-weight: bold;
}
/* 机构表 */
.organization-table-contain{
    /* 容器样式 */
    width: 100%;
    display: flex;
    margin-top: 50px;
}
.organization-table-table{
    width: 100%;
}
</style>