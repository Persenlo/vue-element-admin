<template>
    <div class="main">
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>

</template>

<script>

</script>

<style>
.main{
    width: auto;
    height: auto;
    min-height: 905px;
    /* 外观设计 */
    padding: 50px 50px 50px 50px;
    margin: 0 50px 0 30px;
    border-radius: 12px;
    background-color: white;
    box-shadow: 2px 2px 5px rgb(201, 201, 201);
    /* flex布局 */
    /* display: flex;
    justify-content: center;
    align-items: center; */

    transition: 0.3s;
}
.main:hover{
    box-shadow: 5px 5px 10px rgb(201, 201, 201);
    transition: 0.3s;
}


/* 路由切换动画 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-leave-from{
    display: none;
}
.fade-enter-active{
transition: opacity 0.5s ease;
}
.fade-leave-active{
    display: none;
}
.fade-enter-to,.fade-leave{
visibility: visible;
opacity: 1;
}


</style>