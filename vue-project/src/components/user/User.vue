<template>
    <div class="component-user">
        <span class="component-user-name">{{store.userInfo.userName}}</span>
        <a-avatar class="component-user-icon" :size="32" shape="square" style="border-radius: 12px;">
            {{store.userInfo.userName}}
        </a-avatar>
    </div>
</template>

<script setup>
import { useAdminStore } from '../../stores';



    const store = new useAdminStore();



</script>

<style>
/* 卡片背景 */
.component-user {
    /* 外观设计 */
    width: auto;
    height: 60px;
    padding: 0 20px 0 20px;
    border-radius: 12px;
    background-color: white;
    box-shadow: 2px 2px 2px rgb(201, 201, 201);
    /* flex布局 */
    display: flex;
    justify-content: flex-end;
    align-items: center;

    transition: 0.3s;
}
.component-user:hover{
    box-shadow: 5px 5px 10px rgb(201, 201, 201);
    transition: 0.3s;
}

/* 头像 */
.component-user-icon {
    
}

/* 用户名 */
.component-user-name {
    margin: 0 20px 0 0;
    user-select: none;
    /*强制单行显示*/
    white-space: nowrap;
    /*超出部分省略号表示*/
    text-overflow: ellipsis;
    /*超出部分隐藏*/
    overflow: hidden;
    /*设置显示的最大宽度*/
    max-width: 150px;
    display: inline-block;
}
</style>