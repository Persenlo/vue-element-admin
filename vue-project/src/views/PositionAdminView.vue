<template>
    <div class="position-header">
        <span class="position-title">职位管理</span>
        <div style="flex-grow: 1;"></div>
        <a-button type="primary" shape="round" :size="size">
            <i class="iconfont icon-add"></i>
            添加职位
        </a-button>
    </div>
</template>

<script setup>

</script>

<style>
/* 顶部容器设置为弹性布局 */
.position-header{
    width: 100%;
    display: flex;
    align-items: center;
}
.position-title{
    /* 标题样式 */
    font-size: 25px;
    font-weight: bold;
}
</style>
