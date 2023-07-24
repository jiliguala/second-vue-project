<template>
    <el-page-header content="新闻列表" icon="" title="新闻管理"></el-page-header>
    <el-card class="box-card">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="title" label="标题" />
            <el-table-column label="分类">
                <!-- 自定义内容 使用插槽 -->
                <template #default="scope">
                    {{ categoryFormat(scope.row.category) }}
                </template>
            </el-table-column>
            <el-table-column label="更新时间">
                <!-- 插槽 -->
                <template #default="scope">
                    {{ formatTime.getTime(scope.row.editTime) }}
                </template>
            </el-table-column>
            <el-table-column label="是否发布">
                <!-- 插槽 -->
                <template #default="scope">
                    <el-switch @change="handleSwitchChange(scope.row)" v-model="scope.row.isPublish" :active-value="1"
                        :inactive-value="0" />
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template #default="scope">
                    <el-button circle :icon="Star" type="success" @click="handlePreview(scope.row)"></el-button>

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
    <!-- 预览弹窗 -->
    <el-dialog v-model="previewDialogVisible" title="预览新闻" width="50%">
        <div>
            <h2>{{ previewData.title }}</h2>
            <div style="font-size: 12px; color: #888;">{{ formatTime.getTime(previewData.editTime) }}</div>
            <el-divider>
                <el-icon>
                    <StarFilled />
                </el-icon>
            </el-divider>
            <!-- 有跨站脚本攻击的风险 -->
            <div v-html="previewData.content" class="html-content"></div>
        </div>

    </el-dialog>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Star, Edit, Delete, StarFilled } from '@element-plus/icons-vue';
import { useStore } from 'vuex'
import axios from 'axios';
import formatTime from '@/util/formatTime';
import router from '@/router';

// 获取列表数据
const tableData = ref([]);
const getTableData = async () => {
    const res = await axios.get('/adminapi/news/list');
    tableData.value = res.data.data;
}

// 页面加载就初始化
onMounted(() => {
    getTableData();
});

// 格式化新闻分类信息
const categoryFormat = (category) => {
    const arr = ['最新动态', '典型案例', '通知公告'];
    return arr[category - 1]
}

// 是否发布开关的回调
const handleSwitchChange = async (item) => {
    await axios.put(`/adminapi/news/publish`, {
        _id: item._id,
        isPublish: item.isPublish
    });
    getTableData();
}

// 预览回调
const previewData = ref({});
const previewDialogVisible = ref(false);
const handlePreview = (data) => {
    previewData.value = data;
    previewDialogVisible.value = true;
}

// 删除用户
const handleDelete = async (row) => {
    await axios.delete(`/adminapi/news/list/${row._id}`);
    getTableData();
    ElMessage.success('删除成功');
}

// 修改新闻 跳转到编辑页面
const handleEdit = async (row) => {
    router.push(`/news-manage/editnews/${row._id}`);
}

</script>
<style lang="scss" scoped>
::v-deep .html-content {
    img {
        max-width: 100%;
    }
}
</style>