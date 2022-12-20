<template>

    <div class="user-header">
        <span class="user-title">用户管理</span>
        <div style="flex-grow: 1;"></div>
        <!-- 搜索 -->
        <!-- <a-button type="primary" shape="circle" style="margin-right: 10px;" size="large" @click="searchUserClicked">
            <template #icon>
                <SearchOutlined />
            </template>
        </a-button> -->
        <!-- 添加用户 -->
        <a-button type="primary" shape="round" size="large" @click="adduserClicked" v-if="!isAssistant">
            <i class="iconfont icon-add"></i>
            添加用户
        </a-button>
    </div>

    <div class="user-table-contain">
        <!-- 基础表格 -->
        <a-table 
            :data-source=dataSource?.data.data
            :columns="columns" 
            :pagination="pagination" 
            :loading="loading"
            @change="handleTableChange" 
            class="user-table-table">
            <!-- 表头 -->
            <template #headerCell="{ column }">
                <template v-if="column.key === 'sid'">
                    <span>
                        ID
                    </span>
                </template>
            </template>
            <!-- 操作栏 -->
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <div style="width: 100%; display: flex; ">
                        <a-button type="primary" style="margin-right: 10px;"
                            @click="edituserClicked(record)">编辑</a-button>
                        <a-popconfirm ref="popconfirm" title="是否删除该用户?" @confirm="startDeleteUser(record.uid)" v-if="!isAssistant"
                            ok-text="确定" cancel-text="取消">
                            <a-button type="primary" danger style="margin-right: 10px;">删除</a-button>
                        </a-popconfirm>
                    </div>
                </template>
            </template>
        </a-table>
    </div>



    <!-- 添加用户 -->
    <a-modal v-model:visible="showAdduser" 
                title="添加用户" 
                :confirm-loading="confirmLoading" 
                @ok="startCreateUser"
                @cancel="stoploading" 
                ok-text="提交" 
                cancel-text="取消">
        <div>
            <div style="display: flex; align-items: center; margin-top: 20px;">
                <span style="width: 100px;">用户名称</span><a-input v-model:value="userObj.userName" placeholder="请输入用户名称" />
            </div>
            <div style="display: flex; align-items: center; margin-top: 20px;">
                <span style="width: 100px;">用户密码</span><a-input v-model:value="userObj.userPassword" placeholder="请输入用户密码" />
            </div>
            <div style="display: flex; align-items: center; margin-top: 20px;">
                <span style="width: 100px;">用户工号</span><a-input v-model:value="userObj.userNo" placeholder="请输入用户工号" />
            </div>
            <div style="display: flex; align-items: center; margin-top: 20px;">
                <span style="width: 100px;">用户权限</span>
                <a-select v-model:value="userObj.userPermission" style="width: 100%;">
                    <a-select-option value="10">10-超级管理员</a-select-option>
                    <a-select-option value="2">2-经理</a-select-option>
                    <a-select-option value="1">1-专员</a-select-option>
                    <a-select-option value="0">0-访客</a-select-option>
                </a-select>
            </div>
        </div>
    </a-modal>

    <!-- 编辑用户 -->
    <a-modal v-model:visible="showEdituser" 
                title="编辑用户" 
                :confirm-loading="confirmLoading" 
                @ok="startEditUser"
                @cancel="stoploading" 
                ok-text="提交" 
                cancel-text="取消">
        <div>
            <div style="display: flex; align-items: center; margin-top: 20px;">
                <span style="width: 100px;">用户名称</span><a-input v-model:value="changeObj.userName" placeholder="请输入用户名称" />
            </div>
            <div style="display: flex; align-items: center; margin-top: 20px;">
                <span style="width: 100px;">用户密码</span><a-input v-model:value="changeObj.userPassword" placeholder="请输入用户密码" />
            </div>
            <div style="display: flex; align-items: center; margin-top: 20px;">
                <span style="width: 100px;">用户工号</span><a-input v-model:value="changeObj.userNo" placeholder="请输入用户工号" disabled="true"/>
            </div>
            <div style="display: flex; align-items: center; margin-top: 20px;">
                <span style="width: 100px;">用户权限</span>
                <a-select v-model:value="changeObj.userPermission" style="width: 100%;">
                    <a-select-option value="10">10-超级管理员</a-select-option>
                    <a-select-option value="2">2-经理</a-select-option>
                    <a-select-option value="1">1-专员</a-select-option>
                    <a-select-option value="0">0-访客</a-select-option>
                </a-select>
            </div>
            
        </div>
    </a-modal>

