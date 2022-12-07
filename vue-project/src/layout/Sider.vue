<template>
    <div :style="store.navOn ? 'width: 225px;':'width: 80px;'" class="sider">
        
        <!-- 添加item直接复制，没有单独抽出来做成一个组件 -->
        <div class="sider-nav-item" 
            @click="navClicked(0)"
            :style="store.navOn? 
                    'width: 193px':
                    'width: 48px'">
            <i class="iconfont icon-home sider-nav-item-icon"/>
            <span class="sider-nav-item-text" v-if="store.navOn">
                主页
            </span>
        </div>
        <!-- 模板组件，之后要添加可以直接复制上面的，修改span内容和添加对应的点击事件的index -->

        <!-- 系统管理员 -->
        <div class="sider-nav-item" 
            @click="navClicked(1)"
            :style="store.navOn? 
                    'width: 193px':
                    'width: 48px'">
            <i class="iconfont icon-setting sider-nav-item-icon"/>
            <span class="sider-nav-item-text" v-if="store.navOn">
                职位设置
            </span>
        </div>
        <div class="sider-nav-item" 
            @click="navClicked(2)"
            :style="store.navOn? 
                    'width: 193px':
                    'width: 48px'">
            <i class="iconfont icon-setting sider-nav-item-icon"/>
            <span class="sider-nav-item-text" v-if="store.navOn">
                机构设置
            </span>
        </div>
        <div class="sider-nav-item" 
            @click="navClicked(3)"
            :style="store.navOn? 
                    'width: 193px':
                    'width: 48px'">
            <i class="iconfont icon-setting sider-nav-item-icon"/>
            <span class="sider-nav-item-text" v-if="store.navOn">
                薪酬设置
            </span>
        </div>
        <!-- 系统管理员 -->

    </div>
</template>

<script setup>
import {useAdminStore} from '@/stores/index.js'
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

    const store = useAdminStore();
    const router = useRouter();

    let currentIndex = ref(0);

    //导航栏点击事件
    function navClicked(index){

        //根据index设置对应的操作
        switch (index){
            case 0:
                router.push("/")
                break;
            case 1:
                //系统管理员
                router.push("/position");
                //经理

                //专员

                break;
            case 2:
                break;
            default:
                break;
        }

        // 设置选中颜色
        const fromItem = document.getElementsByClassName("sider-nav-item")[currentIndex.value];
        const toItem = document.getElementsByClassName("sider-nav-item")[index];
        fromItem.style.backgroundColor = "#e6f7ff";
        toItem.style.backgroundColor = "#bae7ff";
        currentIndex.value = index;
    }
    //导航栏大小切换时保持选中
    watch(
        ()=>store.navOn,
        ()=>{
        const choseItem = document.getElementsByClassName("sider-nav-item")[currentIndex.value];
        setTimeout(function(){choseItem.style.backgroundColor = "#bae7ff";},10)
        }
        )
    //初始化导航栏选中项
    onMounted(()=>{
        const choseItem = document.getElementsByClassName("sider-nav-item")[currentIndex.value];
        choseItem.style.backgroundColor = "#bae7ff";
    })

</script>

<style>
/* 整体样式 */
.sider{
    width: 225px;
    height: auto;
    min-height: 850px;
    /* 外观设计 */
    padding: 20px 16px 0 16px;
    margin-left:  50px;
    border-radius: 12px;
    box-shadow: 2px 2px 5px rgb(201, 201, 201);
    background-color: white;
    transition: 0.3s;
}
.sider:hover{
    box-shadow: 5px 5px 10px rgb(201, 201, 201);
    transition: 0.3s;
}
/* 导航栏ITEM样式 */
.sider-nav-item{
    height: 48px;
    border-radius: 12px;
    padding-left: 12px;
    margin-top: 25px;
    background-color: #e6f7ff;
    /* flex布局 */
    display: flex;
    justify-content: left;
    align-items: center;
    transition: 0.3s;
}
.sider-nav-item:hover{
    background-color: #bae7ff !important;
    transition: 0.3s;
}
.sider-nav-item-icon{
    font-size: 24px;
}
.sider-nav-item-text{
    user-select: none;
    margin-left: 12px;
    /*强制单行显示*/
    white-space: nowrap;
    /*超出部分省略号表示*/
    text-overflow: ellipsis;
    /*超出部分隐藏*/
    overflow: hidden;
    /*设置显示的最大宽度*/
    max-width: 150px;
}

</style>