<template>
    <div class="salary-header">
        <span class="salary-title">薪酬管理</span>
        <div style="flex-grow: 1;"></div>
        <!-- 搜索 -->
        <a-button type="primary" shape="circle" style="margin-right: 10px;" size="large">
            <template #icon>
                <SearchOutlined />
            </template>
        </a-button>
        <!-- 添加机构 -->
        <a-button type="primary" shape="round" size="large" @click="addsalaryClicked">
            <i class="iconfont icon-add"></i>
            添加薪酬标准
        </a-button>
    </div>


    <div class="salary-table-contain">
        <!-- 基础表格 -->
        <a-table :data-source=dataSource?.data.data :columns="columns" :pagination="pagination" :loading="loading"
            @change="handleTableChange" class="salary-table-table">
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
                        <a-popconfirm ref="popconfirm" title="是否删除该标准?" @confirm="startDeleteSalary(record.pid)"
                            ok-text="确定" cancel-text="取消">
                            <a-button type="primary" danger style="margin-right: 10px;">删除</a-button>
                        </a-popconfirm>

                    </div>
                </template>
            </template>
        </a-table>
    </div>



    <!-- 添加标准 -->
    <a-modal v-model:visible="showAddSalary" title="添加薪酬标准" :confirm-loading="confirmLoading" @ok="startAddSalary"
        @cancel="stoploading" ok-text="提交" cancel-text="取消">
        <div>
            <a-divider style="margin-top: 0;">基本内容</a-divider>
            <div style="display: flex; align-items: center; margin-top: 20px;">
                <span style="width: 100px;">薪酬名称：</span><a-input v-model:value="newSalary.sname" placeholder="输入薪酬名称" />
            </div>
            <div style="display: flex; align-items: center; margin-top: 20px;">
                <span style="width: 100px;">基本工资：</span><a-input v-model:value="newSalary.sbase" placeholder="输入基本工资"
                    suffix="元" type="number" />
            </div>
            <a-divider>员工补助</a-divider>
            <div style="display: flex; align-items: center; margin-top: 20px;">
                <span style="width: 100px;">交通补贴：</span><a-input v-model:value="newSalary.stransport"
                    placeholder="输入交通补贴" suffix="元" type="number" />
            </div>
            <div style="display: flex; align-items: center; margin-top: 20px;">
                <span style="width: 100px;">午餐补助：</span><a-input v-model:value="newSalary.slunch"
                    placeholder="输入午餐补助" suffix="元" type="number" />
            </div>
            <div style="display: flex; align-items: center; margin-top: 20px;">
                <span style="width: 100px;">通讯补助：</span><a-input v-model:value="newSalary.scommunicate"
                    placeholder="输入通讯补助" suffix="元" type="number" />
            </div>
        </div>
    </a-modal>


    <!-- 编辑标准 -->
    <a-modal 
        v-model:visible="showEditSalary" 
        title="薪酬标准详情" 
        :confirm-loading="confirmLoading" 
        footer=""
        style="width: 40%;">

        <div>

            

            <div style="display: flex; justify-content: center; width: auto;">

                

                <!-- 内容 -->
                <div>
                    <!-- 左半部分 -->
                    <a-divider style="margin-top: 0;">基本内容</a-divider>
                    <div style="display: flex; align-items: center; margin-top: 20px;">
                        <span style="width: 100px;">薪酬名称：</span><a-input v-model:value="changeSalary.salaName"
                            placeholder="输入薪酬名称" :disabled="!editMode" />
                    </div>
                    <div style="display: flex; align-items: center; margin-top: 20px;">
                        <span style="width: 100px;">基本工资：</span><a-input v-model:value="changeSalary.salaBase"
                            placeholder="输入基本工资" suffix="元" type="number" :disabled="!editMode" />
                    </div>

                    <a-divider>三险一金</a-divider>
                    <div style="display: flex; align-items: center; margin-top: 20px;">
                        <span style="width: 100px;">养老保险：</span><a-input v-model:value="changeSalary.salaOld" suffix="元"
                            type="number" :disabled=true />
                    </div>
                    <div style="display: flex; align-items: center; margin-top: 20px;">
                        <span style="width: 100px;">医疗保险：</span><a-input v-model:value="changeSalary.salaMedical"
                            suffix="元" type="number" :disabled=true />
                    </div>
                    <div style="display: flex; align-items: center; margin-top: 20px;">
                        <span style="width: 100px;">失业保险：</span><a-input v-model:value="changeSalary.salaUnemployee"
                            suffix="元" type="number" :disabled=true />
                    </div>
                    <div style="display: flex; align-items: center; margin-top: 20px;">
                        <span style="width: 100px;">住房公积金</span><a-input v-model:value="changeSalary.salaHouse"
                            suffix="元" type="number" :disabled=true />
                    </div>
                </div>

                <!-- 右半部分 -->
                <div style="margin-left: 50px;">
                    <a-divider style="margin-top: 0;">员工补助</a-divider>
                    <div style="display: flex; align-items: center; margin-top: 20px;">
                        <span style="width: 100px;">交通补贴：</span><a-input v-model:value="changeSalary.salaTransport"
                            placeholder="输入交通补贴" suffix="元" type="number" :disabled="!editMode" />
                    </div>
                    <div style="display: flex; align-items: center; margin-top: 20px;">
                        <span style="width: 100px;">午餐补助：</span><a-input v-model:value="changeSalary.salaLunch"
                            placeholder="输入午餐补助" suffix="元" type="number" :disabled="!editMode" />
                    </div>
                    <div style="display: flex; align-items: center; margin-top: 20px;">
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
                        <a-button type="primary" shape="round" @click="startEditSalary" :disabled="hideCommit">
                            提交更改
                        </a-button>
                    </div>

                </div>
            </div>
            

        </div>
        
    </a-modal>
    

