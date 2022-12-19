<template>
    <div class="file-header">
        <span class="file-title">搜索结果</span>
        <div style="flex-grow: 1;"></div>
    </div>

    <div class="file-table-contain">
        <!-- 基础表格 -->
        <a-table :data-source=searchResult?.data :columns="columns" :pagination="pagination" :loading="loading"
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
                    <div style="width: 100%; display: flex; " v-if="showAll === 'del'">
                        <a-popconfirm ref="popconfirm" title="是否恢复该档案?" @confirm="startRestoreFile(record.eid)" ok-text="确定" cancel-text="取消">
                            <a-button type="primary" style="margin-right: 10px;" >恢复</a-button>
                        </a-popconfirm>
                    </div>
                    <div style="width: 100%; display: flex; " v-else>
                        <a-button type="primary" style="margin-right: 10px;" @click="toDetail(record.eid)">详情</a-button>
                        <a-popconfirm ref="popconfirm" title="是否删除该档案?" @confirm="startDeleteFile(record.eid)"
                            v-if="!isAssistant" ok-text="确定" cancel-text="取消">
                            <a-button type="primary" danger style="margin-right: 10px;">删除</a-button>
                        </a-popconfirm>
                    </div>
                </template>

            </template>
        </a-table>
    </div>



</template>


<script setup>
import { reactive, ref, onMounted, watch } from 'vue';
import { FormOutlined,CloseOutlined,LeftOutlined } from '@ant-design/icons-vue';
import { searchFile,deleteFile,getUncheckFileInfo,getDelFileInfo,restoreFile } from '../request/api/file';
import { message } from 'ant-design-vue';
import { useAdminStore } from '../stores';
import { usePagination } from 'vue-request';
import { useRouter,useRoute } from 'vue-router';

const store = useAdminStore();
const router = useRouter();
const route = useRoute();

//搜索结果
let searchResult = ref();

//搜索对象
let searchObj = ref({
    pid: route.query.pid,
    oaid: route.query.oaid,
    obid: route.query.obid,
    ocid: route.query.ocid,
    start: route.query.start,
    end: route.query.end,
})

//是专员
let isAssistant = ref(store.userInfo.userPermission == "1" ? true : false)


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
//开始恢复档案
async function startRestoreFile(id) {
    let res = await restoreFile(store.token,id);
    if (res.data.success != true) {
        message.error(res.data.msg);
    } else {
        //删除成功
        message.success('恢复成功');
        handleTableChange(pagInfo);

    }
}

//跳转到详情
function toDetail(value){
    router.push({
        name: 'viewFile',
        query:{
            id: value
        }
    })
}

//开始搜索
let res = new ref();
async function startSearchFile(){
    let data = {
        oaid: searchObj.value.oaid,
        obid: searchObj.value.obid,
        ocid: searchObj.value.ocid,
        categoryname: searchObj.value.categoryname,
        pid: searchObj.value.pid,
        start: searchObj.value.start,
        end: searchObj.value.end,
    }
    res.value = (await searchFile(data,store.token))
    searchResult.value = res.value.data
    loading.value = false;
}

onMounted(()=>{
    startSearchFile();
})




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
            title: '登记时间',
            dataIndex: 'emplRecoddate',
            key: 'emplRecoddate',
            width: '25%',
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