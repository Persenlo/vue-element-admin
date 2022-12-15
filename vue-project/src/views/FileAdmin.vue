<template>
    <div class="file-header">
        <span class="file-title">档案管理</span>
        <div style="flex-grow: 1;"></div>
        <!-- 搜索 -->
        <a-button type="primary" shape="circle" style="margin-right: 10px;" size="large">
            <template #icon>
                <SearchOutlined />
            </template>
        </a-button>
        <!-- 添加职位 -->
        <a-button type="primary" shape="round" size="large" @click="addPositionClicked">
            <i class="iconfont icon-add"></i>
            档案登记
        </a-button>
    </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { SearchOutlined, DollarOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { getPositionInfo, addPosition, deletePosition, editPosition } from '../request/api/position';
import { getAllSalaryInfo, getSalaryInfoByID } from '../request/api/salary';
import { useAdminStore } from '../stores';
import { usePagination } from 'vue-request';

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
</style>