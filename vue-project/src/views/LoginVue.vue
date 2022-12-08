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
                        <a-form-item name="account"
                            :rules="[{ required: true, message: '请输入账号' }]">
                            <a-input v-model:value="userInput.account" placeholder="账号" />
                        </a-form-item>

                        <a-form-item name="password" 
                            :rules="[{ required: true, message: '请输入密码' }]">
                            <a-input-password v-model:value="userInput.password" placeholder="密码"/>
                        </a-form-item>

                        <a-form-item name="verify" >
                            <div style="display: flex;">
                                <img ref="verifyImg" class="vcode" :src="verifyCodeUrl"  style="width: 100px; height: 35px; padding-right: 30px; object-fit: fill;" @click="getVerifyCode()"/>
                                <a-input v-model:value="userInput.verifyCode" placeholder="验证码"/>
                            </div>
                        </a-form-item>

                        <a-form-item name="remember" :wrapper-col="{ offset: 17, span: 24 }">
                            
                        </a-form-item>

                        <a-form-item :wrapper-col="{ offset: 0, span: 24 }" style="width: 100%;">
                            <a-button type="primary" html-type="submit" style="width: 100%;" @click="startLogin()">登录</a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
        </div>
    </div>

    <p style="text-align: center;">@Persenlo Design</p>

</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { getVerify,login,getUserInfo} from '@/request/api/user.js'
import { useRouter } from 'vue-router';

import { message } from 'ant-design-vue';
import { useAdminStore } from '../stores';

    const router = useRouter();

    const store = useAdminStore();

    let token = ref('');

    //登录信息
    let userInput = reactive({
        account: '',
        password: '',
        verifyCode: '',
    })
    //验证码地址
    let verifyCodeUrl = ref('');

    //获取验证码
    async function getVerifyCode(){
        let res = await getVerify();
        let blob = new Blob([res.data]);   // 返回的文件流数据
        let url = window.URL.createObjectURL(blob);  // 将他转化为路径
        verifyCodeUrl.value = url; 
    }
    //加载完成后初始化验证码
    onMounted(()=>{
        getVerifyCode();
    })


    //开始登录
    //登录
    async function startLogin(){
            //编写json
            var userData={
                password: userInput.password,
                userNo: userInput.account,
                verifyCode: userInput.verifyCode,
            }
            //等待请求响应
            let res = await login(userData);
            //判断是否登录成功
            if(res.data.success == true){
                //登录成功，保存token
                token.value = res.data.data;
                store.token = res.data.data;
                localStorage.setItem("token",JSON.stringify(token.value));
                store.isLogin = true;


                //获取用户信息
                let info =  await getUserInfo(token.value);
                //判断是否获取到用户信息
                if(info.data.success == true){
                    store.userInfo = info.data.data;
                    localStorage.setItem("userInfo",JSON.stringify(info.data.data));
                    message.success("登录成功");
                }else{
                    localStorage.removeItem("token");
                    message.error("登录失败");
                    return;
                }     
            }else{
                //登录失败，提示错误信息
                message.error(res.data.msg);
            }
        }

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