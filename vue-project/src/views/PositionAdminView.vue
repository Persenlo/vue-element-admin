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
        <a-table :dataSource="data" :columns="columns" class="position-table-table">
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
                        <a-button type="primary" danger style="margin-right: 10px;">删除</a-button>
                    </div>
                </template>
            </template>
        </a-table>
        


        <!-- 添加职位 -->
        <a-modal v-model:visible="showAddPosition" 
                    title="添加职位" 
                    :confirm-loading="confirmLoading" 
                    @ok="startAddPosition" 
                    @cancel="stopoading" 
                    ok-text="提交"
                    cancel-text="取消">
                    <a-input v-model:value="newPosition.pcategory" placeholder="职位分类" style="margin-top: 10px;" />
                    <a-input v-model:value="newPosition.pname" placeholder="职位名称" style="margin-top: 10px;" />
        </a-modal>

        <!-- 设置薪酬标准 -->
        <a-modal v-model:visible="showSet" 
                    title="设置薪酬标准" 
                    :confirm-loading="confirmLoading" 
                    @ok="startAddPosition" 
                    @cancel="stopoading" 
                    ok-text="设置"
                    cancel-text="取消">
                    

        </a-modal>


        
    </div>


    
    
</template>

<script setup>
import { reactive, ref } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';




//添加相关
let showAddPosition = ref(false);

let confirmLoading = ref(false);

//提交对象
let newPosition = reactive({
    pcategory: '',
    pname: ''
})

//点击添加按钮
function addPositionClicked() {
    showAddPosition.value = true;
}
//关闭弹窗事件
function stopoading(){
    confirmLoading.value = false;
}

//向服务器发送添加请求
async function startAddPosition(){
    if(newPosition.pcategory == '' || newPosition.pname == ''  ){
        message.error('请输入参数');
        return;
    }
    confirmLoading.value = true;


    //添加成功
    newPosition.pname = '';
    newPosition.pcategory = '';
    showAddPosition.value = false;
    confirmLoading.value = false;
}





// 表格列
const columns = reactive(
    [
        {
            name: '序号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '分类',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '操作',
            key: 'action',
        },
    ]
)
const data = [
  {
    key: '1',
    id: '1',
    category: '测试分类',
    name: '测试名称',
  },]



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
