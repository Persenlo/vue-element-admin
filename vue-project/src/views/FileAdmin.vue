<template>
    <div class="file-header">
        <span class="file-title">档案管理</span>
        
        <a-radio-group v-model:value="showAll" style="margin-left: 2%;">
            <a-radio-button :value='true'>全部</a-radio-button>
            <a-radio-button :value='false'>未复核</a-radio-button>
        </a-radio-group>
        
        <div style="flex-grow: 1;"></div>
        
        <!-- 搜索 -->
        <a-button type="primary" shape="circle" style="margin-right: 10px;" size="large" @click="searchFileClicked">
            <template #icon>
                <SearchOutlined />
            </template>
        </a-button>
        <a-button type="primary" shape="round" size="large" @click="fileAddClicked" v-if="isAssistant">
            <i class="iconfont icon-add"></i>
            档案登记
        </a-button>
    </div>

    <div class="file-table-contain">
        <!-- 基础表格 -->
        <a-table :data-source=dataSource?.data.data :columns="columns" :pagination="pagination" :loading="loading"
            @change="handleTableChange" class="file-table-table">
            <!-- 表头 -->
            <template #headerCell="{ column }">
                <template v-if="column.key === 'eid'">
                    <span>
                        ID
                    </span>
                </template>
            </template>
            <!-- 操作栏 -->
            <template #bodyCell="{ column, record }">

                <template v-if="column.key === 'emplStatus'">
                    <div style="width: 100%; display: flex; ">
                        <a-tag v-if="record.emplStatus == 'Unrecheck'" color='volcano'>
                            待复核
                        </a-tag>
                        <a-tag v-if="record.emplStatus == 'Rechecked'" color='green'>
                            已复核
                        </a-tag>
                        <a-tag v-if="record.emplStatus == 'Deleted'" color='red'>
                            已删除
                        </a-tag>
                    </div>
                </template>


                <template v-if="column.key === 'action'">
                    <div style="width: 100%; display: flex; ">
                        <a-button type="primary" style="margin-right: 10px;" @click="toDetail(record.eid)">详情</a-button>
                        <a-popconfirm ref="popconfirm" title="是否删除该标准?" @confirm="startDeleteFile(record.eid)"
                            v-if="!isAssistant" ok-text="确定" cancel-text="取消">
                            <a-button type="primary" danger style="margin-right: 10px;">删除</a-button>
                        </a-popconfirm>
                    </div>
                </template>

            </template>
        </a-table>
    </div>


    <!-- 搜索 -->
    <a-modal v-model:visible="showSearchFile" title="搜索" @ok="startSearchFile" ok-text="搜索" cancel-text="取消">
        <div>

            <div style="display: flex; align-items: center; margin-top: 20px;">
                <span style="width: 100px;">职位分类：</span>
                <a-select v-model:value="searchFile.categoryname" :options="posiCateSelects" :loading="posiCateDisabled" style="width: 100%;" @change="onPosiCateSelected"
                    :disabled="posiCateDisabled" :field-names="{ label: 'posiCategory', value: 'posiCategory' }" >
                </a-select>
            </div>

            <div style="display: flex; align-items: center; margin-top: 20px;">
                <span style="width: 100px;">职位名称：</span>
                <a-select v-model:value="searchFile.pid" :options="posiNameSelects" :loading="posiNameDisabled" style="width: 100%;"
                    :disabled="posiNameDisabled" :field-names="{ label: 'posiName', value: 'pid' }" >
                </a-select>
            </div>


            <div style="display: flex; align-items: center; margin-top: 20px;">
                <span style="width: 100px;">一级机构：</span>
                <a-select v-model:value="searchFile.oaid" :options="orgaSelects" :loading="orgaDisabled" style="width: 100%;" @change="onOrgaSelected"
                    :disabled="orgaDisabled" :field-names="{ label: 'orgaName', value: 'oid' }" >
                </a-select>
            </div>

            <div style="display: flex; align-items: center; margin-top: 20px;">
                <span style="width: 100px;">二级机构</span>
                <a-select v-model:value="searchFile.obid" :options="orgbSelects" :loading="orgbDisabled" style="width: 100%;" @change="onOrgbSelected"
                    :disabled="orgbDisabled" :field-names="{ label: 'orgaName', value: 'oid' }" >
                </a-select>
            </div>

            <div style="display: flex; align-items: center; margin-top: 20px;">
                <span style="width: 100px;">三级机构</span>
                <a-select v-model:value="searchFile.ocid" :options="orgcSelects" :loading="orgcDisabled" style="width: 100%;"
                    :disabled="orgcDisabled" :field-names="{ label: 'orgaName', value: 'oid' }" >
                </a-select>
            </div>
            

            <div style="display: flex; align-items: center; margin-top: 20px;">
                <span style="width: 85px;">修改日期</span><a-range-picker v-model:value="searchFile.date"
                    format="YYYY-MM-DD HH:mm:ss" valueFormat="YYYY-MM-DD HH:mm:ss" show-time />
            </div>
        </div>
    </a-modal>



</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue';
import { SearchOutlined, DollarOutlined } from '@ant-design/icons-vue';
import { getFileInfo,deleteFile,getUncheckFileInfo } from '../request/api/file';
import { getOrgA,getOrgB,getOrgC,addOrganization,editSOrganization,deleteOrganization  } from '../request/api/organization';
import { getPositionCategory,getPositionbyCategory,getPositionInfoById } from '../request/api/position';
import { message } from 'ant-design-vue';
import { useAdminStore } from '../stores';
import { usePagination } from 'vue-request';
import { useRouter } from 'vue-router';

