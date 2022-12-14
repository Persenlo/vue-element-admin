<template>
    <div class="organization-header">
        <span class="organization-title">机构管理</span>
        <div style="flex-grow: 1;"></div>
        <!-- 搜索 -->
        <!-- <a-button type="primary" shape="circle" style="margin-right: 10px;" size="large">
            <template #icon><SearchOutlined /></template>
        </a-button> -->
        <!-- 添加机构 -->
        <a-button type="primary" shape="round" size="large" @click="createOrgAClicked">
            <i class="iconfont icon-add"></i>
            添加一级机构
        </a-button>
    </div>

    <div class="organization-table-contain">

        <div class="organization-table-contain-a">
        <!-- 基础表格 （开启了选择模式，要注意row-key）-->
        <a-table 
            :data-source=orgA?.data
            :pagination="pagination"
            :columns="columnsA" 
            :loading="loadingA"
            row-key="oid"
            :row-selection="rowSelectionA"
            @change="handleTableChange(1)"
            class="organization-table-table">
            <!-- 表头 -->
            <template #headerCell="{ column }">
                <template v-if="column.key === 'oid'">
                    <span>
                        ID
                    </span>
                </template>
            </template>
            <!-- 操作栏 -->
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <div style="width: 100%; display: flex; ">
                        <!-- 添加 -->
                        <a-button type="primary" @click="createOrgBClicked">
                            <template #icon>
                                <plus-outlined />
                            </template>
                        </a-button>
                        <!-- 编辑 -->
                        <a-button type="primary" style="margin-left: 10px;" @click="editOrganizationClicked(record)">
                            <template #icon>
                                <form-outlined />
                            </template>
                        </a-button>
                        <!-- 删除 -->
                        <a-popconfirm ref="popconfirm" title="是否删除该机构?" @confirm="startDeleteOrganization(record.oid,1)" 
                            ok-text="确定" cancel-text="取消">
                            <a-button type="primary" danger style="margin-left: 10px;">
                                <template #icon>
                                    <delete-outlined />
                                </template>
                            </a-button>
                        </a-popconfirm>

                    </div>
                </template>
            </template>
        </a-table>
        </div>

        <div class="organization-table-contain-b">
        <!-- 基础表格 -->
        <a-table 
            :data-source=orgB?.data
            :columns="columnsB" 
            :loading="loadingB"
            row-key="oid"
            :rowSelection="rowSelectionB"
            :pagination="pagination"
            @change="handleTableChange(2)" 
            class="organization-table-table">
            <!-- 表头 -->
            <template #headerCell="{ column }">
                <template v-if="column.key === 'oid'">
                    <span>
                        ID
                    </span>
                </template>
            </template>
            <!-- 操作栏 -->
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <div style="width: 100%; display: flex; ">
                        <!-- 添加 -->
                        <a-button type="primary" @click="createOrgCClicked">
                            <template #icon>
                                <plus-outlined />
                            </template>
                        </a-button>
                        <!-- 编辑 -->
                        <a-button type="primary" style="margin-left: 10px;" @click="editOrganizationClicked(record)">
                            <template #icon>
                                <form-outlined />
                            </template>
                        </a-button>
                        <!-- 删除 -->
                        <a-popconfirm ref="popconfirm" title="是否删除该机构?" @confirm="startDeleteOrganization(record.oid,2)" v-if="!isAssistant"
                            ok-text="确定" cancel-text="取消">
                            <a-button type="primary" danger style="margin-left: 10px;">
                                <template #icon>
                                    <delete-outlined />
                                </template>
                            </a-button>
                        </a-popconfirm>

                    </div>
                </template>
            </template>
        </a-table>
        </div>

        <div class="organization-table-contain-c">
        <!-- 基础表格 -->
        <a-table 
            :data-source=orgC?.data
            :columns="columnsC" 
            :loading="loadingC"
            :pagination="pagination"
            row-key="oid"
            @change="handleTableChange(3)" 
            class="organization-table-table">
            <!-- 表头 -->
            <template #headerCell="{ column }">
                <template v-if="column.key === 'oid'">
                    <span>
                        ID
                    </span>
                </template>
            </template>
            <!-- 操作栏 -->
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <div style="width: 100%; display: flex; ">
                        <!-- 编辑 -->
                        <a-button type="primary" style="margin-left: 10px;" @click="editOrganizationClicked(record)">
                            <template #icon>
                                <form-outlined />
                            </template>
                        </a-button>
                        <!-- 删除 -->
                        <a-popconfirm ref="popconfirm" title="是否删除该机构?" @confirm="startDeleteOrganization(record.oid,3)" v-if="!isAssistant"
                            ok-text="确定" cancel-text="取消">
                            <a-button type="primary" danger style="margin-left: 10px;">
                                <template #icon>
                                    <delete-outlined />
                                </template>
                            </a-button>
                        </a-popconfirm>

                    </div>
                </template>
            </template>
        </a-table>
        </div>

    </div>

        <!-- 添加机构 -->
        <a-modal v-model:visible="showAddOrganization" 
                    :title=getTitle()
                    :confirm-loading="confirmLoading" 
                    @ok="startAddOrganization" 
                    @cancel="stoploading" 
                    ok-text="提交"
                    cancel-text="取消">
                    <a-input v-model:value="createObj.orgaName" placeholder="机构名称" style="margin-top: 10px;" />
        </a-modal>

        <!-- 编辑机构 -->
        <a-modal v-model:visible="showEditOrganization" 
                    title="编辑机构名称"
                    :confirm-loading="confirmLoading" 
                    @ok="startEditOrganization" 
                    @cancel="stoploading" 
                    ok-text="提交"
                    cancel-text="取消">
                    <a-input v-model:value="changeObj.orgaName" placeholder="机构名称" style="margin-top: 10px;" />
        </a-modal>

