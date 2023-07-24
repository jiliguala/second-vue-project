<template>
    <el-page-header content="添加用户" icon="" title="用户管理"></el-page-header>
    <el-card class="box-card">
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
            <el-form-item label="头像" prop="avatar">
                <Upload :avatar="userForm.avatar" @djychange="handleChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">添加用户</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import Upload from '@/components/upload/Upload';
import upload from '@/util/upload';
import { useRouter } from 'vue-router';
const router = useRouter();

const userFormRef = ref();
const userForm = reactive({
    username: '',
    password: '',
    role: 2,
    introduction: '',
    avatar: '',
    file: null, //初始的file为空
    gender: 0 //默认传0 后期自行修改
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
    ],
    avatar: [
        { required: true, message: '请上传头像', trigger: 'blur' }
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
// 上传
const handleChange = file => {
    userForm.avatar = URL.createObjectURL(file); //用于回显头像
    userForm.file = file; //用于传值给后端
}

// 提交表单
const submitForm = () => {
    userFormRef.value.validate(async valid => {
        if (valid) {
            await upload('/adminapi/user/add', userForm);
            router.push('/user-manage/userlist');
            ElMessage.success('添加成功');
        }
    });
};
</script>