const store = new useAdminStore();
const router = useRouter();

//职位分类
let posiCategory = ref('');
//一级机构选项
let orgaSelects = reactive();
//二级机构选项
let orgbSelects = reactive();
//三级机构选项
let orgcSelects = reactive();
//职位分类选项
let posiCateSelects = reactive();
//职位名称选项
let posiNameSelects = reactive();
//选择框状态
let orgaDisabled = ref(true);
let orgbDisabled = ref(true);
let orgcDisabled = ref(true);
let posiCateDisabled = ref(true);
let posiNameDisabled = ref(true);
//获取一级机构
async function startGetOrga() {
    let res = (await getOrgA(store.token));
    if (res.data.success == true) {
        orgaSelects = res.data.data;
        orgaDisabled.value = false
    }
}
//获取二级机构
async function startGetOrgb(id) {
    let res = (await getOrgB(store.token, id));
    if (res.data.success == true) {
        orgbSelects = res.data.data;
        orgbDisabled.value = false;
    }
}
//获取三级机构
async function startGetOrgc(id) {
    let res = (await getOrgC(store.token, id));
    if (res.data.success == true) {
        orgcSelects = res.data.data;
        orgcDisabled.value = false;
    }
}
//获取职位分类
async function startGetPosiCate() {
    let res = (await getPositionCategory(store.token));
    if (res.data.success == true) {
        posiCateSelects = res.data.data;
        posiCateDisabled.value = false;
    }
}
//获取职位名称
async function startGetPosiName(value) {
    let res = (await getPositionbyCategory(store.token, value));
    if (res.data.success == true) {
        posiNameSelects = res.data.data;
        posiNameDisabled.value = false;
    }
}
//一级机构被选中
function onOrgaSelected(value) {
    searchFile.obid = '';
    searchFile.ocid = '';
    orgbSelects = reactive('');
    orgcSelects = reactive('');
    orgbDisabled.value = true;
    orgcDisabled.value = true;
    startGetOrgb(value);
}
//二级机构被选中
function onOrgbSelected(value) {
    searchFile.ocid = '';
    orgcSelects = reactive('');
    orgcDisabled.value = true;
    startGetOrgc(value);

}
//职位分类被选中
function onPosiCateSelected(value) {
    posiNameDisabled.value = true;
    searchFile.pid = '';
    posiNameSelects = reactive('');
    startGetPosiName(value);
}


//储存当前分页信息
let pagInfo = new reactive({
    pageSize: 8,
    current: 1,
})

//搜索对象
let searchFile = reactive({
    pid: '',
    oaid: '',
    obid: '',
    ocid: '',
    categoryname: '',
    date: '',
})


//搜索弹窗
let showSearchFile = ref(false);
//弹窗加载状态
let confirmLoading = ref(false);
//是专员
let isAssistant = ref(store.userInfo.userPermission == "1" ? true : false)
//内容选择器
let showAll = ref(true);
watch(showAll,(newValue)=>{
    handleTableChange(pagInfo);
})


//搜索按钮被点击
async function searchFileClicked() {
    startGetOrga();
    startGetPosiCate();
    showSearchFile.value = true;
}


//开始搜索
function startSearchFile() {
    router.push({
        name: 'searchSalary',
        query: {
            sid: searchSalary.sid,
            key: searchSalary.key,
            start: searchSalary.date[0],
            end: searchSalary.date[1],
        },
    })
    showSearchSalary.value = false;
}

//开始删除档案
async function startDeleteFile(id) {
    let res = await deleteFile(store.token,id);
    if (res.data.success != true) {
        message.error(res.data.msg);
    } else {
        //删除成功
        message.success('删除成功');
        handleTableChange(pagInfo);

    }
}

//开始获取档案
let res = new reactive();
async function startGetFileInfo(index, count) {
    if(showAll.value){
        res.value = (await getFileInfo(store.token, index, count));
        console.log(showAll.value)
        return res.value.data;
    }else if(!showAll.value){
        res.value = (await getUncheckFileInfo(store.token, index, count));
        return res.value.data
    }
}

function toDetail(value){
    router.push({
        name: 'viewFile',
        query:{
            id: value
        }
    })
}


//表格分页
const {
    data: dataSource,
    run,
    loading,
    current,
    pageSize,
} = usePagination(startGetFileInfo, {
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
            dataIndex: 'eid',
            key: 'eid',
            width: '10%',
        },
        {
            title: '名称',
            dataIndex: 'emplName',
            key: 'emplName',
            width: '20%',
        },
        {
            title: '登记人',
            dataIndex: 'empl_recoderName',
            key: 'empl_recoderName',
            width: '15%',
        },
        {
            title: '档案状态',
            dataIndex: 'emplStatus',
            key: 'emplStatus',
            width: '15%',
        },
        {
            title: '操作',
            key: 'action',
            width: '10%',
        },
    ]
)









function fileAddClicked() {
    router.push("/edit-file")
}

</script>

<style scoped>
.file-header {
    width: 100%;
    display: flex;
    align-items: center;
}

.file-title {
    /* 标题样式 */
    font-size: 25px;
    font-weight: bold;
}

/* 表 */
.file-table-contain {
    /* 容器样式 */
    width: 100%;
    display: flex;
    margin-top: 50px;
}

.file-table-table {
    width: 100%;
}
</style>