</template>

<script setup>

import { reactive, ref, computed } from 'vue';
import { SearchOutlined,FormOutlined,CloseOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { getSalaryInfo, addSalary, deleteSalary, editSalary } from '../request/api/salary';
import { useAdminStore } from '../stores';
import { usePagination } from 'vue-request';

const store = useAdminStore();

//储存当前分页信息
let pagInfo = new reactive({
    pageSize: 10,
    current: 1,
})

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

})

//切换编辑状态
function changeEditMode(){
    hideCommit.value = !hideCommit.value;
    editMode.value = !editMode.value;
}

//添加弹窗
let showAddSalary = ref(false);
//编辑弹窗
let showEditSalary = ref(false);
//编辑状态
let editMode = ref(false);
//编辑开关
let hideCommit = ref(true);
//弹窗加载状态
let confirmLoading = ref(false);

//添加薪酬按钮被点击
async function addsalaryClicked() {
    showAddSalary.value = true;
}

//编辑薪酬按钮被点击
async function editSalaryClicked(data) {
    showEditSalary.value = true;
    changeSalary.value = data;
}
//开始删除薪酬标准
async function startDeleteSalary() {

}

//开始获取薪酬标准
let res = new reactive();
async function startGetSalaryInfo(index, count) {
    res.value = (await getSalaryInfo(store.token, index, count));
    return res.value.data;
}

//向服务器发送添加请求
async function startAddSalary() {
    if (newSalary.sname == '') {
        message.error('请输入标准名');
        return;
    }
    if (newSalary.sbase == 0) {
        message.error('基本工资不能为0或不能为空');
        return;
    }
    confirmLoading.value = true;
    //开始请求
    let res = await addSalary(newSalary, store.token);
    if (res.data.success != true) {
        message.error(res.data.msg);
        confirmLoading.value = false;
    } else {
        //添加成功
        newSalary.sname = '',
        newSalary.sbase = '',
        newSalary.stransport = 0,
        newSalary.slunch = 0,
        newSalary.scommunicate = 0,
        showAddSalary.value = false;
        confirmLoading.value = false;
        message.success('添加成功');
        handleTableChange(pagInfo);
    }
}

//发送薪酬更新请求
async function startEditSalary() {
    if (changeSalary.salaName == '') {
        message.error('请输入标准名');
        return;
    }else newSalary.sname = changeSalary.value.salaName;
    if (changeSalary.salaBase == 0) {
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



//表格分页
const {
    data: dataSource,
    run,
    loading,
    current,
    pageSize,
} = usePagination(startGetSalaryInfo, {
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
            dataIndex: 'salaRecheckerName',
            key: 'salaRecheckerName',
            width: '15%',
        },
        {
            title: '复核人',
            dataIndex: 'salaRegistrantName',
            key: 'salaRegistrantName',
            width: '15%',
        },
        {
            title: '基本工资',
            dataIndex: 'salaBase',
            key: 'salaBase',
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