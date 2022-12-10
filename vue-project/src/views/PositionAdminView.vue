<template>
    <div class="position-header">
        <span class="position-title">职位管理</span>
        <div style="flex-grow: 1;"></div>
        <!-- 搜索 -->
        <a-button type="primary" shape="circle" style="margin-right: 10px;" size="large">
            <template #icon><SearchOutlined /></template>
        </a-button>
        <!-- 添加职位 -->
        <a-button type="primary" shape="round" size="large" @click="addPositionClicked">
            <i class="iconfont icon-add"></i>
            添加职位
        </a-button>
    </div>

    <div class="position-table-contain">
        <!-- 基础表格 -->
        <a-table :data-source=dataSource.data.data
                 :columns="columns" 
                 :pagination="pagination"
                 :loading="loading"
                 @change="handleTableChange"
                 class="position-table-table">
            <!-- 表头 -->
            <template #headerCell="{ column }">
                <template v-if="column.key === 'id'">
                    <span>
                        <smile-outlined />
                        序号
                    </span>
                </template>
            </template>
            <!-- 操作栏 -->
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <div style="width: 100%; display: flex; ">
                        <a-button type="primary" style="margin-right: 10px;">编辑</a-button>
                        <a-popconfirm title="是否删除该职位?" @confirm="startDeletePosition(record.pid)" ok-text="确定" cancel-text="取消">
                            <a-button type="primary" danger style="margin-right: 10px;">删除</a-button>
                        </a-popconfirm>
                        
                    </div>
                </template>
            </template>
        </a-table>
        


        <!-- 添加职位 -->
        <a-modal v-model:visible="showAddPosition" 
                    title="添加职位" 
                    :confirm-loading="confirmLoading" 
                    @ok="startAddPosition" 
                    @cancel="stoploading" 
                    ok-text="提交"
                    cancel-text="取消">
                    <a-input v-model:value="newPosition.pcategory" placeholder="职位分类" style="margin-top: 10px;" />
                    <a-input v-model:value="newPosition.pname" placeholder="职位名称" style="margin-top: 10px;" />
        </a-modal>

        <!-- 设置薪酬标准 -->
        <a-modal v-model:visible="showSalarySet" 
                    title="设置薪酬标准" 
                    :confirm-loading="confirmLoading" 
                    @ok="" 
                    @cancel="" 
                    ok-text="设置"
                    cancel-text="取消">
                    

        </a-modal>

        <!-- 编辑职位 -->
        <a-modal v-model:visible="showEditPosition" 
                    title="编辑职位" 
                    :confirm-loading="confirmLoading" 
                    @ok="" 
                    @cancel="" 
                    ok-text="提交"
                    cancel-text="取消">
                    <a-input v-model:value="newPosition.pcategory" placeholder="职位分类" style="margin-top: 10px;" />
                    <a-input v-model:value="newPosition.pname" placeholder="职位名称" style="margin-top: 10px;" />
        </a-modal>


        
    </div>


    
    
</template>

<script setup>
import { reactive, ref, computed} from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { getPositionInfo,addPosition,deletePosition } from '../request/api/position';
import { useAdminStore } from '../stores';
import { usePagination } from 'vue-request';


const store = useAdminStore();

//储存当前分页信息
let pagInfo = new reactive({
    pageSize: 10,
    current: 1,
})


//添加弹窗
let showAddPosition = ref(false);
//编辑弹窗
let showEditPosition = ref(false);
//薪酬设置弹窗
let showSalarySet = ref(false);
//弹窗加载状态
let confirmLoading = ref(false);

//添加对象
let newPosition = reactive({
    pcategory: '',
    pname: ''
})

//点击添加按钮
function addPositionClicked() {
    showAddPosition.value = true;
}
//关闭弹窗事件
function stoploading(){
    confirmLoading.value = false;
}

//向服务器发送添加请求
async function startAddPosition(){
    if(newPosition.pcategory == '' || newPosition.pname == ''  ){
        message.error('请输入参数');
        return;
    }
    confirmLoading.value = true;
    //开始请求
    let res = await addPosition(newPosition,store.token);
    if(res.data.success != true){
        message.error('职位添加失败');
        confirmLoading.value = false;
    }else{
        //添加成功
        newPosition.pname = '';
        newPosition.pcategory = '';
        showAddPosition.value = false;
        confirmLoading.value = false;
        message.success('添加成功');
        handleTableChange(pagInfo);
    }

    
}


//向服务器发送删除请求
async function startDeletePosition(index){
    let res = await deletePosition(index,store.token);
    if(res.data.success != true){
        message.error('职位删除失败');
    }else{
        //删除成功
        message.success('删除成功');
        handleTableChange(pagInfo);
    }
}


//获取职位信息
let res = new reactive();
async function startGetPositionInfo(index,count){
    res.value = (await getPositionInfo(store.token,index,count));
    return res.value.data;
}



const {
      data: dataSource,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(startGetPositionInfo, {
        pagination: {
            currentKey: 'index',
            pageSizeKey: 'count',
        },
    });

const pagination = computed(() => ({
      total: dataSource.value.data.total,
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
    pagInfo.pageSize.value = pag?.pageSize;
    pagInfo.current.value = pag?.current;
}







// 表格列
const columns = reactive(
    [
        {
            name: '序号',
            dataIndex: 'pid',
            key: 'pid',
        },
        {
            title: '分类',
            dataIndex: 'posiCategory',
            key: 'posiCategory',
        },
        {
            title: '名称',
            dataIndex: 'posiName',
            key: 'posiName',
        },
        {
            title: '操作',
            key: 'action',
        },
    ]
)




</script>

<style>
/* 顶部容器设置为弹性布局 */
.position-header{
    width: 100%;
    display: flex;
    align-items: center;
}
.position-title{
    /* 标题样式 */
    font-size: 25px;
    font-weight: bold;
}
/* 职位表 */
.position-table-contain{
    /* 容器样式 */
    width: 100%;
    display: flex;
    margin-top: 50px;
}
.position-table-table{
    width: 100%;
}
</style>
