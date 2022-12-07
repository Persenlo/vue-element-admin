<template>
    <div class="view-login">
        <div class="view-login-background">
            <!-- 背景图 -->
            <img class="view-login-background-img"
                src="https://psl-pictures.oss-ap-southeast-1.aliyuncs.com/pictures/水族館.jpg" />
            <div class="view-login-flex">
                <div class="view-login-contain">

                    <p style="width: 100%; text-align: center; font-size: 30px; font-weight: bold; align-self: end;">登录</p>

                    <a-form class="view-login-form" :model="userInput" name="basic" :label-col="{ span: 0 }" :wrapper-col="{ span: 0 }"
                        autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
                        <a-form-item name="username"
                            :rules="[{ required: true, message: '请输入账号' }]">
                            <a-input v-model:value="userInput.username" placeholder="账号" />
                        </a-form-item>

                        <a-form-item name="password" 
                            :rules="[{ required: true, message: '请输入密码' }]">
                            <a-input-password v-model:value="userInput.password" placeholder="密码"/>
                        </a-form-item>

                        <a-form-item name="remember" :wrapper-col="{ offset: 17, span: 24 }">
                            <a-checkbox v-model:checked="userInput.remember">记住我</a-checkbox>
                        </a-form-item>

                        <a-form-item :wrapper-col="{ offset: 0, span: 24 }" style="width: 100%;">
                            <a-button type="primary" html-type="submit" style="width: 100%;">登录</a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
        </div>
    </div>

    <p style="text-align: center;">@Persenlo Design</p>

</template>

<script setup>
import { reactive } from 'vue';


    let userInput = reactive({
        username: '',
        password: '',
        remember: false,
    })

</script>

<style>
.view-login {
    width: 100%;
    height: 900px;
}

.view-login-background {
    width: 80%;
    height: 95%;
    margin: 2.5% 10% 0% 10%;
    /* 样式设计 */
    border-radius: 12px;
    box-shadow: 5px 5px 20px 10px rgb(201, 201, 201);
    background-color: white;
    overflow: hidden;
    position: relative;
}

.view-login-background-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* 登录框设计 */
.view-login-flex {
    right: 0;
    top: 0;
    width: auto;
    height: 100%;
    /* 使用flex布局进行居中 */
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 登录框容器 */
.view-login-contain {
    width: 400px;
    height: 600px;
    /* 样式设计 */
    border-radius: 12px;
    box-shadow: 2px 2px 5px rgb(78, 78, 78);
    background-color: white;
    margin-right: 50px;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}
/* 输入框区域 */
.view-login-form{
    align-self: start;
    width: 70%;
}
</style>