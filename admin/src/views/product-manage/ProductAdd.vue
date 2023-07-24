<template>
    <el-page-header content="添加产品" icon="" title="产品管理"></el-page-header>
    <el-card class="box-card">
        <el-form ref="productFormRef" :model="productForm" :rules="productFormRules" label-width="120px"
            class="demo-ruleForm" :size="formSize" status-icon>
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
                <el-button type="primary" @click="submitForm()">添加产品</el-button>
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

const productFormRef = ref();
const productForm = reactive({
    title: '',
    introduction: '',
    detail: '',
    cover: '',
    file: null, //初始的file为空
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
    productForm.cover = URL.createObjectURL(file); //用于回显
    productForm.file = file; //用于传值给后端
}

// 提交表单
const submitForm = () => {
    productFormRef.value.validate(async valid => {
        if (valid) {
            await upload('/adminapi/product/add', productForm);
            router.push('/product-manage/productlist');
            ElMessage.success('添加成功');
        }
    });
};
</script>