</template>

<script setup>

import { reactive, ref, computed } from 'vue';
import { SearchOutlined,FormOutlined,CloseOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { getAllUserInfo,createUser,editUser,deleteUser } from '../request/api/user';
import { useAdminStore } from '../stores';
import { usePagination } from 'vue-request';
import { useRouter } from 'vue-router';

const store = useAdminStore();
const router = useRouter();

//添加弹窗
let showAdduser = ref(false);
//编辑弹窗
let showEdituser = ref(false);
//弹窗加载状态
let confirmLoading = ref(false);

//储存当前分页信息
let pagInfo = new reactive({
    pageSize: 8,
    current: 1,
})

let userObj = ref({
    userPassword: '',
    userNo: '',
    userName: '',
    userPermission: '',
})

let changeObj = ref({
    uid: '',
    userPassword: '',
    userNo: '',
    userName: '',
    userPermission: '',
})

//取消加载
function stoploading(){
    confirmLoading.value = false;
}


//添加用户按钮被点击
async function adduserClicked() {
    showAdduser.value = true;
}

//编辑用户按钮被点击
async function edituserClicked(data) {
    showEdituser.value = true;
    changeObj.value = data;
}

//开始创建用户
async function startCreateUser(){
    confirmLoading.value = true;
    let res = await createUser(userObj.value,store.token);
    if(res.data.success == false){
        message.error(res.data.msg);
        confirmLoading.value = false;
    }else{
        userObj.value.userPassword = '';
        userObj.value.userNo = '';
        userObj.value.userName = '';
        userObj.value.userPermission = '';
        message.success("用户创建成功");
        confirmLoading.value = false;
        showAdduser.value = false;
        handleTableChange(pagInfo);
    }
}

//开始编辑用户
async function startEditUser(){
    confirmLoading.value = true;
    let res = await editUser(changeObj.value,store.token);
    if(res.data.success == false){
        message.error(res.data.msg);
        confirmLoading.value = false;
    }else{
        message.success("编辑成功");
        confirmLoading.value = false;
        showEdituser.value = false;
        handleTableChange(pagInfo);
    }
}

//开始删除用户
async function startDeleteUser(index) {
    let res = await deleteUser(index,store.token);
    if(res.data.success != true){
        message.error(res.data.msg);
    }else{
        //删除成功
        message.success('删除成功');
        handleTableChange(pagInfo);
        
    }
}


//开始获取用户信息
let res = new reactive();
async function startGetUserInfo(index, count) {
    res.value = (await getAllUserInfo(store.token, index, count));
    return res.value.data;
}

//表格分页
const {
    data: dataSource,
    run,
    loading,
    current,
    pageSize,
} = usePagination(startGetUserInfo, {
    pagination: {
        currentKey: 'index',
        pageSizeKey: 'count',
    },
});

const pagination = computed(() => ({
    total: dataSource.value?.data.total,
    current: current.value,
    pageSize: pageSize.value,
}));


const handleTableChange = (pag, filters, sorter) => {
    run({
        count: pag?.pageSize,
        index: pag?.current,
        sortField: sorter?.field,
        sortOrder: sorter?.order,
        ...filters,
    });
    pagInfo.pageSize = pag?.pageSize;
    pagInfo.current = pag?.current;
}

// 表格列
const columns = reactive(
    [
        {
            name: '序号',
            dataIndex: 'uid',
            key: 'uid',
            width: '10%',
        },
        {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
            width: '30%',
        },
        {
            title: '工号',
            dataIndex: 'userNo',
            key: 'userNo',
            width: '30%',
        },
        {
            title: '权限等级',
            dataIndex: 'userPermission',
            key: 'userPermission',
            
            width: '10%',
        },
        {
            title: '操作',
            key: 'action',
            width: '20%',
        },
    ]
)

</script>

<style scoped>
/* 顶部容器设置为弹性布局 */
.user-header {
    width: 100%;
    display: flex;
    align-items: center;
}

.user-title {
    /* 标题样式 */
    font-size: 25px;
    font-weight: bold;
}

/* 机构表 */
.user-table-contain {
    /* 容器样式 */
    width: 100%;
    display: flex;
    margin-top: 50px;
}

.user-table-table {
    width: 100%;
}
</style>