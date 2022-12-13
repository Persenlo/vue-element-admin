<template>

    <div class="salary-header">
        <!-- 返回 -->
        <a-button shape="circle" style="margin-right: 10px;" size="middle" @click="router.go(-1)">
            <template #icon>
                <left-outlined />
            </template>
        </a-button>
        <span class="salary-title">搜索结果</span>
        
    </div>

    <div class="salary-table-contain">
        <!-- 基础表格 -->
        <a-table 
            :data-source=salaryData?.data
            :columns="columns" 
            :loading="loading"
            @change="handleTableChange" 
            class="salary-table-table">
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
                            @click="editSalaryClicked(record)">详情</a-button>
                        <a-popconfirm ref="popconfirm" title="是否删除该标准?" @confirm="startDeleteSalary(record.sid)" v-if="!isAssistant"
                            ok-text="确定" cancel-text="取消">
                            <a-button type="primary" danger style="margin-right: 10px;">删除</a-button>
                        </a-popconfirm>

                    </div>
                </template>
            </template>
        </a-table>
    </div>


    <!-- 编辑标准 -->
    <a-modal 
        v-model:visible="showEditSalary" 
        title="薪酬标准详情" 
        :confirm-loading="confirmLoading" 
        footer=""
        style="width: 40%;">

        <div>

            

            <div :style='isAssistant?"display: flex; justify-content: center; width: auto;":""'>

                

                <!-- 内容 -->
                <div>
                    <!-- 左半部分 -->
                    <a-divider style="margin-top: 0;">基本内容</a-divider>
                    <div style="display: flex; align-items: center; margin-top: 20px;">
                        <span style="width: 100px;">薪酬名称：</span><a-input v-model:value="changeSalary.salaName"
                            placeholder="输入薪酬名称" :disabled="!editMode" />
                    </div>
                    <div style="display: flex; align-items: center; margin-top: 20px;" v-if="isAssistant">
                        <span style="width: 100px;">基本工资：</span><a-input v-model:value="changeSalary.salaBase"
                            placeholder="输入基本工资" suffix="元" type="number" :disabled="!editMode" />
                    </div>

                    <a-divider v-if="isAssistant">三险一金</a-divider>
                    <div style="display: flex; align-items: center; margin-top: 20px;" v-if="isAssistant"> 
                        <span style="width: 100px;">养老保险：</span><a-input v-model:value="changeSalary.salaOld" suffix="元"
                            type="number" :disabled=true />
                    </div>
                    <div style="display: flex; align-items: center; margin-top: 20px;" v-if="isAssistant">
                        <span style="width: 100px;">医疗保险：</span><a-input v-model:value="changeSalary.salaMedical"
                            suffix="元" type="number" :disabled=true />
                    </div>
                    <div style="display: flex; align-items: center; margin-top: 20px;" v-if="isAssistant">
                        <span style="width: 100px;">失业保险：</span><a-input v-model:value="changeSalary.salaUnemployee"
                            suffix="元" type="number" :disabled=true />
                    </div>
                    <div style="display: flex; align-items: center; margin-top: 20px;" v-if="isAssistant">
                        <span style="width: 100px;">住房公积金</span><a-input v-model:value="changeSalary.salaHouse"
                            suffix="元" type="number" :disabled=true />
                    </div>
                </div>

                <!-- 右半部分 -->
                <div :style='isAssistant?"margin-left: 50px;":""'>
                    <a-divider style="margin-top: 0;" v-if="isAssistant">员工补助</a-divider>
                    <div style="display: flex; align-items: center; margin-top: 20px;" v-if="isAssistant">
                        <span style="width: 100px;">交通补贴：</span><a-input v-model:value="changeSalary.salaTransport"
                            placeholder="输入交通补贴" suffix="元" type="number" :disabled="!editMode" />
                    </div>
                    <div style="display: flex; align-items: center; margin-top: 20px;" v-if="isAssistant">
                        <span style="width: 100px;">午餐补助：</span><a-input v-model:value="changeSalary.salaLunch"
                            placeholder="输入午餐补助" suffix="元" type="number" :disabled="!editMode" />
                    </div>
                    <div style="display: flex; align-items: center; margin-top: 20px;" v-if="isAssistant">
                        <span style="width: 100px;">通讯补助：</span><a-input v-model:value="changeSalary.salaCommunicate"
                            placeholder="输入通讯补助" suffix="元" type="number" :disabled="!editMode" />
                    </div>

                    <a-divider>编辑人员</a-divider>
                    <div style="display: flex; align-items: center; margin-top: 20px;">
                        <span style="width: 100px;">制定人名称</span><a-input v-model:value="changeSalary.salaMakerName"
                            :disabled=true />
                    </div>
                    <div style="display: flex; align-items: center; margin-top: 20px;">
                        <span style="width: 100px;">登记人名称</span><a-input v-model:value="changeSalary.salaRecheckerName"
                            :disabled=true />
                    </div>
                    <div style="display: flex; align-items: center; margin-top: 20px;">
                        <span style="width: 100px;">复核人名称</span><a-input v-model:value="changeSalary.salaRegistrantName"
                            :disabled=true />
                    </div>

                    <!-- 按钮组 -->
                    <div style="display: flex; justify-content: end; width: auto; margin-top: 20px;">
                        <a-button :type="hideCommit?'primary':'danger'" shape="circle" style="margin-right: 10px;" @click="changeEditMode" >
                            <template #icon>
                                <form-outlined  v-if="hideCommit" />
                                <close-outlined v-else/>
                            </template>
                        </a-button>
                        <a-button type="primary" shape="round" @click="startEditSalary" :disabled="hideCommit" :loading="confirmLoading">
                            提交更改
                        </a-button>
                    </div>

                </div>
            </div>
            

        </div>
        
    </a-modal>






