<template>
    <el-page-header content="编辑产品" @back="handleBack()" title="产品管理"></el-page-header>
    <el-card class="box-card">
        <el-form ref="productFormRef" :model="productForm" :rules="productFormRules" label-width="120px" class="demo-ruleForm"
            :size="formSize" status-icon>
            <el-form-item label="产品名称" prop="title">
                <el-input v-model="productForm.title" />
            </el-form-item>
            <el-form-item label="产品简介" prop="introduction">
                <el-input v-model="productForm.introduction" type="textarea" />
            </el-form-item>
            <el-form-item label="详细描述" prop="detail">
                <el-input v-model="productForm.detail" type="textarea" />
            </el-form-item>
            <el-form-item label="产品图" prop="cover">
                <Upload :avatar="productForm.cover" @djychange="handleChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">更新产品</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import Upload from '@/components/upload/Upload';
import upload from '@/util/upload';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { ElMessage } from 'element-plus';

const productFormRef = ref();
const productForm = reactive({
    title: '',
    introduction: '',
    detail: '',
    cover: '', // 封面
    file: null // 用于给后端传值的图片信息字段
});

// 根据ID获取产品详情
const route = useRoute();
onMounted(async () => {
    const res = await axios.get(`/adminapi/product/list/${route.params.id}`)
    Object.assign(productForm, res.data.data[0]);
});

const productFormRules = reactive({
    title: [
        { required: true, message: '请输入产品名称', trigger: 'blur' }
    ],
    introduction: [
        { required: true, message: '请输入产品简介', trigger: 'blur' }
    ],
    detail: [
        { required: true, message: '请输入详细描述', trigger: 'blur' }
    ],
    cover: [
        { required: true, message: '请上传产品图', trigger: 'blur' }
    ]
});

// 上传
const handleChange = file => {
    productForm.cover = URL.createObjectURL(file); //用于回显头像
    productForm.file = file; //用于传值给后端
}

// 提交表单
const router = useRouter();
const submitForm = () => {
    productFormRef.value.validate(async valid => {
        if (valid) {
            await upload('/adminapi/product/list', productForm);
            ElMessage.success('更新成功');
            router.back();
        }
    });
};

// 返回上一页
const handleBack = () => {
    router.back();
}
</script>