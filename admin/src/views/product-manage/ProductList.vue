<template>
    <el-page-header content="产品列表" icon="" title="产品管理"></el-page-header>
    <el-card class="box-card">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="title" label="产品名称" />
            <el-table-column prop="introduction" label="产品简介" />
            <el-table-column label="更新时间">
                <!-- 插槽 -->
                <template #default="scope">
                    {{ formatTime.getTime(scope.row.editTime) }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="scope">
                    <el-button circle :icon="Edit" size="small" @click="handleEdit(scope.row)"></el-button>

                    <el-popconfirm title="你确定要删除吗？" confirm-button-text="确定" cancel-button-text="取消"
                        @confirm="handleDelete(scope.row)">
                        <template #reference>
                            <el-button circle :icon="Delete" size="small" type="danger"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Edit, Delete } from '@element-plus/icons-vue';
import axios from 'axios';
import formatTime from '@/util/formatTime';
import router from '@/router';

// 获取列表数据
const tableData = ref([]);
const getTableData = async () => {
    const res = await axios.get('/adminapi/product/list');
    tableData.value = res.data.data;
}

// 页面加载就初始化
onMounted(() => {
    getTableData();
});

// 删除用户
const handleDelete = async (row) => {
    await axios.delete(`/adminapi/product/list/${row._id}`);
    getTableData();
    ElMessage.success('删除成功');
}

// 修改产品 跳转到编辑页面
const handleEdit = async (row) => {
    router.push(`/product-manage/editproduct/${row._id}`);
}

</script>