</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { FormOutlined,CloseOutlined,LeftOutlined } from '@ant-design/icons-vue';
import { useRouter,useRoute, routerKey } from 'vue-router';
import { useAdminStore } from '../stores';
import { searchSalary, editSalary } from '../request/api/salary';
import { message } from 'ant-design-vue';

const store = useAdminStore();
const router = useRouter();
const route = useRoute();

let loading = ref(false);

//储存当前分页信息
let pagInfo = new reactive({
    pageSize: 8,
    current: 1,
})

//服务器数据
let salaryData = ref();

//添加对象
let newSalary = reactive({
    sid: 0,
    sname: '',
    sbase: '',
    stransport: 0,
    slunch: 0,
    scommunicate: 0,
})

//编辑对象
let changeSalary = ref({
    salaName: '',
    salaBase: '',
    salaTransport: 0,
    salaLunch: 0,
    salaCommunicate: 0,

    salaOld: '',
    salaMedical: '',
    salaUnemployee: '',
    salaHouse: '',

    salaMakerName: '',
    salaRecheckerName: '',
    salaRegistrantName: '',

});

//搜索对象
let searchObj = ref({
    sid: route.query.sid,
    key: route.query.key,
    start: route.query.start,
    end: route.query.end,
});

//切换编辑状态
function changeEditMode(){
    hideCommit.value = !hideCommit.value;
    editMode.value = !editMode.value;
}




//编辑弹窗
let showEditSalary = ref(false);
//编辑状态
let editMode = ref(false);
//编辑开关
let hideCommit = ref(true);
//弹窗加载状态
let confirmLoading = ref(false);
//是专员
let isAssistant = ref(store.userInfo.userPermission == "1"? true:false)

//编辑薪酬按钮被点击
async function editSalaryClicked(data) {
    showEditSalary.value = true;
    changeSalary.value = data;
}

//开始获取薪酬标准
let res = new ref();
async function startSearchSalaryInfo() {
    loading.value = true;
    res.value = (await searchSalary(searchObj.value,store.token));
    salaryData.value = res.value.data;
    loading.value = false;
}

//发送薪酬更新请求
async function startEditSalary() {
    if (changeSalary.salaName == '') {
        message.error('请输入标准名');
        return;
    }else newSalary.sname = changeSalary.value.salaName;
    if (changeSalary.salaBase == 0 && isAssistant) {
        message.error('基本工资不能为0或不能为空');
        return;
    }else newSalary.sbase = changeSalary.value.salaBase;
    console.log(changeSalary)
    newSalary.stransport = changeSalary.value.salaTransport;
    newSalary.slunch = changeSalary.value.salaLunch;
    newSalary.scommunicate = changeSalary.value.salaCommunicate;
    newSalary.sid = changeSalary.value.sid;

    confirmLoading.value = true;
    
    //开始请求
    let res = await editSalary(newSalary, store.token);
    if (res.data.success != true) {
        message.error(res.data.msg);
        confirmLoading.value = false;
    } else {
        //添加成功
        newSalary.sid = 0;
        newSalary.sname = '';
        newSalary.sbase = '';
        newSalary.stransport = 0;
        newSalary.slunch = 0;
        newSalary.scommunicate = 0;
        showEditSalary.value = false;
        confirmLoading.value = false;
        message.success('编辑成功');
        handleTableChange(pagInfo);
    }
}

//开始删除薪酬标准
async function startDeleteSalary(index) {
    let res = await deleteSalary(index,store.token);
    if(res.data.success != true){
        message.error(res.data.msg);
    }else{
        //删除成功
        message.success('删除成功');
        handleTableChange(pagInfo);
        
    }
}

onMounted(()=>{
    console.log(searchObj.value)
    startSearchSalaryInfo();
})





const columns = reactive(
    [
        {
            name: '序号',
            dataIndex: 'sid',
            key: 'sid',
            width: '10%',
        },
        {
            title: '名称',
            dataIndex: 'salaName',
            key: 'salaName',
            width: '20%',
        },
        {
            title: '制定人',
            dataIndex: 'salaMakerName',
            key: 'salaMakerName',
            width: '15%',
        },
        {
            title: '登记人',
            dataIndex: 'salaRegistrantName',
            key: 'salaRegistrantName',
            width: '15%',
        },
        {
            title: '复核人',
            dataIndex: 'salaRecheckerName',
            key: 'salaRecheckerName',
            width: '15%',
        },
        {
            title: '基本工资',
            dataIndex: store.userInfo.userPermission == 10? ' ': 'salaBase',
            key: store.userInfo.userPermission == 10? ' ': 'salaBase',
            width: '15%',

        },
        {
            title: '操作',
            key: 'action',
            width: '10%',
        },
    ]
)


</script>

<style scoped>
/* 顶部容器设置为弹性布局 */
.salary-header {
    width: 100%;
    display: flex;
    align-items: center;
}

.salary-title {
    /* 标题样式 */
    font-size: 25px;
    font-weight: bold;
}

/* 机构表 */
.salary-table-contain {
    /* 容器样式 */
    width: 100%;
    display: flex;
    margin-top: 50px;
}

.salary-table-table {
    width: 100%;
}
</style>