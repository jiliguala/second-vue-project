<template>
    <el-page-header content="个人中心" icon="" title="企业门户管理系统"></el-page-header>
    <el-row :gutter="20">
        <el-col :span="8">
            <el-card class="box-card">
                <el-avatar :size="100" :src="avatarUrl" />
                <h3>{{ store.state.userInfo.username }}</h3>
                <h5>{{ store.state.userInfo.role === 1 ? '管理员' : '编辑' }}</h5>
            </el-card>
        </el-col>
        <el-col :span="16">
            <el-card>
                <template #header>
                    <div class="card-header">
                        <span>个人信息</span>
                        <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px"
                            class="demo-ruleForm" :size="formSize" status-icon>
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="userForm.username" />
                            </el-form-item>
                            <el-form-item label="性别" prop="gender">
                                <el-select v-model="userForm.gender" class="m-2" placeholder="请选择性别" style="width: 100%;">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="个人简介" prop="introduction">
                                <el-input v-model="userForm.introduction" type="textarea" />
                            </el-form-item>
                            <el-form-item label="头像" prop="avatar">
                                <Upload :avatar="userForm.avatar" @djychange="handleChange" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm()">更新</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </template>
            </el-card>
        </el-col>
    </el-row>
</template>
<script setup>
import { computed, ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import upload from '@/util/upload';
import Upload from '@/components/upload/Upload';
const store = useStore();

const avatarUrl = computed(() => store.state.userInfo.avatar ? `http://localhost:3000${store.state.userInfo.avatar}` : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`);

const { username, gender, introduction, avatar, role } = store.state.userInfo;
const userFormRef = ref();
const userForm = reactive({
    username,
    gender,
    introduction,
    avatar,
    file: null //初始的file为空
});

const userFormRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'blur' }
    ],
    introduction: [
        { required: true, message: '请输入个人简介', trigger: 'blur' }
    ],
    avatar: [
        { required: true, message: '请上传头像', trigger: 'blur' }
    ]
});

// 性别
const options = [
    {
        label: '保密',
        value: 0
    },
    {
        label: '男',
        value: 1
    },
    {
        label: '女',
        value: 2
    }
]

// 上传
const handleChange = file => {
    userForm.avatar = URL.createObjectURL(file); //用于回显头像
    userForm.file = file; //用于传值给后端
}

// 更新表单
const submitForm = () => {
    userFormRef.value.validate(async valid => {
        if (valid) {
            const res = await upload('/adminapi/user/upload', userForm);
            if (res.ActionType === 'ok') {
                store.commit('changeUserInfo', res.data);
                ElMessage.success('更新成功');
            }
        }
    });
};
</script>
<style lang="scss" scoped>
.el-row {
    margin-top: 20px;

    .box-card {
        text-align: center;
    }
}
</style>