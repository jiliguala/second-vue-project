<template>
    <el-page-header content="编辑新闻" @back="handleBack()" title="新闻管理"></el-page-header>
    <el-card class="box-card">
        <el-form ref="newsFormRef" :model="newsForm" :rules="newsFormRules" label-width="120px" class="demo-ruleForm"
            :size="formSize" status-icon>
            <el-form-item label="标题" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <Editor @eventDataTransmission="handleEditorChange" :content="newsForm.content" v-if="newsForm.content" />
            </el-form-item>
            <el-form-item label="分类" prop="category">
                <el-select v-model="newsForm.category" class="m-2" placeholder="请选择新闻分类" style="width: 100%;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="封面" prop="cover">
                <Upload :avatar="newsForm.cover" @djychange="handleChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">更新新闻</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import Editor from '@/components/editor/Editor';
import Upload from '@/components/upload/Upload';
import upload from '@/util/upload';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { ElMessage } from 'element-plus';

const newsFormRef = ref();
const newsForm = reactive({
    title: '',
    content: '',
    category: 1, //新闻分类 1最新动态 2典型案例 3通知公告
    cover: '', // 封面
    file: null, // 用于给后端传值的图片信息字段
    isPublish: 0 //是否发布 0未发布 1已发布
});

// 根据ID获取新闻详情
const route = useRoute();
onMounted(async () => {
    const res = await axios.get(`/adminapi/news/list/${route.params.id}`)
    Object.assign(newsForm, res.data.data[0]);
});

const newsFormRules = reactive({
    title: [
        { required: true, message: '请输入标题', trigger: 'blur' }
    ],
    content: [
        { required: true, message: '请输入内容', trigger: 'blur' }
    ],
    category: [
        { required: true, message: '请选择分类', trigger: 'blur' }
    ],
    cover: [
        { required: true, message: '请上传封面', trigger: 'blur' }
    ],
});
//新闻分类： 1最新动态 2典型案例 3通知公告
const options = [
    {
        label: '最新动态',
        value: 1
    },
    {
        label: '典型案例',
        value: 2
    },
    {
        label: '通知公告',
        value: 3
    }
]
// 上传
const handleChange = file => {
    newsForm.cover = URL.createObjectURL(file); //用于回显头像
    newsForm.file = file; //用于传值给后端
}
// 每次editor发生改变时回调
const handleEditorChange = (data) => {
    newsForm.content = data
}

// 提交表单
const router = useRouter();
const submitForm = () => {
    newsFormRef.value.validate(async valid => {
        if (valid) {
            await upload('/adminapi/news/list', newsForm);
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