</template>

<script setup>

import { FormOutlined,DeleteOutlined,PlusOutlined } from '@ant-design/icons-vue';
import { reactive, ref, onMounted } from 'vue';
import { useRouter,useRoute} from 'vue-router';
import { useAdminStore } from '../stores';
import { getOrgA,getOrgB,getOrgC,addOrganization,editSOrganization,deleteOrganization  } from '../request/api/organization';
import { message } from 'ant-design-vue';

const store = useAdminStore();
const router = useRouter();
const route = useRoute();

let currentOrgA = ref();
let currentOrgB = ref();
let currentOrgC = ref();

let loadingA = ref(false);
let loadingB = ref(false);
let loadingC = ref(false);

let showAddOrganization = ref(false);
let showEditOrganization = ref(false);
let confirmLoading = ref(false);
let levelOfAdd = ref();


let createObj = ref({
    oid: '',
    orgaName: '',
    orgaLevel: '',
    orgaParent: '',
})
let changeObj = ref({
    oid: '',
    orgaName: '',
    orgaLevel: '',
    orgaParent: '',
})

//一级机构
let orgA = ref({
    oid: '',
    orgaName: '',
    orgaLevel: '',
    orgaParent: '',
})

//二级机构
let orgB = ref({
    oid: '',
    orgaName: '',
    orgaLevel: '',
    orgaParent: '',
})

//三级机构
let orgC = ref({
    oid: '',
    orgaName: '',
    orgaLevel: '',
    orgaParent: '',
})

let pagination = ref({
    hideOnSinglePage: true,
})
let rowSelectionA = reactive({
    type: "radio",
    onSelect(record){
        orgB.value = null
        orgC.value = null
        currentOrgA.value = record.oid;
        startGetOrgB();
    },
})
let rowSelectionB = reactive({
    type: "radio",
    onSelect(record,selectedRowKeys){
        orgC.value = null;
        currentOrgB.value = record.oid;
        startGetOrgC();
    },
})

//添加一级机构被点击
function createOrgAClicked(){
    showAddOrganization.value = true;
    levelOfAdd.value = 1;
}
//添加二级机构被点击
function createOrgBClicked(){
    showAddOrganization.value = true;
    levelOfAdd.value = 2;
}
//添加三级机构被点击
function createOrgCClicked(){
    showAddOrganization.value = true;
    levelOfAdd.value = 3;
}

//编辑按钮被点击
async function editOrganizationClicked(data) {
    showEditOrganization.value = true;
    changeObj.value = data;
}

function stoploading(){
    confirmLoading.value = false;
}

function getTitle(){
    let title = ref('添加机构');
    switch(levelOfAdd.value){
        case 1:
            title.value = "添加一级机构"
            break;
        case 2:
            title.value = "添加二级机构"
            break;
        case 3:
            title.value = "添加三级机构"
            break;
    }
    return title.value;
}

