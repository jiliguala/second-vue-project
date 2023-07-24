<template>
    <el-page-header content="用户列表" icon="" title="用户管理"></el-page-header>
    <el-card class="box-card">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="username" label="用户名" />
            <el-table-column label="头像">
                <template #default="scope">
                    <el-avatar v-if="scope.row.avatar" :size="50" :src="`http://localhost:3000${scope.row.avatar}`" />
                    <el-avatar v-else :size="50"
                        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                </template>
            </el-table-column>
            <el-table-column label="角色">
                <template #default="scope">
                    <el-tag v-if="scope.row.role === 1" class="ml-2" type="danger">管理员</el-tag>
                    <el-tag v-else class="ml-2" type="success">编辑</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template #default="scope">

                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>

                    <el-popconfirm title="你确定要删除吗？" confirm-button-text="确定" cancel-button-text="取消"
                        @confirm="handleDelete(scope.row)">
                        <template #reference>
                            <el-button size="small" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog v-model="dialogVisible" title="编辑用户" width="50%">
        <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px" class="demo-ruleForm"
            :size="formSize" status-icon>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="userForm.password" />
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-select v-model="userForm.role" class="m-2" placeholder="请选择角色" style="width: 100%;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
                <el-input v-model="userForm.introduction" type="textarea" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleEditComfirm()">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex'
import axios from 'axios';

const tableData = ref([]);
onMounted(() => {
    getTableData();
});
// 获取列表数据
const getTableData = async () => {
    const res = await axios.get('/adminapi/user/list');
    tableData.value = res.data.data;
}
// 修改用户信息
const dialogVisible = ref(false); // 默认不弹窗
const userFormRef = ref();
const userForm = reactive({
    username: '',
    password: '',
    role: 2,
    introduction: '',
});
const userFormRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    role: [
        { required: true, message: '请选择角色', trigger: 'blur' }
    ],
    introduction: [
        { required: true, message: '请输入个人简介', trigger: 'blur' }
    ]
});

//身份角色： 管理员1， 编辑2
const options = [
    {
        label: '管理员',
        value: 1
    },
    {
        label: '编辑',
        value: 2
    }
]
const handleEdit = async (row) => {
    const res = await axios.get(`/adminapi/user/list/${row._id}`);
    Object.assign(userForm, res.data.data[0]); // 合并两个对象数据
    dialogVisible.value = true;
}
// 确认修改回调
const store = useStore();
const handleEditComfirm = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            await axios.put(`/adminapi/user/list/${userForm._id}`, userForm);
            dialogVisible.value = false;
            getTableData();
            ElMessage.success('修改成功');
            if(store.state.userInfo._id === userForm._id) store.commit('changeUserInfo', userForm); // 修改了自己的用户信息时 立即更新到stroe中
        }
    });
}

// 删除用户
const handleDelete = async (row) => {
    await axios.delete(`/adminapi/user/list/${row._id}`);
    getTableData();
    ElMessage.success('删除成功');
}
</script>