//添加机构的提交按钮被点击时判断添加什么等级的机构
function startAddOrganization(){
    switch(levelOfAdd.value){
        case 1:
            addOrganizationByParam(1,createObj.value.orgaName,-1);

            break;
        case 2:
            addOrganizationByParam(2,createObj.value.orgaName,currentOrgA.value);
            break;
        case 3:
            addOrganizationByParam(3,createObj.value.orgaName,currentOrgB.value);
            break;
    }
} 


//按参数添加机构
async function addOrganizationByParam(level,name,parendId){
    if (name == '') {
        message.error('请输入机构名称');
        return;
    }
    confirmLoading.value = true;
    let createObj = {
        orgaLevel: level,
        orgaName: name,
        orgaParent: parendId,
    }
    let res = await addOrganization(createObj,store.token);
    if(res.data.success == false){
        message.error(res.data.msg);
        confirmLoading.value = false;
    }else{
        message.success("添加成功")
        confirmLoading.value = false;
        showAddOrganization.value = false
        handleTableChange(level);
    }
}

//删除机构
async function startDeleteOrganization(id,level){
    let res = await deleteOrganization(id,store.token);
    if(res.data.success != true){
        message.error(res.data.msg);
    }else{
        //删除成功
        message.success('删除成功');
        handleTableChange(level);
    }
}

//编辑机构
async function startEditOrganization(){
    if (changeObj.value.name == '') {
        message.error('请输入机构名称');
        return;
    }
    let obj = {
        oid: changeObj.value.oid,
        orgaLevel: changeObj.value.orgaLevel,
        orgaName: changeObj.value.orgaName,
        orgaParent: changeObj.value.orgaParent,
    }
    let res = await editSOrganization(obj,store.token);
    if(res.data.success == false){
        message.error(res.data.msg);
        confirmLoading.value = false;
    }else{
        message.success("名称修改成功")
        confirmLoading.value = false;
        showEditOrganization.value = false
        handleTableChange(changeObj.value.orgaLevel);
    }
}


//获取一级机构
async function startGetOrgA(){
    let res = ref();
    loadingA.value = true;
    res.value = (await getOrgA(store.token));
    orgA.value = res.value.data;
    loadingA.value = false;
}

//获取二级机构
async function startGetOrgB(){
    let res = ref();
    loadingB.value = true;
    res.value = (await getOrgB(store.token,currentOrgA.value));
    orgB.value = res.value.data;
    loadingB.value = false;
}

//获取三级机构
async function startGetOrgC(){
    let res = ref();
    loadingC.value = true;
    res.value = (await getOrgC(store.token,currentOrgB.value));
    orgC.value = res.value.data;
    loadingC.value = false;
}









function handleTableChange(level){
    switch(level){
        case 1:
            orgA.value = null
            orgB.value = null
            orgC.value = null
            startGetOrgA();
            break;
        case 2:
            orgB.value = null
            orgC.value = null
            startGetOrgB();
            break;
        case 3:
            orgC.value = null
            startGetOrgC();
            break;
    }
}



const columnsA = reactive(
    [
        {
            name: '序号',
            dataIndex: 'oid',
            key: 'oid',
            width: '20%',
        },
        {
            title: '一级机构',
            dataIndex: 'orgaName',
            key: 'orgaName',
            width: '50%',
        },
        {
            title: '操作',
            key: 'action',
            width: '30%',
        },
    ]
)

const columnsB = reactive(
    [
        {
            name: '序号',
            dataIndex: 'oid',
            key: 'oid',
            width: '20%',
        },
        {
            title: '二级机构',
            dataIndex: 'orgaName',
            key: 'orgaName',
            width: '50%',
        },
        {
            title: '操作',
            key: 'action',
            width: '30%',
        },
    ]
)

const columnsC = reactive(
    [
        {
            name: '序号',
            dataIndex: 'oid',
            key: 'oid',
            width: '20%',
        },
        {
            title: '三级机构',
            dataIndex: 'orgaName',
            key: 'orgaName',
            width: '50%',
        },
        {
            title: '操作',
            key: 'action',
            width: '30%',
        },
    ]
)

onMounted(()=>{
    startGetOrgA();
})



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
.organization-table-contain-a{
    width: 32%;
}
.organization-table-contain-b{
    width: 32%;
    margin-left: 2%;
}
.organization-table-contain-c{
    width: 32%;
    margin-left: 2%;
}
.organization-table-table{
    width: 100%;
}
</style>